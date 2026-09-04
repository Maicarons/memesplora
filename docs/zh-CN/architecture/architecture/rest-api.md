# REST API 设计

## 概述

REST API 是 Memesplora 的主要接口，提供完整的文件管理、空间管理和系统管理功能。Web 前端通过此 API 与后端交互。

## 基础信息

- **Base URL**: `http://localhost:5212/api/v3`
- **认证方式**: JWT Bearer Token（登录后获取）
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

```
POST /api/v3/admin/login
```

请求体：
```json
{
    "username": "admin",
    "password": "admin123"
}
```

响应：
```json
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "nickname": "管理员",
            "is_admin": true
        }
    }
}
```

### 获取当前会话

```
GET /api/v3/user/session
```

请求头：`Authorization: Bearer <token>`

响应：
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "username": "admin",
        "nickname": "管理员",
        "email": "admin@example.com",
        "is_admin": true,
        "storage_used": 1073741824,
        "max_storage": 10737418240
    }
}
```

## 空间管理 API

### 列出所有空间

```
GET /api/v3/space
```

响应：
```json
{
    "code": 0,
    "data": [
        {
            "id": "space_001",
            "name": "我的空间",
            "description": "用于存储项目文件",
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

### 创建空间

```
POST /api/v3/space
```

请求体：
```json
{
    "name": "我的空间",
    "description": "用于存储项目文件",
    "total_size": 1073741824,
    "device_id": "ram_0"
}
```

### 获取空间详情

```
GET /api/v3/space/:id
```

### 调整空间大小

```
POST /api/v3/space/:id/resize
```

请求体：
```json
{
    "new_size": 2147483648
}
```

### 删除空间

```
DELETE /api/v3/space/:id
```

## 设备管理 API

### 列出所有设备

```
GET /api/v3/device
```

响应：
```json
{
    "code": 0,
    "data": [
        {
            "id": "ram_0",
            "name": "系统内存",
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

### 获取设备详情

```
GET /api/v3/device/:id
```

### 设备健康检查

```
GET /api/v3/device/:id/health
```

## 文件管理 API

### 列出文件

```
GET /api/v3/space/:id/files?path=/&page=1&page_size=50&order_by=name
```

响应：
```json
{
    "code": 0,
    "data": {
        "files": [
            {
                "id": "file_001",
                "name": "文档",
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

### 上传文件

```
POST /api/v3/space/:id/files
```

Content-Type: `multipart/form-data`

| 参数 | 类型 | 说明 |
|------|------|------|
| file | file | 文件内容 |
| path | string | 上传路径（默认 /） |

### 下载文件

```
GET /api/v3/space/:id/files/:fileId
```

### 删除文件

```
DELETE /api/v3/space/:id/files/:fileId
```

### 重命名文件

```
POST /api/v3/space/:id/files/:fileId/rename
```

请求体：
```json
{
    "name": "new_name.pdf"
}
```

### 移动文件

```
POST /api/v3/space/:id/files/:fileId/move
```

请求体：
```json
{
    "dest_path": "/new_folder/"
}
```

### 复制文件

```
POST /api/v3/space/:id/files/:fileId/copy
```

请求体：
```json
{
    "dest_path": "/backup/"
}
```

### 创建目录

```
POST /api/v3/space/:id/dirs
```

请求体：
```json
{
    "path": "/new_folder"
}
```

## 分享 API

### 创建分享链接

```
POST /api/v3/share
```

请求体：
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

### 通过分享下载

```
GET /api/v3/share/:shareKey/download
```

### 列出分享

```
GET /api/v3/share/list
```

### 取消分享

```
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
| 40005 | 资源已存在 |
| 40006 | 空间不足 |
| 40007 | 设备不可用 |
| 50001 | 服务器内部错误 |