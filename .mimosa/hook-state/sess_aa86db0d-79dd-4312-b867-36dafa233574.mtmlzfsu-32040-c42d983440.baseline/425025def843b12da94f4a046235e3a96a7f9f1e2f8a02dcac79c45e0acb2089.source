package device

import (
	"context"
	"testing"
)

func TestRAMDevice_AllocateAndFree(t *testing.T) {
	dev, err := NewRAMDevice("test_ram", 1024*1024) // 1MB
	if err != nil {
		t.Fatalf("Failed to create RAM device: %v", err)
	}
	defer dev.Close()

	// Allocate a block
	block, err := dev.Allocate(context.Background(), 4096)
	if err != nil {
		t.Fatalf("Failed to allocate: %v", err)
	}
	if block.Size != 4096 {
		t.Errorf("Expected size 4096, got %d", block.Size)
	}

	// Write data
	data := []byte("Hello, Memesplora!")
	n, err := dev.Write(context.Background(), block, 0, data)
	if err != nil {
		t.Fatalf("Failed to write: %v", err)
	}
	if n != len(data) {
		t.Errorf("Expected %d bytes written, got %d", len(data), n)
	}

	// Read data back
	buf := make([]byte, len(data))
	n, err = dev.Read(context.Background(), block, 0, buf)
	if err != nil {
		t.Fatalf("Failed to read: %v", err)
	}
	if string(buf) != string(data) {
		t.Errorf("Data mismatch: got %q, want %q", string(buf), string(data))
	}

	// Free the block
	if err := dev.Free(context.Background(), block); err != nil {
		t.Fatalf("Failed to free: %v", err)
	}
}

func TestRAMDevice_Info(t *testing.T) {
	dev, err := NewRAMDevice("test_ram", 1024*1024)
	if err != nil {
		t.Fatalf("Failed to create RAM device: %v", err)
	}
	defer dev.Close()

	info := dev.Info()
	if info.TotalSize != 1024*1024 {
		t.Errorf("Expected total size %d, got %d", 1024*1024, info.TotalSize)
	}
	if !info.Healthy {
		t.Error("Device should be healthy")
	}
}

func TestRAMDevice_DeviceFull(t *testing.T) {
	dev, err := NewRAMDevice("test_ram", 8192) // 8KB
	if err != nil {
		t.Fatalf("Failed to create RAM device: %v", err)
	}
	defer dev.Close()

	// Allocate all memory
	_, err = dev.Allocate(context.Background(), 8192)
	if err != nil {
		t.Fatalf("Failed to allocate: %v", err)
	}

	// This should fail
	_, err = dev.Allocate(context.Background(), 4096)
	if err != ErrDeviceFull {
		t.Errorf("Expected ErrDeviceFull, got %v", err)
	}
}