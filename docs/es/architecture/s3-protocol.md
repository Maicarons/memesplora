# Protocolo S3

## Visión General

Memesplora proporciona una API compatible con AWS S3, permitiendo que cualquier cliente compatible con S3 (como rclone, AWS CLI, MinIO Client) acceda directamente a los espacios de almacenamiento.

## Puerto

La API S3 escucha en el puerto `:5213`.

## Autenticación

Utiliza el algoritmo de firma AWS Signature V4. La Clave de Acceso y la Clave Secreta se obtienen desde la interfaz de gestión web.

## API Compatible

### Operaciones de Bucket
- `GET /` - ListBuckets
- `HEAD /{bucket}` - HeadBucket

### Operaciones de Objetos
- `GET /{bucket}/{key}` - GetObject
- `PUT /{bucket}/{key}` - PutObject
- `DELETE /{bucket}/{key}` - DeleteObject
- `HEAD /{bucket}/{key}` - HeadObject
- `GET /{bucket}` - ListObjects / ListObjectsV2
- `POST /{bucket}?delete` - DeleteObjects
- `PUT /{bucket}/{key}` (con x-amz-copy-source) - CopyObject

### Carga Multiparte
- `POST /{bucket}/{key}?uploads` - CreateMultipartUpload
- `PUT /{bucket}/{key}?partNumber=&uploadId=` - UploadPart
- `POST /{bucket}/{key}?uploadId=` - CompleteMultipartUpload
- `DELETE /{bucket}/{key}?uploadId=` - AbortMultipartUpload
- `GET /{bucket}/{key}?uploadId=` - ListParts

## Ejemplos de Uso

### AWS CLI
```bash
aws configure --profile memesplora
aws s3 --endpoint-url http://localhost:5213 ls
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/
```

### rclone
```bash
rclone config  # Seleccione S3 Compatible, endpoint: http://localhost:5213
rclone copy file.txt memesplora:my-space/
```
