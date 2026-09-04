# Premiers pas

## Introduction

Memesplora transforme la memoire systeme (RAM) et la memoire video GPU (VRAM) en un systeme de fichiers haute vitesse. Les utilisateurs peuvent selectionner des peripheriques de stockage, creer des espaces de taille personnalisee et gerer des fichiers comme sur un systeme de fichiers classique — avec le support de l'API REST, du protocole compatible S3 et de WebDAV.

## Configuration systeme requise

### Materiel
- **Processeur** : Tout processeur x86_64 / ARM64
- **RAM** : Au moins 512 Mo libres pour le service
- **GPU (optionnel)** : GPU NVIDIA avec support CUDA 12+ pour le stockage VRAM

### Logiciel
- **OS** : Linux (recommande), Windows, macOS
- **Go** : 1.22+ (developpement uniquement)
- **Node.js** : 20+ (developpement frontend uniquement)

## Installation rapide

### Option 1 : Telecharger le binaire pre-construit

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### Option 2 : Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### Option 3 : Compiler a partir des sources

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# Backend
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# Frontend (optionnel, pour le developpement)
cd ../frontend
npm install
npm run dev
```

## Premiere utilisation

1. Ouvrez votre navigateur a `http://localhost:5212`
2. Trouvez le mot de passe administrateur dans le journal de demarrage du serveur
3. Accedez a la page "Peripheriques" pour voir les peripheriques de stockage disponibles
4. Creez un espace de stockage
5. Commencez a gerer vos fichiers !

## Configuration

```yaml
# config.yaml
server:
  http_port: 5212        # Port de l'API REST et de l'interface Web
  s3_port: 5213          # Port de l'API compatible S3
  webdav_port: 5214      # Port du service WebDAV
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "changez-moi-par-une-chaine-aleatoire"
  token_expire: 24h
```

## Connexions client

### Clients S3

```bash
# Avec rclone
rclone config
# Selectionnez S3 Compatible, point de terminaison : http://localhost:5213

# Avec AWS CLI
aws configure
# Definissez le point de terminaison : http://localhost:5213
```

### Clients WebDAV

```
# Finder macOS
Aller > Se connecter au serveur > http://localhost:5214

# Explorateur Windows
Clic droit "Ce PC" > Mapper un lecteur reseau > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```