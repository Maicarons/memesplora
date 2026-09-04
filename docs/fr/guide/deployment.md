# Guide de deploiement

## Construction

### Backend

```bash
cd backend
go build -o memesplora ./cmd/server

# Compilation croisee
GOOS=linux GOARCH=amd64 go build -o memesplora-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o memesplora-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o memesplora-darwin-amd64 ./cmd/server
```

### Frontend

```bash
cd frontend
npm run build
# Sortie dans dist/
```

## Deploiement Docker

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

## Proxy inverse Nginx

```nginx
server {
    listen 80;
    server_name memesplora.example.com;

    location / {
        proxy_pass http://127.0.0.1:5212;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # API S3
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

## Recommandations de securite

1. **Changez la cle JWT** : Utilisez une chaine aleatoire forte
2. **Activez HTTPS** : Utilisez Let's Encrypt ou configurez SSL
3. **Pare-feu** : Restreignez l'acces aux ports S3/WebDAV par IP
4. **Sauvegarde** : Sauvegardez regulierement la base de donnees SQLite/PostgreSQL