# إعدادات CI/CD

## نظرة عامة

يستخدم Memesplora GitHub Actions للتكامل المستمر والنشر المستمر. تم إعداد ثلاث سير عمل CI:

## سير العمل

### 1. الواجهة الخلفية CI (`.github/workflows/backend.yml`)

يتم تشغيله عند الدفع/PR إلى `master`/`develop` (تغييرات backend/):

| المرحلة | الإجراء |
|:----:|--------|
| بناء | `go build -v ./...` |
| اختبار | `go test -v ./...` |
| فحص | `go vet ./...` |

### 2. الواجهة الأمامية CI (`.github/workflows/frontend.yml`)

| المرحلة | الإجراء |
|:----:|--------|
| TypeScript | `tsc --noEmit` |
| بناء | `npm run build` |

### 3. التوثيق CI والنشر (`.github/workflows/docs.yml`)

| المرحلة | الإجراء |
|:----:|--------|
| بناء | `npm run build` (VitePress) |
| نشر | نشر إلى GitHub Pages |

## شارات الحالة

```markdown
[![Backend CI](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/frontend.yml)
[![Docs CI](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml/badge.svg)](https://github.com/Maicarons/memesplora/actions/workflows/docs.yml)
```

## فحوصات CI المحلية

```bash
# الواجهة الخلفية
cd backend && go build ./... && go test ./... && go vet ./...

# الواجهة الأمامية
cd frontend && npx tsc --noEmit && npm run build

# التوثيق
cd docs && npm run build
```

## نشر التوثيق

- **الرابط**: https://maicarons.github.io/memesplora/
- **المشغل**: دفع إلى `master` مع تغييرات docs/
- **البيئة**: `github-pages`