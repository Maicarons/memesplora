# डिप्लॉयमेंट गाइड

## निर्माण

### बैकएंड

```bash
cd backend
go build -o memesplora ./cmd/server

# क्रॉस-कंपाइलेशन
GOOS=linux GOARCH=amd64 go build -o memesplora-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o memesplora-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o memesplora-darwin-amd64 ./cmd/server
```

### फ्रंटएंड

```bash
cd frontend
npm run build
# आउटपुट dist/ में
```

## Docker डिप्लॉयमेंट

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

## Nginx रिवर्स प्रॉक्सी

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

## सुरक्षा अनुशंसाएँ

1. **JWT सीक्रेट बदलें**: एक मजबूत रैंडम स्ट्रिंग का उपयोग करें
2. **HTTPS सक्षम करें**: Let's Encrypt या SSL कॉन्फ़िगर करें
3. **फ़ायरवॉल**: S3/WebDAV पोर्ट एक्सेस को IP द्वारा प्रतिबंधित करें
4. **बैकअप**: SQLite/PostgreSQL डेटाबेस का नियमित बैकअप लें