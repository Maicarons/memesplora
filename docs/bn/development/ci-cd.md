# CI/CD কনফিগারেশন

## ওভারভিউ

Memesplora অবিচ্ছিন্ন ইন্টিগ্রেশন এবং ডিপ্লয়মেন্টের জন্য GitHub Actions ব্যবহার করে। তিনটি CI ওয়ার্কফ্লো কনফিগার করা আছে:

## ওয়ার্কফ্লোসমূহ

### 1. ব্যাকএন্ড CI (`.github/workflows/backend.yml`)

`master`/`develop` এ push/PR এ ট্রিগার হয় (backend/ পরিবর্তন):

| স্টেজ | অ্যাকশন |
|:----:|--------|
| বিল্ড | `go build -v ./...` |
| টেস্ট | `go test -v ./...` |
| ভেট | `go vet ./...` |

### 2. ফ্রন্টএন্ড CI (`.github/workflows/frontend.yml`)

| স্টেজ | অ্যাকশন |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| বিল্ড | `npm run build` |

### 3. ডক্স CI ও ডিপ্লয় (`.github/workflows/docs.yml`)

| স্টেজ | অ্যাকশন |
|:----:|--------|
| বিল্ড | `npm run build` (VitePress) |
| ডিপ্লয় | GitHub Pages এ ডিপ্লয় |

## স্ট্যাটাস ব্যাজ

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## লোকাল CI চেক

```bash
# ব্যাকএন্ড
cd backend && go build ./... && go test ./... && go vet ./...

# ফ্রন্টএন্ড
cd frontend && npx tsc --noEmit && npm run build

# ডক্স
cd docs && npm run build
```

## ডক্স ডিপ্লয়মেন্ট

- **URL**: https://maicarons.github.io/memesplora/
- **ট্রিগার**: docs/ পরিবর্তনসহ `master` এ push
- **এনভায়রনমেন্ট**: `github-pages`