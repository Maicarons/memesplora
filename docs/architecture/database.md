# Database Design

## Overview

Memesplora uses ent ORM for database management, supporting SQLite (development) and PostgreSQL (production). The database stores only metadata; actual file content is stored in the in-memory filesystem.

## Schema

### User
- id, username (unique), email (unique), password, nickname
- group_id, storage_used, max_storage, is_admin
- created_at, updated_at

### Space
- id, name, description, total_size, used_size
- block_size, device_id, device_type, status
- owner_id (FK → User), created_at, updated_at

### File
- id, name, path, size, type, mime_type
- inode_id, parent_id, storage_key, is_shareable
- space_id (FK → Space), created_at, updated_at, deleted_at (soft delete)

### Share
- id, share_key (unique), download_limit, download_count
- expire_at, is_password, password
- owner_id (FK → User), space_id (FK → Space), file_id (FK → File)
- created_at

## Database Choice

| Environment | Database | Notes |
|:-----------:|:--------:|-------|
| Development | SQLite | No configuration needed, file-based |
| Single-user | SQLite | Suitable for single-user scenarios |
| Production | PostgreSQL | Supports concurrency, multi-user |