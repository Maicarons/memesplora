# Настройка среды разработки

## Предварительные требования

### Необходимые инструменты
- **Go**: 1.22 или выше
- **Node.js**: 20 LTS или выше
- **npm**: 10+ или **pnpm** 8+
- **Git**: последняя версия

### Опциональные инструменты
- **Docker**: Для контейнерного развёртывания
- **CUDA Toolkit**: 12+, для разработки с GPU VRAM
- **Make**: Для использования команд Makefile

## Клонирование проекта

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## Установка зависимостей

### Бэкенд

```bash
cd backend
go mod tidy
```

### Фронтенд

```bash
cd frontend
npm install
```

### Документация

```bash
cd docs
npm install
```

## Режим разработки

### Запуск бэкенда

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### Запуск фронтенда (отдельный терминал)

```bash
cd frontend
npm run dev
```

### Запуск документации (отдельный терминал)

```bash
cd docs
npm run dev
```

## Проверка установки

1. Бэкенд: `http://localhost:5212/health` должен вернуть `{"status":"ok"}`
2. Фронтенд: `http://localhost:5173` должен показать страницу входа
3. Документация: `http://localhost:5174` должен показать сайт документации

## Настройка разработки с GPU

### NVIDIA CUDA

1. Установите драйвер NVIDIA (рекомендуется 545+)
2. Установите CUDA Toolkit 12+

```bash
nvidia-smi  # Проверка GPU
nvcc --version  # Проверка CUDA
```