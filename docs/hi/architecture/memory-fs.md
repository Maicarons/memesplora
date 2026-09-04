# मेमोरी फाइलसिस्टम

## अवलोकन

मेमोरी फाइलसिस्टम Memesplora का मुख्य भाग है, जो डिवाइस लेयर द्वारा आवंटित मेमोरी ब्लॉकों को एक पूर्ण फाइलसिस्टम संरचना में व्यवस्थित करता है जो निर्देशिका ट्री, फाइल रीड/राइट, अनुमति प्रबंधन और अन्य मानक फाइलसिस्टम संचालन का समर्थन करता है।

## सुपरब्लॉक लेआउट

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 बाइट्स)                            │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (डिफ़ॉल्ट 4K)                 │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Inode तालिका (प्रत्येक 128 बाइट्स)               │
│  - Inode ID (4 बाइट्स)                           │
│  - Type (1 बाइट)                                 │
│  - Permissions (2 बाइट्स)                        │
│  - Owner ID (4 बाइट्स)                           │
│  - Size (8 बाइट्स)                               │
│  - Created At (8 बाइट्स)                         │
│  - Modified At (8 बाइट्स)                        │
│  - Block Count (4 बाइट्स)                        │
│  - Direct Blocks [12] (48 बाइट्स)                │
│  - Indirect Block (4 बाइट्स)                     │
│  - Name (परिवर्तनीय लंबाई)                       │
├──────────────────────────────────────────────────┤
│ डेटा ब्लॉक                                       │
│  - निर्देशिका ब्लॉक: निर्देशिका प्रविष्टियाँ      │
│  - फ़ाइल ब्लॉक: फ़ाइल सामग्री                    │
│  - अप्रत्यक्ष ब्लॉक: अधिक डेटा ब्लॉकों के संकेतक │
└──────────────────────────────────────────────────┘
```

## कोर इंटरफेस

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

## Inode प्रबंधन

प्रत्येक फ़ाइल या निर्देशिका में 12 प्रत्यक्ष ब्लॉक और बड़ी फ़ाइलों के लिए 1 अप्रत्यक्ष ब्लॉक के साथ एक अद्वितीय Inode होता है।

## समवर्तीता

- फाइलसिस्टम-स्तर: `sync.RWMutex`
- Inode-स्तर: प्रति inode स्वतंत्र रीड-राइट लॉक
- डेडलॉक रोकथाम: लॉक पदानुक्रमित क्रम में प्राप्त किए जाते हैं (निर्देशिका → चाइल्ड फ़ाइल)
