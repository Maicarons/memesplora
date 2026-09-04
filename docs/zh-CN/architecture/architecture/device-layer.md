# 设备管理层

## 概述

设备管理层（Device Layer）是 Memesplora 的最底层，负责与操作系统和硬件直接交互，提供统一的内存/显存管理接口。

## 设备接口

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // 系统内存
    DeviceVRAM                   // GPU 显存
    DeviceSwap                   // 交换空间/持久化
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

type Block struct {
    ID        string     `json:"id"`
    DeviceID  string     `json:"device_id"`
    Offset    uint64     `json:"offset"`
    Size      uint64     `json:"size"`
    CreatedAt time.Time  `json:"created_at"`
}

type Device interface {
    Info() DeviceInfo
    Allocate(ctx context.Context, size uint64) (*Block, error)
    Free(ctx context.Context, block *Block) error
    Read(ctx context.Context, block *Block, offset uint64, buf []byte) (int, error)
    Write(ctx context.Context, block *Block, offset uint64, buf []byte) (int, error)
    Close() error
}
```

## RAM 设备实现

### Linux 实现

使用 `mmap` 系统调用分配匿名内存映射：

```go
// Linux: MAP_ANONYMOUS | MAP_PRIVATE
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

内存信息通过读取 `/proc/meminfo` 获取：
```
MemTotal:       16384000 kB
MemFree:         8192000 kB
MemAvailable:    9216000 kB
```

### Windows 实现

使用 `VirtualAlloc` 分配内存：

```go
// Windows: VirtualAlloc
import "golang.org/x/sys/windows"

addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

内存信息通过 `GlobalMemoryStatusEx` 获取。

### 内存分配策略：Buddy System

采用伙伴系统（Buddy System）管理内存，减少外部碎片：

```
Order 0: [  4K ][  4K ][  4K ][  4K ][  4K ][  4K ][  4K ][  4K ]
Order 1: [       8K      ][       8K      ][       8K      ][       8K      ]
Order 2: [              16K              ][              16K              ]
Order 3: [                          32K                                  ]
```

- 最小分配单位：4KB（Block Size）
- 分配时向上取整到 2 的幂次
- 释放时合并相邻空闲块
- 使用位图跟踪空闲块状态

## VRAM 设备实现

### 通过 CUDA 管理 GPU 显存

```go
// cgo 调用 CUDA Runtime API
/*
#include <cuda_runtime.h>
*/
import "C"

// 分配显存
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)

// 查询显存信息
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### 通过 NVML 获取 GPU 设备信息

```go
import "github.com/NVIDIA/go-nvml/pkg/nvml"

// 初始化 NVML
nvml.Init()
defer nvml.Shutdown()

// 获取设备信息
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
// memory.Total, memory.Free, memory.Used
```

## 设备检测

系统启动时自动检测可用设备：

```go
type Detector interface {
    Detect() ([]Device, error)
}

// RAM 检测
type RAMDetector struct{}
func (d *RAMDetector) Detect() ([]Device, error) {
    // 获取系统内存信息
    // 创建 RAMDevice 实例
}

// GPU 检测
type GPUDetector struct{}
func (d *GPUDetector) Detect() ([]Device, error) {
    // 初始化 NVML
    // 遍历所有 GPU 设备
    // 创建 VRAMDevice 实例
}
```

## 跨平台支持

| 平台 | RAM 分配 | 内存信息 | GPU 支持 |
|:----:|---------|---------|---------|
| Linux | `mmap` + `MAP_ANONYMOUS` | `/proc/meminfo` | CUDA |
| Windows | `VirtualAlloc` | `GlobalMemoryStatusEx` | CUDA |
| macOS | `mmap` + `MAP_ANONYMOUS` | `sysctl hw.memsize` | 有限 |

使用 Go 构建标签实现平台相关代码：
- `//go:build linux`
- `//go:build windows`
- `//go:build darwin`