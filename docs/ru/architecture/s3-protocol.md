# Протокол S3

## Обзор

Memesplora предоставляет API, совместимый с AWS S3, что позволяет использовать любые S3-совместимые клиенты (например, rclone, AWS CLI, MinIO Client) для прямого доступа к пространствам хранения.

## Порт

S3 API работает на порту `:5213`.

## Аутентификация

Используется алгоритм подписи AWS Signature V4. Access Key и Secret Key можно получить в веб-интерфейсе управления.

## Поддерживаемые S3 API

### Операции с Bucket

| Операция | HTTP | Путь | Описание |
|----------|------|------|----------|
| ListBuckets | GET | `/` | Список всех Bucket (пространств) |
| HeadBucket | HEAD | `/{bucket}` | Проверка существования Bucket |
| GetBucketLocation | GET | `/{bucket}?location` | Получение региона Bucket |

### Операции с объектами

| Операция | HTTP | Путь | Описание |
|----------|------|------|----------|
| GetObject | GET | `/{bucket}/{key}` | Скачивание объекта |
| PutObject | PUT | `/{bucket}/{key}` | Загрузка объекта |
| DeleteObject | DELETE | `/{bucket}/{key}` | Удаление объекта |
| HeadObject | HEAD | `/{bucket}/{key}` | Получение метаданных объекта |
| ListObjects | GET | `/{bucket}` | Список объектов |
| ListObjectsV2 | GET | `/{bucket}?list-type=2` | Список объектов V2 |
| DeleteObjects | POST | `/{bucket}?delete` | Массовое удаление |
| CopyObject | PUT | `/{bucket}/{key}` (x-amz-copy-source) | Копирование объекта |

### Многочастная загрузка

| Операция | HTTP | Путь | Описание |
|----------|------|------|----------|
| CreateMultipartUpload | POST | `/{bucket}/{key}?uploads` | Инициализация многочастной загрузки |
| UploadPart | PUT | `/{bucket}/{key}?partNumber=&uploadId=` | Загрузка части |
| CompleteMultipartUpload | POST | `/{bucket}/{key}?uploadId=` | Завершение многочастной загрузки |
| AbortMultipartUpload | DELETE | `/{bucket}/{key}?uploadId=` | Отмена многочастной загрузки |
| ListParts | GET | `/{bucket}/{key}?uploadId=` | Список загруженных частей |

## Примеры использования

### Использование AWS CLI

```bash
# Настройка
aws configure --profile memesplora
# AWS Access Key ID: ваш-access-key
# AWS Secret Access Key: ваш-secret-key
# Default region: us-east-1

# Список Bucket
aws s3 --endpoint-url http://localhost:5213 ls

# Загрузка файла
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/

# Скачивание файла
aws s3 --endpoint-url http://localhost:5213 cp s3://my-space/file.txt .

# Список объектов
aws s3 --endpoint-url http://localhost:5213 ls s3://my-space/
```

### Использование rclone

```bash
# Настройка удалённого хранилища
rclone config
# Выберите S3 Compatible
# endpoint: http://localhost:5213
# access_key_id: ваш-access-key
# secret_access_key: ваш-secret-key

# Загрузка файла
rclone copy file.txt memesplora:my-space/

# Скачивание файла
rclone copy memesplora:my-space/file.txt .

# Список файлов
rclone ls memesplora:my-space/
```

### Использование MinIO Client

```bash
# Настройка алиаса
mc alias set memesplora http://localhost:5213 ваш-access-key ваш-secret-key

# Список Bucket
mc ls memesplora

# Загрузка файла
mc cp file.txt memesplora/my-space/

# Скачивание файла
mc cp memesplora/my-space/file.txt .
```

## Ответ с ошибкой

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Error>
    <Code>NoSuchKey</Code>
    <Message>The specified key does not exist.</Message>
    <Key>file.txt</Key>
    <RequestId>...</RequestId>
    <HostId>...</HostId>
</Error>
```

## Проверка подписи

Поддерживается алгоритм подписи AWS Signature V4:

1. Вычисление ключа подписи
2. Построение канонического запроса
3. Вычисление подписи
4. Проверка соответствия подписи заголовку `Authorization`

## Примечания

- Имя Bucket соответствует имени пространства в Memesplora
- Object Key соответствует пути к файлу
- В настоящее время не поддерживаются Bucket Policy и ACL (весь доступ контролируется через аутентификацию пользователя)
- Не поддерживается версионирование S3