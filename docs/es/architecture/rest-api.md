# Arquitectura de la API REST

## Visión General

La API REST es la interfaz principal de Memesplora, que proporciona funcionalidad completa de gestión de archivos, gestión de espacios y administración del sistema.

## URL Base

`http://localhost:5212/api/v3`

## Autenticación

Token Bearer JWT (obtenido después del inicio de sesión).

## Formato de Respuesta

```json
{"code": 0, "message": "success", "data": {}}
```

## Endpoints de la API

### Auth
- `POST /api/v3/admin/login` - Inicio de sesión de administrador
- `GET /api/v3/user/session` - Obtener sesión actual

### Dispositivos
- `GET /api/v3/device` - Listar dispositivos
- `GET /api/v3/device/:id` - Obtener detalles del dispositivo
- `GET /api/v3/device/:id/health` - Verificación de estado del dispositivo

### Espacios
- `GET /api/v3/space` - Listar espacios
- `POST /api/v3/space` - Crear espacio
- `GET /api/v3/space/:id` - Obtener detalles del espacio
- `DELETE /api/v3/space/:id` - Eliminar espacio
- `POST /api/v3/space/:id/resize` - Redimensionar espacio

### Archivos
- `GET /api/v3/space/:id/files` - Listar archivos
- `POST /api/v3/space/:id/files` - Subir archivo
- `GET /api/v3/space/:id/files/:fileId` - Descargar archivo
- `DELETE /api/v3/space/:id/files/:fileId` - Eliminar archivo
- `POST /api/v3/space/:id/files/:fileId/rename` - Renombrar archivo
- `POST /api/v3/space/:id/files/:fileId/move` - Mover archivo
- `POST /api/v3/space/:id/files/:fileId/copy` - Copiar archivo
- `POST /api/v3/space/:id/dirs` - Crear directorio

### Comparticiones
- `POST /api/v3/share` - Crear enlace de compartición
- `GET /api/v3/share/list` - Listar comparticiones
- `DELETE /api/v3/share/:id` - Eliminar compartición
- `GET /api/v3/share/:key/download` - Descargar mediante clave de compartición

## Códigos de Error

| Código | Descripción |
|:----:|-------------|
| 0 | Éxito |
| 40001 | Parámetros inválidos |
| 40002 | Autenticación fallida |
| 40003 | Permisos insuficientes |
| 40004 | Recurso no encontrado |
| 50001 | Error interno del servidor |
