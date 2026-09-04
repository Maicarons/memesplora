# डिवाइस लेयर

## अवलोकन

डिवाइस लेयर Memesplora की सबसे निचली परत है, जो ऑपरेटिंग सिस्टम और हार्डवेयर के साथ सीधे इंटरैक्शन के लिए जिम्मेदार है, और एक समान मेमोरी/VRAM प्रबंधन इंटरफेस प्रदान करती है।

## डिवाइस इंटरफेस

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // सिस्टम मेमोरी
    DeviceVRAM                   // GPU मेमोरी
    DeviceSwap                   // स्वैप स्पेस/परसिस्टेंट
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

## RAM डिवाइस कार्यान्वयन

### Linux

अनाम मेमोरी मैपिंग के लिए `mmap` सिस्कॉल का उपयोग करता है:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

`/proc/meminfo` से मेमोरी जानकारी।

### Windows

`VirtualAlloc` का उपयोग करता है:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### बडी सिस्टम आवंटक

मेमोरी प्रबंधन और विखंडन कम करने के लिए बडी सिस्टम का उपयोग करता है।

## VRAM डिवाइस

### CUDA GPU मेमोरी

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### NVML GPU जानकारी

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## प्लेटफ़ॉर्म समर्थन

| प्लेटफ़ॉर्म | RAM आवंटन | मेमोरी जानकारी | GPU समर्थन |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | सीमित |
