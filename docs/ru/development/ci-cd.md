# Конфигурация CI/CD

## Обзор

Memesplora использует GitHub Actions для непрерывной интеграции и развёртывания. Настроены три CI-пайплайна:

## Пайплайны

### 1. Backend CI (`.github/workflows/backend.yml`)

Запускается при push/PR в `master`/`develop` (изменения в backend/):

| Этап | Действие |
|:---:|----------|
| Сборка | `go build -v ./...` |
| Тестирование | `go test -v ./...` |
| Проверка | `go vet ./...` |

### 2. Frontend CI (`.github/workflows/frontend.yml`)

| Этап | Действие |
|:---:|----------|
| TypeScript | `tsc --noEmit` |
| Сборка | `npm run build` |

### 3. Docs CI & Deploy (`.github/workflows/docs.yml`)

| Этап | Действие |
|:---:|----------|
| Сборка | `npm run build` (VitePress) |
| Развёртывание | Развёртывание на GitHub Pages |

## Бейджи статуса

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## Локальные CI-проверки

```bash
# Бэкенд
cd backend && go build ./... && go test ./... && go vet ./...

# Фронтенд
cd frontend && npx tsc --noEmit && npm run build

# Документация
cd docs && npm run build
```

## Развёртывание документации

- **URL**: https://maicarons.github.io/memesplora/
- **Триггер**: Push в `master` с изменениями в docs/
- **Среда**: `github-pages`