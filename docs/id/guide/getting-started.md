# Memulai

## Pendahuluan

Memesplora mengubah memori sistem (RAM) dan memori video GPU (VRAM) menjadi sistem file berkecepatan tinggi. Pengguna dapat memilih perangkat penyimpanan, membuat ruang dengan ukuran khusus, dan mengelola berkas seperti sistem file biasa — dengan dukungan REST API, protokol kompatibel S3, dan WebDAV.

## Persyaratan Sistem

### Perangkat Keras
- **CPU**: Prosesor x86_64 / ARM64 apa pun
- **RAM**: Setidaknya 512MB tersedia untuk layanan
- **GPU (opsional)**: GPU NVIDIA dengan dukungan CUDA 12+ untuk penyimpanan VRAM

### Perangkat Lunak
- **OS**: Linux (disarankan), Windows, macOS
- **Go**: 1.22+ (hanya pengembangan)
- **Node.js**: 20+ (hanya pengembangan frontend)

## Instalasi Cepat

### Opsi 1: Unduh Biner Siap Pakai

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### Opsi 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### Opsi 3: Bangun dari Sumber

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# Backend
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# Frontend (opsional, untuk pengembangan)
cd ../frontend
npm install
npm run dev
```

## Penggunaan Pertama

1. Buka peramban Anda di `http://localhost:5212`
2. Temukan kata sandi admin di log startup server
3. Buka halaman "Perangkat" untuk melihat perangkat penyimpanan yang tersedia
4. Buat ruang penyimpanan
5. Mulai kelola berkas!

## Konfigurasi

```yaml
# config.yaml
server:
  http_port: 5212        # REST API dan port Web UI
  s3_port: 5213          # Port API kompatibel S3
  webdav_port: 5214      # Port layanan WebDAV
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "ganti-ini-dengan-string-acak"
  token_expire: 24h
```

## Koneksi Klien

### Klien S3

```bash
# Menggunakan rclone
rclone config
# Pilih S3 Compatible, endpoint: http://localhost:5213

# Menggunakan AWS CLI
aws configure
# Set endpoint: http://localhost:5213
```

### Klien WebDAV

```
# macOS Finder
Go > Connect to Server > http://localhost:5214

# Windows Explorer
Klik kanan "This PC" > Map network drive > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```