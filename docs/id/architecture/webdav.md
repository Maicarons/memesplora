# Protokol WebDAV

## Ikhtisar

Memesplora mendukung protokol WebDAV, memungkinkan ruang penyimpanan dipetakan sebagai jaringan drive, sehingga file dapat dioperasikan langsung di manajer file sistem operasi.

## Port

Layanan WebDAV mendengarkan di port `:5214`.

## Otentikasi

WebDAV menggunakan otentikasi HTTP Basic Auth, dengan nama pengguna dan kata sandi berupa kredensial pengguna dari antarmuka manajemen web.

## Metode WebDAV yang Didukung

| Metode | Deskripsi | Status Implementasi |
|--------|-----------|:------------------:|
| PROPFIND | Mendapatkan properti sumber daya dan anggota koleksi | ✅ |
| PROPPATCH | Memodifikasi properti sumber daya | ✅ |
| MKCOL | Membuat koleksi (direktori) | ✅ |
| GET | Mendapatkan konten sumber daya | ✅ |
| PUT | Mengunggah sumber daya | ✅ |
| DELETE | Menghapus sumber daya | ✅ |
| COPY | Menyalin sumber daya | ✅ |
| MOVE | Memindahkan sumber daya | ✅ |
| LOCK | Mengunci sumber daya | ✅ |
| UNLOCK | Membuka kunci sumber daya | ✅ |
| OPTIONS | Mendapatkan metode yang didukung | ✅ |

## Contoh Penggunaan

### macOS Finder

```
Menu > Go > Connect to Server
Masukkan: http://localhost:5214
Masukkan nama pengguna dan kata sandi
```

### Windows Explorer

```
Klik kanan "This PC" > Map network drive
Masukkan: http://localhost:5214
Centang "Connect using different credentials"
Masukkan nama pengguna dan kata sandi
```

### Linux

```bash
# Instal davfs2
sudo apt install davfs2

# Mount
sudo mount -t davfs http://localhost:5214 /mnt/memesplora

# Atau gunakan /etc/fstab untuk mount otomatis
echo "http://localhost:5214 /mnt/memesplora davfs rw,user,noauto 0 0" | sudo tee -a /etc/fstab
```

### Menggunakan curl

```bash
# Mendaftar direktori
curl -X PROPFIND http://localhost:5214/ \
  -u username:password \
  -H "Depth: 1"

# Membuat direktori
curl -X MKCOL http://localhost:5214/new-folder \
  -u username:password

# Mengunggah file
curl -T file.txt http://localhost:5214/file.txt \
  -u username:password

# Mengunduh file
curl -o file.txt http://localhost:5214/file.txt \
  -u username:password
```

## Arsitektur Implementasi

WebDAV diimplementasikan menggunakan paket `golang.org/x/net/webdav`, dengan inti berupa pola adaptor:

```go
// Adaptor: mengadaptasi sistem file memori menjadi webdav.FileSystem
type MemFSAdapter struct {
    mfs *fs.MemFileSystem
}

func (a *MemFSAdapter) Mkdir(ctx context.Context, name string, perm os.FileMode) error {
    return a.mfs.Mkdir(ctx, name, getOwnerID(ctx))
}

func (a *MemFSAdapter) OpenFile(ctx context.Context, name string, flag int, perm os.FileMode) (webdav.File, error) {
    return a.mfs.Open(ctx, name)
}

func (a *MemFSAdapter) RemoveAll(ctx context.Context, name string) error {
    return a.mfs.Delete(ctx, name)
}

func (a *MemFSAdapter) Rename(ctx context.Context, oldName, newName string) error {
    return a.mfs.Rename(ctx, oldName, newName)
}

func (a *MemFSAdapter) Stat(ctx context.Context, name string) (os.FileInfo, error) {
    info, err := a.mfs.Stat(ctx, name)
    if err != nil {
        return nil, err
    }
    return &memFileInfo{info}, nil
}
```

## Manajemen Kunci

Kunci WebDAV digunakan untuk mencegah konflik tulis bersamaan:

- **Kunci Eksklusif**: Hanya satu klien yang dapat mengubah sumber daya pada satu waktu
- **Kunci Bersama**: Beberapa klien dapat membaca secara bersamaan, tetapi tidak dapat menulis
- **Waktu Habis Kunci**: Melepaskan kunci kedaluwarsa secara otomatis
- **Token Kunci**: Digunakan untuk mengidentifikasi dan membuka kunci

## Manajemen Properti

WebDAV mendukung dua jenis properti:

- **Live Properties**: Dihitung secara dinamis, seperti ukuran file, waktu modifikasi
- **Dead Properties**: Properti XML khusus pengguna

## Catatan

- File yang dibuat melalui WebDAV terlihat secara real-time di antarmuka manajemen web
- Batas ukuran file dikontrol oleh kuota ruang
- Disarankan menggunakan HTTPS untuk melindungi komunikasi WebDAV