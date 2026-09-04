# মেমোরি ফাইলসিস্টেম

## ওভারভিউ

মেমোরি ফাইলসিস্টেম হল Memesplora-এর মূল অংশ, যা ডিভাইস লেয়ার দ্বারা বরাদ্দকৃত মেমোরি ব্লকগুলিকে একটি সম্পূর্ণ ফাইলসিস্টেম কাঠামোতে সংগঠিত করে যা ডিরেক্টরি ট্রি, ফাইল পড়া/লেখা, অনুমতি ব্যবস্থাপনা এবং অন্যান্য মানক ফাইলসিস্টেম অপারেশন সমর্থন করে।

## সুপারব্লক লেআউট

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 বাইট)                              │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (ডিফল্ট 4K)                   │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Inode টেবিল (প্রত্যেকটি 128 বাইট)                 │
│  - Inode ID (4 বাইট)                             │
│  - Type (1 বাইট)                                 │
│  - Permissions (2 বাইট)                          │
│  - Owner ID (4 বাইট)                             │
│  - Size (8 বাইট)                                 │
│  - Created At (8 বাইট)                           │
│  - Modified At (8 বাইট)                          │
│  - Block Count (4 বাইট)                          │
│  - Direct Blocks [12] (48 বাইট)                  │
│  - Indirect Block (4 বাইট)                       │
│  - Name (পরিবর্তনশীল দৈর্ঘ্য)                    │
├──────────────────────────────────────────────────┤
│ ডেটা ব্লক                                        │
│  - ডিরেক্টরি ব্লক: ডিরেক্টরি এন্ট্রি              │
│  - ফাইল ব্লক: ফাইল কন্টেন্ট                       │
│  - পরোক্ষ ব্লক: আরও ডেটা ব্লকের পয়েন্টার         │
└──────────────────────────────────────────────────┘
```

## মূল ইন্টারফেস

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

## Inode ব্যবস্থাপনা

প্রতিটি ফাইল বা ডিরেক্টরির একটি অনন্য Inode থাকে যাতে 12টি সরাসরি ব্লক এবং বড় ফাইলের জন্য 1টি পরোক্ষ ব্লক থাকে।

## সমবর্তিতা

- ফাইলসিস্টেম-স্তর: `sync.RWMutex`
- Inode-স্তর: প্রতি inode-এ স্বাধীন পড়া-লেখা লক
- ডেডলক প্রতিরোধ: লকগুলি শ্রেণিবদ্ধ ক্রমে অর্জিত হয় (ডিরেক্টরি → চাইল্ড ফাইল)
