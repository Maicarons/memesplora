# Konfigurasi CI/CD

## Ikhtisar

Memesplora menggunakan GitHub Actions untuk integrasi berkelanjutan dan deployment. Tiga alur kerja CI dikonfigurasi:

## Alur Kerja

### 1. Backend CI (`.github/workflows/backend.yml`)

Dipicu pada push/PR ke `master`/`develop` (perubahan backend/):

| Tahap | Tindakan |
|:----:|--------|
| Build | `go build -v ./...` |
| Test | `go test -v ./...` |
| Vet | `go vet ./...` |

### 2. Frontend CI (`.github/workflows/frontend.yml`)

| Tahap | Tindakan |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| Build | `npm run build` |

### 3. Docs CI & Deploy (`.github/workflows/docs.yml`)

| Tahap | Tindakan |
|:----:|--------|
| Build | `npm run build` (VitePress) |
| Deploy | Deploy ke GitHub Pages |

## Lencana Status

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## Pemeriksaan CI Lokal

```bash
# Backend
cd backend && go build ./... && go test ./... && go vet ./...

# Frontend
cd frontend && npx tsc --noEmit && npm run build

# Docs
cd docs && npm run build
```

## Deployment Dokumentasi

- **URL**: https://maicarons.github.io/memesplora/
- **Pemicu**: Push ke `master` dengan perubahan docs/
- **Lingkungan**: `github-pages`