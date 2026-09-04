# Struktur Proyek

```
memesplora/
├── backend/                    # Backend Go
│   ├── cmd/server/main.go     # Titik masuk
│   └── internal/
│       ├── device/            # Manajemen perangkat RAM/VRAM
│       ├── fs/                # Sistem file di memori
│       ├── api/               # Penangan REST API
│       ├── api/middleware/     # Otentikasi, CORS, pembatasan kecepatan
│       ├── s3/                # API kompatibel S3
│       ├── webdav/            # Protokol WebDAV
│       └── service/           # Lapisan logika bisnis
├── frontend/                   # React SPA
│   └── src/
│       ├── api/               # Klien API (Axios)
│       ├── components/        # Komponen bersama
│       ├── pages/             # Komponen halaman
│       ├── stores/            # Manajemen status Zustand
│       ├── types/             # Definisi tipe TypeScript
│       └── utils/             # Fungsi utilitas
├── docs/                       # Dokumentasi VitePress
│   ├── .vitepress/config.ts   # Konfigurasi VitePress
│   ├── guide/                 # Panduan pengguna (Inggris)
│   ├── architecture/          # Dokumen arsitektur (Inggris)
│   ├── api/                   # Referensi API (Inggris)
│   ├── zh-CN/                 # Dokumentasi bahasa Mandarin
│   ├── hi/                    # Hindi (halaman arahan)
│   ├── es/                    # Spanyol (halaman arahan)
│   └── ...                    # Bahasa lainnya
├── scripts/                    # Skrip build dan pengujian
├── .github/workflows/         # Pipeline CI/CD
├── Dockerfile
├── docker-compose.yml
└── Makefile
```