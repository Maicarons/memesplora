# 디바이스 레이어

## 개요

디바이스 레이어는 Memesplora의 최하위 계층으로, 운영 체제 및 하드웨어와 직접 상호작용하며 통합된 메모리/VRAM 관리 인터페이스를 제공합니다.

## 디바이스 인터페이스

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // 시스템 메모리
    DeviceVRAM                   // GPU 메모리
    DeviceSwap                   // 스왑 공간/영구 저장
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

## RAM 디바이스 구현

### Linux

익명 메모리 매핑을 위해 `mmap` 시스템 콜 사용:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

`/proc/meminfo`에서 메모리 정보 확인.

### Windows

`VirtualAlloc` 사용:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### 버디 시스템 할당기

메모리 관리 및 단편화 감소를 위해 버디 시스템 사용.

## VRAM 디바이스

### CUDA GPU 메모리

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### NVML GPU 정보

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## 플랫폼 지원

| 플랫폼 | RAM 할당 | 메모리 정보 | GPU 지원 |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | 제한적 |