# بروتوكول S3

## نظرة عامة

يوفر Memesplora API متوافقًا مع AWS S3، يمكن استخدام أي عميل متوافق مع S3 (مثل rclone و AWS CLI و MinIO Client) للوصول المباشر إلى مساحات التخزين.

## المنفذ

S3 API يستمع على المنفذ `:5213`.

## المصادقة

استخدام خوارزمية توقيع AWS Signature V4. يتم الحصول على Access Key و Secret Key من واجهة إدارة الويب.

## S3 API المدعومة

### عمليات Bucket

| العملية | HTTP | المسار | الوصف |
|------|------|------|------|
| ListBuckets | GET | `/` | عرض جميع Buckets (المساحات) |
| HeadBucket | HEAD | `/{bucket}` | التحقق من وجود Bucket |
| GetBucketLocation | GET | `/{bucket}?location` | الحصول على منطقة Bucket |

### عمليات الكائنات

| العملية | HTTP | المسار | الوصف |
|------|------|------|------|
| GetObject | GET | `/{bucket}/{key}` | تنزيل كائن |
| PutObject | PUT | `/{bucket}/{key}` | رفع كائن |
| DeleteObject | DELETE | `/{bucket}/{key}` | حذف كائن |
| HeadObject | HEAD | `/{bucket}/{key}` | الحصول على بيانات وصفية للكائن |
| ListObjects | GET | `/{bucket}` | عرض الكائنات |
| ListObjectsV2 | GET | `/{bucket}?list-type=2` | عرض الكائنات V2 |
| DeleteObjects | POST | `/{bucket}?delete` | حذف مجمع |
| CopyObject | PUT | `/{bucket}/{key}` (x-amz-copy-source) | نسخ كائن |

### الرفع المجزأ (Multipart Upload)

| العملية | HTTP | المسار | الوصف |
|------|------|------|------|
| CreateMultipartUpload | POST | `/{bucket}/{key}?uploads` | تهيئة الرفع المجزأ |
| UploadPart | PUT | `/{bucket}/{key}?partNumber=&uploadId=` | رفع جزء |
| CompleteMultipartUpload | POST | `/{bucket}/{key}?uploadId=` | إكمال الرفع المجزأ |
| AbortMultipartUpload | DELETE | `/{bucket}/{key}?uploadId=` | إلغاء الرفع المجزأ |
| ListParts | GET | `/{bucket}/{key}?uploadId=` | عرض الأجزاء المرفوعة |

## أمثلة الاستخدام

### استخدام AWS CLI

```bash
# الإعدادات
aws configure --profile memesplora
# AWS Access Key ID: your-access-key
# AWS Secret Access Key: your-secret-key
# Default region: us-east-1

# عرض Buckets
aws s3 --endpoint-url http://localhost:5213 ls

# رفع ملف
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/

# تنزيل ملف
aws s3 --endpoint-url http://localhost:5213 cp s3://my-space/file.txt .

# عرض الكائنات
aws s3 --endpoint-url http://localhost:5213 ls s3://my-space/
```

### استخدام rclone

```bash
# إعدادات الاتصال عن بُعد
rclone config
# اختر S3 Compatible
# endpoint: http://localhost:5213
# access_key_id: your-access-key
# secret_access_key: your-secret-key

# رفع ملف
rclone copy file.txt memesplora:my-space/

# تنزيل ملف
rclone copy memesplora:my-space/file.txt .

# عرض الملفات
rclone ls memesplora:my-space/
```

### استخدام MinIO Client

```bash
# إعداد اسم مستعار
mc alias set memesplora http://localhost:5213 your-access-key your-secret-key

# عرض Buckets
mc ls memesplora

# رفع ملف
mc cp file.txt memesplora/my-space/

# تنزيل ملف
mc cp memesplora/my-space/file.txt .
```

## استجابة الخطأ

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Error>
    <Code>NoSuchKey</Code>
    <Message>The specified key does not exist.</Message>
    <Key>file.txt</Key>
    <RequestId>...</RequestId>
    <HostId>...</HostId>
</Error>
```

## التحقق من التوقيع

دعم خوارزمية توقيع AWS Signature V4:

1. حساب مفتاح التوقيع
2. بناء الطلب المعياري
3. حساب التوقيع
4. التحقق من تطابق التوقيع مع `Authorization` في رأس الطلب

## ملاحظات

- اسم Bucket يقابل اسم المساحة في Memesplora
- Object Key يقابل مسار الملف
- لا يدعم حالياً Bucket Policy و ACL (جميع الوصول يتم عبر مصادقة المستخدم)
- لا يدعم التحكم في إصدارات S3