# REST API রেফারেন্স

## বেসিক তথ্য

- **বেস URL**: `http://localhost:5212/api/v3`
- **অথেনটিকেশন পদ্ধতি**: JWT Bearer Token
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

```http
POST /api/v3/admin/login
Content-Type: application/json

{"username": "admin", "password": "your-password"}
```

### বর্তমান সেশন পাওয়া

```http
GET /api/v3/user/session
Authorization: Bearer <token>
```

## ডিভাইস ম্যানেজমেন্ট API

### সব ডিভাইস তালিকা

```http
GET /api/v3/device
Authorization: Bearer <token>
```

### ডিভাইস স্বাস্থ্য পরীক্ষা

```http
GET /api/v3/device/:id/health
Authorization: Bearer <token>
```

## স্পেস ম্যানেজমেন্ট API

### স্পেস তৈরি

```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json

{"name": "My Space", "total_size": 1073741824, "device_id": "ram_0"}
```

### স্পেস তালিকা

```http
GET /api/v3/space
Authorization: Bearer <token>
```

### স্পেসের সাইজ পরিবর্তন

```http
POST /api/v3/space/:id/resize
Authorization: Bearer <token>
Content-Type: application/json

{"new_size": 2147483648}
```

## ফাইল ম্যানেজমেন্ট API

### ফাইল তালিকা

```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### ফাইল আপলোড

```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

### ফাইল ডাউনলোড

```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

### পুনঃনামকরণ/সরানো/কপি/মুছে ফেলা

```http
POST /api/v3/space/:id/files/:fileId/rename  {"name": "new.txt"}
POST /api/v3/space/:id/files/:fileId/move    {"dest_path": "/newdir"}
POST /api/v3/space/:id/files/:fileId/copy    {"dest_path": "/backup"}
DELETE /api/v3/space/:id/files/:fileId
```

## শেয়ার API

```http
POST /api/v3/share
Authorization: Bearer <token>
Content-Type: application/json

{"file_id": "file_1", "space_id": "space_1", "download_limit": 5}

GET /api/v3/share/list
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
| 50001 | সার্ভার অভ্যন্তরীণ ত্রুটি |

## আর্কিটেকচার বিবরণ

বিস্তারিত ডিজাইনের জন্য [REST API আর্কিটেকচার](/architecture/rest-api) দেখুন।