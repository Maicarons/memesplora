# Referencia da API

Memesplora fornece tres protocolos de acesso:

## API REST

API HTTP completa para gerenciamento de arquivos, gerenciamento de espacos, autenticacao de usuarios e compartilhamento.

- **Porta**: 5212
- **URL Base**: `http://localhost:5212/api/v3`
- **Auth**: Token JWT Bearer
- **Docs**: [Referencia da API REST](/pt/api/rest)

## API Compativel com S3

Protocolo compativel com AWS S3 para uso com rclone, AWS CLI, MinIO Client e outras ferramentas S3.

- **Porta**: 5213
- **Auth**: AWS Signature V4
- **Docs**: [Referencia da API S3](/pt/api/s3)

## WebDAV

Protocolo WebDAV para montagem como unidade de rede em gerenciadores de arquivos do sistema operacional.

- **Porta**: 5214
- **Auth**: HTTP Basic Auth
- **Docs**: [Referencia WebDAV](/pt/api/webdav)