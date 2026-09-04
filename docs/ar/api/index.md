# مرجع API

يوفر Memesplora ثلاثة بروتوكولات للوصول:

## REST API

واجهة HTTP كاملة لإدارة الملفات والمساحات ومصادقة المستخدمين والمشاركة.

- **المنفذ**: 5212
- **Base URL**: `http://localhost:5212/api/v3`
- **المصادقة**: JWT Bearer Token
- **التوثيق**: [مرجع REST API](/ar/api/rest)

## API متوافق مع S3

بروتوكول متوافق مع AWS S3 للاستخدام مع rclone و AWS CLI و MinIO Client وأدوات S3 الأخرى.

- **المنفذ**: 5213
- **المصادقة**: AWS Signature V4
- **التوثيق**: [مرجع S3 API](/ar/api/s3)

## WebDAV

بروتوكول WebDAV للتركيب كمحرك أقراص شبكة في مديري ملفات أنظمة التشغيل.

- **المنفذ**: 5214
- **المصادقة**: HTTP Basic Auth
- **التوثيق**: [مرجع WebDAV](/ar/api/webdav)