# REST API संदर्भ

## मूल जानकारी

- **Base URL**: `http://localhost:5212/api/v3`
- **प्रमाणीकरण**: JWT Bearer Token
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

```http
POST /api/v3/admin/login
Content-Type: application/json

{"username": "admin", "password": "your-password"}
```

### वर्तमान सत्र प्राप्त करें

```http
GET /api/v3/user/session
Authorization: Bearer <token>
```

## डिवाइस प्रबंधन API

### सभी डिवाइस सूचीबद्ध करें

```http
GET /api/v3/device
Authorization: Bearer <token>
```

### डिवाइस स्वास्थ्य जांच

```http
GET /api/v3/device/:id/health
Authorization: Bearer <token>
```

## स्पेस प्रबंधन API

### स्पेस बनाएं

```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json

{"name": "My Space", "total_size": 1073741824, "device_id": "ram_0"}
```

### स्पेस सूचीबद्ध करें

```http
GET /api/v3/space
Authorization: Bearer <token>
```

### स्पेस आकार समायोजित करें

```http
POST /api/v3/space/:id/resize
Authorization: Bearer <token>
Content-Type: application/json

{"new_size": 2147483648}
```

## फ़ाइल प्रबंधन API

### फ़ाइलें सूचीबद्ध करें

```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### फ़ाइल अपलोड करें

```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

### फ़ाइल डाउनलोड करें

```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

### नाम बदलें/स्थानांतरित करें/कॉपी करें/हटाएं

```http
POST /api/v3/space/:id/files/:fileId/rename  {"name": "new.txt"}
POST /api/v3/space/:id/files/:fileId/move    {"dest_path": "/newdir"}
POST /api/v3/space/:id/files/:fileId/copy    {"dest_path": "/backup"}
DELETE /api/v3/space/:id/files/:fileId
```

## शेयर API

```http
POST /api/v3/share
Authorization: Bearer <token>
Content-Type: application/json

{"file_id": "file_1", "space_id": "space_1", "download_limit": 5}

GET /api/v3/share/list
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
| 50001 | सर्वर आंतरिक त्रुटि |

## आर्किटेक्चर विवरण

विस्तृत डिज़ाइन के लिए [REST API आर्किटेक्चर](/architecture/rest-api) देखें।