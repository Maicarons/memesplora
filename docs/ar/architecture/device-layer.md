# طبقة الجهاز

## نظرة عامة

طبقة الجهاز هي أدنى طبقة في Memesplora، وهي المسؤولة عن التفاعل المباشر مع نظام التشغيل والأجهزة، وتوفير واجهة موحدة لإدارة الذاكرة/VRAM.

## واجهة الجهاز

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // ذاكرة النظام
    DeviceVRAM                   // ذاكرة GPU
    DeviceSwap                   // مساحة المبادلة/الثابتة
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

## تنفيذ جهاز RAM

### Linux

يستخدم استدعاء النظام `mmap` لتعيين الذاكرة مجهولة المصدر:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

معلومات الذاكرة من `/proc/meminfo`.

### Windows

يستخدم `VirtualAlloc`:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### مُخصص نظام Buddy

يستخدم نظام Buddy لإدارة الذاكرة وتقليل التجزئة.

## جهاز VRAM

### ذاكرة GPU CUDA

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### معلومات GPU NVML

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## دعم المنصات

| المنصة | تخصيص RAM | معلومات الذاكرة | دعم GPU |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | محدود |
