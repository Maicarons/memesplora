//go:build windows

package device

import (
	"os"
	"strconv"
	"syscall"
	"unsafe"
)

var (
	kernel32           = syscall.NewLazyDLL("kernel32.dll")
	globalMemoryStatus = kernel32.NewProc("GlobalMemoryStatusEx")
)

type memoryStatusEx struct {
	Length               uint32
	MemoryLoad           uint32
	TotalPhys            uint64
	AvailPhys            uint64
	TotalPageFile        uint64
	AvailPageFile        uint64
	TotalVirtual         uint64
	AvailVirtual         uint64
	AvailExtendedVirtual uint64
}

// RAMDetector detects RAM on Windows
type RAMDetector struct{}

func NewRAMDetector() *RAMDetector {
	return &RAMDetector{}
}

func (d *RAMDetector) Detect() ([]Device, error) {
	var mem memoryStatusEx
	mem.Length = uint32(unsafe.Sizeof(mem))

	ret, _, err := globalMemoryStatus.Call(uintptr(unsafe.Pointer(&mem)))
	if ret == 0 {
		usableSize := uint64(1 * 1024 * 1024 * 1024)
		if val := os.Getenv("MEMESPLORA_MEMORY_SIZE"); val != "" {
			if s, err := strconv.ParseUint(val, 10, 64); err == nil {
				usableSize = s
			}
		}
		dev, err := NewRAMDevice("ram_0", usableSize)
		return []Device{dev}, err
	}
	_ = err

	usableSize := mem.AvailPhys / 2
	dev, err := NewRAMDevice("ram_0", usableSize)
	if err != nil {
		return nil, err
	}
	return []Device{dev}, nil
}

// GPUDetector detects GPU on Windows
type GPUDetector struct{}

func NewGPUDetector() *GPUDetector {
	return &GPUDetector{}
}

func (d *GPUDetector) Detect() ([]Device, error) {
	if os.Getenv("MEMESPLORA_ENABLE_GPU") == "" {
		return nil, nil
	}
	return []Device{
		NewVRAMDevice("gpu_0", 0, 24*1024*1024*1024, "NVIDIA GPU (simulated)"),
	}, nil
}