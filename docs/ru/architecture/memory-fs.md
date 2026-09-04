# Файловая система в памяти

## Обзор

Файловая система в памяти — это ядро Memesplora, организующее блоки памяти, выделенные слоем устройств, в полноценную структуру файловой системы, поддерживающую дерево каталогов, чтение/запись файлов, управление правами доступа и другие стандартные операции файловой системы.

## Структура Суперблока

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 байта)                             │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (по умолчанию 4K)             │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Таблица Inode (по 128 байт)                      │
│  - Inode ID (4 байта)                            │
│  - Type (1 байт)                                 │
│  - Permissions (2 байта)                         │
│  - Owner ID (4 байта)                            │
│  - Size (8 байт)                                 │
│  - Created At (8 байт)                           │
│  - Modified At (8 байт)                          │
│  - Block Count (4 байта)                         │
│  - Direct Blocks [12] (48 байт)                  │
│  - Indirect Block (4 байта)                      │
│  - Name (переменной длины)                       │
├──────────────────────────────────────────────────┤
│ Блоки Данных                                      │
│  - Блоки каталогов: записи каталогов              │
│  - Блоки файлов: содержимое файлов                 │
│  - Косвенные блоки: указатели на другие блоки      │
└──────────────────────────────────────────────────┘
```

## Основной Интерфейс

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

## Управление Inode

Каждый файл или каталог имеет уникальный Inode с 12 прямыми блоками и 1 косвенным блоком для больших файлов.

## Параллелизм

- На уровне файловой системы: `sync.RWMutex`
- На уровне Inode: независимые блокировки чтения-записи на каждый inode
- Предотвращение взаимоблокировок: блокировки захватываются в иерархическом порядке (каталог → дочерний файл)
