# Начало работы

## Введение

Memesplora превращает системную память (RAM) и видеопамять GPU (VRAM) в высокоскоростную файловую систему. Пользователи могут выбирать устройства хранения, создавать пространства произвольного размера и управлять файлами так же, как в обычной файловой системе — с поддержкой REST API, S3-совместимого протокола и WebDAV.

## Системные требования

### Аппаратное обеспечение
- **Процессор**: Любой x86_64 / ARM64 процессор
- **RAM**: Не менее 512 МБ свободной памяти для работы сервиса
- **GPU (опционально)**: NVIDIA GPU с поддержкой CUDA 12+ для хранения в VRAM

### Программное обеспечение
- **ОС**: Linux (рекомендуется), Windows, macOS
- **Go**: 1.22+ (только для разработки)
- **Node.js**: 20+ (только для разработки фронтенда)

## Быстрая установка

### Вариант 1: Загрузка готового бинарного файла

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### Вариант 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### Вариант 3: Сборка из исходного кода

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# Бэкенд
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# Фронтенд (опционально, для разработки)
cd ../frontend
npm install
npm run dev
```

## Первое использование

1. Откройте браузер по адресу `http://localhost:5212`
2. Найдите пароль администратора в логах запуска сервера
3. Перейдите на страницу «Устройства», чтобы просмотреть доступные устройства хранения
4. Создайте пространство хранения
5. Начинайте управлять файлами!

## Конфигурация

```yaml
# config.yaml
server:
  http_port: 5212        # Порт REST API и веб-интерфейса
  s3_port: 5213          # Порт S3-совместимого API
  webdav_port: 5214      # Порт службы WebDAV
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "change-me-to-a-random-string"
  token_expire: 24h
```

## Подключение клиентов

### S3-клиенты

```bash
# Использование rclone
rclone config
# Выберите S3 Compatible, endpoint: http://localhost:5213

# Использование AWS CLI
aws configure
# Установите endpoint: http://localhost:5213
```

### WebDAV-клиенты

```
# macOS Finder
Go > Connect to Server > http://localhost:5214

# Windows Проводник
Правой кнопкой «Этот компьютер» > Подключить сетевой диск > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```