# REST API Architecture

## Overview

The REST API is the primary interface of Memesplora, providing complete file management, space management, and system administration functionality.

## Base URL

`http://localhost:5212/api/v3`

## Authentication

JWT Bearer Token (obtained after login).

## Response Format

```json
{"code": 0, "message": "success", "data": {}}
```

## API Endpoints

### Auth
- `POST /api/v3/admin/login` - Admin login
- `GET /api/v3/user/session` - Get current session

### Devices
- `GET /api/v3/device` - List devices
- `GET /api/v3/device/:id` - Get device details
- `GET /api/v3/device/:id/health` - Device health check

### Spaces
- `GET /api/v3/space` - List spaces
- `POST /api/v3/space` - Create space
- `GET /api/v3/space/:id` - Get space details
- `DELETE /api/v3/space/:id` - Delete space
- `POST /api/v3/space/:id/resize` - Resize space

### Files
- `GET /api/v3/space/:id/files` - List files
- `POST /api/v3/space/:id/files` - Upload file
- `GET /api/v3/space/:id/files/:fileId` - Download file
- `DELETE /api/v3/space/:id/files/:fileId` - Delete file
- `POST /api/v3/space/:id/files/:fileId/rename` - Rename file
- `POST /api/v3/space/:id/files/:fileId/move` - Move file
- `POST /api/v3/space/:id/files/:fileId/copy` - Copy file
- `POST /api/v3/space/:id/dirs` - Create directory

### Shares
- `POST /api/v3/share` - Create share link
- `GET /api/v3/share/list` - List shares
- `DELETE /api/v3/share/:id` - Delete share
- `GET /api/v3/share/:key/download` - Download via share key

## Error Codes

| Code | Description |
|:----:|-------------|
| 0 | Success |
| 40001 | Invalid parameters |
| 40002 | Authentication failed |
| 40003 | Insufficient permissions |
| 40004 | Resource not found |
| 50001 | Internal server error |