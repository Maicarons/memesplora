# Configuration CI/CD

## Apercu

Memesplora utilise GitHub Actions pour l'integration et le deploiement continus. Trois workflows CI sont configures :

## Workflows

### 1. CI Backend (`.github/workflows/backend.yml`)

Declenche sur push/PR vers `master`/`develop` (modifications backend/) :

| Etape | Action |
|:----:|--------|
| Construction | `go build -v ./...` |
| Test | `go test -v ./...` |
| Vet | `go vet ./...` |

### 2. CI Frontend (`.github/workflows/frontend.yml`)

| Etape | Action |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| Construction | `npm run build` |

### 3. CI Documentation et Deploiement (`.github/workflows/docs.yml`)

| Etape | Action |
|:----:|--------|
| Construction | `npm run build` (VitePress) |
| Deploiement | Deploiement sur GitHub Pages |

## Badges de statut

```markdown
[![CI Backend](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![CI Frontend](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![CI Documentation](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## Verifications CI locales

```bash
# Backend
cd backend && go build ./... && go test ./... && go vet ./...

# Frontend
cd frontend && npx tsc --noEmit && npm run build

# Documentation
cd docs && npm run build
```

## Deploiement de la documentation

- **URL** : https://maicarons.github.io/memesplora/
- **Declencheur** : Push vers `master` avec modifications docs/
- **Environnement** : `github-pages`