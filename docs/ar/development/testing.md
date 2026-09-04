# دليل الاختبار

## استراتيجية الاختبار

### اختبارات الوحدة

تغطية جميع الوحدات الأساسية:

```go
// اختبار device
func TestRAMDevice_Allocate(t *testing.T) {
    dev := NewRAMDevice(1024 * 1024) // 1MB
    block, err := dev.Allocate(context.Background(), 4096)
    assert.NoError(t, err)
    assert.Equal(t, uint64(4096), block.Size)
    
    // كتابة البيانات
    data := []byte("hello world")
    n, err := dev.Write(context.Background(), block, 0, data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // قراءة البيانات
    buf := make([]byte, len(data))
    n, err = dev.Read(context.Background(), block, 0, buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    // تحرير
    err = dev.Free(context.Background(), block)
    assert.NoError(t, err)
}
```

### اختبار نظام الملفات

```go
func TestMemFS_CreateFile(t *testing.T) {
    dev := NewRAMDevice(10 * 1024 * 1024) // 10MB
    fs := NewMemFileSystem()
    err := fs.Init(context.Background(), dev, 10*1024*1024, 4096)
    assert.NoError(t, err)
    
    // إنشاء ملف
    f, err := fs.Create(context.Background(), "/test.txt", 1)
    assert.NoError(t, err)
    
    // كتابة البيانات
    data := []byte("hello memesplora")
    n, err := f.Write(data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // قراءة البيانات
    buf := make([]byte, len(data))
    f.Seek(0, 0)
    n, err = f.Read(buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    f.Close()
}
```

### اختبار تكامل API

```go
func TestAPI_FileOperations(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()
    
    // إنشاء مساحة
    req, _ := http.NewRequest("POST", "/api/v3/space", ...)
    router.ServeHTTP(w, req)
    assert.Equal(t, 200, w.Code)
    
    // رفع ملف
    // تنزيل ملف
    // حذف ملف
}
```

## تشغيل الاختبارات

```bash
# تشغيل جميع الاختبارات
go test ./...

# تشغيل اختبارات حزمة معينة
go test ./internal/device/...

# تشغيل الاختبارات مع إنشاء تقرير التغطية
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# اختبارات الأداء (Benchmark)
go test -bench=. ./internal/fs/...
```

## أهداف تغطية الاختبار

| الوحدة | التغطية المستهدفة |
|:----:|:---------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |
| s3 | 70% |
| webdav | 70% |