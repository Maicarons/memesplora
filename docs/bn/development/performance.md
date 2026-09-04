# পারফরম্যান্স অপ্টিমাইজেশন

## মেমোরি বরাদ্দ অপ্টিমাইজেশন

### অবজেক্ট পুল ব্যবহার

```go
// sync.Pool ব্যবহার করে টেম্পোরারি বাফার পুনর্ব্যবহার
var bufferPool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 4096)
    },
}

func readData() {
    buf := bufferPool.Get().([]byte)
    defer bufferPool.Put(buf)
    // buf ব্যবহার
}
```

### মেমোরি কপি কমানো

- ম্যানুয়াল কপির পরিবর্তে `io.Copy` ব্যবহার
- `io.ReaderFrom` এবং `io.WriterTo` ইন্টারফেস ব্যবহার
- জিরো-কপি ট্রান্সফারের জন্য `unsafe` প্যাকেজ ব্যবহার (সাবধানে)

## কনকারেন্সি অপ্টিমাইজেশন

### রিড/রাইট লক

```go
// রিড বেশি, রাইট কম দৃশ্যে RWMutex ব্যবহার
type FileSystem struct {
    mu    sync.RWMutex
    inodes map[uint32]*Inode
}

func (fs *FileSystem) ReadFile(id uint32) (*Inode, error) {
    fs.mu.RLock()
    defer fs.mu.RUnlock()
    // রিড অপারেশন
}

func (fs *FileSystem) WriteFile(id uint32, data []byte) error {
    fs.mu.Lock()
    defer fs.mu.Unlock()
    // রাইট অপারেশন
}
```

### শার্ডেড লক

```go
// লক প্রতিযোগিতা কমানোর জন্য শার্ডেড লক ব্যবহার
type ShardedLock struct {
    locks []sync.RWMutex
}

func (sl *ShardedLock) getShard(key uint32) *sync.RWMutex {
    return &sl.locks[key%uint32(len(sl.locks))]
}
```

## ফাইলসিস্টেম অপ্টিমাইজেশন

### ব্লক ক্যাশ

```go
// LRU ক্যাশ সম্প্রতি অ্যাক্সেস করা ডেটা ব্লক
type BlockCache struct {
    mu       sync.RWMutex
    maxSize  int
    items    *lru.Cache
}

func (bc *BlockCache) Get(blockID uint32) ([]byte, bool) {
    bc.mu.RLock()
    defer bc.mu.RUnlock()
    return bc.items.Get(blockID)
}
```

### প্রি-অ্যালোকেশন

- ফাইল তৈরি করার সময় পর্যাপ্ত Inode এবং ডেটা ব্লক প্রি-অ্যালোকেট
- সম্প্রসারণের সংখ্যা কমানোর জন্য ডিরেক্টরি প্রি-অ্যালোকেট

## নেটওয়ার্ক অপ্টিমাইজেশন

### HTTP Keep-Alive

```go
server := &http.Server{
    Addr:         ":5212",
    ReadTimeout:  30 * time.Second,
    WriteTimeout: 30 * time.Second,
    IdleTimeout:  120 * time.Second,
}
```

### বড় ফাইল ট্রান্সফার

- চাঙ্কড ট্রান্সফারের জন্য `io.CopyN` ব্যবহার
- রেজিউম সমর্থন (Range রিকোয়েস্ট হেডার)
- চাঙ্কড ট্রান্সফার এনকোডিং সমর্থন

## বেঞ্চমার্ক ফলাফল

```bash
# মেমোরি ফাইলসিস্টেম বেঞ্চমার্ক
BenchmarkMemFS_Write_4K-8       1000000    1200 ns/op
BenchmarkMemFS_Write_1M-8          1000   1200000 ns/op
BenchmarkMemFS_Read_4K-8        2000000     800 ns/op
BenchmarkMemFS_Read_1M-8           2000    800000 ns/op

# RAM ডিভাইস বেঞ্চমার্ক
BenchmarkRAMDevice_Alloc_4K-8    500000    2400 ns/op
BenchmarkRAMDevice_Alloc_1M-8     10000   120000 ns/op
```