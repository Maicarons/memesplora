# 성능 최적화

## 메모리 할당

### 객체 풀

```go
var bufferPool = sync.Pool{
    New: func() interface{} { return make([]byte, 4096) },
}
buf := bufferPool.Get().([]byte)
defer bufferPool.Put(buf)
```

### 복사 최소화

- 수동 복사 대신 `io.Copy` 사용
- `io.ReaderFrom` 및 `io.WriterTo` 인터페이스 사용

## 동시성

### 읽기-쓰기 잠금

```go
type FileSystem struct {
    mu    sync.RWMutex
    inodes map[uint32]*Inode
}
func (fs *FileSystem) ReadFile(id uint32) {
    fs.mu.RLock()
    defer fs.mu.RUnlock()
}
```

### 샤드 잠금

```go
type ShardedLock struct {
    locks []sync.RWMutex
}
func (sl *ShardedLock) getShard(key uint32) *sync.RWMutex {
    return &sl.locks[key%uint32(len(sl.locks))]
}
```

## 블록 캐시

```go
type BlockCache struct {
    mu      sync.RWMutex
    maxSize int
    items   *lru.Cache
}
```

## 벤치마크

```bash
BenchmarkMemFS_Write_4K-8    1000000   1200 ns/op
BenchmarkMemFS_Read_4K-8    2000000    800 ns/op
BenchmarkRAMDevice_Alloc_4K-8 500000  2400 ns/op
```