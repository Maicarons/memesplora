# Camada de Dispositivo

## Visão Geral

A Camada de Dispositivo é a camada mais baixa do Memesplora, responsável pela interação direta com o sistema operacional e hardware, fornecendo uma interface unificada de gerenciamento de memória/VRAM.

## Interface de Dispositivo

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // Memória do sistema
    DeviceVRAM                   // Memória GPU
    DeviceSwap                   // Espaço de troca/persistente
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

## Implementação do Dispositivo RAM

### Linux

Usa a chamada de sistema `mmap` para mapeamento de memória anônimo:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

Informações de memória de `/proc/meminfo`.

### Windows

Usa `VirtualAlloc`:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### Alocador Buddy System

Usa o Buddy System para gerenciar memória e reduzir fragmentação.

## Dispositivo VRAM

### Memória GPU CUDA

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### Informações GPU NVML

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## Suporte a Plataformas

| Plataforma | Alocação de RAM | Informações de Memória | Suporte GPU |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | Limitado |
