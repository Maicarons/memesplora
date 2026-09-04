# Configuración del entorno de desarrollo

## Prerrequisitos

### Herramientas requeridas
- **Go**: 1.22 o superior
- **Node.js**: 20 LTS o superior
- **npm**: 10+ o **pnpm** 8+
- **Git**: Última versión

### Herramientas opcionales
- **Docker**: Para despliegue en contenedores
- **CUDA Toolkit**: 12+, para desarrollo con VRAM de GPU
- **Make**: Para usar comandos del Makefile

## Clonar el proyecto

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## Instalar dependencias

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

### Documentación

```bash
cd docs
npm install
```

## Modo de desarrollo

### Iniciar backend

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### Iniciar frontend (terminal separada)

```bash
cd frontend
npm run dev
```

### Iniciar documentación (terminal separada)

```bash
cd docs
npm run dev
```

## Verificar la instalación

1. Backend: `http://localhost:5212/health` debería devolver `{"status":"ok"}`
2. Frontend: `http://localhost:5173` debería mostrar la página de inicio de sesión
3. Documentación: `http://localhost:5174` debería mostrar el sitio de documentación

## Configuración de desarrollo con GPU

### NVIDIA CUDA

1. Instale el controlador NVIDIA (545+ recomendado)
2. Instale CUDA Toolkit 12+

```bash
nvidia-smi  # Verificar GPU
nvcc --version  # Verificar CUDA
```