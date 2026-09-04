# Memory Filesystem

## Overview

The Memory FileSystem is the core of Memesplora, organizing memory blocks allocated by the device layer into a complete filesystem structure supporting directory trees, file read/write, permission management, and other standard filesystem operations.

## Superblock Layout

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 bytes)                             │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (default 4K)                  │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Inode Table (128 bytes each)                     │
│  - Inode ID (4 bytes)                            │
│  - Type (1 byte)                                 │
│  - Permissions (2 bytes)                         │
│  - Owner ID (4 bytes)                            │
│  - Size (8 bytes)                                │
│  - Created At (8 bytes)                          │
│  - Modified At (8 bytes)                         │
│  - Block Count (4 bytes)                         │
│  - Direct Blocks [12] (48 bytes)                 │
│  - Indirect Block (4 bytes)                      │
│  - Name (variable length)                        │
├──────────────────────────────────────────────────┤
│ Data Blocks                                       │
│  - Directory blocks: directory entries            │
│  - File blocks: file content                      │
│  - Indirect blocks: pointers to more data blocks  │
└──────────────────────────────────────────────────┘
```

## Core Interface

```go
type FileSystem interface {
    Init(ctx context.Context, size uint64, blockSize uint32) error
    Mount(ctx context.Context) error
    Unmount() error
    Create(ctx context.Context, path string, ownerID uint32) (File, error)
    Open(ctx context.Context, path string) (File, error)
    Delete(ctx context.Context, path string) error
    Rename(ctx context.Context, oldPath, newPath string) error
    Mkdir(ctx context.Context, path string, ownerID uint32) error
    ReadDir(ctx context.Context, path string) ([]FileInfo, error)
    Stat(ctx context.Context, path string) (FileInfo, error)
    Stats() FsStats
}
```

## Inode Management

Each file or directory has a unique Inode with 12 direct blocks and 1 indirect block for larger files.

## Concurrency

- Filesystem-level: `sync.RWMutex`
- Inode-level: independent read-write locks per inode
- Deadlock prevention: locks acquired in hierarchical order (directory → child file)