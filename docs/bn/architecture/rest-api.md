# REST API ডিজাইন

## ওভারভিউ

REST API হল Memesplora-র প্রধান ইন্টারফেস, যা সম্পূর্ণ ফাইল ম্যানেজমেন্ট, স্পেস ম্যানেজমেন্ট এবং সিস্টেম ম্যানেজমেন্ট কার্যকারিতা প্রদান করে। ওয়েব ফ্রন্টএন্ড এই API-র মাধ্যমে ব্যাকএন্ডের সাথে যোগাযোগ করে।

## বেসিক তথ্য

- **বেস URL**: `http://localhost:5212/api/v3`
- **অথেনটিকেশন**: JWT Bearer Token (লগইন করার পরে প্রাপ্ত)
- **রেসপন্স ফরম্যাট**: JSON

## সাধারণ রেসপন্স ফরম্যাট

```json
{
    "code": 0,
    "message": "success",
    "data": {}
}
```

এরর রেসপন্স:
```json
{
    "code": 40001,
    "message": "প্যারামিটার ত্রুটি",
    "error": "নির্দিষ্ট ত্রুটি বার্তা"
}
```

## অথেনটিকেশন API

### অ্যাডমিন লগইন

```
POST /api/v3/admin/login
```

রিকোয়েস্ট বডি:
```json
{
    "username": "admin",
    "password": "admin123"
}
```

রেসপন্স:
```json
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "nickname": "অ্যাডমিন",
            "is_admin": true
        }
    }
}
```

### বর্তমান সেশন পাওয়া

```
GET /api/v3/user/session
```

হেডার: `Authorization: Bearer <token>`

রেসপন্স:
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "username": "admin",
        "nickname": "অ্যাডমিন",
        "email": "admin@example.com",
        "is_admin": true,
        "storage_used": 1073741824,
        "max_storage": 10737418240
    }
}
```

## স্পেস ম্যানেজমেন্ট API

### সব স্পেস তালিকা

```
GET /api/v3/space
```

রেসপন্স:
```json
{
    "code": 0,
    "data": [
        {
            "id": "space_001",
            "name": "আমার স্পেস",
            "description": "প্রকল্প ফাইল সংরক্ষণের জন্য",
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

### স্পেস তৈরি

```
POST /api/v3/space
```

রিকোয়েস্ট বডি:
```json
{
    "name": "আমার স্পেস",
    "description": "প্রকল্প ফাইল সংরক্ষণের জন্য",
    "total_size": 1073741824,
    "device_id": "ram_0"
}
```

### স্পেসের বিবরণ পাওয়া

```
GET /api/v3/space/:id
```

### স্পেসের সাইজ পরিবর্তন

```
POST /api/v3/space/:id/resize
```

রিকোয়েস্ট বডি:
```json
{
    "new_size": 2147483648
}
```

### স্পেস মুছে ফেলা

```
DELETE /api/v3/space/:id
```

## ডিভাইস ম্যানেজমেন্ট API

### সব ডিভাইস তালিকা

```
GET /api/v3/device
```

রেসপন্স:
```json
{
    "code": 0,
    "data": [
        {
            "id": "ram_0",
            "name": "সিস্টেম মেমোরি",
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

### ডিভাইসের বিবরণ পাওয়া

```
GET /api/v3/device/:id
```

### ডিভাইস স্বাস্থ্য পরীক্ষা

```
GET /api/v3/device/:id/health
```

## ফাইল ম্যানেজমেন্ট API

### ফাইল তালিকা

```
GET /api/v3/space/:id/files?path=/&page=1&page_size=50&order_by=name
```

রেসপন্স:
```json
{
    "code": 0,
    "data": {
        "files": [
            {
                "id": "file_001",
                "name": "ডকুমেন্ট",
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

### ফাইল আপলোড

```
POST /api/v3/space/:id/files
```

Content-Type: `multipart/form-data`

| প্যারামিটার | টাইপ | বিবরণ |
|------|------|------|
| file | file | ফাইলের বিষয়বস্তু |
| path | string | আপলোড পাথ (ডিফল্ট /) |

### ফাইল ডাউনলোড

```
GET /api/v3/space/:id/files/:fileId
```

### ফাইল মুছে ফেলা

```
DELETE /api/v3/space/:id/files/:fileId
```

### ফাইল পুনঃনামকরণ

```
POST /api/v3/space/:id/files/:fileId/rename
```

রিকোয়েস্ট বডি:
```json
{
    "name": "new_name.pdf"
}
```

### ফাইল সরানো

```
POST /api/v3/space/:id/files/:fileId/move
```

রিকোয়েস্ট বডি:
```json
{
    "dest_path": "/new_folder/"
}
```

### ফাইল কপি

```
POST /api/v3/space/:id/files/:fileId/copy
```

রিকোয়েস্ট বডি:
```json
{
    "dest_path": "/backup/"
}
```

### ডিরেক্টরি তৈরি

```
POST /api/v3/space/:id/dirs
```

রিকোয়েস্ট বডি:
```json
{
    "path": "/new_folder"
}
```

## শেয়ার API

### শেয়ার লিংক তৈরি

```
POST /api/v3/share
```

রিকোয়েস্ট বডি:
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

### শেয়ার থেকে ডাউনলোড

```
GET /api/v3/share/:shareKey/download
```

### শেয়ার তালিকা

```
GET /api/v3/share/list
```

### শেয়ার বাতিল

```
DELETE /api/v3/share/:id
```

## স্ট্যাটাস কোড বিবরণ

| স্ট্যাটাস কোড | বিবরণ |
|:------:|------|
| 0 | সফল |
| 40001 | প্যারামিটার ত্রুটি |
| 40002 | অথেনটিকেশন ব্যর্থ |
| 40003 | অনুমতি অপর্যাপ্ত |
| 40004 | রিসোর্স নেই |
| 40005 | রিসোর্স ইতিমধ্যে বিদ্যমান |
| 40006 | স্পেস অপর্যাপ্ত |
| 40007 | ডিভাইস অনুপলব্ধ |
| 50001 | সার্ভার অভ্যন্তরীণ ত্রুটি |