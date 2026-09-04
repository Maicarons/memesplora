# Structure du projet

```
memesplora/
├── backend/                    # Backend Go
│   ├── cmd/server/main.go     # Point d'entree
│   └── internal/
│       ├── device/            # Gestion des peripheriques RAM/VRAM
│       ├── fs/                # Systeme de fichiers en memoire
│       ├── api/               # Gestionnaires API REST
│       ├── api/middleware/     # Authentification, CORS, limite de debit
│       ├── s3/                # API compatible S3
│       ├── webdav/            # Protocole WebDAV
│       └── service/           # Couche de logique metier
├── frontend/                   # Application React monopage
│   └── src/
│       ├── api/               # Client API (Axios)
│       ├── components/        # Composants partages
│       ├── pages/             # Composants de page
│       ├── stores/            # Gestion d'etat Zustand
│       ├── types/             # Definitions de types TypeScript
│       └── utils/             # Fonctions utilitaires
├── docs/                       # Documentation VitePress
│   ├── .vitepress/config.ts   # Configuration VitePress
│   ├── guide/                 # Guides utilisateur (anglais)
│   ├── architecture/          # Documentation d'architecture (anglais)
│   ├── api/                   # Reference API (anglais)
│   ├── zh-CN/                 # Documentation chinoise
│   ├── hi/                    # Hindi (page d'accueil)
│   ├── es/                    # Espagnol (page d'accueil)
│   └── ...                    # Autres langues
├── scripts/                    # Scripts de construction et de test
├── .github/workflows/         # Pipelines CI/CD
├── Dockerfile
├── docker-compose.yml
└── Makefile
```