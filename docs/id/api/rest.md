# Referensi REST API

## Informasi Dasar

- **Base URL**: `http://localhost:5212/api/v3`
- **Metode Otentikasi**: JWT Bearer Token
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

```http
POST /api/v3/admin/login
Content-Type: application/json

{"username": "admin", "password": "your-password"}
```

### Mendapatkan Sesi Saat Ini

```http
GET /api/v3/user/session
Authorization: Bearer <token>
```

## API Manajemen Perangkat

### Mendaftar Semua Perangkat

```http
GET /api/v3/device
Authorization: Bearer <token>
```

### Pemeriksaan Kesehatan Perangkat

```http
GET /api/v3/device/:id/health
Authorization: Bearer <token>
```

## API Manajemen Ruang

### Membuat Ruang

```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json

{"name": "Ruang Saya", "total_size": 1073741824, "device_id": "ram_0"}
```

### Mendaftar Ruang

```http
GET /api/v3/space
Authorization: Bearer <token>
```

### Mengubah Ukuran Ruang

```http
POST /api/v3/space/:id/resize
Authorization: Bearer <token>
Content-Type: application/json

{"new_size": 2147483648}
```

## API Manajemen File

### Mendaftar File

```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### Mengunggah File

```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

### Mengunduh File

```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

### Mengganti Nama/Memindahkan/Menyalin/Menghapus

```http
POST /api/v3/space/:id/files/:fileId/rename  {"name": "new.txt"}
POST /api/v3/space/:id/files/:fileId/move    {"dest_path": "/newdir"}
POST /api/v3/space/:id/files/:fileId/copy    {"dest_path": "/backup"}
DELETE /api/v3/space/:id/files/:fileId
```

## API Berbagi

```http
POST /api/v3/share
Authorization: Bearer <token>
Content-Type: application/json

{"file_id": "file_1", "space_id": "space_1", "download_limit": 5}

GET /api/v3/share/list
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
| 50001 | Kesalahan internal server |

## Detail Arsitektur

Lihat [Arsitektur REST API](/id/architecture/rest-api) untuk memahami desain detail.