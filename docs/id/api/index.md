# Referensi API

Memesplora menyediakan tiga protokol akses:

## REST API

HTTP API lengkap untuk manajemen berkas, manajemen ruang, otentikasi pengguna, dan berbagi.

- **Port**: 5212
- **Base URL**: `http://localhost:5212/api/v3`
- **Auth**: JWT Bearer Token
- **Docs**: [Referensi REST API](/id/api/rest)

## API Kompatibel S3

Protokol kompatibel AWS S3 untuk digunakan dengan rclone, AWS CLI, MinIO Client, dan alat S3 lainnya.

- **Port**: 5213
- **Auth**: AWS Signature V4
- **Docs**: [Referensi API S3](/id/api/s3)

## WebDAV

Protokol WebDAV untuk dipasang sebagai jaringan drive di manajer berkas sistem operasi.

- **Port**: 5214
- **Auth**: HTTP Basic Auth
- **Docs**: [Referensi WebDAV](/id/api/webdav)