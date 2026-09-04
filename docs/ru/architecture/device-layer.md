# Слой Устройств

## Обзор

Слой Устройств — это самый нижний уровень Memesplora, отвечающий за прямое взаимодействие с операционной системой и оборудованием, предоставляющий унифицированный интерфейс управления памятью/VRAM.

## Интерфейс Устройства

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // Системная память
    DeviceVRAM                   // Память GPU
    DeviceSwap                   // Пространство подкачки/постоянное
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

## Реализация Устройства RAM

### Linux

Использует системный вызов `mmap` для анонимного отображения памяти:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

Информация о памяти из `/proc/meminfo`.

### Windows

Использует `VirtualAlloc`:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### Аллокатор Buddy System

Использует Buddy System для управления памятью и уменьшения фрагментации.

## Устройство VRAM

### Память GPU CUDA

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### Информация о GPU NVML

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## Поддержка Платформ

| Платформа | Выделение RAM | Информация о памяти | Поддержка GPU |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | Ограниченная |
