# REST API 参考

## 基础信息

- **Base URL**: `http://localhost:5212/api/v3`
- **认证方式**: JWT Bearer Token
- **响应格式**: JSON

## 通用响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

错误响应：
```json
{
  "code": 40001,
  "message": "参数错误",
  "error": "具体错误信息"
}
```

## 认证 API

### 管理员登录

```http
POST /api/v3/admin/login
Content-Type: application/json

{"username": "admin", "password": "your-password"}
```

### 获取当前会话

```http
GET /api/v3/user/session
Authorization: Bearer <token>
```

## 设备管理 API

### 列出所有设备

```http
GET /api/v3/device
Authorization: Bearer <token>
```

### 设备健康检查

```http
GET /api/v3/device/:id/health
Authorization: Bearer <token>
```

## 空间管理 API

### 创建空间

```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json

{"name": "My Space", "total_size": 1073741824, "device_id": "ram_0"}
```

### 列出空间

```http
GET /api/v3/space
Authorization: Bearer <token>
```

### 调整空间大小

```http
POST /api/v3/space/:id/resize
Authorization: Bearer <token>
Content-Type: application/json

{"new_size": 2147483648}
```

## 文件管理 API

### 列出文件

```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### 上传文件

```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <file>
```

### 下载文件

```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

### 重命名/移动/复制/删除

```http
POST /api/v3/space/:id/files/:fileId/rename  {"name": "new.txt"}
POST /api/v3/space/:id/files/:fileId/move    {"dest_path": "/newdir"}
POST /api/v3/space/:id/files/:fileId/copy    {"dest_path": "/backup"}
DELETE /api/v3/space/:id/files/:fileId
```

## 分享 API

```http
POST /api/v3/share
Authorization: Bearer <token>
Content-Type: application/json

{"file_id": "file_1", "space_id": "space_1", "download_limit": 5}

GET /api/v3/share/list
DELETE /api/v3/share/:id
```

## 状态码说明

| 状态码 | 说明 |
|:------:|------|
| 0 | 成功 |
| 40001 | 参数错误 |
| 40002 | 认证失败 |
| 40003 | 权限不足 |
| 40004 | 资源不存在 |
| 50001 | 服务器内部错误 |

## 架构详情

请参阅 [REST API 架构](/memesplora/architecture/rest-api) 了解详细设计。