# Guia de Implantacao

## Compilacao

### Backend

```bash
cd backend
go build -o memesplora ./cmd/server

# Compilacao cruzada
GOOS=linux GOARCH=amd64 go build -o memesplora-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o memesplora-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o memesplora-darwin-amd64 ./cmd/server
```

### Frontend

```bash
cd frontend
npm run build
# Saida em dist/
```

## Implantacao com Docker

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

## Proxy Reverso Nginx

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

## Recomendacoes de Seguranca

1. **Altere o JWT Secret**: Use uma string aleatoria forte
2. **Habilite HTTPS**: Use Let's Encrypt ou configure SSL
3. **Firewall**: Restrinja o acesso as portas S3/WebDAV por IP
4. **Backup**: Faca backup regular do banco de dados SQLite/PostgreSQL