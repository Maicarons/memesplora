# دليل النشر

## البناء

### الواجهة الخلفية

```bash
cd backend
go build -o memesplora ./cmd/server

# التجميع عبر المنصات
GOOS=linux GOARCH=amd64 go build -o memesplora-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o memesplora-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o memesplora-darwin-amd64 ./cmd/server
```

### الواجهة الأمامية

```bash
cd frontend
npm run build
# الإخراج في dist/
```

## النشر باستخدام Docker

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

## Nginx Reverse Proxy

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

## توصيات الأمان

1. **تغيير مفتاح JWT السري**: استخدم سلسلة عشوائية قوية
2. **تفعيل HTTPS**: استخدم Let's Encrypt أو قم بتكوين SSL
3. **جدار الحماية**: قيّد الوصول إلى منافذ S3/WebDAV حسب عنوان IP
4. **النسخ الاحتياطي**: قم بنسخ قاعدة بيانات SQLite/PostgreSQL احتياطيًا بانتظام