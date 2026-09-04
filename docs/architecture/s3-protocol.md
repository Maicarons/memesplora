# S3 Protocol

## Overview

Memesplora provides an AWS S3-compatible API, allowing any S3-compatible client (such as rclone, AWS CLI, MinIO Client) to access storage spaces directly.

## Port

S3 API listens on port `:5213`.

## Authentication

Uses AWS Signature V4 signing algorithm. Access Key and Secret Key are obtained from the Web management interface.

## Supported API

### Bucket Operations
- `GET /` - ListBuckets
- `HEAD /{bucket}` - HeadBucket

### Object Operations
- `GET /{bucket}/{key}` - GetObject
- `PUT /{bucket}/{key}` - PutObject
- `DELETE /{bucket}/{key}` - DeleteObject
- `HEAD /{bucket}/{key}` - HeadObject
- `GET /{bucket}` - ListObjects / ListObjectsV2
- `POST /{bucket}?delete` - DeleteObjects
- `PUT /{bucket}/{key}` (with x-amz-copy-source) - CopyObject

### Multipart Upload
- `POST /{bucket}/{key}?uploads` - CreateMultipartUpload
- `PUT /{bucket}/{key}?partNumber=&uploadId=` - UploadPart
- `POST /{bucket}/{key}?uploadId=` - CompleteMultipartUpload
- `DELETE /{bucket}/{key}?uploadId=` - AbortMultipartUpload
- `GET /{bucket}/{key}?uploadId=` - ListParts

## Usage Examples

### AWS CLI
```bash
aws configure --profile memesplora
aws s3 --endpoint-url http://localhost:5213 ls
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/
```

### rclone
```bash
rclone config  # Select S3 Compatible, endpoint: http://localhost:5213
rclone copy file.txt memesplora:my-space/
```