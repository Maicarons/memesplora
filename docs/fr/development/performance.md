# Optimisation des Performances

## Allocation Mémoire

### Pool d'Objets

```go
var bufferPool = sync.Pool{
    New: func() interface{} { return make([]byte, 4096) },
}
buf := bufferPool.Get().([]byte)
defer bufferPool.Put(buf)
```

### Réduire les Copies

- Utiliser `io.Copy` au lieu de copies manuelles
- Utiliser les interfaces `io.ReaderFrom` et `io.WriterTo`

## Concurrence

### Verrous Lecture-Écriture

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

### Verrous Fragmentés (Sharded Locks)

```go
type ShardedLock struct {
    locks []sync.RWMutex
}
func (sl *ShardedLock) getShard(key uint32) *sync.RWMutex {
    return &sl.locks[key%uint32(len(sl.locks))]
}
```

## Cache de Blocs

```go
type BlockCache struct {
    mu      sync.RWMutex
    maxSize int
    items   *lru.Cache
}
```

## Benchmarks

```bash
BenchmarkMemFS_Write_4K-8    1000000   1200 ns/op
BenchmarkMemFS_Read_4K-8    2000000    800 ns/op
BenchmarkRAMDevice_Alloc_4K-8 500000  2400 ns/op
```