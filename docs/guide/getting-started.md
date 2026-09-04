# 快速开始

## 简介

Memesplora 是一个将内存（RAM）和显存（VRAM）等存储设备作为高速文件系统的开源项目。用户可以选择设备、创建自定义大小的存储空间，像管理普通文件一样管理内存中的数据。

## 系统要求

### 硬件要求
- **CPU**: 任意 x86_64 / ARM64 处理器
- **内存**: 至少 512MB 可用 RAM（用于运行服务本身）
- **GPU（可选）**: NVIDIA GPU 支持 CUDA 12+，用于 VRAM 存储

### 软件要求
- **操作系统**: Linux（推荐）、Windows、macOS
- **Go**: 1.22+（仅开发需要）
- **Node.js**: 20+（仅前端开发需要）

## 快速安装

### 方式一：下载预编译二进制

```bash
# 从 Release 页面下载对应平台的二进制文件
# Linux
wget https://github.com/memesplora/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora

# 访问 http://localhost:5212 进入管理界面
```

### 方式二：Docker 部署

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -v ./data:/data \
  memesplora/memesplora:latest
```

### 方式三：源码编译

```bash
# 克隆仓库
git clone https://github.com/memesplora/memesplora.git
cd memesplora

# 构建后端
cd backend
go build -o memesplora ./cmd/server

# 构建前端
cd ../frontend
npm install
npm run build

# 运行
./backend/memesplora
```

## 首次使用

1. 打开浏览器访问 `http://localhost:5212`
2. 注册管理员账号
3. 进入"设备管理"页面，查看可用内存设备
4. 创建一个新的存储空间
5. 进入"文件管理"页面，开始使用

## 配置说明

```yaml
# config.yaml
server:
  http_port: 5212        # REST API 和 Web 管理端口
  s3_port: 5213          # S3 兼容 API 端口
  webdav_port: 5214      # WebDAV 服务端口
  host: "0.0.0.0"        # 监听地址

database:
  driver: sqlite          # 数据库驱动（sqlite/postgres）
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "change-me-to-a-random-string"
  token_expire: 24h       # Token 过期时间

storage:
  default_block_size: 4096  # 默认块大小（字节）
  max_space_size: 1TB       # 单空间最大容量
  allow_vram: false          # 是否允许使用 GPU 显存
```

## 客户端连接

### S3 客户端

```bash
# 使用 rclone
rclone config
# 选择 S3 Compatible，填写端点 http://localhost:5213
# Access Key 和 Secret Key 在 Web 管理界面获取

# 使用 AWS CLI
aws configure
# 设置端点: http://localhost:5213
```

### WebDAV 客户端

```
# macOS Finder
菜单 > 前往 > 连接服务器 > http://localhost:5214

# Windows 资源管理器
右键"此电脑" > 映射网络驱动器 > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```