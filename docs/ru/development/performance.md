# Оптимизация производительности

## Оптимизация выделения памяти

### Использование пула объектов

```go
// Использование sync.Pool для повторного использования временных буферов
var bufferPool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 4096)
    },
}

func readData() {
    buf := bufferPool.Get().([]byte)
    defer bufferPool.Put(buf)
    // Использование buf
}
```

### Уменьшение копирования памяти

- Используйте `io.Copy` вместо ручного копирования
- Используйте интерфейсы `io.ReaderFrom` и `io.WriterTo`
- Используйте пакет `unsafe` для копирования с нулевым копированием (с осторожностью)

## Оптимизация конкурентности

### Блокировки чтения/записи

```go
// Сценарий с преобладанием чтения использует RWMutex
type FileSystem struct {
    mu    sync.RWMutex
    inodes map[uint32]*Inode
}

func (fs *FileSystem) ReadFile(id uint32) (*Inode, error) {
    fs.mu.RLock()
    defer fs.mu.RUnlock()
    // Операция чтения
}

func (fs *FileSystem) WriteFile(id uint32, data []byte) error {
    fs.mu.Lock()
    defer fs.mu.Unlock()
    // Операция записи
}
```

### Сегментированные блокировки

```go
// Использование сегментированных блокировок для уменьшения конкуренции
type ShardedLock struct {
    locks []sync.RWMutex
}

func (sl *ShardedLock) getShard(key uint32) *sync.RWMutex {
    return &sl.locks[key%uint32(len(sl.locks))]
}
```

## Оптимизация файловой системы

### Кэш блоков

```go
// LRU-кэш для недавно использованных блоков данных
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

### Предварительное выделение

- При создании файла предварительно выделяйте достаточное количество Inode и блоков данных
- Предварительно выделяйте пространство для каталогов, чтобы уменьшить количество расширений

## Сетевая оптимизация

### HTTP Keep-Alive

```go
server := &http.Server{
    Addr:         ":5212",
    ReadTimeout:  30 * time.Second,
    WriteTimeout: 30 * time.Second,
    IdleTimeout:  120 * time.Second,
}
```

### Передача больших файлов

- Используйте `io.CopyN` для передачи частями
- Поддержка докачки (заголовок Range)
- Поддержка кодирования с передачей частями (chunked transfer encoding)

## Результаты бенчмарков

```bash
# Бенчмарки файловой системы в памяти
BenchmarkMemFS_Write_4K-8       1000000    1200 ns/op
BenchmarkMemFS_Write_1M-8          1000   1200000 ns/op
BenchmarkMemFS_Read_4K-8        2000000     800 ns/op
BenchmarkMemFS_Read_1M-8           2000    800000 ns/op

# Бенчмарки RAM-устройства
BenchmarkRAMDevice_Alloc_4K-8    500000    2400 ns/op
BenchmarkRAMDevice_Alloc_1M-8     10000   120000 ns/op
```