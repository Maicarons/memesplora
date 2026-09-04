# Apercu de l'architecture

## Architecture du systeme

```
+------------------------------------------------------------+
|                   Couche Interface Utilisateur               |
|   Interface Web (React) . Clients S3 (rclone, AWS CLI) . WebDAV |
+--------------+----------------------+----------------+-----------+
               |                      |                |
        +------v------+       +------v------+  +-----v------+
        |  API REST  |       |  API S3     |  |  WebDAV    |
        |  :5212      |       |  :5213      |  |  :5214     |
        +------+------+       +------+------+  +-----+------+
               |                      |                |
        +------v----------------------v----------------v------+
        |                    Routeur Gin                       |
        |         Middleware : CORS -> Auth -> Limite de debit |
        +----------+-------------------------------------------+
                   |
        +----------v-------------------------------------------+
        |                    Couche Service                      |
        |  Auth . Gestion de fichiers . Gestion des espaces . Partages |
        +----------+-------------------------------------------+
                   |
        +----------v-------------------------------------------+
        |                 Abstraction de stockage                |
        |         Systeme de fichiers en memoire (Inode + Blocs) |
        |  +----------+ +----------+ +----------------------+  |
        |  | Pilote   | | Pilote   | | Couche d'echange/    |  |
        |  | RAM      | | VRAM     | | Persistance (option.) |  |
        |  +----+-----+ +----+-----+ +----------------------+  |
        +-------+-------------+---------------------------------+
                |             |
        +-------v-------------v---------------------------------+
        |              Couche de gestion des peripheriques       |
        |  mmap / VirtualAlloc / CUDA / NVML                     |
        +-------------------------------------------------------+
```

## Tableau des ports

| Port | Service | Description |
|:----:|---------|-------------|
| 5212 | API REST + Interface Web | Port principal pour l'API HTTP et le frontend |
| 5213 | API S3 | Protocole compatible AWS S3 |
| 5214 | WebDAV | Protocole WebDAV |

## Pile technologique

| Couche | Technologie |
|-------|-----------|
| Backend | Go 1.22+, Gin, ent, golang.org/x/net/webdav |
| Frontend | React 18, TypeScript, Ant Design 5, Zustand, Vite |
| Base de donnees | SQLite / PostgreSQL (metadonnees uniquement) |
| RAM | mmap (Linux/macOS) / VirtualAlloc (Windows) |
| VRAM | CUDA + NVML (souche, prete pour l'integration) |