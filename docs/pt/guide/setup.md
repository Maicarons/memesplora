# Configurando o Ambiente de Desenvolvimento

## Pre-requisitos

### Ferramentas Obrigatorias
- **Go**: 1.22 ou superior
- **Node.js**: 20 LTS ou superior
- **npm**: 10+ ou **pnpm** 8+
- **Git**: Versao mais recente

### Ferramentas Opcionais
- **Docker**: Para implantacao containerizada
- **CUDA Toolkit**: 12+, para desenvolvimento com VRAM de GPU
- **Make**: Para usar comandos do Makefile

## Clonar o Projeto

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## Instalar Dependencias

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

### Documentacao

```bash
cd docs
npm install
```

## Modo de Desenvolvimento

### Iniciar Backend

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### Iniciar Frontend (terminal separado)

```bash
cd frontend
npm run dev
```

### Iniciar Documentacao (terminal separado)

```bash
cd docs
npm run dev
```

## Verificar Instalacao

1. Backend: `http://localhost:5212/health` deve retornar `{"status":"ok"}`
2. Frontend: `http://localhost:5173` deve mostrar a pagina de login
3. Docs: `http://localhost:5174` deve mostrar o site de documentacao

## Configuracao de Desenvolvimento com GPU

### NVIDIA CUDA

1. Instale o driver NVIDIA (545+ recomendado)
2. Instale o CUDA Toolkit 12+

```bash
nvidia-smi  # Verificar GPU
nvcc --version  # Verificar CUDA
```