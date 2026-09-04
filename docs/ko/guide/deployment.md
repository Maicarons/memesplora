# 배포 가이드

## 빌드

### 백엔드

```bash
cd backend
go build -o memesplora ./cmd/server

# 크로스 컴파일
GOOS=linux GOARCH=amd64 go build -o memesplora-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o memesplora-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o memesplora-darwin-amd64 ./cmd/server
```

### 프론트엔드

```bash
cd frontend
npm run build
# dist/에 출력
```

## Docker 배포

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY backend/ .
RUN go build -o memesplora ./cmd/server

FROM alpine:3.19
COPY --from=builder /build/memesplora /usr/local/bin/
EXPOSE 5212 5213 5214
ENTRYPOINT ["memesplora"]
```

```bash
docker build -t memesplora .
docker run -d -p 5212:5212 -p 5213:5213 -p 5214:5214 -e MEMESPLORA_MEMORY_SIZE=1073741824 memesplora
```

## Nginx 역방향 프록시

```nginx
server {
    listen 80;
    server_name memesplora.example.com;

    location / {
        proxy_pass http://127.0.0.1:5212;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # S3 API
    location /s3/ {
        proxy_pass http://127.0.0.1:5213/;
    }

    # WebDAV
    location /webdav/ {
        proxy_pass http://127.0.0.1:5214/;
        client_max_body_size 0;
    }
}
```

## 보안 권장 사항

1. **JWT 시크릿 변경**: 강력한 무작위 문자열 사용
2. **HTTPS 활성화**: Let's Encrypt 또는 SSL 설정
3. **방화벽**: IP별로 S3/WebDAV 포트 접근 제한
4. **백업**: SQLite/PostgreSQL 데이터베이스 정기적 백업