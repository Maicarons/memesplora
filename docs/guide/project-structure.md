# Project Structure

```
memesplora/
├── backend/                    # Go backend
│   ├── cmd/server/main.go     # Entry point
│   └── internal/
│       ├── device/            # RAM/VRAM device management
│       ├── fs/                # In-memory filesystem
│       ├── api/               # REST API handlers
│       ├── api/middleware/     # Auth, CORS, rate limiting
│       ├── s3/                # S3-compatible API
│       ├── webdav/            # WebDAV protocol
│       └── service/           # Business logic layer
├── frontend/                   # React SPA
│   └── src/
│       ├── api/               # API client (Axios)
│       ├── components/        # Shared components
│       ├── pages/             # Page components
│       ├── stores/            # Zustand state management
│       ├── types/             # TypeScript type definitions
│       └── utils/             # Utility functions
├── docs/                       # VitePress documentation
│   ├── .vitepress/config.ts   # VitePress configuration
│   ├── guide/                 # User guides (English)
│   ├── architecture/          # Architecture docs (English)
│   ├── api/                   # API reference (English)
│   ├── zh-CN/                 # Chinese documentation
│   ├── hi/                    # Hindi (landing page)
│   ├── es/                    # Spanish (landing page)
│   └── ...                    # Other languages
├── scripts/                    # Build and test scripts
├── .github/workflows/         # CI/CD pipelines
├── Dockerfile
├── docker-compose.yml
└── Makefile
```