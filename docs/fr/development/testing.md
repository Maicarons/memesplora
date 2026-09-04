# Guide de Test

## Tests Unitaires

Couvrir tous les modules principaux :

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

## Tests du Système de Fichiers

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

## Exécution des Tests

```bash
# Tous les tests
cd backend && go test -v ./...

# Couverture
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Benchmarks
go test -bench=. ./internal/fs/...
```

## Objectifs de Couverture

| Module | Objectif |
|--------|:--------:|
| device | 85 % |
| fs | 85 % |
| api | 70 % |
| service | 75 % |