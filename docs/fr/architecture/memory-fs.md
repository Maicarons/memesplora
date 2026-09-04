# Système de Fichiers en Mémoire

## Aperçu

Le Système de Fichiers en Mémoire est le coeur de Memesplora, organisant les blocs mémoire alloués par la couche périphérique en une structure complète de système de fichiers prenant en charge les arborescences de répertoires, la lecture/écriture de fichiers, la gestion des permissions et autres opérations standard de système de fichiers.

## Disposition du Superbloc

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 octets)                            │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (défaut 4K)                   │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Table des Inodes (128 octets chacun)              │
│  - Inode ID (4 octets)                           │
│  - Type (1 octet)                                │
│  - Permissions (2 octets)                        │
│  - Owner ID (4 octets)                           │
│  - Size (8 octets)                               │
│  - Created At (8 octets)                         │
│  - Modified At (8 octets)                        │
│  - Block Count (4 octets)                        │
│  - Direct Blocks [12] (48 octets)                │
│  - Indirect Block (4 octets)                     │
│  - Name (longueur variable)                      │
├──────────────────────────────────────────────────┤
│ Blocs de Données                                  │
│  - Blocs de répertoire : entrées de répertoire    │
│  - Blocs de fichier : contenu du fichier          │
│  - Blocs indirects : pointeurs vers plus de blocs │
└──────────────────────────────────────────────────┘
```

## Interface Principale

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

## Gestion des Inodes

Chaque fichier ou répertoire possède un Inode unique avec 12 blocs directs et 1 bloc indirect pour les fichiers plus volumineux.

## Concurrence

- Au niveau du système de fichiers : `sync.RWMutex`
- Au niveau de l'Inode : verrous lecture-écriture indépendants par inode
- Prévention des interblocages : les verrous sont acquis dans un ordre hiérarchique (répertoire → fichier enfant)
