# Primeros pasos

## Introducción

Memesplora transforma la memoria del sistema (RAM) y la memoria de video de GPU (VRAM) en un sistema de archivos de alta velocidad. Los usuarios pueden seleccionar dispositivos de almacenamiento, crear espacios de tamaño personalizado y gestionar archivos como en un sistema de archivos normal, con soporte para API REST, protocolo compatible con S3 y WebDAV.

## Requisitos del sistema

### Hardware
- **CPU**: Cualquier procesador x86_64 / ARM64
- **RAM**: Al menos 512 MB libres para el servicio
- **GPU (opcional)**: GPU NVIDIA con soporte CUDA 12+ para almacenamiento VRAM

### Software
- **SO**: Linux (recomendado), Windows, macOS
- **Go**: 1.22+ (solo desarrollo)
- **Node.js**: 20+ (solo desarrollo frontend)

## Instalación rápida

### Opción 1: Descargar binario precompilado

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### Opción 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### Opción 3: Compilar desde el código fuente

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# Backend
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# Frontend (opcional, para desarrollo)
cd ../frontend
npm install
npm run dev
```

## Primer uso

1. Abra su navegador en `http://localhost:5212`
2. Encuentre la contraseña de administrador en el registro de inicio del servidor
3. Vaya a la página "Dispositivos" para ver los dispositivos de almacenamiento disponibles
4. Cree un espacio de almacenamiento
5. ¡Comience a gestionar archivos!

## Configuración

```yaml
# config.yaml
server:
  http_port: 5212        # Puerto de API REST e interfaz web
  s3_port: 5213          # Puerto de API compatible con S3
  webdav_port: 5214      # Puerto del servicio WebDAV
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "cambie-esto-por-una-cadena-aleatoria"
  token_expire: 24h
```

## Conexiones de cliente

### Clientes S3

```bash
# Usando rclone
rclone config
# Seleccione S3 Compatible, endpoint: http://localhost:5213

# Usando AWS CLI
aws configure
# Establezca endpoint: http://localhost:5213
```

### Clientes WebDAV

```
# macOS Finder
Ir > Conectar al servidor > http://localhost:5214

# Explorador de Windows
Haga clic derecho en "Este PC" > Conectar unidad de red > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```