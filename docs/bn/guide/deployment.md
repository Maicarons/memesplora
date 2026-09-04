# ডিপ্লয়মেন্ট গাইড

## বিল্ডিং

### ব্যাকএন্ড

```bash
cd backend
go build -o memesplora ./cmd/server

# ক্রস-কম্পাইলেশন
GOOS=linux GOARCH=amd64 go build -o memesplora-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o memesplora-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o memesplora-darwin-amd64 ./cmd/server
```

### ফ্রন্টএন্ড

```bash
cd frontend
npm run build
# আউটপুট dist/ তে
```

## Docker ডিপ্লয়মেন্ট

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

## Nginx রিভার্স প্রক্সি

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

## নিরাপত্তা সুপারিশ

1. **JWT সিক্রেট পরিবর্তন করুন**: একটি শক্তিশালী র্যান্ডম স্ট্রিং ব্যবহার করুন
2. **HTTPS সক্রিয় করুন**: Let's Encrypt বা SSL কনফিগার করুন
3. **ফায়ারওয়াল**: IP দ্বারা S3/WebDAV পোর্ট অ্যাক্সেস সীমিত করুন
4. **ব্যাকআপ**: নিয়মিতভাবে SQLite/PostgreSQL ডাটাবেস ব্যাকআপ করুন