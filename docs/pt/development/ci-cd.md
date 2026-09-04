# Configuracao CI/CD

## Visao Geral

Memesplora usa GitHub Actions para integracao continua e implantacao. Tres fluxos de trabalho CI estao configurados:

## Fluxos de Trabalho

### 1. CI do Backend (`.github/workflows/backend.yml`)

Acionado no push/PR para `master`/`develop` (alteracoes em backend/):

| Estagio | Acao |
|:----:|--------|
| Compilar | `go build -v ./...` |
| Testar | `go test -v ./...` |
| Verificar | `go vet ./...` |

### 2. CI do Frontend (`.github/workflows/frontend.yml`)

| Estagio | Acao |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| Compilar | `npm run build` |

### 3. CI e Implantacao da Documentacao (`.github/workflows/docs.yml`)

| Estagio | Acao |
|:----:|--------|
| Compilar | `npm run build` (VitePress) |
| Implantar | Implantar no GitHub Pages |

## Badges de Status

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## Verificacoes CI Locais

```bash
# Backend
cd backend && go build ./... && go test ./... && go vet ./...

# Frontend
cd frontend && npx tsc --noEmit && npm run build

# Documentacao
cd docs && npm run build
```

## Implantacao da Documentacao

- **URL**: https://maicarons.github.io/memesplora/
- **Gatilho**: Push para `master` com alteracoes em docs/
- **Ambiente**: `github-pages`