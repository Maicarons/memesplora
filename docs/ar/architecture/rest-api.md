# تصميم REST API

## نظرة عامة

REST API هي الواجهة الرئيسية لـ Memesplora، حيث توفر وظائف كاملة لإدارة الملفات والمساحات وإدارة النظام. تتفاعل الواجهة الأمامية للويب مع الواجهة الخلفية عبر هذا API.

## المعلومات الأساسية

- **Base URL**: `http://localhost:5212/api/v3`
- **طريقة المصادقة**: JWT Bearer Token (يتم الحصول عليه بعد تسجيل الدخول)
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

```
POST /api/v3/admin/login
```

جسم الطلب:
```json
{
    "username": "admin",
    "password": "admin123"
}
```

الاستجابة:
```json
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "nickname": "مدير",
            "is_admin": true
        }
    }
}
```

### الحصول على الجلسة الحالية

```
GET /api/v3/user/session
```

رأس الطلب: `Authorization: Bearer <token>`

الاستجابة:
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "username": "admin",
        "nickname": "مدير",
        "email": "admin@example.com",
        "is_admin": true,
        "storage_used": 1073741824,
        "max_storage": 10737418240
    }
}
```

## API إدارة المساحات

### عرض جميع المساحات

```
GET /api/v3/space
```

الاستجابة:
```json
{
    "code": 0,
    "data": [
        {
            "id": "space_001",
            "name": "مساحتي",
            "description": "لتخزين ملفات المشروع",
            "total_size": 1073741824,
            "used_size": 524288000,
            "block_size": 4096,
            "device_id": "ram_0",
            "device_type": "ram",
            "status": "active",
            "created_at": "2024-01-01T00:00:00Z"
        }
    ]
}
```

### إنشاء مساحة

```
POST /api/v3/space
```

جسم الطلب:
```json
{
    "name": "مساحتي",
    "description": "لتخزين ملفات المشروع",
    "total_size": 1073741824,
    "device_id": "ram_0"
}
```

### الحصول على تفاصيل المساحة

```
GET /api/v3/space/:id
```

### تعديل حجم المساحة

```
POST /api/v3/space/:id/resize
```

جسم الطلب:
```json
{
    "new_size": 2147483648
}
```

### حذف المساحة

```
DELETE /api/v3/space/:id
```

## API إدارة الأجهزة

### عرض جميع الأجهزة

```
GET /api/v3/device
```

الاستجابة:
```json
{
    "code": 0,
    "data": [
        {
            "id": "ram_0",
            "name": "ذاكرة النظام",
            "type": "ram",
            "total_size": 17179869184,
            "free_size": 8589934592,
            "used_size": 0,
            "healthy": true,
            "model": ""
        },
        {
            "id": "gpu_0",
            "name": "NVIDIA GeForce RTX 4090",
            "type": "vram",
            "total_size": 25769803776,
            "free_size": 25769803776,
            "used_size": 0,
            "healthy": true,
            "model": "NVIDIA GeForce RTX 4090"
        }
    ]
}
```

### الحصول على تفاصيل الجهاز

```
GET /api/v3/device/:id
```

### فحص صحة الجهاز

```
GET /api/v3/device/:id/health
```

## API إدارة الملفات

### عرض الملفات

```
GET /api/v3/space/:id/files?path=/&page=1&page_size=50&order_by=name
```

الاستجابة:
```json
{
    "code": 0,
    "data": {
        "files": [
            {
                "id": "file_001",
                "name": "مستندات",
                "type": "directory",
                "size": 4096,
                "modified_at": "2024-01-01T00:00:00Z"
            },
            {
                "id": "file_002",
                "name": "report.pdf",
                "type": "file",
                "size": 2097152,
                "mime_type": "application/pdf",
                "modified_at": "2024-01-01T00:00:00Z"
            }
        ],
        "total": 2,
        "page": 1,
        "page_size": 50
    }
}
```

### رفع ملف

```
POST /api/v3/space/:id/files
```

Content-Type: `multipart/form-data`

| المعامل | النوع | الوصف |
|------|------|------|
| file | file | محتوى الملف |
| path | string | مسار الرفع (افتراضي /) |

### تنزيل ملف

```
GET /api/v3/space/:id/files/:fileId
```

### حذف ملف

```
DELETE /api/v3/space/:id/files/:fileId
```

### إعادة تسمية ملف

```
POST /api/v3/space/:id/files/:fileId/rename
```

جسم الطلب:
```json
{
    "name": "new_name.pdf"
}
```

### نقل ملف

```
POST /api/v3/space/:id/files/:fileId/move
```

جسم الطلب:
```json
{
    "dest_path": "/new_folder/"
}
```

### نسخ ملف

```
POST /api/v3/space/:id/files/:fileId/copy
```

جسم الطلب:
```json
{
    "dest_path": "/backup/"
}
```

### إنشاء دليل

```
POST /api/v3/space/:id/dirs
```

جسم الطلب:
```json
{
    "path": "/new_folder"
}
```

## API المشاركة

### إنشاء رابط مشاركة

```
POST /api/v3/share
```

جسم الطلب:
```json
{
    "file_id": "file_002",
    "space_id": "space_001",
    "expire_at": "2024-02-01T00:00:00Z",
    "download_limit": 100,
    "is_password": true,
    "password": "share123"
}
```

### تنزيل عبر المشاركة

```
GET /api/v3/share/:shareKey/download
```

### عرض المشاركات

```
GET /api/v3/share/list
```

### إلغاء المشاركة

```
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
| 40005 | المورد موجود بالفعل |
| 40006 | مساحة غير كافية |
| 40007 | الجهاز غير متاح |
| 50001 | خطأ داخلي في الخادم |