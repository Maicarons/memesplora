# Sistema de Arquivos em Memória

## Visão Geral

O Sistema de Arquivos em Memória é o núcleo do Memesplora, organizando blocos de memória alocados pela camada de dispositivo em uma estrutura completa de sistema de arquivos que suporta árvores de diretórios, leitura/gravação de arquivos, gerenciamento de permissões e outras operações padrão de sistema de arquivos.

## Layout do Superbloco

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64 bytes)                             │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (padrão 4K)                   │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Tabela de Inodes (128 bytes cada)                │
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
│  - Name (comprimento variável)                   │
├──────────────────────────────────────────────────┤
│ Blocos de Dados                                   │
│  - Blocos de diretório: entradas de diretório     │
│  - Blocos de arquivo: conteúdo do arquivo         │
│  - Blocos indiretos: ponteiros para mais blocos   │
└──────────────────────────────────────────────────┘
```

## Interface Principal

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

## Gerenciamento de Inodes

Cada arquivo ou diretório possui um Inode único com 12 blocos diretos e 1 bloco indireto para arquivos maiores.

## Concorrência

- Nível de sistema de arquivos: `sync.RWMutex`
- Nível de Inode: bloqueios de leitura-gravação independentes por inode
- Prevenção de deadlock: bloqueios adquiridos em ordem hierárquica (diretório → arquivo filho)
