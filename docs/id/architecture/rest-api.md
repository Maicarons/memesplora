# Desain REST API

## Ikhtisar

REST API adalah antarmuka utama Memesplora, menyediakan fungsionalitas manajemen file, manajemen ruang, dan manajemen sistem yang lengkap. Frontend web berinteraksi dengan backend melalui API ini.

## Informasi Dasar

- **Base URL**: `http://localhost:5212/api/v3`
- **Metode Otentikasi**: JWT Bearer Token (diperoleh setelah login)
- **Format Respons**: JSON

## Format Respons Umum

```json
{
    "code": 0,
    "message": "success",
    "data": {}
}
```

Respons kesalahan:
```json
{
    "code": 40001,
    "message": "parameter error",
    "error": "informasi kesalahan spesifik"
}
```

## API Otentikasi

### Login Admin

```
POST /api/v3/admin/login
```

Isi permintaan:
```json
{
    "username": "admin",
    "password": "admin123"
}
```

Respons:
```json
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "nickname": "Admin",
            "is_admin": true
        }
    }
}
```

### Mendapatkan Sesi Saat Ini

```
GET /api/v3/user/session
```

Header permintaan: `Authorization: Bearer <token>`

Respons:
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "username": "admin",
        "nickname": "Admin",
        "email": "admin@example.com",
        "is_admin": true,
        "storage_used": 1073741824,
        "max_storage": 10737418240
    }
}
```

## API Manajemen Ruang

### Mendaftar Semua Ruang

```
GET /api/v3/space
```

Respons:
```json
{
    "code": 0,
    "data": [
        {
            "id": "space_001",
            "name": "Ruang Saya",
            "description": "Untuk menyimpan file proyek",
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

### Membuat Ruang

```
POST /api/v3/space
```

Isi permintaan:
```json
{
    "name": "Ruang Saya",
    "description": "Untuk menyimpan file proyek",
    "total_size": 1073741824,
    "device_id": "ram_0"
}
```

### Mendapatkan Detail Ruang

```
GET /api/v3/space/:id
```

### Mengubah Ukuran Ruang

```
POST /api/v3/space/:id/resize
```

Isi permintaan:
```json
{
    "new_size": 2147483648
}
```

### Menghapus Ruang

```
DELETE /api/v3/space/:id
```

## API Manajemen Perangkat

### Mendaftar Semua Perangkat

```
GET /api/v3/device
```

Respons:
```json
{
    "code": 0,
    "data": [
        {
            "id": "ram_0",
            "name": "Memori Sistem",
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

### Mendapatkan Detail Perangkat

```
GET /api/v3/device/:id
```

### Pemeriksaan Kesehatan Perangkat

```
GET /api/v3/device/:id/health
```

## API Manajemen File

### Mendaftar File

```
GET /api/v3/space/:id/files?path=/&page=1&page_size=50&order_by=name
```

Respons:
```json
{
    "code": 0,
    "data": {
        "files": [
            {
                "id": "file_001",
                "name": "Dokumen",
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

### Mengunggah File

```
POST /api/v3/space/:id/files
```

Content-Type: `multipart/form-data`

| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| file | file | Konten file |
| path | string | Jalur unggah (default /) |

### Mengunduh File

```
GET /api/v3/space/:id/files/:fileId
```

### Menghapus File

```
DELETE /api/v3/space/:id/files/:fileId
```

### Mengganti Nama File

```
POST /api/v3/space/:id/files/:fileId/rename
```

Isi permintaan:
```json
{
    "name": "new_name.pdf"
}
```

### Memindahkan File

```
POST /api/v3/space/:id/files/:fileId/move
```

Isi permintaan:
```json
{
    "dest_path": "/new_folder/"
}
```

### Menyalin File

```
POST /api/v3/space/:id/files/:fileId/copy
```

Isi permintaan:
```json
{
    "dest_path": "/backup/"
}
```

### Membuat Direktori

```
POST /api/v3/space/:id/dirs
```

Isi permintaan:
```json
{
    "path": "/new_folder"
}
```

## API Berbagi

### Membuat Tautan Berbagi

```
POST /api/v3/share
```

Isi permintaan:
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

### Mengunduh melalui Berbagi

```
GET /api/v3/share/:shareKey/download
```

### Mendaftar Berbagi

```
GET /api/v3/share/list
```

### Membatalkan Berbagi

```
DELETE /api/v3/share/:id
```

## Penjelasan Kode Status

| Kode Status | Deskripsi |
|:------:|------|
| 0 | Sukses |
| 40001 | Kesalahan parameter |
| 40002 | Gagal otentikasi |
| 40003 | Izin tidak mencukupi |
| 40004 | Sumber daya tidak ditemukan |
| 40005 | Sumber daya sudah ada |
| 40006 | Ruang tidak mencukupi |
| 40007 | Perangkat tidak tersedia |
| 50001 | Kesalahan internal server |