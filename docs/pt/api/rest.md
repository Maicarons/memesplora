# Referencia da API REST

## Informacoes Basicas

- **URL Base**: `http://localhost:5212/api/v3`
- **Metodo de Autenticacao**: Token JWT Bearer
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

```http
POST /api/v3/admin/login
Content-Type: application/json

{"username": "admin", "password": "sua-senha"}
```

### Obter Sessao Atual

```http
GET /api/v3/user/session
Authorization: Bearer <token>
```

## API de Gerenciamento de Dispositivos

### Listar Todos os Dispositivos

```http
GET /api/v3/device
Authorization: Bearer <token>
```

### Verificacao de Saude do Dispositivo

```http
GET /api/v3/device/:id/health
Authorization: Bearer <token>
```

## API de Gerenciamento de Espacos

### Criar Espaco

```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json

{"name": "Meu Espaco", "total_size": 1073741824, "device_id": "ram_0"}
```

### Listar Espacos

```http
GET /api/v3/space
Authorization: Bearer <token>
```

### Redimensionar Espaco

```http
POST /api/v3/space/:id/resize
Authorization: Bearer <token>
Content-Type: application/json

{"new_size": 2147483648}
```

## API de Gerenciamento de Arquivos

### Listar Arquivos

```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### Upload de Arquivo

```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <arquivo>
```

### Download de Arquivo

```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

### Renomear/Mover/Copiar/Excluir

```http
POST /api/v3/space/:id/files/:fileId/rename  {"name": "novo.txt"}
POST /api/v3/space/:id/files/:fileId/move    {"dest_path": "/novodir"}
POST /api/v3/space/:id/files/:fileId/copy    {"dest_path": "/backup"}
DELETE /api/v3/space/:id/files/:fileId
```

## API de Compartilhamento

```http
POST /api/v3/share
Authorization: Bearer <token>
Content-Type: application/json

{"file_id": "file_1", "space_id": "space_1", "download_limit": 5}

GET /api/v3/share/list
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
| 50001 | Erro interno do servidor |

## Detalhes da Arquitetura

Consulte [Arquitetura da API REST](/pt/architecture/rest-api) para entender o design detalhado.