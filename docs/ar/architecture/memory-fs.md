# نظام الملفات في الذاكرة

## نظرة عامة

نظام الملفات في الذاكرة هو جوهر Memesplora، حيث ينظم كتل الذاكرة المخصصة بواسطة طبقة الجهاز في هيكل نظام ملفات كامل يدعم الأشجار الدليلية، قراءة/كتابة الملفات، إدارة الأذونات، وعمليات نظام الملفات القياسية الأخرى.

## تخطيط الكتلة الفائقة

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 بايت)                              │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (الافتراضي 4K)                │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ جدول Inode (128 بايت لكل منه)                     │
│  - Inode ID (4 بايت)                             │
│  - Type (1 بايت)                                 │
│  - Permissions (2 بايت)                          │
│  - Owner ID (4 بايت)                             │
│  - Size (8 بايت)                                 │
│  - Created At (8 بايت)                           │
│  - Modified At (8 بايت)                          │
│  - Block Count (4 بايت)                          │
│  - Direct Blocks [12] (48 بايت)                  │
│  - Indirect Block (4 بايت)                       │
│  - Name (طول متغير)                              │
├──────────────────────────────────────────────────┤
│ كتل البيانات                                     │
│  - كتل الدليل: إدخالات الدليل                     │
│  - كتل الملفات: محتوى الملف                       │
│  - كتل غير مباشرة: مؤشرات إلى المزيد من كتل البيانات │
└──────────────────────────────────────────────────┘
```

## الواجهة الأساسية

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

## إدارة Inode

كل ملف أو دليل له Inode فريد مع 12 كتلة مباشرة وكتلة غير مباشرة واحدة للملفات الأكبر.

## التزامن

- على مستوى نظام الملفات: `sync.RWMutex`
- على مستوى Inode: أقفال قراءة-كتابة مستقلة لكل inode
- منع الجمود: يتم الحصول على الأقفال بترتيب هرمي (دليل → ملف فرعي)
