# Configuración de CI/CD

## Descripción general

Memesplora usa GitHub Actions para integración y despliegue continuos. Se configuran tres flujos de trabajo de CI:

## Flujos de trabajo

### 1. CI de Backend (`.github/workflows/backend.yml`)

Se activa al hacer push/PR a `master`/`develop` (cambios en backend/):

| Etapa | Acción |
|:----:|--------|
| Compilar | `go build -v ./...` |
| Probar | `go test -v ./...` |
| Verificar | `go vet ./...` |

### 2. CI de Frontend (`.github/workflows/frontend.yml`)

| Etapa | Acción |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| Compilar | `npm run build` |

### 3. CI y despliegue de Documentación (`.github/workflows/docs.yml`)

| Etapa | Acción |
|:----:|--------|
| Compilar | `npm run build` (VitePress) |
| Desplegar | Desplegar en GitHub Pages |

## Insignias de estado

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## Verificaciones locales de CI

```bash
# Backend
cd backend && go build ./... && go test ./... && go vet ./...

# Frontend
cd frontend && npx tsc --noEmit && npm run build

# Documentación
cd docs && npm run build
```

## Despliegue de documentación

- **URL**: https://maicarons.github.io/memesplora/
- **Activador**: Push a `master` con cambios en docs/
- **Entorno**: `github-pages`