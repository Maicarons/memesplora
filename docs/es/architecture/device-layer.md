# Capa de Dispositivo

## Visión General

La Capa de Dispositivo es la capa más baja de Memesplora, responsable de la interacción directa con el sistema operativo y el hardware, proporcionando una interfaz unificada de gestión de memoria/VRAM.

## Interfaz de Dispositivo

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // Memoria del sistema
    DeviceVRAM                   // Memoria de GPU
    DeviceSwap                   // Espacio de intercambio/persistente
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

## Implementación del Dispositivo RAM

### Linux

Utiliza la llamada al sistema `mmap` para mapeo de memoria anónima:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

Información de memoria desde `/proc/meminfo`.

### Windows

Utiliza `VirtualAlloc`:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### Asignador de Sistema Buddy

Utiliza el Sistema Buddy para gestionar la memoria y reducir la fragmentación.

## Dispositivo VRAM

### Memoria de GPU CUDA

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### Información de GPU NVML

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## Soporte de Plataformas

| Plataforma | Asignación de RAM | Información de Memoria | Soporte GPU |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | Limitado |