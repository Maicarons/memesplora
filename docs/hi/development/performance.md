# प्रदर्शन अनुकूलन

## मेमोरी आवंटन अनुकूलन

### ऑब्जेक्ट पूल का उपयोग करें

```go
// अस्थायी बफर को पुनः उपयोग करने के लिए sync.Pool का उपयोग करें
var bufferPool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 4096)
    },
}

func readData() {
    buf := bufferPool.Get().([]byte)
    defer bufferPool.Put(buf)
    // buf का उपयोग करें
}
```

### मेमोरी कॉपी कम करें

- मैन्युअल कॉपी के बजाय `io.Copy` का उपयोग करें
- `io.ReaderFrom` और `io.WriterTo` इंटरफ़ेस का उपयोग करें
- जीरो-कॉपी रूपांतरण के लिए `unsafe` पैकेज का उपयोग करें (सावधानी से)

## समवर्ती अनुकूलन

### रीड-राइट लॉक

```go
// अधिक पढ़ने और कम लिखने वाले परिदृश्यों में RWMutex का उपयोग करें
type FileSystem struct {
    mu    sync.RWMutex
    inodes map[uint32]*Inode
}

func (fs *FileSystem) ReadFile(id uint32) (*Inode, error) {
    fs.mu.RLock()
    defer fs.mu.RUnlock()
    // पढ़ने का संचालन
}

func (fs *FileSystem) WriteFile(id uint32, data []byte) error {
    fs.mu.Lock()
    defer fs.mu.Unlock()
    // लिखने का संचालन
}
```

### शार्डेड लॉक

```go
// लॉक प्रतिस्पर्धा कम करने के लिए शार्डेड लॉक का उपयोग करें
type ShardedLock struct {
    locks []sync.RWMutex
}

func (sl *ShardedLock) getShard(key uint32) *sync.RWMutex {
    return &sl.locks[key%uint32(len(sl.locks))]
}
```

## फ़ाइल सिस्टम अनुकूलन

### ब्लॉक कैश

```go
// हाल ही में एक्सेस किए गए डेटा ब्लॉक का LRU कैश
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

### प्री-आवंटन

- फ़ाइल बनाते समय पर्याप्त Inode और डेटा ब्लॉक प्री-आवंटित करें
- विस्तार संचालन कम करने के लिए डायरेक्ट्री में पहले से स्थान आवंटित करें

## नेटवर्क अनुकूलन

### HTTP Keep-Alive

```go
server := &http.Server{
    Addr:         ":5212",
    ReadTimeout:  30 * time.Second,
    WriteTimeout: 30 * time.Second,
    IdleTimeout:  120 * time.Second,
}
```

### बड़ी फ़ाइल स्थानांतरण

- चंक्ड ट्रांसफर के लिए `io.CopyN` का उपयोग करें
- रिज्यूमे सपोर्ट (Range अनुरोध हेडर)
- चंक्ड ट्रांसफर एन्कोडिंग सपोर्ट

## बेंचमार्क परिणाम

```bash
# मेमोरी फ़ाइल सिस्टम बेंचमार्क
BenchmarkMemFS_Write_4K-8       1000000    1200 ns/op
BenchmarkMemFS_Write_1M-8          1000   1200000 ns/op
BenchmarkMemFS_Read_4K-8        2000000     800 ns/op
BenchmarkMemFS_Read_1M-8           2000    800000 ns/op

# RAM डिवाइस बेंचमार्क
BenchmarkRAMDevice_Alloc_4K-8    500000    2400 ns/op
BenchmarkRAMDevice_Alloc_1M-8     10000   120000 ns/op
```