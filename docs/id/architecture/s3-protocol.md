# Protokol S3

## Ikhtisar

Memesplora menyediakan API yang kompatibel dengan AWS S3, memungkinkan penggunaan klien kompatibel S3 apa pun (seperti rclone, AWS CLI, MinIO Client) untuk mengakses ruang penyimpanan secara langsung.

## Port

S3 API mendengarkan di port `:5213`.

## Otentikasi

Menggunakan algoritma tanda tangan AWS Signature V4. Access Key dan Secret Key diperoleh dari antarmuka manajemen web.

## API S3 yang Didukung

### Operasi Bucket

| Operasi | HTTP | Jalur | Deskripsi |
|---------|------|------|-----------|
| ListBuckets | GET | `/` | Mendaftar semua Bucket (ruang) |
| HeadBucket | HEAD | `/{bucket}` | Memeriksa apakah Bucket ada |
| GetBucketLocation | GET | `/{bucket}?location` | Mendapatkan wilayah Bucket |

### Operasi Objek

| Operasi | HTTP | Jalur | Deskripsi |
|---------|------|------|-----------|
| GetObject | GET | `/{bucket}/{key}` | Mengunduh objek |
| PutObject | PUT | `/{bucket}/{key}` | Mengunggah objek |
| DeleteObject | DELETE | `/{bucket}/{key}` | Menghapus objek |
| HeadObject | HEAD | `/{bucket}/{key}` | Mendapatkan metadata objek |
| ListObjects | GET | `/{bucket}` | Mendaftar objek |
| ListObjectsV2 | GET | `/{bucket}?list-type=2` | Mendaftar objek V2 |
| DeleteObjects | POST | `/{bucket}?delete` | Menghapus massal |
| CopyObject | PUT | `/{bucket}/{key}` (x-amz-copy-source) | Menyalin objek |

### Unggahan Multi-Bagian

| Operasi | HTTP | Jalur | Deskripsi |
|---------|------|------|-----------|
| CreateMultipartUpload | POST | `/{bucket}/{key}?uploads` | Menginisialisasi unggahan multi-bagian |
| UploadPart | PUT | `/{bucket}/{key}?partNumber=&uploadId=` | Mengunggah bagian |
| CompleteMultipartUpload | POST | `/{bucket}/{key}?uploadId=` | Menyelesaikan unggahan multi-bagian |
| AbortMultipartUpload | DELETE | `/{bucket}/{key}?uploadId=` | Membatalkan unggahan multi-bagian |
| ListParts | GET | `/{bucket}/{key}?uploadId=` | Mendaftar bagian yang diunggah |

## Contoh Penggunaan

### Menggunakan AWS CLI

```bash
# Konfigurasi
aws configure --profile memesplora
# AWS Access Key ID: your-access-key
# AWS Secret Access Key: your-secret-key
# Default region: us-east-1

# Mendaftar Bucket
aws s3 --endpoint-url http://localhost:5213 ls

# Mengunggah file
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/

# Mengunduh file
aws s3 --endpoint-url http://localhost:5213 cp s3://my-space/file.txt .

# Mendaftar objek
aws s3 --endpoint-url http://localhost:5213 ls s3://my-space/
```

### Menggunakan rclone

```bash
# Konfigurasi remote
rclone config
# Pilih S3 Compatible
# endpoint: http://localhost:5213
# access_key_id: your-access-key
# secret_access_key: your-secret-key

# Mengunggah file
rclone copy file.txt memesplora:my-space/

# Mengunduh file
rclone copy memesplora:my-space/file.txt .

# Mendaftar file
rclone ls memesplora:my-space/
```

### Menggunakan MinIO Client

```bash
# Konfigurasi alias
mc alias set memesplora http://localhost:5213 your-access-key your-secret-key

# Mendaftar Bucket
mc ls memesplora

# Mengunggah file
mc cp file.txt memesplora/my-space/

# Mengunduh file
mc cp memesplora/my-space/file.txt .
```

## Respons Kesalahan

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

## Verifikasi Tanda Tangan

Mendukung algoritma tanda tangan AWS Signature V4:

1. Hitung kunci tanda tangan
2. Buat permintaan kanonis
3. Hitung tanda tangan
4. Verifikasi tanda tangan cocok dengan `Authorization` di header permintaan

## Catatan

- Nama Bucket sesuai dengan nama ruang di Memesplora
- Object Key sesuai dengan jalur file
- Saat ini tidak mendukung Bucket Policy dan ACL (semua akses dikontrol melalui otentikasi pengguna)
- Tidak mendukung versioning S3