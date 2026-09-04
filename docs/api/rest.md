# REST API Reference

## Base Info

- **Base URL**: `http://localhost:5212/api/v3`
- **Auth**: JWT Bearer Token
- **Format**: JSON

## Common Response

```json
{"code": 0, "message": "success", "data": {}}
```

## Endpoints

### Admin Login
```http
POST /api/v3/admin/login
Content-Type: application/json
{"username": "admin", "password": "your-password"}
```

### List Devices
```http
GET /api/v3/device
Authorization: Bearer <token>
```

### Create Space
```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json
{"name": "My Space", "total_size": 1073741824, "device_id": "ram_0"}
```

### List Files
```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### Upload File
```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data
file: <file>
```

### Download File
```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

## Error Codes

| Code | Meaning |
|:----:|---------|
| 0 | Success |
| 40001 | Invalid parameters |
| 40002 | Authentication failed |
| 40003 | Insufficient permissions |
| 40004 | Resource not found |
| 50001 | Internal server error |