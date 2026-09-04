# 테스트 가이드

## 단위 테스트

모든 핵심 모듈을 테스트합니다:

```go
func TestRAMDevice_AllocateAndFree(t *testing.T) {
    dev, _ := NewRAMDevice("test", 1024*1024)
    block, _ := dev.Allocate(context.Background(), 4096)
    data := []byte("hello")
    dev.Write(context.Background(), block, 0, data)
    buf := make([]byte, len(data))
    dev.Read(context.Background(), block, 0, buf)
    dev.Free(context.Background(), block)
}
```

## 파일시스템 테스트

```go
func TestMemFS_CreateAndReadFile(t *testing.T) {
    mfs := NewMemFileSystem()
    mfs.Init(context.Background(), 10*1024*1024, 4096)
    file, _ := mfs.Create(context.Background(), "/test.txt", 1)
    file.Write([]byte("hello"))
    file.Close()
    file, _ = mfs.Open(context.Background(), "/test.txt")
    buf := make([]byte, 5)
    file.Read(buf)
}
```

## 테스트 실행

```bash
# 모든 테스트
cd backend && go test -v ./...

# 커버리지
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# 벤치마크
go test -bench=. ./internal/fs/...
```

## 커버리지 목표

| 모듈 | 목표 |
|--------|:------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |