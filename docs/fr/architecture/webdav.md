# Protocole WebDAV

## Aperçu

Memesplora prend en charge le protocole WebDAV, permettant de monter les espaces de stockage comme des lecteurs réseau pour des opérations directes sur les fichiers dans le gestionnaire de fichiers du système d'exploitation.

## Port

Le service WebDAV écoute sur le port `:5214`.

## Authentification

WebDAV utilise HTTP Basic Auth avec les identifiants utilisateur obtenus depuis l'interface d'administration web.

## Méthodes Supportées

| Méthode | Description |
|--------|-------------|
| PROPFIND | Obtenir les propriétés des ressources et les membres de la collection |
| PROPPATCH | Modifier les propriétés des ressources |
| MKCOL | Créer une collection (répertoire) |
| GET | Obtenir le contenu d'une ressource |
| PUT | Télécharger une ressource |
| DELETE | Supprimer une ressource |
| COPY | Copier une ressource |
| MOVE | Déplacer une ressource |
| LOCK | Verrouiller une ressource |
| UNLOCK | Déverrouiller une ressource |

## Exemples d'Utilisation

### macOS Finder
```
Aller > Se connecter au serveur > http://localhost:5214
```

### Windows Explorer
```
Clic droit "Ce PC" > Connecter un lecteur réseau > http://localhost:5214
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

## Implémentation

Utilise le paquet `golang.org/x/net/webdav` avec un modèle d'adaptateur pour faire le pont entre le système de fichiers en mémoire et l'interface `webdav.FileSystem`.
