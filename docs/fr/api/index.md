# Reference API

Memesplora fournit trois protocoles d'acces :

## API REST

API HTTP complete pour la gestion des fichiers, la gestion des espaces, l'authentification des utilisateurs et le partage.

- **Port** : 5212
- **URL de base** : `http://localhost:5212/api/v3`
- **Authentification** : Jeton Bearer JWT
- **Documentation** : [Reference API REST](/fr/api/rest)

## API compatible S3

Protocole compatible AWS S3 pour une utilisation avec rclone, AWS CLI, MinIO Client et d'autres outils S3.

- **Port** : 5213
- **Authentification** : Signature AWS V4
- **Documentation** : [Reference API S3](/fr/api/s3)

## WebDAV

Protocole WebDAV pour le montage en tant que lecteur reseau dans les gestionnaires de fichiers du systeme d'exploitation.

- **Port** : 5214
- **Authentification** : Authentification HTTP de base
- **Documentation** : [Reference WebDAV](/fr/api/webdav)