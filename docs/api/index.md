# API Reference

Memesplora provides three access protocols:

## REST API

Full HTTP API for file management, space management, user authentication, and sharing.

- **Port**: 5212
- **Base URL**: `http://localhost:5212/api/v3`
- **Auth**: JWT Bearer Token
- **Docs**: [REST API Reference](/api/rest)

## S3-Compatible API

AWS S3-compatible protocol for use with rclone, AWS CLI, MinIO Client, and other S3 tools.

- **Port**: 5213
- **Auth**: AWS Signature V4
- **Docs**: [S3 API Reference](/api/s3)

## WebDAV

WebDAV protocol for mounting as a network drive in operating system file managers.

- **Port**: 5214
- **Auth**: HTTP Basic Auth
- **Docs**: [WebDAV Reference](/api/webdav)