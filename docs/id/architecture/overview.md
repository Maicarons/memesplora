# Ikhtisar Arsitektur

## Arsitektur Sistem

```
┌──────────────────────────────────────────────────────────────────┐
│                   Lapisan Antarmuka Pengguna                       │
│   Web UI (React)  ·  Klien S3 (rclone, AWS CLI)  ·  WebDAV      │
└──────────────┬──────────────────────┬────────────────┬───────────┘
               │                      │                │
        ┌──────▼──────┐       ┌──────▼──────┐  ┌─────▼──────┐
        │  REST API   │       │  S3 API     │  │  WebDAV    │
        │  :5212      │       │  :5213      │  │  :5214     │
        └──────┬──────┘       └──────┬──────┘  └─────┬──────┘
               │                      │                │
        ┌──────▼──────────────────────▼────────────────▼──────┐
        │                    Gin Router                        │
        │         Middleware: CORS → Auth → Rate Limit         │
        └──────────┬───────────────────────────────────────────┘
                   │
        ┌──────────▼───────────────────────────────────────────┐
        │                    Lapisan Layanan                     │
        │  Auth · Manajemen Berkas · Manajemen Ruang · Berbagi  │
        └──────────┬───────────────────────────────────────────┘
                   │
        ┌──────────▼───────────────────────────────────────────┐
        │                 Abstraksi Penyimpanan                  │
        │         Sistem File Dalam Memori (Berbasis Inode + Blok)│
        │  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐  │
        │  │ RAM      │ │ VRAM    │ │ Swap/Persist         │  │
        │  │ Driver   │ │ Driver  │ │ Layer (opsional)     │  │
        │  └────┬─────┘ └────┬─────┘ └──────────────────────┘  │
        └───────┼─────────────┼─────────────────────────────────┘
                │             │
        ┌───────▼─────────────▼─────────────────────────────────┐
        │              Lapisan Manajemen Perangkat               │
        │  mmap / VirtualAlloc / CUDA / NVML                     │
        └───────────────────────────────────────────────────────┘
```

## Peta Port

| Port | Layanan | Deskripsi |
|:----:|---------|-----------|
| 5212 | REST API + Web UI | Port utama untuk HTTP API dan frontend |
| 5213 | S3 API | Protokol kompatibel AWS S3 |
| 5214 | WebDAV | Protokol WebDAV |

## Tumpukan Teknologi

| Lapisan | Teknologi |
|---------|-----------|
| Backend | Go 1.22+, Gin, ent, golang.org/x/net/webdav |
| Frontend | React 18, TypeScript, Ant Design 5, Zustand, Vite |
| Database | SQLite / PostgreSQL (metadata saja) |
| RAM | mmap (Linux/macOS) / VirtualAlloc (Windows) |
| VRAM | CUDA + NVML (stub, siap untuk integrasi) |