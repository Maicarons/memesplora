# 环境搭建

## 开发环境要求

### 必需工具
- **Go**: 1.22 或更高版本
- **Node.js**: 20 LTS 或更高版本
- **npm**: 10+ 或 **pnpm** 8+
- **Git**: 最新版本

### 可选工具
- **Docker**: 用于容器化部署
- **CUDA Toolkit**: 12+，用于 GPU 显存开发
- **Make**: 用于使用 Makefile 命令

## 安装 Go

### Linux

```bash
wget https://go.dev/dl/go1.22.4.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.4.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
go version
```

### Windows

1. 下载 [Go 安装包](https://go.dev/dl/)
2. 运行安装程序
3. 验证安装：`go version`

### macOS

```bash
brew install go@1.22
```

## 安装 Node.js

### 使用 nvm（推荐）

```bash
# Linux/macOS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20

# Windows
# 下载 nvm-windows: https://github.com/coreybutler/nvm-windows/releases
nvm install 20
nvm use 20
```

## 克隆项目

```bash
git clone https://github.com/memesplora/memesplora.git
cd memesplora
```

## 安装依赖

### 后端依赖

```bash
cd backend
go mod tidy
```

### 前端依赖

```bash
cd frontend
npm install
```

### 文档依赖

```bash
cd docs
npm install
```

## 开发运行

### 启动后端（开发模式）

```bash
cd backend
go run ./cmd/server
```

### 启动前端（开发模式）

```bash
cd frontend
npm run dev
```

### 启动文档（开发模式）

```bash
cd docs
npm run dev
```

## 验证安装

1. 后端启动后，访问 `http://localhost:5212/api/v3/admin/login` 应返回 200
2. 前端启动后，访问 `http://localhost:5173` 应看到登录页面
3. 文档启动后，访问 `http://localhost:5174` 应看到文档首页

## 配置 GPU 开发环境

### NVIDIA CUDA

1. 安装 NVIDIA 驱动（推荐 545+）
2. 安装 CUDA Toolkit 12+

```bash
# Linux
wget https://developer.download.nvidia.com/compute/cuda/12.4.0/local_installers/cuda_12.4.0_550.54.14_linux.run
sudo sh cuda_12.4.0_550.54.14_linux.run
```

3. 验证安装

```bash
nvidia-smi
nvcc --version
```

### Go NVML 绑定

```bash
cd backend
go get github.com/NVIDIA/go-nvml@v0.12.0
```