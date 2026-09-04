# WebDAV Reference

## Overview

WebDAV protocol for mounting Memesplora storage as a network drive.

## Endpoint

`http://localhost:5214`

## Auth

HTTP Basic Auth

## Methods

| Method | Description |
|--------|-------------|
| PROPFIND | List properties and members |
| MKCOL | Create directory |
| GET | Download file |
| PUT | Upload file |
| DELETE | Delete file |
| COPY | Copy file |
| MOVE | Move file |
| LOCK | Lock file |
| UNLOCK | Unlock file |

## Examples

### macOS Finder
```
Go > Connect to Server > http://localhost:5214
```

### Windows
```
Map network drive > http://localhost:5214
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