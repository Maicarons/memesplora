# Architecture de l'API REST

## Aperçu

L'API REST est l'interface principale de Memesplora, fournissant des fonctionnalités complètes de gestion de fichiers, de gestion d'espaces et d'administration du système.

## URL de Base

`http://localhost:5212/api/v3`

## Authentification

Jeton Bearer JWT (obtenu après connexion).

## Format de Réponse

```json
{"code": 0, "message": "success", "data": {}}
```

## Points d'Accès API

### Auth
- `POST /api/v3/admin/login` - Connexion administrateur
- `GET /api/v3/user/session` - Obtenir la session actuelle

### Périphériques
- `GET /api/v3/device` - Lister les périphériques
- `GET /api/v3/device/:id` - Obtenir les détails du périphérique
- `GET /api/v3/device/:id/health` - Vérification de l'état du périphérique

### Espaces
- `GET /api/v3/space` - Lister les espaces
- `POST /api/v3/space` - Créer un espace
- `GET /api/v3/space/:id` - Obtenir les détails de l'espace
- `DELETE /api/v3/space/:id` - Supprimer un espace
- `POST /api/v3/space/:id/resize` - Redimensionner un espace

### Fichiers
- `GET /api/v3/space/:id/files` - Lister les fichiers
- `POST /api/v3/space/:id/files` - Télécharger un fichier
- `GET /api/v3/space/:id/files/:fileId` - Télécharger un fichier
- `DELETE /api/v3/space/:id/files/:fileId` - Supprimer un fichier
- `POST /api/v3/space/:id/files/:fileId/rename` - Renommer un fichier
- `POST /api/v3/space/:id/files/:fileId/move` - Déplacer un fichier
- `POST /api/v3/space/:id/files/:fileId/copy` - Copier un fichier
- `POST /api/v3/space/:id/dirs` - Créer un répertoire

### Partages
- `POST /api/v3/share` - Créer un lien de partage
- `GET /api/v3/share/list` - Lister les partages
- `DELETE /api/v3/share/:id` - Supprimer un partage
- `GET /api/v3/share/:key/download` - Télécharger via clé de partage

## Codes d'Erreur

| Code | Description |
|:----:|-------------|
| 0 | Succès |
| 40001 | Paramètres invalides |
| 40002 | Échec d'authentification |
| 40003 | Permissions insuffisantes |
| 40004 | Ressource non trouvée |
| 50001 | Erreur interne du serveur |
