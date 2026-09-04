# هيكل المشروع

```
memesplora/
├── backend/                    # الواجهة الخلفية بلغة Go
│   ├── cmd/server/main.go     # نقطة الدخول
│   └── internal/
│       ├── device/            # إدارة أجهزة RAM/VRAM
│       ├── fs/                # نظام الملفات في الذاكرة
│       ├── api/               # معالجات REST API
│       ├── api/middleware/     # المصادقة، CORS، تحديد المعدل
│       ├── s3/                # API متوافق مع S3
│       ├── webdav/            # بروتوكول WebDAV
│       └── service/           # طبقة منطق الأعمال
├── frontend/                   # تطبيق React SPA
│   └── src/
│       ├── api/               # عميل API (Axios)
│       ├── components/        # مكونات مشتركة
│       ├── pages/             # مكونات الصفحات
│       ├── stores/            # إدارة الحالة باستخدام Zustand
│       ├── types/             # تعريفات أنواع TypeScript
│       └── utils/             # دوال مساعدة
├── docs/                       # توثيق VitePress
│   ├── .vitepress/config.ts   # إعدادات VitePress
│   ├── guide/                 # أدلة المستخدم (الإنجليزية)
│   ├── architecture/          # وثائق الهندسة المعمارية (الإنجليزية)
│   ├── api/                   # مرجع API (الإنجليزية)
│   ├── zh-CN/                 # التوثيق بالصينية
│   ├── hi/                    # الهندية (الصفحة الرئيسية)
│   ├── es/                    # الإسبانية (الصفحة الرئيسية)
│   └── ...                    # لغات أخرى
├── scripts/                    # نصوص البناء والاختبار
├── .github/workflows/         # خطوط CI/CD
├── Dockerfile
├── docker-compose.yml
└── Makefile
```