# Conception de la Base de Données

## Aperçu

Memesplora utilise ent ORM pour la gestion de la base de données, prenant en charge SQLite (développement) et PostgreSQL (production). La base de données stocke uniquement les métadonnées ; le contenu réel des fichiers est stocké dans le système de fichiers en mémoire.

## Schéma

### Utilisateur
- id, username (unique), email (unique), password, nickname
- group_id, storage_used, max_storage, is_admin
- created_at, updated_at

### Espace
- id, name, description, total_size, used_size
- block_size, device_id, device_type, status
- owner_id (FK → User), created_at, updated_at

### Fichier
- id, name, path, size, type, mime_type
- inode_id, parent_id, storage_key, is_shareable
- space_id (FK → Space), created_at, updated_at, deleted_at (suppression douce)

### Partage
- id, share_key (unique), download_limit, download_count
- expire_at, is_password, password
- owner_id (FK → User), space_id (FK → Space), file_id (FK → File)
- created_at

## Choix de la Base de Données

| Environnement | Base de Données | Notes |
|:-----------:|:--------:|-------|
| Développement | SQLite | Aucune configuration nécessaire, basée sur fichiers |
| Utilisateur unique | SQLite | Adapté aux scénarios mono-utilisateur |
| Production | PostgreSQL | Prend en charge la concurrence, multi-utilisateur |
