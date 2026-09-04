# Referensi Protokol WebDAV

## Ikhtisar

Memesplora mendukung protokol WebDAV, memungkinkan ruang penyimpanan dipetakan sebagai jaringan drive, sehingga file dapat dioperasikan langsung di manajer file sistem operasi.

## Endpoint

**Alamat WebDAV**: `http://localhost:5214`

## Otentikasi

WebDAV menggunakan otentikasi HTTP Basic Auth.

## Metode yang Didukung

| Metode | Deskripsi |
|--------|-----------|
| PROPFIND | Mendapatkan properti sumber daya dan anggota koleksi |
| PROPPATCH | Memodifikasi properti sumber daya |
| MKCOL | Membuat koleksi (direktori) |
| GET | Mendapatkan konten sumber daya |
| PUT | Mengunggah sumber daya |
| DELETE | Menghapus sumber daya |
| COPY | Menyalin sumber daya |
| MOVE | Memindahkan sumber daya |
| LOCK | Mengunci sumber daya |
| UNLOCK | Membuka kunci sumber daya |

## Contoh Penggunaan

### macOS Finder

```
Menu > Go > Connect to Server
Masukkan: http://localhost:5214
```

### Windows Explorer

```
Klik kanan "This PC" > Map network drive
Masukkan: http://localhost:5214
```

### Linux

```bash
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```

### curl

```bash
# Mendaftar direktori
curl -X PROPFIND http://localhost:5214/ -H "Depth: 1"

# Membuat direktori
curl -X MKCOL http://localhost:5214/new-folder

# Mengunggah file
curl -T file.txt http://localhost:5214/file.txt
```

## Detail Arsitektur

Lihat [Arsitektur Protokol WebDAV](/id/architecture/webdav) untuk memahami desain detail.