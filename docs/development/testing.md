# 测试指南

## 测试策略

### 单元测试

覆盖所有核心模块：

```go
// device 测试
func TestRAMDevice_Allocate(t *testing.T) {
    dev := NewRAMDevice(1024 * 1024) // 1MB
    block, err := dev.Allocate(context.Background(), 4096)
    assert.NoError(t, err)
    assert.Equal(t, uint64(4096), block.Size)
    
    // 写入数据
    data := []byte("hello world")
    n, err := dev.Write(context.Background(), block, 0, data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // 读取数据
    buf := make([]byte, len(data))
    n, err = dev.Read(context.Background(), block, 0, buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    // 释放
    err = dev.Free(context.Background(), block)
    assert.NoError(t, err)
}
```

### 文件系统测试

```go
func TestMemFS_CreateFile(t *testing.T) {
    dev := NewRAMDevice(10 * 1024 * 1024) // 10MB
    fs := NewMemFileSystem()
    err := fs.Init(context.Background(), dev, 10*1024*1024, 4096)
    assert.NoError(t, err)
    
    // 创建文件
    f, err := fs.Create(context.Background(), "/test.txt", 1)
    assert.NoError(t, err)
    
    // 写入数据
    data := []byte("hello memesplora")
    n, err := f.Write(data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // 读取数据
    buf := make([]byte, len(data))
    f.Seek(0, 0)
    n, err = f.Read(buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    f.Close()
}
```

### API 集成测试

```go
func TestAPI_FileOperations(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()
    
    // 创建空间
    req, _ := http.NewRequest("POST", "/api/v3/space", ...)
    router.ServeHTTP(w, req)
    assert.Equal(t, 200, w.Code)
    
    // 上传文件
    // 下载文件
    // 删除文件
}
```

## 运行测试

```bash
# 运行所有测试
go test ./...

# 运行特定包测试
go test ./internal/device/...

# 运行测试并生成覆盖率报告
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# 基准测试
go test -bench=. ./internal/fs/...
```

## 测试覆盖率目标

| 模块 | 目标覆盖率 |
|:----:|:---------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |
| s3 | 70% |
| webdav | 70% |