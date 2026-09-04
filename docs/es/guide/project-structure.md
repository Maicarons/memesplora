# Estructura del proyecto

```
memesplora/
├── backend/                    # Backend en Go
│   ├── cmd/server/main.go     # Punto de entrada
│   └── internal/
│       ├── device/            # Gestión de dispositivos RAM/VRAM
│       ├── fs/                # Sistema de archivos en memoria
│       ├── api/               # Manejadores de API REST
│       ├── api/middleware/     # Autenticación, CORS, limitación de velocidad
│       ├── s3/                # API compatible con S3
│       ├── webdav/            # Protocolo WebDAV
│       └── service/           # Capa de lógica de negocio
├── frontend/                   # SPA en React
│   └── src/
│       ├── api/               # Cliente API (Axios)
│       ├── components/        # Componentes compartidos
│       ├── pages/             # Componentes de página
│       ├── stores/            # Gestión de estado con Zustand
│       ├── types/             # Definiciones de tipos TypeScript
│       └── utils/             # Funciones utilitarias
├── docs/                       # Documentación VitePress
│   ├── .vitepress/config.ts   # Configuración de VitePress
│   ├── guide/                 # Guías de usuario (inglés)
│   ├── architecture/          # Documentos de arquitectura (inglés)
│   ├── api/                   # Referencia de API (inglés)
│   ├── es/                    # Documentación en español
│   └── ...                    # Otros idiomas
├── scripts/                    # Scripts de compilación y prueba
├── .github/workflows/         # Tuberías CI/CD
├── Dockerfile
├── docker-compose.yml
└── Makefile
```