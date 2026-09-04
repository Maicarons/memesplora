# Primeiros Passos

## Introducao

Memesplora transforma a memoria do sistema (RAM) e a memoria de video da GPU (VRAM) em um sistema de arquivos de alta velocidade. Os usuarios podem selecionar dispositivos de armazenamento, criar espacos com tamanho personalizado e gerenciar arquivos como em um sistema de arquivos comum — com suporte para API REST, protocolo compativel com S3 e WebDAV.

## Requisitos de Sistema

### Hardware
- **CPU**: Qualquer processador x86_64 / ARM64
- **RAM**: Pelo menos 512 MB livres para o servico
- **GPU (opcional)**: GPU NVIDIA com suporte CUDA 12+ para armazenamento VRAM

### Software
- **SO**: Linux (recomendado), Windows, macOS
- **Go**: 1.22+ (apenas desenvolvimento)
- **Node.js**: 20+ (apenas desenvolvimento frontend)

## Instalacao Rapida

### Opcao 1: Baixar Binario Pre-Compilado

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### Opcao 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### Opcao 3: Compilar a partir do Codigo Fonte

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# Backend
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# Frontend (opcional, para desenvolvimento)
cd ../frontend
npm install
npm run dev
```

## Primeiro Uso

1. Abra seu navegador em `http://localhost:5212`
2. Encontre a senha de administrador no log de inicializacao do servidor
3. Va para a pagina "Dispositivos" para ver os dispositivos de armazenamento disponiveis
4. Crie um espaco de armazenamento
5. Comece a gerenciar arquivos!

## Configuracao

```yaml
# config.yaml
server:
  http_port: 5212        # Porta da API REST e interface web
  s3_port: 5213          # Porta da API compativel com S3
  webdav_port: 5214      # Porta do servico WebDAV
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "change-me-to-a-random-string"
  token_expire: 24h
```

## Conexoes de Cliente

### Clientes S3

```bash
# Usando rclone
rclone config
# Selecione S3 Compatible, endpoint: http://localhost:5213

# Usando AWS CLI
aws configure
# Defina endpoint: http://localhost:5213
```

### Clientes WebDAV

```
# macOS Finder
Ir > Conectar ao Servidor > http://localhost:5214

# Windows Explorer
Clique direito em "Este Computador" > Mapear unidade de rede > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```