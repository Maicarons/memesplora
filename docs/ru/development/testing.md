# Руководство по тестированию

## Стратегия тестирования

### Модульные тесты

Покрывают все основные модули:

```go
// Тестирование device
func TestRAMDevice_Allocate(t *testing.T) {
    dev := NewRAMDevice(1024 * 1024) // 1 МБ
    block, err := dev.Allocate(context.Background(), 4096)
    assert.NoError(t, err)
    assert.Equal(t, uint64(4096), block.Size)
    
    // Запись данных
    data := []byte("hello world")
    n, err := dev.Write(context.Background(), block, 0, data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // Чтение данных
    buf := make([]byte, len(data))
    n, err = dev.Read(context.Background(), block, 0, buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    // Освобождение
    err = dev.Free(context.Background(), block)
    assert.NoError(t, err)
}
```

### Тестирование файловой системы

```go
func TestMemFS_CreateFile(t *testing.T) {
    dev := NewRAMDevice(10 * 1024 * 1024) // 10 МБ
    fs := NewMemFileSystem()
    err := fs.Init(context.Background(), dev, 10*1024*1024, 4096)
    assert.NoError(t, err)
    
    // Создание файла
    f, err := fs.Create(context.Background(), "/test.txt", 1)
    assert.NoError(t, err)
    
    // Запись данных
    data := []byte("hello memesplora")
    n, err := f.Write(data)
    assert.NoError(t, err)
    assert.Equal(t, len(data), n)
    
    // Чтение данных
    buf := make([]byte, len(data))
    f.Seek(0, 0)
    n, err = f.Read(buf)
    assert.NoError(t, err)
    assert.Equal(t, data, buf)
    
    f.Close()
}
```

### Интеграционные тесты API

```go
func TestAPI_FileOperations(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()
    
    // Создание пространства
    req, _ := http.NewRequest("POST", "/api/v3/space", ...)
    router.ServeHTTP(w, req)
    assert.Equal(t, 200, w.Code)
    
    // Загрузка файла
    // Скачивание файла
    // Удаление файла
}
```

## Запуск тестов

```bash
# Запуск всех тестов
go test ./...

# Запуск тестов для конкретного пакета
go test ./internal/device/...

# Запуск тестов с генерацией отчёта о покрытии
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Бенчмарки
go test -bench=. ./internal/fs/...
```

## Целевые показатели покрытия тестами

| Модуль | Целевое покрытие |
|:-----:|:----------------:|
| device | 85% |
| fs | 85% |
| api | 70% |
| service | 75% |
| s3 | 70% |
| webdav | 70% |