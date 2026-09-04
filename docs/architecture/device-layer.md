# Device Layer

## Overview

The Device Layer is the lowest layer of Memesplora, responsible for direct interaction with the operating system and hardware, providing a unified memory/VRAM management interface.

## Device Interface

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // System memory
    DeviceVRAM                   // GPU memory
    DeviceSwap                   // Swap space/persistent
)

type DeviceInfo struct {
    ID        string     `json:"id"`
    Name      string     `json:"name"`
    Type      DeviceType `json:"type"`
    TotalSize uint64     `json:"total_size"`
    FreeSize  uint64     `json:"free_size"`
    UsedSize  uint64     `json:"used_size"`
    Healthy   bool       `json:"healthy"`
    Model     string     `json:"model,omitempty"`
}
```

## RAM Device Implementation

### Linux

Uses `mmap` syscall for anonymous memory mapping:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

Memory info from `/proc/meminfo`.

### Windows

Uses `VirtualAlloc`:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### Buddy System Allocator

Uses Buddy System to manage memory and reduce fragmentation.

## VRAM Device

### CUDA GPU Memory

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### NVML GPU Info

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## Platform Support

| Platform | RAM Allocation | Memory Info | GPU Support |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | Limited |