# المساهمة

## أسلوب الكود

- **Go**: اتبع [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: اتبع قواعد ESLint
- استخدم `gofmt` و `prettier` لتنسيق الكود

## تنسيق رسالة الالتزام

```
<type>(<scope>): <subject>

<body>
```

الأنواع: `feat`، `fix`، `docs`، `style`، `refactor`، `test`، `chore`

## استراتيجية الفروع

- `main`: الإصدارات المستقرة
- `develop`: فرع التطوير
- `feature/*`: فروع الميزات
- `fix/*`: إصلاحات الأخطاء

## عملية طلب السحب (Pull Request)

1. انسخ المستودع (Fork)
2. أنشئ فرع ميزة: `git checkout -b feature/your-feature`
3. قم بارتكاب تغييراتك
4. شغّل الاختبارات: `make test`
5. أنشئ طلب سحب (Pull Request)

## مراجعة الكود

جميع طلبات السحب تتطلب مراجعة مشرف واحد على الأقل. مجالات التركيز:
- أمان الذاكرة
- أمان التزامن (صحة الأقفال)
- اكتمال معالجة الأخطاء
- توافق API