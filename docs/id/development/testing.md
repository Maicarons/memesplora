# Panduan Pengujian

## Strategi Pengujian

### Pengujian Unit

Mencakup semua modul inti:

```go
// Pengujian device
func TestRAMDevice_Allocate(t *testing.T) {
    dev := NewRAMDevice(1024 * 1024) // 1MB
    block, err := dev.Allocate(context.Background(), 4096)
    assert.NoError(t, err)
    assert.Equal(t, uint64(4096), block.Size)
    
    // Menulis data
    data := []byte("hello world")
    n, err := dev.Write(context.Background(), block, 0, data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // Membaca data
    buf := make([]byte, len(data))
    n, err = dev.Read(context.Background(), block, 0, buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    // Membebaskan
    err = dev.Free(context.Background(), block)
    assert.NoError(t, err)
}
```

### Pengujian Sistem File

```go
func TestMemFS_CreateFile(t *testing.T) {
    dev := NewRAMDevice(10 * 1024 * 1024) // 10MB
    fs := NewMemFileSystem()
    err := fs.Init(context.Background(), dev, 10*1024*1024, 4096)
    assert.NoError(t, err)
    
    // Membuat file
    f, err := fs.Create(context.Background(), "/test.txt", 1)
    assert.NoError(t, err)
    
    // Menulis data
    data := []byte("hello memesplora")
    n, err := f.Write(data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // Membaca data
    buf := make([]byte, len(data))
    f.Seek(0, 0)
    n, err = f.Read(buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    f.Close()
}
```

### Pengujian Integrasi API

```go
func TestAPI_FileOperations(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()
    
    // Membuat ruang
    req, _ := http.NewRequest("POST", "/api/v3/space", ...)
    router.ServeHTTP(w, req)
    assert.Equal(t, 200, w.Code)
    
    // Mengunggah file
    // Mengunduh file
    // Menghapus file
}
```

## Menjalankan Pengujian

```bash
# Menjalankan semua pengujian
go test ./...

# Menjalankan pengujian paket tertentu
go test ./internal/device/...

# Menjalankan pengujian dan menghasilkan laporan cakupan
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Pengujian benchmark
go test -bench=. ./internal/fs/...
```

## Target Cakupan Pengujian

| Modul | Target Cakupan |
|:----:|:-------------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |
| s3 | 70% |
| webdav | 70% |