# 部署指南

## 构建

### 构建后端

```bash
cd backend

# 构建当前平台
go build -o memesplora ./cmd/server

# 交叉构建
GOOS=linux GOARCH=amd64 go build -o memesplora-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o memesplora-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o memesplora-darwin-amd64 ./cmd/server
```

### 构建前端

```bash
cd frontend
npm run build
# 构建产物在 dist/ 目录
```

### 构建文档

```bash
cd docs
npm run build
# 构建产物在 .vitepress/dist/ 目录
```

## 部署方式

### 方式一：单机部署（All-in-One）

后端编译时使用 `//go:embed` 内嵌前端静态文件，生成单一二进制：

```bash
cd backend
go build -o memesplora -tags=embed ./cmd/server
./memesplora
```

### 方式二：Docker 部署

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY backend/ .
RUN go build -o memesplora ./cmd/server

FROM alpine:3.19
RUN apk add --no-cache ca-certificates tzdata
COPY --from=builder /build/memesplora /usr/local/bin/
COPY --from=builder /build/config.yaml /etc/memesplora/
EXPOSE 5212 5213 5214
VOLUME ["/data"]
ENTRYPOINT ["memesplora"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  memesplora:
    build: .
    ports:
      - "5212:5212"
      - "5213:5213"
      - "5214:5214"
    volumes:
      - ./data:/data
    restart: unless-stopped
```

### 方式三：Docker Compose（带 PostgreSQL）

```yaml
version: '3.8'
services:
  memesplora:
    build: .
    ports:
      - "5212:5212"
      - "5213:5213"
      - "5214:5214"
    environment:
      - DB_DRIVER=postgres
      - DB_DSN=postgres://memesplora:password@postgres:5432/memesplora
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: memesplora
      POSTGRES_USER: memesplora
      POSTGRES_PASSWORD: password
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    restart: unless-stopped
```

## 生产环境配置

```yaml
# config.yaml
server:
  http_port: 5212
  s3_port: 5213
  webdav_port: 5214
  host: "0.0.0.0"

database:
  driver: postgres
  dsn: "postgres://memesplora:password@localhost:5432/memesplora?sslmode=disable"

auth:
  jwt_secret: "your-strong-random-secret-here"
  token_expire: 24h

storage:
  default_block_size: 4096
  max_space_size: 1TB
  allow_vram: false

log:
  level: info
  file: /var/log/memesplora.log
```

## Nginx 反向代理

```nginx
server {
    listen 80;
    server_name memesplora.example.com;

    # REST API + Web 管理界面
    location / {
        proxy_pass http://127.0.0.1:5212;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # S3 API
    location /s3/ {
        proxy_pass http://127.0.0.1:5213/;
        proxy_set_header Host $host;
    }

    # WebDAV
    location /webdav/ {
        proxy_pass http://127.0.0.1:5214/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        client_max_body_size 0;
    }
}
```

## 安全建议

1. **更换 JWT 密钥**：使用强随机字符串作为 `jwt_secret`
2. **启用 HTTPS**：使用 Let's Encrypt 或反向代理配置 SSL
3. **限制访问**：通过防火墙限制 S3/WebDAV 端口的访问来源
4. **定期备份**：数据库中的元数据需要定期备份
5. **监控告警**：配置内存使用率告警，防止 OOM