# Estrutura do Projeto

```
memesplora/
├── backend/                    # Backend Go
│   ├── cmd/server/main.go     # Ponto de entrada
│   └── internal/
│       ├── device/            # Gerenciamento de dispositivos RAM/VRAM
│       ├── fs/                # Sistema de arquivos em memoria
│       ├── api/               # Manipuladores da API REST
│       ├── api/middleware/     # Autenticacao, CORS, limitacao de taxa
│       ├── s3/                # API compativel com S3
│       ├── webdav/            # Protocolo WebDAV
│       └── service/           # Camada de logica de negocios
├── frontend/                   # SPA React
│   └── src/
│       ├── api/               # Cliente API (Axios)
│       ├── components/        # Componentes compartilhados
│       ├── pages/             # Componentes de pagina
│       ├── stores/            # Gerenciamento de estado Zustand
│       ├── types/             # Definicoes de tipos TypeScript
│       └── utils/             # Funcoes utilitarias
├── docs/                       # Documentacao VitePress
│   ├── .vitepress/config.ts   # Configuracao VitePress
│   ├── guide/                 # Guias do usuario (Portugues)
│   ├── architecture/          # Documentos de arquitetura (Portugues)
│   ├── api/                   # Referencia da API (Portugues)
│   ├── zh-CN/                 # Documentacao em Chines
│   ├── hi/                    # Hindi (pagina inicial)
│   ├── es/                    # Espanhol (pagina inicial)
│   └── ...                    # Outros idiomas
├── scripts/                    # Scripts de construcao e teste
├── .github/workflows/         # Pipelines CI/CD
├── Dockerfile
├── docker-compose.yml
└── Makefile
```