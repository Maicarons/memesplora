# API 참조

Memesplora는 세 가지 접근 프로토콜을 제공합니다:

## REST API

파일 관리, 공간 관리, 사용자 인증 및 공유를 위한 전체 HTTP API입니다.

- **포트**: 5212
- **기본 URL**: `http://localhost:5212/api/v3`
- **인증**: JWT Bearer Token
- **문서**: [REST API 참조](/ko/api/rest)

## S3 호환 API

rclone, AWS CLI, MinIO 클라이언트 및 기타 S3 도구와 함께 사용할 수 있는 AWS S3 호환 프로토콜입니다.

- **포트**: 5213
- **인증**: AWS Signature V4
- **문서**: [S3 API 참조](/ko/api/s3)

## WebDAV

운영 체제 파일 관리자에서 네트워크 드라이브로 마운트하기 위한 WebDAV 프로토콜입니다.

- **포트**: 5214
- **인증**: HTTP Basic Auth
- **문서**: [WebDAV 참조](/ko/api/webdav)