# Protocolo WebDAV

## Visión General

Memesplora admite el protocolo WebDAV, permitiendo montar espacios de almacenamiento como unidades de red para operaciones directas con archivos en el administrador de archivos del sistema operativo.

## Puerto

El servicio WebDAV escucha en el puerto `:5214`.

## Autenticación

WebDAV utiliza HTTP Basic Auth con credenciales de usuario obtenidas desde la interfaz de gestión web.

## Métodos Compatibles

| Método | Descripción |
|--------|-------------|
| PROPFIND | Obtener propiedades de recursos y miembros de colección |
| PROPPATCH | Modificar propiedades de recursos |
| MKCOL | Crear colección (directorio) |
| GET | Obtener contenido de recurso |
| PUT | Subir recurso |
| DELETE | Eliminar recurso |
| COPY | Copiar recurso |
| MOVE | Mover recurso |
| LOCK | Bloquear recurso |
| UNLOCK | Desbloquear recurso |

## Ejemplos de Uso

### macOS Finder
```
Ir > Conectar al Servidor > http://localhost:5214
```

### Windows Explorer
```
Clic derecho "Este PC" > Conectar unidad de red > http://localhost:5214
```

### Linux
```bash
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```

### curl
```bash
curl -X PROPFIND http://localhost:5214/ -H "Depth: 1"
curl -X MKCOL http://localhost:5214/new-folder
curl -T file.txt http://localhost:5214/file.txt
```

## Implementación

Utiliza el paquete `golang.org/x/net/webdav` con un patrón adaptador para conectar el sistema de archivos en memoria a la interfaz `webdav.FileSystem`.
