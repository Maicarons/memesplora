# مرجع REST API

## المعلومات الأساسية

- **Base URL**: `http://localhost:5212/api/v3`
- **طريقة المصادقة**: JWT Bearer Token
- **تنسيق الاستجابة**: JSON

## تنسيق الاستجابة العام

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

استجابة الخطأ:
```json
{
  "code": 40001,
  "message": "خطأ في المعاملات",
  "error": "معلومات الخطأ المحددة"
}
```

## API المصادقة

### تسجيل دخول المسؤول

```http
POST /api/v3/admin/login
Content-Type: application/json

{"username": "admin", "password": "your-password"}
```

### الحصول على الجلسة الحالية

```http
GET /api/v3/user/session
Authorization: Bearer <token>
```

## API إدارة الأجهزة

### عرض جميع الأجهزة

```http
GET /api/v3/device
Authorization: Bearer <token>
```

### فحص صحة الجهاز

```http
GET /api/v3/device/:id/health
Authorization: Bearer <token>
```

## API إدارة المساحات

### إنشاء مساحة

```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json

{"name": "مساحتي", "total_size": 1073741824, "device_id": "ram_0"}
```

### عرض المساحات

```http
GET /api/v3/space
Authorization: Bearer <token>
```

### تعديل حجم المساحة

```http
POST /api/v3/space/:id/resize
Authorization: Bearer <token>
Content-Type: application/json

{"new_size": 2147483648}
```

## API إدارة الملفات

### عرض الملفات

```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### رفع ملف

```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

### تنزيل ملف

```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

### إعادة تسمية / نقل / نسخ / حذف

```http
POST /api/v3/space/:id/files/:fileId/rename  {"name": "new.txt"}
POST /api/v3/space/:id/files/:fileId/move    {"dest_path": "/newdir"}
POST /api/v3/space/:id/files/:fileId/copy    {"dest_path": "/backup"}
DELETE /api/v3/space/:id/files/:fileId
```

## API المشاركة

```http
POST /api/v3/share
Authorization: Bearer <token>
Content-Type: application/json

{"file_id": "file_1", "space_id": "space_1", "download_limit": 5}

GET /api/v3/share/list
DELETE /api/v3/share/:id
```

## شرح رموز الحالة

| رمز الحالة | الوصف |
|:------:|------|
| 0 | نجاح |
| 40001 | خطأ في المعاملات |
| 40002 | فشل المصادقة |
| 40003 | صلاحية غير كافية |
| 40004 | المورد غير موجود |
| 50001 | خطأ داخلي في الخادم |

## تفاصيل الهندسة المعمارية

يرجى الرجوع إلى [هندسة REST API](/ar/architecture/rest-api) للاطلاع على التصميم التفصيلي.