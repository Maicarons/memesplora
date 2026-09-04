# Sistem Berkas Memori

## Ikhtisar

Sistem Berkas Memori adalah inti dari Memesplora, yang mengatur blok memori yang dialokasikan oleh lapisan perangkat menjadi struktur sistem berkas lengkap yang mendukung pohon direktori, baca/tulis berkas, manajemen izin, dan operasi sistem berkas standar lainnya.

## Tata Letak Superblock

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 byte)                              │
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
│ Tabel Inode (128 byte masing-masing)             │
│  - Inode ID (4 byte)                             │
│  - Type (1 byte)                                 │
│  - Permissions (2 byte)                          │
│  - Owner ID (4 byte)                             │
│  - Size (8 byte)                                 │
│  - Created At (8 byte)                           │
│  - Modified At (8 byte)                          │
│  - Block Count (4 byte)                          │
│  - Direct Blocks [12] (48 byte)                  │
│  - Indirect Block (4 byte)                       │
│  - Name (panjang variabel)                       │
├──────────────────────────────────────────────────┤
│ Blok Data                                         │
│  - Blok direktori: entri direktori                │
│  - Blok berkas: konten berkas                     │
│  - Blok tidak langsung: penunjuk ke lebih banyak blok │
└──────────────────────────────────────────────────┘
```

## Antarmuka Inti

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

## Manajemen Inode

Setiap berkas atau direktori memiliki Inode unik dengan 12 blok langsung dan 1 blok tidak langsung untuk berkas yang lebih besar.

## Konkurensi

- Tingkat sistem berkas: `sync.RWMutex`
- Tingkat Inode: kunci baca-tulis independen per inode
- Pencegahan deadlock: kunci diperoleh dalam urutan hierarkis (direktori → berkas anak)
