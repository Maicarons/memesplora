package fs

import (
	"context"
	"errors"
	"io"
	"os"
	"time"
)

var (
	ErrNotExist      = errors.New("file or directory does not exist")
	ErrExist         = errors.New("file or directory already exists")
	ErrNotDir        = errors.New("not a directory")
	ErrIsDir         = errors.New("is a directory")
	ErrNotEmpty      = errors.New("directory not empty")
	ErrNameTooLong   = errors.New("name too long")
	ErrNoSpace       = errors.New("no space left")
	ErrReadOnly      = errors.New("read-only filesystem")
	ErrInvalidPath   = errors.New("invalid path")
)

type FileType int

const (
	FileTypeRegular FileType = iota + 1
	FileTypeDirectory
)

func (ft FileType) String() string {
	switch ft {
	case FileTypeRegular:
		return "file"
	case FileTypeDirectory:
		return "directory"
	default:
		return "unknown"
	}
}

type FileInfo struct {
	ID         uint64     `json:"id"`
	Name       string     `json:"name"`
	Type       FileType   `json:"type"`
	Size       int64      `json:"size"`
	Perm       os.FileMode `json:"perm"`
	CreatedAt  time.Time  `json:"created_at"`
	ModifiedAt time.Time  `json:"modified_at"`
	OwnerID    uint32     `json:"owner_id"`
}

type FsStats struct {
	TotalSize uint64 `json:"total_size"`
	UsedSize  uint64 `json:"used_size"`
	FreeSize  uint64 `json:"free_size"`
	FileCount uint64 `json:"file_count"`
	DirCount  uint64 `json:"dir_count"`
	BlockSize uint32 `json:"block_size"`
}

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

type File interface {
	io.Reader
	io.Writer
	io.Seeker
	Close() error
	Stat() (FileInfo, error)
	Sync() error
	Truncate(size int64) error
}