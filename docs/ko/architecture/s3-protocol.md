# S3 프로토콜

## 개요

Memesplora는 AWS S3 호환 API를 제공하여 모든 S3 호환 클라이언트(rclone, AWS CLI, MinIO Client 등)가 스토리지 공간에 직접 접근할 수 있도록 합니다.

## 포트

S3 API는 `:5213` 포트에서 수신 대기합니다.

## 인증

AWS Signature V4 서명 알고리즘을 사용합니다. Access Key와 Secret Key는 웹 관리 인터페이스에서 얻을 수 있습니다.

## 지원되는 API

### 버킷 작업
- `GET /` - ListBuckets
- `HEAD /{bucket}` - HeadBucket

### 객체 작업
- `GET /{bucket}/{key}` - GetObject
- `PUT /{bucket}/{key}` - PutObject
- `DELETE /{bucket}/{key}` - DeleteObject
- `HEAD /{bucket}/{key}` - HeadObject
- `GET /{bucket}` - ListObjects / ListObjectsV2
- `POST /{bucket}?delete` - DeleteObjects
- `PUT /{bucket}/{key}` (x-amz-copy-source 포함) - CopyObject

### 멀티파트 업로드
- `POST /{bucket}/{key}?uploads` - CreateMultipartUpload
- `PUT /{bucket}/{key}?partNumber=&uploadId=` - UploadPart
- `POST /{bucket}/{key}?uploadId=` - CompleteMultipartUpload
- `DELETE /{bucket}/{key}?uploadId=` - AbortMultipartUpload
- `GET /{bucket}/{key}?uploadId=` - ListParts

## 사용 예제

### AWS CLI
```bash
aws configure --profile memesplora
aws s3 --endpoint-url http://localhost:5213 ls
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/
```

### rclone
```bash
rclone config  # S3 호환 선택, endpoint: http://localhost:5213
rclone copy file.txt memesplora:my-space/
```
