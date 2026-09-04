# Protocolo S3

## Visao Geral

Memesplora fornece uma API compativel com AWS S3, permitindo que qualquer cliente compativel com S3 (como rclone, AWS CLI, MinIO Client) acesse diretamente os espacos de armazenamento.

## Porta

A API S3 escuta na porta `:5213`.

## Autenticacao

Usa o algoritmo de assinatura AWS Signature V4. A Access Key e a Secret Key sao obtidas na interface de administracao web.

## APIs S3 Suportadas

### Operacoes de Bucket

| Operacao | HTTP | Caminho | Descricao |
|---------|------|--------|-----------|
| ListBuckets | GET | `/` | Listar todos os Buckets (espacos) |
| HeadBucket | HEAD | `/{bucket}` | Verificar se o Bucket existe |
| GetBucketLocation | GET | `/{bucket}?location` | Obter regiao do Bucket |

### Operacoes de Objeto

| Operacao | HTTP | Caminho | Descricao |
|---------|------|--------|-----------|
| GetObject | GET | `/{bucket}/{key}` | Baixar objeto |
| PutObject | PUT | `/{bucket}/{key}` | Enviar objeto |
| DeleteObject | DELETE | `/{bucket}/{key}` | Excluir objeto |
| HeadObject | HEAD | `/{bucket}/{key}` | Obter metadados do objeto |
| ListObjects | GET | `/{bucket}` | Listar objetos |
| ListObjectsV2 | GET | `/{bucket}?list-type=2` | Listar objetos V2 |
| DeleteObjects | POST | `/{bucket}?delete` | Exclusao em lote |
| CopyObject | PUT | `/{bucket}/{key}` (x-amz-copy-source) | Copiar objeto |

### Upload Multipart

| Operacao | HTTP | Caminho | Descricao |
|---------|------|--------|-----------|
| CreateMultipartUpload | POST | `/{bucket}/{key}?uploads` | Inicializar upload multipart |
| UploadPart | PUT | `/{bucket}/{key}?partNumber=&uploadId=` | Enviar parte |
| CompleteMultipartUpload | POST | `/{bucket}/{key}?uploadId=` | Completar upload multipart |
| AbortMultipartUpload | DELETE | `/{bucket}/{key}?uploadId=` | Cancelar upload multipart |
| ListParts | GET | `/{bucket}/{key}?uploadId=` | Listar partes enviadas |

## Exemplos de Uso

### Usando AWS CLI

```bash
# Configurar
aws configure --profile memesplora
# AWS Access Key ID: sua-access-key
# AWS Secret Access Key: sua-secret-key
# Regiao padrao: us-east-1

# Listar Buckets
aws s3 --endpoint-url http://localhost:5213 ls

# Upload de arquivo
aws s3 --endpoint-url http://localhost:5213 cp arquivo.txt s3://meu-espaco/

# Download de arquivo
aws s3 --endpoint-url http://localhost:5213 cp s3://meu-espaco/arquivo.txt .

# Listar objetos
aws s3 --endpoint-url http://localhost:5213 ls s3://meu-espaco/
```

### Usando rclone

```bash
# Configurar remote
rclone config
# Selecione S3 Compatible
# endpoint: http://localhost:5213
# access_key_id: sua-access-key
# secret_access_key: sua-secret-key

# Upload de arquivo
rclone copy arquivo.txt memesplora:meu-espaco/

# Download de arquivo
rclone copy memesplora:meu-espaco/arquivo.txt .

# Listar arquivos
rclone ls memesplora:meu-espaco/
```

### Usando MinIO Client

```bash
# Configurar alias
mc alias set memesplora http://localhost:5213 sua-access-key sua-secret-key

# Listar Buckets
mc ls memesplora

# Upload de arquivo
mc cp arquivo.txt memesplora/meu-espaco/

# Download de arquivo
mc cp memesplora/meu-espaco/arquivo.txt .
```

## Resposta de Erro

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Error>
    <Code>NoSuchKey</Code>
    <Message>A chave especificada nao existe.</Message>
    <Key>arquivo.txt</Key>
    <RequestId>...</RequestId>
    <HostId>...</HostId>
</Error>
```

## Verificacao de Assinatura

Suporta o algoritmo de assinatura AWS Signature V4:

1. Calcular a chave de assinatura
2. Construir a requisicao canonica
3. Calcular a assinatura
4. Verificar se a assinatura corresponde ao `Authorization` no cabecalho

## Notas

- O nome do Bucket corresponde ao nome do espaco no Memesplora
- A Object Key corresponde ao caminho do arquivo
- Atualmente nao suporta Bucket Policy e ACL (todo o acesso e controlado pela autenticacao do usuario)
- Nao suporta versionamento S3