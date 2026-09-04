# টেস্টিং গাইড

## টেস্ট কৌশল

### ইউনিট টেস্ট

সব কোর মডিউল কভার করে:

```go
// device টেস্ট
func TestRAMDevice_Allocate(t *testing.T) {
    dev := NewRAMDevice(1024 * 1024) // 1MB
    block, err := dev.Allocate(context.Background(), 4096)
    assert.NoError(t, err)
    assert.Equal(t, uint64(4096), block.Size)

    // ডেটা লেখা
    data := []byte("hello world")
    n, err := dev.Write(context.Background(), block, 0, data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)

    // ডেটা পড়া
    buf := make([]byte, len(data))
    n, err = dev.Read(context.Background(), block, 0, buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)

    // মুক্তি
    err = dev.Free(context.Background(), block)
    assert.NoError(t, err)
}
```

### ফাইলসিস্টেম টেস্ট

```go
func TestMemFS_CreateFile(t *testing.T) {
    dev := NewRAMDevice(10 * 1024 * 1024) // 10MB
    fs := NewMemFileSystem()
    err := fs.Init(context.Background(), dev, 10*1024*1024, 4096)
    assert.NoError(t, err)

    // ফাইল তৈরি
    f, err := fs.Create(context.Background(), "/test.txt", 1)
    assert.NoError(t, err)

    // ডেটা লেখা
    data := []byte("hello memesplora")
    n, err := f.Write(data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)

    // ডেটা পড়া
    buf := make([]byte, len(data))
    f.Seek(0, 0)
    n, err = f.Read(buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)

    f.Close()
}
```

### API ইন্টিগ্রেশন টেস্ট

```go
func TestAPI_FileOperations(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()

    // স্পেস তৈরি
    req, _ := http.NewRequest("POST", "/api/v3/space", ...)
    router.ServeHTTP(w, req)
    assert.Equal(t, 200, w.Code)

    // ফাইল আপলোড
    // ফাইল ডাউনলোড
    // ফাইল মুছে ফেলা
}
```

## টেস্ট চালানো

```bash
# সব টেস্ট চালানো
go test ./...

# নির্দিষ্ট প্যাকেজ টেস্ট
go test ./internal/device/...

# টেস্ট চালানো এবং কভারেজ রিপোর্ট তৈরি
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# বেঞ্চমার্ক টেস্ট
go test -bench=. ./internal/fs/...
```

## টেস্ট কভারেজ লক্ষ্য

| মডিউল | লক্ষ্য কভারেজ |
|:----:|:---------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |
| s3 | 70% |
| webdav | 70% |