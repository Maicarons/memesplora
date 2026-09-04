# WebDAV Protocol

## Overview

Memesplora supports the WebDAV protocol, allowing storage spaces to be mounted as network drives for direct file operations in the operating system's file manager.

## Port

WebDAV service listens on port `:5214`.

## Authentication

WebDAV uses HTTP Basic Auth with user credentials from the Web management interface.

## Supported Methods

| Method | Description |
|--------|-------------|
| PROPFIND | Get resource properties and collection members |
| PROPPATCH | Modify resource properties |
| MKCOL | Create collection (directory) |
| GET | Get resource content |
| PUT | Upload resource |
| DELETE | Delete resource |
| COPY | Copy resource |
| MOVE | Move resource |
| LOCK | Lock resource |
| UNLOCK | Unlock resource |

## Usage Examples

### macOS Finder
```
Go > Connect to Server > http://localhost:5214
```

### Windows Explorer
```
Right-click "This PC" > Map network drive > http://localhost:5214
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

## Implementation

Uses `golang.org/x/net/webdav` package with an adapter pattern to bridge the in-memory filesystem to the `webdav.FileSystem` interface.