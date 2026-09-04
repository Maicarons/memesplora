# Getting Started

## Introduction

Memesplora transforms system memory (RAM) and GPU video memory (VRAM) into a high-speed file system. Users can select storage devices, create custom-sized spaces, and manage files just like a regular file system — with support for REST API, S3-compatible protocol, and WebDAV.

## System Requirements

### Hardware
- **CPU**: Any x86_64 / ARM64 processor
- **RAM**: At least 512MB free for the service
- **GPU (optional)**: NVIDIA GPU with CUDA 12+ support for VRAM storage

### Software
- **OS**: Linux (recommended), Windows, macOS
- **Go**: 1.22+ (development only)
- **Node.js**: 20+ (frontend development only)

## Quick Install

### Option 1: Download Pre-built Binary

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### Option 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### Option 3: Build from Source

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# Backend
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# Frontend (optional, for development)
cd ../frontend
npm install
npm run dev
```

## First Use

1. Open your browser at `http://localhost:5212`
2. Find the admin password in the server startup log
3. Go to the "Devices" page to view available storage devices
4. Create a storage space
5. Start managing files!

## Configuration

```yaml
# config.yaml
server:
  http_port: 5212        # REST API and Web UI port
  s3_port: 5213          # S3-compatible API port
  webdav_port: 5214      # WebDAV service port
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "change-me-to-a-random-string"
  token_expire: 24h
```

## Client Connections

### S3 Clients

```bash
# Using rclone
rclone config
# Select S3 Compatible, endpoint: http://localhost:5213

# Using AWS CLI
aws configure
# Set endpoint: http://localhost:5213
```

### WebDAV Clients

```
# macOS Finder
Go > Connect to Server > http://localhost:5214

# Windows Explorer
Right-click "This PC" > Map network drive > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```