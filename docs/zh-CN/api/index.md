# API 参考

Memesplora 提供三种访问协议：

## REST API

完整的 HTTP API，用于文件管理、空间管理、用户认证等。

- **端口**: 5212
- **Base URL**: `http://localhost:5212/api/v3`
- **认证**: JWT Bearer Token
- **文档**: [REST API 参考](/api/rest)

## S3 兼容 API

兼容 AWS S3 协议，可使用 rclone、AWS CLI 等工具访问。

- **端口**: 5213
- **认证**: AWS Signature V4
- **文档**: [S3 API 参考](/api/s3)

## WebDAV

支持 WebDAV 协议，可映射为网络驱动器。

- **端口**: 5214
- **认证**: HTTP Basic Auth
- **文档**: [WebDAV 参考](/api/webdav)