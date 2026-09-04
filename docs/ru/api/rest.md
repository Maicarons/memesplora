# REST API — справочник

## Базовая информация

- **Base URL**: `http://localhost:5212/api/v3`
- **Аутентификация**: JWT Bearer Token
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

```http
POST /api/v3/admin/login
Content-Type: application/json

{"username": "admin", "password": "ваш-пароль"}
```

### Получение текущей сессии

```http
GET /api/v3/user/session
Authorization: Bearer <token>
```

## API управления устройствами

### Список всех устройств

```http
GET /api/v3/device
Authorization: Bearer <token>
```

### Проверка работоспособности устройства

```http
GET /api/v3/device/:id/health
Authorization: Bearer <token>
```

## API управления пространствами

### Создание пространства

```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json

{"name": "Моё пространство", "total_size": 1073741824, "device_id": "ram_0"}
```

### Список пространств

```http
GET /api/v3/space
Authorization: Bearer <token>
```

### Изменение размера пространства

```http
POST /api/v3/space/:id/resize
Authorization: Bearer <token>
Content-Type: application/json

{"new_size": 2147483648}
```

## API управления файлами

### Список файлов

```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### Загрузка файла

```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

### Скачивание файла

```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

### Переименование/Перемещение/Копирование/Удаление

```http
POST /api/v3/space/:id/files/:fileId/rename  {"name": "new.txt"}
POST /api/v3/space/:id/files/:fileId/move    {"dest_path": "/newdir"}
POST /api/v3/space/:id/files/:fileId/copy    {"dest_path": "/backup"}
DELETE /api/v3/space/:id/files/:fileId
```

## API публикаций

```http
POST /api/v3/share
Authorization: Bearer <token>
Content-Type: application/json

{"file_id": "file_1", "space_id": "space_1", "download_limit": 5}

GET /api/v3/share/list
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
| 50001 | Внутренняя ошибка сервера |

## Детали архитектуры

См. [Архитектура REST API](/ru/architecture/rest-api) для получения подробной информации о проектировании.