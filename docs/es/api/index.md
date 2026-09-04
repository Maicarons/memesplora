# Referencia de API

Memesplora proporciona tres protocolos de acceso:

## API REST

API HTTP completa para gestión de archivos, gestión de espacios, autenticación de usuarios y uso compartido.

- **Puerto**: 5212
- **URL base**: `http://localhost:5212/api/v3`
- **Autenticación**: Token JWT Bearer
- **Documentación**: [Referencia de API REST](/es/api/rest)

## API compatible con S3

Protocolo compatible con AWS S3 para usar con rclone, AWS CLI, MinIO Client y otras herramientas S3.

- **Puerto**: 5213
- **Autenticación**: AWS Signature V4
- **Documentación**: [Referencia de API S3](/es/api/s3)

## WebDAV

Protocolo WebDAV para montar como unidad de red en los gestores de archivos del sistema operativo.

- **Puerto**: 5214
- **Autenticación**: HTTP Basic Auth
- **Documentación**: [Referencia de WebDAV](/es/api/webdav)