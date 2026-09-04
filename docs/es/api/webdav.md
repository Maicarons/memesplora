# Referencia de WebDAV

## Descripción General

Protocolo WebDAV para montar el almacenamiento de Memesplora como una unidad de red.

## Endpoint

`http://localhost:5214`

## Auth

Autenticación Básica HTTP

## Métodos

| Método | Descripción |
|--------|-------------|
| PROPFIND | Listar propiedades y miembros |
| MKCOL | Crear directorio |
| GET | Descargar archivo |
| PUT | Subir archivo |
| DELETE | Eliminar archivo |
| COPY | Copiar archivo |
| MOVE | Mover archivo |
| LOCK | Bloquear archivo |
| UNLOCK | Desbloquear archivo |

## Ejemplos

### macOS Finder
```
Ir > Conectar al Servidor > http://localhost:5214
```

### Windows
```
Conectar unidad de red > http://localhost:5214
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