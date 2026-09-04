# Optimasi Kinerja

## Optimasi Alokasi Memori

### Menggunakan Object Pool

```go
// Menggunakan sync.Pool untuk menggunakan kembali buffer sementara
var bufferPool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 4096)
    },
}

func readData() {
    buf := bufferPool.Get().([]byte)
    defer bufferPool.Put(buf)
    // Menggunakan buf
}
```

### Mengurangi Salinan Memori

- Gunakan `io.Copy` sebagai pengganti salinan manual
- Gunakan antarmuka `io.ReaderFrom` dan `io.WriterTo`
- Gunakan paket `unsafe` untuk konversi tanpa salinan (gunakan dengan hati-hati)

## Optimasi Konkurensi

### Kunci Baca/Tulis

```go
// Skenario baca banyak, tulis sedikit menggunakan RWMutex
type FileSystem struct {
    mu    sync.RWMutex
    inodes map[uint32]*Inode
}

func (fs *FileSystem) ReadFile(id uint32) (*Inode, error) {
    fs.mu.RLock()
    defer fs.mu.RUnlock()
    // Operasi baca
}

func (fs *FileSystem) WriteFile(id uint32, data []byte) error {
    fs.mu.Lock()
    defer fs.mu.Unlock()
    // Operasi tulis
}
```

### Kunci Terpartisi

```go
// Menggunakan kunci terpartisi untuk mengurangi persaingan kunci
type ShardedLock struct {
    locks []sync.RWMutex
}

func (sl *ShardedLock) getShard(key uint32) *sync.RWMutex {
    return &sl.locks[key%uint32(len(sl.locks))]
}
```

## Optimasi Sistem File

### Cache Blok

```go
// Cache LRU untuk blok data yang baru diakses
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

### Pra-alokasi

- Alokasikan cukup Inode dan blok data saat membuat file
- Direktori dialokasikan ruang terlebih dahulu untuk mengurangi frekuensi ekspansi

## Optimasi Jaringan

### HTTP Keep-Alive

```go
server := &http.Server{
    Addr:         ":5212",
    ReadTimeout:  30 * time.Second,
    WriteTimeout: 30 * time.Second,
    IdleTimeout:  120 * time.Second,
}
```

### Transfer File Besar

- Gunakan `io.CopyN` untuk transfer terbagi
- Dukung kelanjutan putus (header Range)
- Dukung pengkodean transfer terbagi

## Hasil Benchmark

```bash
# Benchmark sistem file memori
BenchmarkMemFS_Write_4K-8       1000000    1200 ns/op
BenchmarkMemFS_Write_1M-8          1000   1200000 ns/op
BenchmarkMemFS_Read_4K-8        2000000     800 ns/op
BenchmarkMemFS_Read_1M-8           2000    800000 ns/op

# Benchmark perangkat RAM
BenchmarkRAMDevice_Alloc_4K-8    500000    2400 ns/op
BenchmarkRAMDevice_Alloc_1M-8     10000   120000 ns/op
```