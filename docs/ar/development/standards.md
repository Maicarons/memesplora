# دليل التطوير

## معايير الكود

- **Go**: اتبع [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: اتبع إعدادات ESLint الموصى بها
- استخدم `gofmt` لتنسيق كود Go
- استخدم `prettier` لتنسيق كود الواجهة الأمامية

## أمان التزامن

- استخدم `sync.RWMutex` في السيناريوهات كثيرة القراءة
- احصل دائمًا على الأقفال بنفس الترتيب لمنع الجمود
- استخدم `defer` لتحرير الأقفال
- تجنب استدعاء الواجهات الخارجية أثناء الاحتفاظ بالأقفال

## معالجة الأخطاء

```go
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}
```

## الاختبار

- يجب أن يصل تغطية اختبارات الوحدة إلى 80% على الأقل للوحدات الأساسية
- طبقة API تحتاج إلى اختبارات تكامل
- استخدم مكتبة `testing` القياسية

## CI/CD

يستخدم المشروع GitHub Actions لـ CI/CD:

- **الواجهة الخلفية CI**: بناء واختبار وفحص عند الدفع/PR
- **الواجهة الأمامية CI**: فحص TypeScript وبناء
- **التوثيق CI**: بناء ونشر VitePress إلى GitHub Pages

انظر [إعدادات CI/CD](/ar/development/ci-cd) للتفاصيل.