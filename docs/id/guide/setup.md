# Menyiapkan Lingkungan Pengembangan

## Prasyarat

### Alat yang Diperlukan
- **Go**: 1.22 atau lebih tinggi
- **Node.js**: 20 LTS atau lebih tinggi
- **npm**: 10+ atau **pnpm** 8+
- **Git**: Versi terbaru

### Alat Opsional
- **Docker**: Untuk deployment kontainer
- **CUDA Toolkit**: 12+, untuk pengembangan VRAM GPU
- **Make**: Untuk menggunakan perintah Makefile

## Klon Proyek

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## Instal Dependensi

### Backend

```bash
cd backend
go mod tidy
```

### Frontend

```bash
cd frontend
npm install
```

### Dokumentasi

```bash
cd docs
npm install
```

## Mode Pengembangan

### Mulai Backend

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### Mulai Frontend (terminal terpisah)

```bash
cd frontend
npm run dev
```

### Mulai Dokumentasi (terminal terpisah)

```bash
cd docs
npm run dev
```

## Verifikasi Instalasi

1. Backend: `http://localhost:5212/health` akan mengembalikan `{"status":"ok"}`
2. Frontend: `http://localhost:5173` akan menampilkan halaman masuk
3. Docs: `http://localhost:5174` akan menampilkan situs dokumentasi

## Pengaturan Pengembangan GPU

### NVIDIA CUDA

1. Instal driver NVIDIA (545+ disarankan)
2. Instal CUDA Toolkit 12+

```bash
nvidia-smi  # Verifikasi GPU
nvcc --version  # Verifikasi CUDA
```