# Lapisan Perangkat

## Ikhtisar

Lapisan Perangkat adalah lapisan terendah dari Memesplora, bertanggung jawab atas interaksi langsung dengan sistem operasi dan perangkat keras, menyediakan antarmuka manajemen memori/VRAM yang terpadu.

## Antarmuka Perangkat

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // Memori sistem
    DeviceVRAM                   // Memori GPU
    DeviceSwap                   // Ruang swap/persisten
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

## Implementasi Perangkat RAM

### Linux

Menggunakan panggilan sistem `mmap` untuk pemetaan memori anonim:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

Informasi memori dari `/proc/meminfo`.

### Windows

Menggunakan `VirtualAlloc`:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### Alokator Buddy System

Menggunakan Buddy System untuk mengelola memori dan mengurangi fragmentasi.

## Perangkat VRAM

### Memori GPU CUDA

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### Informasi GPU NVML

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## Dukungan Platform

| Platform | Alokasi RAM | Informasi Memori | Dukungan GPU |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | Terbatas |
