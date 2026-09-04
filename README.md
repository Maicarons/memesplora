# Memesplora

**Memory & VRAM Filesystem** — Use RAM and GPU VRAM as a high-speed file system.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?logo=go)](https://golang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
[![Docs](https://img.shields.io/badge/docs-vitepress-41B883?logo=vitepress)](https://maicarons.github.io/memesplora/)

---

## Overview

Memesplora transforms system memory (RAM) and GPU video memory (VRAM) into a fully functional file system. Users can select storage devices, create custom-sized spaces, and manage files through a Cloudreve-inspired web interface — with support for REST API, S3-compatible protocol, and WebDAV.

### Key Features

- 🚀 **Blazing Fast** — RAM/VRAM-based storage with nanosecond-level latency
- 🎮 **GPU VRAM Support** — Leverage NVIDIA CUDA-enabled GPUs as storage devices
- 📁 **Cloudreve-Style UI** — Modern file management interface with file grid/list views, drag-and-drop upload, directory tree, and file preview (text, image, video, audio, PDF)
- 🔌 **Multi-Protocol** — REST API + S3-compatible API + WebDAV
- 🌙 **Dark Mode** — Built-in dark/light theme toggle
- 📦 **Single Binary** — Go backend compiled into one executable, frontend embedded

---

## Quick Start

### Prerequisites

- **Go** 1.22+ (for building from source)
- **Node.js** 20+ (for frontend development)

### From Source

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# Build and run backend
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# (Optional) Start frontend dev server
cd ../frontend
npm install
npm run dev
```

### Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### Access

| Service | Port | Description |
|---------|:----:|-------------|
| Web UI | `:5173` | React frontend (dev mode) |
| REST API | `:5212` | File management API |
| S3 API | `:5213` | AWS S3-compatible protocol |
| WebDAV | `:5214` | WebDAV protocol |

Default admin credentials are printed in the server startup log.

---

## Documentation

Full documentation is available online at [maicarons.github.io/memesplora](https://maicarons.github.io/memesplora/) or in the [docs/](docs/) directory, built with VitePress:

```bash
cd docs
npm install
npm run dev
```

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Interface                      │
│   Web UI (React)  ·  S3 Clients  ·  WebDAV Clients   │
├─────────────────────────────────────────────────────┤
│                    API Gateway                        │
│   REST API  ·  S3-compatible API  ·  WebDAV Handler  │
├─────────────────────────────────────────────────────┤
│                   Service Layer                       │
│   Auth · File Management · Space Management · Shares │
├─────────────────────────────────────────────────────┤
│               Storage Abstraction Layer               │
│   In-Memory FileSystem (Inode + Block-based)         │
├─────────────────────────────────────────────────────┤
│                Device Management Layer                │
│   RAM (mmap / VirtualAlloc)  ·  VRAM (CUDA)          │
└─────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Go 1.22+, Gin, ent, golang.org/x/net/webdav |
| Frontend | React 18, TypeScript, Ant Design 5, Zustand, Vite |
| Database | SQLite / PostgreSQL (metadata only) |
| RAM | mmap (Linux/macOS) / VirtualAlloc (Windows) |
| VRAM | CUDA + NVML (stub, ready for integration) |

---

## Project Structure

```
memesplora/
├── backend/          # Go backend
│   ├── cmd/server/   # Entry point
│   └── internal/     # Core modules
│       ├── device/   # RAM/VRAM device management
│       ├── fs/       # In-memory filesystem
│       ├── api/      # REST API handlers
│       ├── s3/       # S3-compatible API
│       ├── webdav/   # WebDAV protocol
│       └── service/  # Business logic
├── frontend/         # React SPA
│   └── src/          # Components, pages, stores
├── docs/             # VitePress documentation
│   ├── architecture/ # System architecture docs
│   ├── api/          # API reference
│   └── guide/        # User guides
└── scripts/          # Build & test scripts
```

---

## Testing

```bash
# Unit tests
cd backend && go test -v ./...

# E2E tests (requires running server)
bash scripts/e2e_test.sh
```

---

## Roadmap

- [x] RAM device support (Linux/Windows)
- [x] In-memory filesystem with directory tree
- [x] REST API (file CRUD, space management, sharing)
- [x] S3-compatible protocol
- [x] WebDAV protocol
- [x] React frontend with Cloudreve-style UI
- [x] Dark mode
- [ ] GPU VRAM (CUDA) full integration
- [ ] File versioning
- [ ] User registration & multi-user support
- [ ] Real-time file sync
- [ ] Mobile-responsive layout

---

## License

This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please read [docs/guide/contributing.md](docs/guide/contributing.md) for guidelines.