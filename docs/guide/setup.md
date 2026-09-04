# Setting Up Development Environment

## Prerequisites

### Required Tools
- **Go**: 1.22 or higher
- **Node.js**: 20 LTS or higher
- **npm**: 10+ or **pnpm** 8+
- **Git**: Latest version

### Optional Tools
- **Docker**: For containerized deployment
- **CUDA Toolkit**: 12+, for GPU VRAM development
- **Make**: For using Makefile commands

## Clone the Project

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## Install Dependencies

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

### Documentation

```bash
cd docs
npm install
```

## Development Mode

### Start Backend

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### Start Frontend (separate terminal)

```bash
cd frontend
npm run dev
```

### Start Documentation (separate terminal)

```bash
cd docs
npm run dev
```

## Verify Installation

1. Backend: `http://localhost:5212/health` should return `{"status":"ok"}`
2. Frontend: `http://localhost:5173` should show the login page
3. Docs: `http://localhost:5174` should show the documentation site

## GPU Development Setup

### NVIDIA CUDA

1. Install NVIDIA driver (545+ recommended)
2. Install CUDA Toolkit 12+

```bash
nvidia-smi  # Verify GPU
nvcc --version  # Verify CUDA
```