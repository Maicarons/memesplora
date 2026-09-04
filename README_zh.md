# Memesplora

**内存 & 显存文件系统** — 将 RAM 和 GPU 显存作为高速文件系统使用。

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?logo=go)](https://golang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)

---

## 概述

Memesplora 将系统内存（RAM）和 GPU 显存（VRAM）转化为一个功能完整的文件系统。用户可以选择存储设备、创建自定义大小的空间，通过 Cloudreve 风格的文件管理界面管理文件——同时支持 REST API、S3 兼容协议和 WebDAV。

### 核心功能

- 🚀 **极致速度** — 基于 RAM/VRAM 的存储，延迟低至纳秒级
- 🎮 **GPU 显存支持** — 利用 NVIDIA CUDA 显卡作为存储设备
- 📁 **Cloudreve 风格界面** — 现代文件管理界面，支持网格/列表视图、拖拽上传、目录树、文件预览（文本、图片、视频、音频、PDF）
- 🔌 **多协议支持** — REST API + S3 兼容 API + WebDAV
- 🌙 **暗黑模式** — 内置暗色/亮色主题切换
- 📦 **单文件部署** — Go 后端编译为单一可执行文件，前端内嵌

---

## 快速开始

### 前置要求

- **Go** 1.22+（源码编译）
- **Node.js** 20+（前端开发）

### 源码编译

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# 编译并运行后端
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# （可选）启动前端开发服务器
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

### 访问地址

| 服务 | 端口 | 说明 |
|------|:----:|------|
| Web 管理界面 | `:5173` | React 前端（开发模式） |
| REST API | `:5212` | 文件管理 API |
| S3 API | `:5213` | 兼容 AWS S3 协议 |
| WebDAV | `:5214` | WebDAV 协议 |

管理员账号和密码在服务器启动日志中输出。

---

## 文档

完整文档在 [docs/](docs/) 目录，使用 VitePress 构建：

```bash
cd docs
npm install
npm run dev
```

---

## 技术栈

| 层次 | 技术 |
|------|------|
| 后端 | Go 1.22+, Gin, ent, golang.org/x/net/webdav |
| 前端 | React 18, TypeScript, Ant Design 5, Zustand, Vite |
| 数据库 | SQLite / PostgreSQL（仅元数据） |
| 内存 | mmap（Linux/macOS）/ VirtualAlloc（Windows）|
| 显存 | CUDA + NVML（存根，可集成） |

---

## 项目结构

```
memesplora/
├── backend/          # Go 后端
│   ├── cmd/server/   # 入口
│   └── internal/     # 核心模块
│       ├── device/   # RAM/VRAM 设备管理
│       ├── fs/       # 内存文件系统
│       ├── api/      # REST API 处理器
│       ├── s3/       # S3 兼容 API
│       ├── webdav/   # WebDAV 协议
│       └── service/  # 业务逻辑
├── frontend/         # React SPA
│   └── src/          # 组件、页面、状态管理
├── docs/             # VitePress 文档
│   ├── architecture/ # 系统架构文档
│   ├── api/          # API 参考
│   └── guide/        # 用户指南
└── scripts/          # 构建与测试脚本
```

---

## 测试

```bash
# 单元测试
cd backend && go test -v ./...

# E2E 测试（需要运行服务器）
bash scripts/e2e_test.sh
```

---

## 开发路线图

- [x] RAM 设备支持（Linux/Windows）
- [x] 内存文件系统（目录树）
- [x] REST API（文件 CRUD、空间管理、分享）
- [x] S3 兼容协议
- [x] WebDAV 协议
- [x] React 前端（Cloudreve 风格）
- [x] 暗黑模式
- [ ] GPU VRAM（CUDA）完整集成
- [ ] 文件版本管理
- [ ] 用户注册与多用户支持
- [ ] 实时文件同步
- [ ] 移动端适配

---

## 许可证

本项目基于 Apache License 2.0 许可 — 详见 [LICENSE](LICENSE) 文件。

---

## 贡献

欢迎贡献代码！请阅读 [docs/guide/contributing.md](docs/guide/contributing.md) 了解贡献指南。