# Design da API REST

## Visao Geral

A API REST e a interface principal do Memesplora, fornecendo funcionalidades completas de gerenciamento de arquivos, gerenciamento de espacos e administracao do sistema. O frontend web interage com o backend atraves desta API.

## Informacoes Basicas

- **URL Base**: `http://localhost:5212/api/v3`
- **Metodo de Autenticacao**: Token JWT Bearer (obtido apos login)
- **Formato de Resposta**: JSON

## Formato de Resposta Generico

```json
{
    "code": 0,
    "message": "sucesso",
    "data": {}
}
```

Resposta de erro:
```json
{
    "code": 40001,
    "message": "Erro de parametro",
    "error": "Mensagem de erro especifica"
}
```

## API de Autenticacao

### Login do Administrador

```
POST /api/v3/admin/login
```

Corpo da requisicao:
```json
{
    "username": "admin",
    "password": "admin123"
}
```

Resposta:
```json
{
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "nickname": "Administrador",
            "is_admin": true
        }
    }
}
```

### Obter Sessao Atual

```
GET /api/v3/user/session
```

Cabecalho: `Authorization: Bearer <token>`

Resposta:
```json
{
    "code": 0,
    "data": {
        "id": 1,
        "username": "admin",
        "nickname": "Administrador",
        "email": "admin@example.com",
        "is_admin": true,
        "storage_used": 1073741824,
        "max_storage": 10737418240
    }
}
```

## API de Gerenciamento de Espacos

### Listar Todos os Espacos

```
GET /api/v3/space
```

Resposta:
```json
{
    "code": 0,
    "data": [
        {
            "id": "space_001",
            "name": "Meu Espaco",
            "description": "Para armazenar arquivos do projeto",
            "total_size": 1073741824,
            "used_size": 524288000,
            "block_size": 4096,
            "device_id": "ram_0",
            "device_type": "ram",
            "status": "active",
            "created_at": "2024-01-01T00:00:00Z"
        }
    ]
}
```

### Criar Espaco

```
POST /api/v3/space
```

Corpo da requisicao:
```json
{
    "name": "Meu Espaco",
    "description": "Para armazenar arquivos do projeto",
    "total_size": 1073741824,
    "device_id": "ram_0"
}
```

### Obter Detalhes do Espaco

```
GET /api/v3/space/:id
```

### Redimensionar Espaco

```
POST /api/v3/space/:id/resize
```

Corpo da requisicao:
```json
{
    "new_size": 2147483648
}
```

### Excluir Espaco

```
DELETE /api/v3/space/:id
```

## API de Gerenciamento de Dispositivos

### Listar Todos os Dispositivos

```
GET /api/v3/device
```

Resposta:
```json
{
    "code": 0,
    "data": [
        {
            "id": "ram_0",
            "name": "Memoria do Sistema",
            "type": "ram",
            "total_size": 17179869184,
            "free_size": 8589934592,
            "used_size": 0,
            "healthy": true,
            "model": ""
        },
        {
            "id": "gpu_0",
            "name": "NVIDIA GeForce RTX 4090",
            "type": "vram",
            "total_size": 25769803776,
            "free_size": 25769803776,
            "used_size": 0,
            "healthy": true,
            "model": "NVIDIA GeForce RTX 4090"
        }
    ]
}
```

### Obter Detalhes do Dispositivo

```
GET /api/v3/device/:id
```

### Verificacao de Saude do Dispositivo

```
GET /api/v3/device/:id/health
```

## API de Gerenciamento de Arquivos

### Listar Arquivos

```
GET /api/v3/space/:id/files?path=/&page=1&page_size=50&order_by=name
```

Resposta:
```json
{
    "code": 0,
    "data": {
        "files": [
            {
                "id": "file_001",
                "name": "Documentos",
                "type": "directory",
                "size": 4096,
                "modified_at": "2024-01-01T00:00:00Z"
            },
            {
                "id": "file_002",
                "name": "relatorio.pdf",
                "type": "file",
                "size": 2097152,
                "mime_type": "application/pdf",
                "modified_at": "2024-01-01T00:00:00Z"
            }
        ],
        "total": 2,
        "page": 1,
        "page_size": 50
    }
}
```

### Upload de Arquivo

```
POST /api/v3/space/:id/files
```

Content-Type: `multipart/form-data`

| Parametro | Tipo | Descricao |
|-----------|------|-----------|
| file | file | Conteudo do arquivo |
| path | string | Caminho de upload (padrao /) |

### Download de Arquivo

```
GET /api/v3/space/:id/files/:fileId
```

### Excluir Arquivo

```
DELETE /api/v3/space/:id/files/:fileId
```

### Renomear Arquivo

```
POST /api/v3/space/:id/files/:fileId/rename
```

Corpo da requisicao:
```json
{
    "name": "novo_nome.pdf"
}
```

### Mover Arquivo

```
POST /api/v3/space/:id/files/:fileId/move
```

Corpo da requisicao:
```json
{
    "dest_path": "/nova_pasta/"
}
```

### Copiar Arquivo

```
POST /api/v3/space/:id/files/:fileId/copy
```

Corpo da requisicao:
```json
{
    "dest_path": "/backup/"
}
```

### Criar Diretorio

```
POST /api/v3/space/:id/dirs
```

Corpo da requisicao:
```json
{
    "path": "/nova_pasta"
}
```

## API de Compartilhamento

### Criar Link de Compartilhamento

```
POST /api/v3/share
```

Corpo da requisicao:
```json
{
    "file_id": "file_002",
    "space_id": "space_001",
    "expire_at": "2024-02-01T00:00:00Z",
    "download_limit": 100,
    "is_password": true,
    "password": "compartilhar123"
}
```

### Download por Compartilhamento

```
GET /api/v3/share/:shareKey/download
```

### Listar Compartilhamentos

```
GET /api/v3/share/list
```

### Cancelar Compartilhamento

```
DELETE /api/v3/share/:id
```

## Tabela de Codigos de Status

| Codigo de Status | Descricao |
|:------:|-----------|
| 0 | Sucesso |
| 40001 | Erro de parametro |
| 40002 | Falha de autenticacao |
| 40003 | Permissao insuficiente |
| 40004 | Recurso nao encontrado |
| 40005 | Recurso ja existe |
| 40006 | Espaco insuficiente |
| 40007 | Dispositivo indisponivel |
| 50001 | Erro interno do servidor |