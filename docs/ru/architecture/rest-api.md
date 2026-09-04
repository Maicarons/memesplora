# REST API — архитектура

## Обзор

REST API — это основной интерфейс Memesplora, предоставляющий полный набор функций для управления файлами, пространствами и системой. Веб-фронтенд взаимодействует с бэкендом через этот API.

## Базовая информация

- **Base URL**: `http://localhost:5212/api/v3`
- **Аутентификация**: JWT Bearer Token (получается после входа)
- **Формат ответа**: JSON

## Общий формат ответа

```json
{
    "code": 0,
    "message": "success",
    "data": {}
}
```

Ответ с ошибкой:
```json
{
    "code": 40001,
    "message": "Ошибка параметров",
    "error": "Конкретная информация об ошибке"
}
```

## API аутентификации

### Вход администратора

```
POST /api/v3/admin/login
```

Тело запроса:
```json
{
    "username": "admin",
    "password": "admin123"
}
```

Ответ:
```json
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "nickname": "Администратор",
            "is_admin": true
        }
    }
}
```

### Получение текущей сессии

```
GET /api/v3/user/session
```

Заголовок: `Authorization: Bearer <token>`

Ответ:
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "username": "admin",
        "nickname": "Администратор",
        "email": "admin@example.com",
        "is_admin": true,
        "storage_used": 1073741824,
        "max_storage": 10737418240
    }
}
```

## API управления пространствами

### Список всех пространств

```
GET /api/v3/space
```

Ответ:
```json
{
    "code": 0,
    "data": [
        {
            "id": "space_001",
            "name": "Моё пространство",
            "description": "Для хранения файлов проекта",
            "total_size": 1073741824,
            "used_size": 524288000,
            "block_size": 4096,
            "device_id": "ram_0",
            "device_type": "ram",
            "status": "active",
            "created_at": "2024-01-01T00:00:00Z"
        }
    ]
}
```

### Создание пространства

```
POST /api/v3/space
```

Тело запроса:
```json
{
    "name": "Моё пространство",
    "description": "Для хранения файлов проекта",
    "total_size": 1073741824,
    "device_id": "ram_0"
}
```

### Получение информации о пространстве

```
GET /api/v3/space/:id
```

### Изменение размера пространства

```
POST /api/v3/space/:id/resize
```

Тело запроса:
```json
{
    "new_size": 2147483648
}
```

### Удаление пространства

```
DELETE /api/v3/space/:id
```

## API управления устройствами

### Список всех устройств

```
GET /api/v3/device
```

Ответ:
```json
{
    "code": 0,
    "data": [
        {
            "id": "ram_0",
            "name": "Системная память",
            "type": "ram",
            "total_size": 17179869184,
            "free_size": 8589934592,
            "used_size": 0,
            "healthy": true,
            "model": ""
        },
        {
            "id": "gpu_0",
            "name": "NVIDIA GeForce RTX 4090",
            "type": "vram",
            "total_size": 25769803776,
            "free_size": 25769803776,
            "used_size": 0,
            "healthy": true,
            "model": "NVIDIA GeForce RTX 4090"
        }
    ]
}
```

### Получение информации об устройстве

```
GET /api/v3/device/:id
```

### Проверка работоспособности устройства

```
GET /api/v3/device/:id/health
```

## API управления файлами

### Список файлов

```
GET /api/v3/space/:id/files?path=/&page=1&page_size=50&order_by=name
```

Ответ:
```json
{
    "code": 0,
    "data": {
        "files": [
            {
                "id": "file_001",
                "name": "Документы",
                "type": "directory",
                "size": 4096,
                "modified_at": "2024-01-01T00:00:00Z"
            },
            {
                "id": "file_002",
                "name": "report.pdf",
                "type": "file",
                "size": 2097152,
                "mime_type": "application/pdf",
                "modified_at": "2024-01-01T00:00:00Z"
            }
        ],
        "total": 2,
        "page": 1,
        "page_size": 50
    }
}
```

### Загрузка файла

```
POST /api/v3/space/:id/files
```

Content-Type: `multipart/form-data`

| Параметр | Тип | Описание |
|----------|-----|----------|
| file | file | Содержимое файла |
| path | string | Путь загрузки (по умолчанию /) |

### Скачивание файла

```
GET /api/v3/space/:id/files/:fileId
```

### Удаление файла

```
DELETE /api/v3/space/:id/files/:fileId
```

### Переименование файла

```
POST /api/v3/space/:id/files/:fileId/rename
```

Тело запроса:
```json
{
    "name": "new_name.pdf"
}
```

### Перемещение файла

```
POST /api/v3/space/:id/files/:fileId/move
```

Тело запроса:
```json
{
    "dest_path": "/new_folder/"
}
```

### Копирование файла

```
POST /api/v3/space/:id/files/:fileId/copy
```

Тело запроса:
```json
{
    "dest_path": "/backup/"
}
```

### Создание каталога

```
POST /api/v3/space/:id/dirs
```

Тело запроса:
```json
{
    "path": "/new_folder"
}
```

## API публикаций

### Создание ссылки для публикации

```
POST /api/v3/share
```

Тело запроса:
```json
{
    "file_id": "file_002",
    "space_id": "space_001",
    "expire_at": "2024-02-01T00:00:00Z",
    "download_limit": 100,
    "is_password": true,
    "password": "share123"
}
```

### Скачивание по ссылке публикации

```
GET /api/v3/share/:shareKey/download
```

### Список публикаций

```
GET /api/v3/share/list
```

### Отмена публикации

```
DELETE /api/v3/share/:id
```

## Коды состояния

| Код состояния | Описание |
|:------------:|----------|
| 0 | Успех |
| 40001 | Ошибка параметров |
| 40002 | Ошибка аутентификации |
| 40003 | Недостаточно прав |
| 40004 | Ресурс не найден |
| 40005 | Ресурс уже существует |
| 40006 | Недостаточно места |
| 40007 | Устройство недоступно |
| 50001 | Внутренняя ошибка сервера |