# Diseño de Base de Datos

## Visión General

Memesplora utiliza ent ORM para la gestión de la base de datos, compatible con SQLite (desarrollo) y PostgreSQL (producción). La base de datos almacena solo metadatos; el contenido real de los archivos se almacena en el sistema de archivos en memoria.

## Esquema

### Usuario
- id, username (único), email (único), password, nickname
- group_id, storage_used, max_storage, is_admin
- created_at, updated_at

### Espacio
- id, name, description, total_size, used_size
- block_size, device_id, device_type, status
- owner_id (FK → User), created_at, updated_at

### Archivo
- id, name, path, size, type, mime_type
- inode_id, parent_id, storage_key, is_shareable
- space_id (FK → Space), created_at, updated_at, deleted_at (eliminación suave)

### Compartición
- id, share_key (único), download_limit, download_count
- expire_at, is_password, password
- owner_id (FK → User), space_id (FK → Space), file_id (FK → File)
- created_at

## Elección de Base de Datos

| Entorno | Base de Datos | Notas |
|:-----------:|:--------:|-------|
| Desarrollo | SQLite | Sin configuración necesaria, basada en archivos |
| Usuario único | SQLite | Adecuado para escenarios de un solo usuario |
| Producción | PostgreSQL | Soporta concurrencia, multi-usuario |
