# CI/CD 설정

## 개요

Memesplora는 지속적 통합 및 배포를 위해 GitHub Actions를 사용합니다. 세 가지 CI 워크플로우가 구성되어 있습니다:

## 워크플로우

### 1. 백엔드 CI (`.github/workflows/backend.yml`)

`master`/`develop` 브랜치에 푸시/PR 시 트리거됩니다 (backend/ 변경사항):

| 단계 | 작업 |
|:----:|------|
| 빌드 | `go build -v ./...` |
| 테스트 | `go test -v ./...` |
| 검사 | `go vet ./...` |

### 2. 프론트엔드 CI (`.github/workflows/frontend.yml`)

| 단계 | 작업 |
|:----:|------|
| TypeScript | `tsc --noEmit` |
| 빌드 | `npm run build` |

### 3. 문서 CI 및 배포 (`.github/workflows/docs.yml`)

| 단계 | 작업 |
|:----:|------|
| 빌드 | `npm run build` (VitePress) |
| 배포 | GitHub Pages에 배포 |

## 상태 배지

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## 로컬 CI 확인

```bash
# 백엔드
cd backend && go build ./... && go test ./... && go vet ./...

# 프론트엔드
cd frontend && npx tsc --noEmit && npm run build

# 문서
cd docs && npm run build
```

## 문서 배포

- **URL**: https://maicarons.github.io/memesplora/
- **트리거**: docs/ 변경사항과 함께 `master` 브랜치에 푸시
- **환경**: `github-pages`