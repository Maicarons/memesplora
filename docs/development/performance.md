# 性能优化

## 内存分配优化

### 使用对象池

```go
// 使用 sync.Pool 复用临时缓冲区
var bufferPool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 4096)
    },
}

func readData() {
    buf := bufferPool.Get().([]byte)
    defer bufferPool.Put(buf)
    // 使用 buf
}
```

### 减少内存拷贝

- 使用 `io.Copy` 代替手动拷贝
- 使用 `io.ReaderFrom` 和 `io.WriterTo` 接口
- 使用 `unsafe` 包进行零拷贝转换（谨慎使用）

## 并发优化

### 读写锁

```go
// 读多写少场景使用 RWMutex
type FileSystem struct {
    mu    sync.RWMutex
    inodes map[uint32]*Inode
}

func (fs *FileSystem) ReadFile(id uint32) (*Inode, error) {
    fs.mu.RLock()
    defer fs.mu.RUnlock()
    // 读取操作
}

func (fs *FileSystem) WriteFile(id uint32, data []byte) error {
    fs.mu.Lock()
    defer fs.mu.Unlock()
    // 写入操作
}
```

### 分片锁

```go
// 使用分片锁减少锁竞争
type ShardedLock struct {
    locks []sync.RWMutex
}

func (sl *ShardedLock) getShard(key uint32) *sync.RWMutex {
    return &sl.locks[key%uint32(len(sl.locks))]
}
```

## 文件系统优化

### 块缓存

```go
// LRU 缓存最近访问的数据块
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

### 预分配

- 创建文件时预分配足够的 Inode 和数据块
- 目录预先分配空间以减少扩容次数

## 网络优化

### HTTP Keep-Alive

```go
server := &http.Server{
    Addr:         ":5212",
    ReadTimeout:  30 * time.Second,
    WriteTimeout: 30 * time.Second,
    IdleTimeout:  120 * time.Second,
}
```

### 大文件传输

- 使用 `io.CopyN` 分块传输
- 支持断点续传（Range 请求头）
- 支持分块传输编码

## 基准测试结果

```bash
# 内存文件系统基准测试
BenchmarkMemFS_Write_4K-8       1000000    1200 ns/op
BenchmarkMemFS_Write_1M-8          1000   1200000 ns/op
BenchmarkMemFS_Read_4K-8        2000000     800 ns/op
BenchmarkMemFS_Read_1M-8           2000    800000 ns/op

# RAM 设备基准测试
BenchmarkRAMDevice_Alloc_4K-8    500000    2400 ns/op
BenchmarkRAMDevice_Alloc_1M-8     10000   120000 ns/op
```