# REST API डिज़ाइन

## अवलोकन

REST API Memesplora का मुख्य इंटरफ़ेस है, जो पूर्ण फ़ाइल प्रबंधन, स्पेस प्रबंधन और सिस्टम प्रबंधन कार्यक्षमता प्रदान करता है। Web फ्रंटएंड इस API के माध्यम से बैकएंड के साथ इंटरैक्ट करता है।

## मूल जानकारी

- **Base URL**: `http://localhost:5212/api/v3`
- **प्रमाणीकरण**: JWT Bearer Token (लॉगिन के बाद प्राप्त करें)
- **प्रतिक्रिया प्रारूप**: JSON

## सामान्य प्रतिक्रिया प्रारूप

```json
{
    "code": 0,
    "message": "success",
    "data": {}
}
```

त्रुटि प्रतिक्रिया:
```json
{
    "code": 40001,
    "message": "पैरामीटर त्रुटि",
    "error": "विशिष्ट त्रुटि जानकारी"
}
```

## प्रमाणीकरण API

### एडमिन लॉगिन

```
POST /api/v3/admin/login
```

अनुरोध निकाय:
```json
{
    "username": "admin",
    "password": "admin123"
}
```

प्रतिक्रिया:
```json
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "nickname": "एडमिन",
            "is_admin": true
        }
    }
}
```

### वर्तमान सत्र प्राप्त करें

```
GET /api/v3/user/session
```

अनुरोध हेडर: `Authorization: Bearer <token>`

प्रतिक्रिया:
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "username": "admin",
        "nickname": "एडमिन",
        "email": "admin@example.com",
        "is_admin": true,
        "storage_used": 1073741824,
        "max_storage": 10737418240
    }
}
```

## स्पेस प्रबंधन API

### सभी स्पेस सूचीबद्ध करें

```
GET /api/v3/space
```

प्रतिक्रिया:
```json
{
    "code": 0,
    "data": [
        {
            "id": "space_001",
            "name": "मेरा स्पेस",
            "description": "प्रोजेक्ट फ़ाइलों के लिए",
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

### स्पेस बनाएं

```
POST /api/v3/space
```

अनुरोध निकाय:
```json
{
    "name": "मेरा स्पेस",
    "description": "प्रोजेक्ट फ़ाइलों के लिए",
    "total_size": 1073741824,
    "device_id": "ram_0"
}
```

### स्पेस विवरण प्राप्त करें

```
GET /api/v3/space/:id
```

### स्पेस आकार समायोजित करें

```
POST /api/v3/space/:id/resize
```

अनुरोध निकाय:
```json
{
    "new_size": 2147483648
}
```

### स्पेस हटाएं

```
DELETE /api/v3/space/:id
```

## डिवाइस प्रबंधन API

### सभी डिवाइस सूचीबद्ध करें

```
GET /api/v3/device
```

प्रतिक्रिया:
```json
{
    "code": 0,
    "data": [
        {
            "id": "ram_0",
            "name": "सिस्टम मेमोरी",
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

### डिवाइस विवरण प्राप्त करें

```
GET /api/v3/device/:id
```

### डिवाइस स्वास्थ्य जांच

```
GET /api/v3/device/:id/health
```

## फ़ाइल प्रबंधन API

### फ़ाइलें सूचीबद्ध करें

```
GET /api/v3/space/:id/files?path=/&page=1&page_size=50&order_by=name
```

प्रतिक्रिया:
```json
{
    "code": 0,
    "data": {
        "files": [
            {
                "id": "file_001",
                "name": "दस्तावेज़",
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

### फ़ाइल अपलोड करें

```
POST /api/v3/space/:id/files
```

Content-Type: `multipart/form-data`

| पैरामीटर | प्रकार | विवरण |
|------|------|------|
| file | file | फ़ाइल सामग्री |
| path | string | अपलोड पथ (डिफ़ॉल्ट /) |

### फ़ाइल डाउनलोड करें

```
GET /api/v3/space/:id/files/:fileId
```

### फ़ाइल हटाएं

```
DELETE /api/v3/space/:id/files/:fileId
```

### फ़ाइल का नाम बदलें

```
POST /api/v3/space/:id/files/:fileId/rename
```

अनुरोध निकाय:
```json
{
    "name": "new_name.pdf"
}
```

### फ़ाइल स्थानांतरित करें

```
POST /api/v3/space/:id/files/:fileId/move
```

अनुरोध निकाय:
```json
{
    "dest_path": "/new_folder/"
}
```

### फ़ाइल कॉपी करें

```
POST /api/v3/space/:id/files/:fileId/copy
```

अनुरोध निकाय:
```json
{
    "dest_path": "/backup/"
}
```

### डायरेक्ट्री बनाएं

```
POST /api/v3/space/:id/dirs
```

अनुरोध निकाय:
```json
{
    "path": "/new_folder"
}
```

## शेयर API

### शेयर लिंक बनाएं

```
POST /api/v3/share
```

अनुरोध निकाय:
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

### शेयर के माध्यम से डाउनलोड करें

```
GET /api/v3/share/:shareKey/download
```

### शेयर सूचीबद्ध करें

```
GET /api/v3/share/list
```

### शेयर रद्द करें

```
DELETE /api/v3/share/:id
```

## स्थिति कोड स्पष्टीकरण

| स्थिति कोड | विवरण |
|:------:|------|
| 0 | सफल |
| 40001 | पैरामीटर त्रुटि |
| 40002 | प्रमाणीकरण विफल |
| 40003 | अपर्याप्त अनुमति |
| 40004 | संसाधन मौजूद नहीं |
| 40005 | संसाधन पहले से मौजूद |
| 40006 | अपर्याप्त स्थान |
| 40007 | डिवाइस अनुपलब्ध |
| 50001 | सर्वर आंतरिक त्रुटि |