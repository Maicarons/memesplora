# Referencia de la API REST

## Información Base

- **URL Base**: `http://localhost:5212/api/v3`
- **Auth**: Token Bearer JWT
- **Formato**: JSON

## Respuesta Común

```json
{"code": 0, "message": "success", "data": {}}
```

## Endpoints

### Inicio de Sesión de Administrador
```http
POST /api/v3/admin/login
Content-Type: application/json
{"username": "admin", "password": "your-password"}
```

### Listar Dispositivos
```http
GET /api/v3/device
Authorization: Bearer <token>
```

### Crear Espacio
```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json
{"name": "My Space", "total_size": 1073741824, "device_id": "ram_0"}
```

### Listar Archivos
```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### Subir Archivo
```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data
file: <file>
```

### Descargar Archivo
```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

## Códigos de Error

| Código | Significado |
|:----:|---------|
| 0 | Éxito |
| 40001 | Parámetros inválidos |
| 40002 | Autenticación fallida |
| 40003 | Permisos insuficientes |
| 40004 | Recurso no encontrado |
| 50001 | Error interno del servidor |
