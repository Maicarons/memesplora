# 메모리 파일시스템

## 개요

메모리 파일시스템은 Memesplora의 핵심으로, 디바이스 레이어에서 할당한 메모리 블록을 디렉토리 트리, 파일 읽기/쓰기, 권한 관리 및 기타 표준 파일시스템 작업을 지원하는 완전한 파일시스템 구조로 구성합니다.

## 슈퍼블록 레이아웃

```
┌──────────────────────────────────────────────────┐
│ SuperBlock (64바이트)                             │
│  - Magic:   0x4D454D4653 ("MEMFS")              │
│  - Version: 1                                    │
│  - BlockSize: 4096 (기본 4K)                     │
│  - TotalBlocks                                   │
│  - FreeBlocks                                    │
│  - InodeCount                                    │
│  - FreeInodes                                    │
│  - RootInode                                     │
│  - Checksum                                      │
├──────────────────────────────────────────────────┤
│ Inode 테이블 (각 128바이트)                       │
│  - Inode ID (4바이트)                            │
│  - Type (1바이트)                                │
│  - Permissions (2바이트)                         │
│  - Owner ID (4바이트)                            │
│  - Size (8바이트)                                │
│  - Created At (8바이트)                          │
│  - Modified At (8바이트)                         │
│  - Block Count (4바이트)                         │
│  - Direct Blocks [12] (48바이트)                 │
│  - Indirect Block (4바이트)                      │
│  - Name (가변 길이)                              │
├──────────────────────────────────────────────────┤
│ 데이터 블록                                       │
│  - 디렉토리 블록: 디렉토리 항목                    │
│  - 파일 블록: 파일 내용                           │
│  - 간접 블록: 추가 데이터 블록에 대한 포인터       │
└──────────────────────────────────────────────────┘
```

## 코어 인터페이스

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

## Inode 관리

각 파일 또는 디렉토리에는 12개의 직접 블록과 큰 파일을 위한 1개의 간접 블록이 있는 고유한 Inode가 있습니다.

## 동시성

- 파일시스템 수준: `sync.RWMutex`
- Inode 수준: inode별 독립적인 읽기-쓰기 잠금
- 데드락 방지: 계층적 순서로 잠금 획득 (디렉토리 → 하위 파일)
