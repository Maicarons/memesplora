# CI/CD Configuration

## Overview

Memesplora uses GitHub Actions for continuous integration and deployment. Three CI workflows are configured:

## Workflows

### 1. Backend CI (`.github/workflows/backend.yml`)

Triggered on push/PR to `master`/`develop` (backend/ changes):

| Stage | Action |
|:----:|--------|
| Build | `go build -v ./...` |
| Test | `go test -v ./...` |
| Vet | `go vet ./...` |

### 2. Frontend CI (`.github/workflows/frontend.yml`)

| Stage | Action |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| Build | `npm run build` |

### 3. Docs CI & Deploy (`.github/workflows/docs.yml`)

| Stage | Action |
|:----:|--------|
| Build | `npm run build` (VitePress) |
| Deploy | Deploy to GitHub Pages |

## Status Badges

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## Local CI Checks

```bash
# Backend
cd backend && go build ./... && go test ./... && go vet ./...

# Frontend
cd frontend && npx tsc --noEmit && npm run build

# Docs
cd docs && npm run build
```

## Docs Deployment

- **URL**: https://maicarons.github.io/memesplora/
- **Trigger**: Push to `master` with docs/ changes
- **Environment**: `github-pages`