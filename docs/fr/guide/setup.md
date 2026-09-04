# Configuration de l'environnement de developpement

## Prerequis

### Outils requis
- **Go** : 1.22 ou superieur
- **Node.js** : 20 LTS ou superieur
- **npm** : 10+ ou **pnpm** 8+
- **Git** : Derniere version

### Outils optionnels
- **Docker** : Pour un deploiement conteneurise
- **CUDA Toolkit** : 12+, pour le developpement VRAM GPU
- **Make** : Pour utiliser les commandes Makefile

## Cloner le projet

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## Installer les dependances

### Backend

```bash
cd backend
go mod tidy
```

### Frontend

```bash
cd frontend
npm install
```

### Documentation

```bash
cd docs
npm install
```

## Mode developpement

### Demarrer le backend

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### Demarrer le frontend (terminal separe)

```bash
cd frontend
npm run dev
```

### Demarrer la documentation (terminal separe)

```bash
cd docs
npm run dev
```

## Verifier l'installation

1. Backend : `http://localhost:5212/health` devrait retourner `{"status":"ok"}`
2. Frontend : `http://localhost:5173` devrait afficher la page de connexion
3. Documentation : `http://localhost:5174` devrait afficher le site de documentation

## Configuration de developpement GPU

### NVIDIA CUDA

1. Installez le pilote NVIDIA (545+ recommande)
2. Installez CUDA Toolkit 12+

```bash
nvidia-smi  # Verifier le GPU
nvcc --version  # Verifier CUDA
```