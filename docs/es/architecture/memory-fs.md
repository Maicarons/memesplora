# Sistema de Archivos en Memoria

## Visión General

El Sistema de Archivos en Memoria es el núcleo de Memesplora, que organiza los bloques de memoria asignados por la capa de dispositivo en una estructura completa de sistema de archivos que admite árboles de directorios, lectura/escritura de archivos, gestión de permisos y otras operaciones estándar del sistema de archivos.

## Diseño del Superbloque

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 bytes)                             │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (default 4K)                  │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Tabla de Inodos (128 bytes cada uno)             │
│  - Inode ID (4 bytes)                            │
│  - Type (1 byte)                                 │
│  - Permissions (2 bytes)                         │
│  - Owner ID (4 bytes)                            │
│  - Size (8 bytes)                                │
│  - Created At (8 bytes)                          │
│  - Modified At (8 bytes)                         │
│  - Block Count (4 bytes)                         │
│  - Direct Blocks [12] (48 bytes)                 │
│  - Indirect Block (4 bytes)                      │
│  - Name (longitud variable)                      │
├──────────────────────────────────────────────────┤
│ Bloques de Datos                                  │
│  - Bloques de directorio: entradas de directorio  │
│  - Bloques de archivo: contenido de archivo       │
│  - Bloques indirectos: punteros a más bloques     │
└──────────────────────────────────────────────────┘
```

## Interfaz Principal

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

## Gestión de Inodos

Cada archivo o directorio tiene un Inodo único con 12 bloques directos y 1 bloque indirecto para archivos más grandes.

## Concurrencia

- A nivel de sistema de archivos: `sync.RWMutex`
- A nivel de Inodo: bloqueos de lectura-escritura independientes por inodo
- Prevención de interbloqueos: los bloqueos se adquieren en orden jerárquico (directorio → archivo hijo)
