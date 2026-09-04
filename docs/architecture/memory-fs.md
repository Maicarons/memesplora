# 内存文件系统

## 概述

内存文件系统（Memory FileSystem）是 Memesplora 的核心，它将设备管理层分配的内存块组织为完整的文件系统结构，支持目录树、文件读写、权限管理等标准文件系统操作。

## 超级块布局

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 bytes)                             │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (默认 4K)                     │
│  - TotalBlocks: 空间总块数                       │
│  - FreeBlocks: 剩余块数                          │
│  - InodeCount: 总 inode 数                       │
│  - FreeInodes: 剩余 inode 数                     │
│  - RootInode: 根目录 inode 编号                  │
│  - Checksum: 校验和                              │
├──────────────────────────────────────────────────┤
│ Inode Table (每个 inode 128 bytes)               │
│  - Inode ID (4 bytes)                            │
│  - Type: 0=文件, 1=目录 (1 byte)                │
│  - Permissions (2 bytes)                         │
│  - Owner ID (4 bytes)                            │
│  - Size (8 bytes)                                │
│  - Created At (8 bytes)                          │
│  - Modified At (8 bytes)                         │
│  - Block Count (4 bytes)                         │
│  - Direct Blocks [12] (48 bytes)                 │
│  - Indirect Block (4 bytes)                      │
│  - Name (可变长度, 紧跟 inode)                   │
├──────────────────────────────────────────────────┤
│ Data Blocks                                       │
│  - 目录块: 存放目录项列表                         │
│  - 文件块: 存放文件内容                           │
│  - 间接块: 指向更多数据块                        │
└──────────────────────────────────────────────────┘
```

## 核心接口

```go
type FileSystem interface {
    // 初始化文件系统
    Init(ctx context.Context, device device.Device, size uint64, blockSize uint32) error
    // 挂载文件系统
    Mount(ctx context.Context) error
    // 卸载文件系统
    Unmount() error

    // 文件操作
    Create(ctx context.Context, path string, ownerID uint32) (File, error)
    Open(ctx context.Context, path string) (File, error)
    Delete(ctx context.Context, path string) error
    Rename(ctx context.Context, oldPath, newPath string) error

    // 目录操作
    Mkdir(ctx context.Context, path string, ownerID uint32) error
    ReadDir(ctx context.Context, path string) ([]FileInfo, error)

    // 统计信息
    Stat(ctx context.Context, path string) (FileInfo, error)
    Stats() FsStats
}

type File interface {
    io.Reader
    io.Writer
    io.Seeker
    Close() error
    Stat() (FileInfo, error)
    Sync() error
    Truncate(size int64) error
}
```

## Inode 管理

Inode（索引节点）是文件系统中最核心的数据结构，每个文件或目录都有一个唯一的 Inode。

### Inode 结构

```go
type Inode struct {
    ID        uint32      // Inode 编号
    Type      FileType    // 文件类型
    Perm      os.FileMode // 权限
    OwnerID   uint32      // 所有者
    Size      int64       // 文件大小
    CreatedAt time.Time   // 创建时间
    ModifiedAt time.Time  // 修改时间
    BlockCount uint32     // 数据块数量
    DirectBlocks [12]uint32 // 直接块指针
    IndirectBlock uint32  // 间接块指针
    Name      string      // 文件名
}
```

### 块寻址

- **直接块**: 12 个直接指针，覆盖 12 × 4KB = 48KB
- **间接块**: 1 个间接指针，指向一个包含 1024 个块指针的块（4KB / 4byte），覆盖 1024 × 4KB = 4MB
- 对于更大的文件，可以使用双重间接块

## 目录结构

目录文件的内容是一系列目录项：

```go
type DirEntry struct {
    InodeID uint32 // 指向的 Inode
    NameLen uint16 // 文件名长度
    Name    string // 文件名
    Type    FileType // 文件类型
}
```

## Buddy System 块分配

文件系统使用 Buddy System 管理数据块，这是一种高效的内存分配算法：

### 分配过程

1. 将请求大小向上取整到 2 的幂次
2. 在对应大小的空闲链表中查找
3. 如果找到，分配并返回
4. 如果没有，找更大一级的空闲块，分裂为两个小块
5. 重复直到找到合适大小的块

### 释放过程

1. 将块标记为空闲
2. 检查其伙伴（buddy）是否也为空闲
3. 如果是，合并为更大的块
4. 递归合并直到无法合并

## 并发安全

- 文件系统级：`sync.RWMutex`，读操作共享锁，写操作排他锁
- Inode 级：每个 Inode 配备独立的读写锁
- 目录操作：目录锁 + 子节点锁两级锁定
- 避免死锁：所有锁按层级顺序获取（目录 → 子文件）

## 路径解析

```
/                        → 根目录 (Inode 0)
/home                    → 根目录下查找 "home"
/home/user/file.txt      → 根目录 → "home" → "user" → "file.txt"
```

路径解析算法：
1. 从根 Inode（0）开始
2. 按 `/` 分割路径
3. 在目录的目录项中查找下一个组件
4. 重复直到找到目标
5. 如果中间路径不存在，返回错误