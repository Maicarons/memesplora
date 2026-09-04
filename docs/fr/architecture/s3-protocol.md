# Protocole S3

## Aperçu

Memesplora fournit une API compatible AWS S3, permettant à tout client compatible S3 (comme rclone, AWS CLI, MinIO Client) d'accéder directement aux espaces de stockage.

## Port

L'API S3 écoute sur le port `:5213`.

## Authentification

Utilise l'algorithme de signature AWS Signature V4. La Clé d'Accès et la Clé Secrète sont obtenues depuis l'interface d'administration web.

## API Supportée

### Opérations de Bucket
- `GET /` - ListBuckets
- `HEAD /{bucket}` - HeadBucket

### Opérations sur les Objets
- `GET /{bucket}/{key}` - GetObject
- `PUT /{bucket}/{key}` - PutObject
- `DELETE /{bucket}/{key}` - DeleteObject
- `HEAD /{bucket}/{key}` - HeadObject
- `GET /{bucket}` - ListObjects / ListObjectsV2
- `POST /{bucket}?delete` - DeleteObjects
- `PUT /{bucket}/{key}` (avec x-amz-copy-source) - CopyObject

### Téléchargement Multpartie
- `POST /{bucket}/{key}?uploads` - CreateMultipartUpload
- `PUT /{bucket}/{key}?partNumber=&uploadId=` - UploadPart
- `POST /{bucket}/{key}?uploadId=` - CompleteMultipartUpload
- `DELETE /{bucket}/{key}?uploadId=` - AbortMultipartUpload
- `GET /{bucket}/{key}?uploadId=` - ListParts

## Exemples d'Utilisation

### AWS CLI
```bash
aws configure --profile memesplora
aws s3 --endpoint-url http://localhost:5213 ls
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/
```

### rclone
```bash
rclone config  # Sélectionnez S3 Compatible, endpoint: http://localhost:5213
rclone copy file.txt memesplora:my-space/
```
