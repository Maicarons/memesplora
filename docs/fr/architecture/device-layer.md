# Couche Périphérique

## Aperçu

La Couche Périphérique est la couche la plus basse de Memesplora, responsable de l'interaction directe avec le système d'exploitation et le matériel, fournissant une interface unifiée de gestion de la mémoire/VRAM.

## Interface Périphérique

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // Mémoire système
    DeviceVRAM                   // Mémoire GPU
    DeviceSwap                   // Espace d'échange/persistant
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

## Implémentation du Périphérique RAM

### Linux

Utilise l'appel système `mmap` pour le mappage de mémoire anonyme :

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

Informations mémoire depuis `/proc/meminfo`.

### Windows

Utilise `VirtualAlloc` :

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### Allocateur Buddy System

Utilise le Buddy System pour gérer la mémoire et réduire la fragmentation.

## Périphérique VRAM

### Mémoire GPU CUDA

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### Informations GPU NVML

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## Support des Plateformes

| Plateforme | Allocation RAM | Informations Mémoire | Support GPU |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | Limité |