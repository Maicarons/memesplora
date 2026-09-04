package fs

import (
	"context"
	"testing"
)

func setupTestFS(t *testing.T) *MemFileSystem {
	t.Helper()
	mfs := NewMemFileSystem()
	if err := mfs.Init(context.Background(), 10*1024*1024, 4096); err != nil {
		t.Fatalf("Failed to init FS: %v", err)
	}
	return mfs
}

func TestMemFS_CreateAndReadFile(t *testing.T) {
	mfs := setupTestFS(t)

	// Create file
	file, err := mfs.Create(context.Background(), "/test.txt", 1)
	if err != nil {
		t.Fatalf("Failed to create file: %v", err)
	}

	// Write data
	data := []byte("Hello, Memesplora Filesystem!")
	n, err := file.Write(data)
	if err != nil {
		t.Fatalf("Failed to write: %v", err)
	}
	if n != len(data) {
		t.Errorf("Expected %d bytes, got %d", len(data), n)
	}
	file.Close()

	// Open and read
	file, err = mfs.Open(context.Background(), "/test.txt")
	if err != nil {
		t.Fatalf("Failed to open file: %v", err)
	}
	defer file.Close()

	buf := make([]byte, len(data))
	n, err = file.Read(buf)
	if err != nil {
		t.Fatalf("Failed to read: %v", err)
	}
	if string(buf) != string(data) {
		t.Errorf("Data mismatch: got %q, want %q", string(buf), string(data))
	}
}

func TestMemFS_MkdirAndReadDir(t *testing.T) {
	mfs := setupTestFS(t)

	// Create directory
	err := mfs.Mkdir(context.Background(), "/mydir", 1)
	if err != nil {
		t.Fatalf("Failed to create dir: %v", err)
	}

	// Create file in directory
	_, err = mfs.Create(context.Background(), "/mydir/file.txt", 1)
	if err != nil {
		t.Fatalf("Failed to create file in dir: %v", err)
	}

	// Read directory
	entries, err := mfs.ReadDir(context.Background(), "/mydir")
	if err != nil {
		t.Fatalf("Failed to read dir: %v", err)
	}
	if len(entries) != 1 {
		t.Errorf("Expected 1 entry, got %d", len(entries))
	}
	if entries[0].Name != "file.txt" {
		t.Errorf("Expected file.txt, got %s", entries[0].Name)
	}
}

func TestMemFS_Delete(t *testing.T) {
	mfs := setupTestFS(t)

	_, err := mfs.Create(context.Background(), "/delete_me.txt", 1)
	if err != nil {
		t.Fatalf("Failed to create file: %v", err)
	}

	err = mfs.Delete(context.Background(), "/delete_me.txt")
	if err != nil {
		t.Fatalf("Failed to delete file: %v", err)
	}

	_, err = mfs.Open(context.Background(), "/delete_me.txt")
	if err != ErrNotExist {
		t.Errorf("Expected ErrNotExist, got %v", err)
	}
}

func TestMemFS_Stat(t *testing.T) {
	mfs := setupTestFS(t)

	info, err := mfs.Stat(context.Background(), "/")
	if err != nil {
		t.Fatalf("Failed to stat root: %v", err)
	}
	if info.Name != "/" {
		t.Errorf("Expected root name '/', got %s", info.Name)
	}
	if info.Type != FileTypeDirectory {
		t.Errorf("Expected directory type, got %v", info.Type)
	}
}

func TestMemFS_Rename(t *testing.T) {
	mfs := setupTestFS(t)

	_, err := mfs.Create(context.Background(), "/old.txt", 1)
	if err != nil {
		t.Fatalf("Failed to create file: %v", err)
	}

	err = mfs.Rename(context.Background(), "/old.txt", "/new.txt")
	if err != nil {
		t.Fatalf("Failed to rename: %v", err)
	}

	_, err = mfs.Open(context.Background(), "/old.txt")
	if err != ErrNotExist {
		t.Errorf("Old file should not exist")
	}

	_, err = mfs.Open(context.Background(), "/new.txt")
	if err != nil {
		t.Errorf("New file should exist: %v", err)
	}
}

func TestMemFS_Stats(t *testing.T) {
	mfs := setupTestFS(t)

	stats := mfs.Stats()
	if stats.TotalSize != 10*1024*1024 {
		t.Errorf("Expected total size %d, got %d", 10*1024*1024, stats.TotalSize)
	}
	if stats.DirCount != 1 {
		t.Errorf("Expected 1 dir (root), got %d", stats.DirCount)
	}

	// Create a file and check stats change
	_, err := mfs.Create(context.Background(), "/stats_test.txt", 1)
	if err != nil {
		t.Fatalf("Failed to create file: %v", err)
	}

	stats = mfs.Stats()
	if stats.FileCount != 1 {
		t.Errorf("Expected 1 file, got %d", stats.FileCount)
	}
}