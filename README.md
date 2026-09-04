# Memesplora

将内存/显存等存储设备作为文件系统的开源项目。

## 功能

- 🚀 基于 RAM/VRAM 的高速文件系统
- 📁 类 Cloudreve 的文件管理界面
- 🔌 支持 REST API / S3 协议 / WebDAV
- 🎮 支持 GPU 显存 (NVIDIA CUDA)
- 📦 单二进制部署

## 快速开始

```bash
# 构建
cd backend && go build -o memesplora ./cmd/server

# 运行
./memesplora
```

## 文档

详细文档请查看 [docs/](docs/) 目录，使用 VitePress 构建：

```bash
cd docs && npm install && npm run dev
```

## 技术栈

- **后端**: Go 1.22+, Gin, ent, golang.org/x/net/webdav
- **前端**: React 18, TypeScript, Ant Design 5, Zustand, Vite
- **文档**: VitePress
- **数据库**: SQLite / PostgreSQL