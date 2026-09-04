# Référence de l'API REST

## Informations de Base

- **URL de Base**: `http://localhost:5212/api/v3`
- **Auth**: Jeton Bearer JWT
- **Format**: JSON

## Réponse Commune

```json
{"code": 0, "message": "success", "data": {}}
```

## Points d'Accès

### Connexion Administrateur
```http
POST /api/v3/admin/login
Content-Type: application/json
{"username": "admin", "password": "your-password"}
```

### Lister les Périphériques
```http
GET /api/v3/device
Authorization: Bearer <token>
```

### Créer un Espace
```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json
{"name": "My Space", "total_size": 1073741824, "device_id": "ram_0"}
```

### Lister les Fichiers
```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### Télécharger un Fichier
```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data
file: <file>
```

### Télécharger un Fichier
```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

## Codes d'Erreur

| Code | Signification |
|:----:|---------|
| 0 | Succès |
| 40001 | Paramètres invalides |
| 40002 | Échec d'authentification |
| 40003 | Permissions insuffisantes |
| 40004 | Ressource non trouvée |
| 50001 | Erreur interne du serveur |
