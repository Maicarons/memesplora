# Guía de Pruebas

## Pruebas Unitarias

Cubrir todos los módulos principales:

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

## Pruebas del Sistema de Archivos

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

## Ejecución de Pruebas

```bash
# Todas las pruebas
cd backend && go test -v ./...

# Cobertura
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Benchmarks
go test -bench=. ./internal/fs/...
```

## Objetivos de Cobertura

| Módulo | Objetivo |
|--------|:--------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |