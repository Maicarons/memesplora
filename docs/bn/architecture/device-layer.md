# ডিভাইস লেয়ার

## ওভারভিউ

ডিভাইস লেয়ার হল Memesplora-এর সর্বনিম্ন স্তর, যা অপারেটিং সিস্টেম এবং হার্ডওয়্যারের সাথে সরাসরি মিথস্ক্রিয়ার জন্য দায়ী, এবং একটি ইউনিফাইড মেমোরি/VRAM ব্যবস্থাপনা ইন্টারফেস প্রদান করে।

## ডিভাইস ইন্টারফেস

```go
type DeviceType int

const (
    DeviceRAM  DeviceType = iota // সিস্টেম মেমোরি
    DeviceVRAM                   // GPU মেমোরি
    DeviceSwap                   // সোয়াপ স্পেস/পার্সিস্টেন্ট
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

## RAM ডিভাইস বাস্তবায়ন

### Linux

বেনামী মেমোরি ম্যাপিংয়ের জন্য `mmap` সিস্টেম কল ব্যবহার করে:

```go
data, err := syscall.Mmap(-1, 0, size,
    syscall.PROT_READ|syscall.PROT_WRITE,
    syscall.MAP_PRIVATE|syscall.MAP_ANONYMOUS)
```

`/proc/meminfo` থেকে মেমোরি তথ্য।

### Windows

`VirtualAlloc` ব্যবহার করে:

```go
addr, err := windows.VirtualAlloc(0, size,
    windows.MEM_COMMIT|windows.MEM_RESERVE,
    windows.PAGE_READWRITE)
```

### বাডি সিস্টেম বরাদ্দকারী

মেমোরি ব্যবস্থাপনা এবং বিভাজন কমানোর জন্য বাডি সিস্টেম ব্যবহার করে।

## VRAM ডিভাইস

### CUDA GPU মেমোরি

```go
var dptr C.deviceptr
C.cudaMalloc(&dptr, size)
var free, total C.size_t
C.cudaMemGetInfo(&free, &total)
```

### NVML GPU তথ্য

```go
device, _ := nvml.DeviceGetHandleByIndex(0)
name, _ := device.GetName()
memory, _ := device.GetMemoryInfo()
```

## প্ল্যাটফর্ম সমর্থন

| প্ল্যাটফর্ম | RAM বরাদ্দ | মেমোরি তথ্য | GPU সমর্থন |
|:--------:|---------------|-------------|-------------|
| Linux | mmap + MAP_ANONYMOUS | /proc/meminfo | CUDA |
| Windows | VirtualAlloc | GlobalMemoryStatusEx | CUDA |
| macOS | mmap + MAP_ANONYMOUS | sysctl hw.memsize | সীমিত |
