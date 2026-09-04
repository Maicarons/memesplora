# Guia de Testes

## Estrategia de Testes

### Testes Unitarios

Cobrindo todos os modulos principais:

```go
// Teste de device
func TestRAMDevice_Allocate(t *testing.T) {
    dev := NewRAMDevice(1024 * 1024) // 1MB
    block, err := dev.Allocate(context.Background(), 4096)
    assert.NoError(t, err)
    assert.Equal(t, uint64(4096), block.Size)
    
    // Escrever dados
    data := []byte("hello world")
    n, err := dev.Write(context.Background(), block, 0, data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // Ler dados
    buf := make([]byte, len(data))
    n, err = dev.Read(context.Background(), block, 0, buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    // Liberar
    err = dev.Free(context.Background(), block)
    assert.NoError(t, err)
}
```

### Testes do Sistema de Arquivos

```go
func TestMemFS_CreateFile(t *testing.T) {
    dev := NewRAMDevice(10 * 1024 * 1024) // 10MB
    fs := NewMemFileSystem()
    err := fs.Init(context.Background(), dev, 10*1024*1024, 4096)
    assert.NoError(t, err)
    
    // Criar arquivo
    f, err := fs.Create(context.Background(), "/test.txt", 1)
    assert.NoError(t, err)
    
    // Escrever dados
    data := []byte("hello memesplora")
    n, err := f.Write(data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // Ler dados
    buf := make([]byte, len(data))
    f.Seek(0, 0)
    n, err = f.Read(buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    f.Close()
}
```

### Testes de Integracao da API

```go
func TestAPI_FileOperations(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()
    
    // Criar espaco
    req, _ := http.NewRequest("POST", "/api/v3/space", ...)
    router.ServeHTTP(w, req)
    assert.Equal(t, 200, w.Code)
    
    // Upload de arquivo
    // Download de arquivo
    // Excluir arquivo
}
```

## Executando Testes

```bash
# Executar todos os testes
go test ./...

# Executar testes de um pacote especifico
go test ./internal/device/...

# Executar testes com relatorio de cobertura
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Testes de benchmark
go test -bench=. ./internal/fs/...
```

## Metas de Cobertura de Testes

| Modulo | Cobertura Alvo |
|:----:|:--------------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |
| s3 | 70% |
| webdav | 70% |