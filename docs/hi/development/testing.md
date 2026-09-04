# परीक्षण गाइड

## परीक्षण रणनीति

### यूनिट टेस्ट

सभी मुख्य मॉड्यूल को कवर करें:

```go
// device परीक्षण
func TestRAMDevice_Allocate(t *testing.T) {
    dev := NewRAMDevice(1024 * 1024) // 1MB
    block, err := dev.Allocate(context.Background(), 4096)
    assert.NoError(t, err)
    assert.Equal(t, uint64(4096), block.Size)
    
    // डेटा लिखें
    data := []byte("hello world")
    n, err := dev.Write(context.Background(), block, 0, data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // डेटा पढ़ें
    buf := make([]byte, len(data))
    n, err = dev.Read(context.Background(), block, 0, buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    // मुक्त करें
    err = dev.Free(context.Background(), block)
    assert.NoError(t, err)
}
```

### फ़ाइल सिस्टम परीक्षण

```go
func TestMemFS_CreateFile(t *testing.T) {
    dev := NewRAMDevice(10 * 1024 * 1024) // 10MB
    fs := NewMemFileSystem()
    err := fs.Init(context.Background(), dev, 10*1024*1024, 4096)
    assert.NoError(t, err)
    
    // फ़ाइल बनाएं
    f, err := fs.Create(context.Background(), "/test.txt", 1)
    assert.NoError(t, err)
    
    // डेटा लिखें
    data := []byte("hello memesplora")
    n, err := f.Write(data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // डेटा पढ़ें
    buf := make([]byte, len(data))
    f.Seek(0, 0)
    n, err = f.Read(buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    f.Close()
}
```

### API इंटीग्रेशन टेस्ट

```go
func TestAPI_FileOperations(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()
    
    // स्पेस बनाएं
    req, _ := http.NewRequest("POST", "/api/v3/space", ...)
    router.ServeHTTP(w, req)
    assert.Equal(t, 200, w.Code)
    
    // फ़ाइल अपलोड करें
    // फ़ाइल डाउनलोड करें
    // फ़ाइल हटाएं
}
```

## परीक्षण चलाएं

```bash
# सभी परीक्षण चलाएं
go test ./...

# विशिष्ट पैकेज परीक्षण चलाएं
go test ./internal/device/...

# परीक्षण चलाएं और कवरेज रिपोर्ट जनरेट करें
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# बेंचमार्क परीक्षण
go test -bench=. ./internal/fs/...
```

## परीक्षण कवरेज लक्ष्य

| मॉड्यूल | लक्ष्य कवरेज |
|:----:|:---------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |
| s3 | 70% |
| webdav | 70% |