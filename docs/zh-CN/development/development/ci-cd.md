# CI/CD 配置

## 概述

Memesplora 使用 GitHub Actions 进行持续集成和持续部署。项目包含三个 CI 工作流：

## 工作流

### 1. Backend CI (`.github/workflows/backend.yml`)

在每次推送或 PR 到 `master`/`develop` 分支时触发（仅 backend/ 目录变更时）：

| 阶段 | 操作 | 说明 |
|:----:|------|------|
| **Build & Test** | `go build` + `go test` | 编译所有包并运行单元测试 |
| **Coverage** | 上传测试覆盖率 | 生成 coverage.out 报告 |
| **Vet** | `go vet` | 静态分析代码问题 |
| **Lint** | golangci-lint | 代码风格检查 |

### 2. Frontend CI (`.github/workflows/frontend.yml`)

在每次推送或 PR 到 `master`/`develop` 分支时触发（仅 frontend/ 目录变更时）：

| 阶段 | 操作 |
|:----:|------|
| **TypeScript** | `tsc --noEmit` 类型检查 |
| **Build** | `npm run build` 构建生产包 |

### 3. Docs CI & Deploy (`.github/workflows/docs.yml`)

在推送到 `master` 分支时触发（仅 docs/ 目录变更时），自动构建并部署到 GitHub Pages：

| 阶段 | 操作 |
|:----:|------|
| **Build** | `npm run build` 构建 VitePress 静态站点 |
| **Deploy** | 部署到 GitHub Pages 环境 |

## 状态徽章

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## 本地运行 CI 检查

在提交前，建议本地运行所有 CI 检查：

```bash
# 后端
cd backend && go build ./... && go test ./... && go vet ./...

# 前端
cd frontend && npx tsc --noEmit && npm run build

# 文档
cd docs && npm run build
```

## 文档部署

文档自动部署到 GitHub Pages：

- **URL**: https://maicarons.github.io/memesplora/
- **触发条件**: 推送 `master` 分支且 docs/ 目录有变更
- **构建时间**: 约 1-2 分钟
- **部署环境**: `github-pages`