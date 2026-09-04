# Référence WebDAV

## Aperçu

Protocole WebDAV pour monter le stockage Memesplora comme un lecteur réseau.

## Point d'Accès

`http://localhost:5214`

## Authentification

HTTP Basic Auth

## Méthodes

| Méthode | Description |
|---------|-------------|
| PROPFIND | Lister les propriétés et les membres |
| MKCOL | Créer un répertoire |
| GET | Télécharger un fichier |
| PUT | Téléverser un fichier |
| DELETE | Supprimer un fichier |
| COPY | Copier un fichier |
| MOVE | Déplacer un fichier |
| LOCK | Verrouiller un fichier |
| UNLOCK | Déverrouiller un fichier |

## Exemples

### macOS Finder
```
Aller > Se connecter au serveur > http://localhost:5214
```

### Windows
```
Connecter un lecteur réseau > http://localhost:5214
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