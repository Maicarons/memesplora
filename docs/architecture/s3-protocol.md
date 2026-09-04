# S3 协议

## 概述

Memesplora 提供与 AWS S3 兼容的 API，可以使用任何 S3 兼容客户端（如 rclone、AWS CLI、MinIO Client）直接访问存储空间。

## 端口

S3 API 监听在 `:5213` 端口。

## 认证

使用 AWS Signature V4 签名算法。Access Key 和 Secret Key 在 Web 管理界面获取。

## 支持的 S3 API

### Bucket 操作

| 操作 | HTTP | 路径 | 说明 |
|------|------|------|------|
| ListBuckets | GET | `/` | 列出所有 Bucket（空间） |
| HeadBucket | HEAD | `/{bucket}` | 检查 Bucket 是否存在 |
| GetBucketLocation | GET | `/{bucket}?location` | 获取 Bucket 区域 |

### 对象操作

| 操作 | HTTP | 路径 | 说明 |
|------|------|------|------|
| GetObject | GET | `/{bucket}/{key}` | 下载对象 |
| PutObject | PUT | `/{bucket}/{key}` | 上传对象 |
| DeleteObject | DELETE | `/{bucket}/{key}` | 删除对象 |
| HeadObject | HEAD | `/{bucket}/{key}` | 获取对象元数据 |
| ListObjects | GET | `/{bucket}` | 列出对象 |
| ListObjectsV2 | GET | `/{bucket}?list-type=2` | 列出对象 V2 |
| DeleteObjects | POST | `/{bucket}?delete` | 批量删除 |
| CopyObject | PUT | `/{bucket}/{key}` (x-amz-copy-source) | 复制对象 |

### 分段上传

| 操作 | HTTP | 路径 | 说明 |
|------|------|------|------|
| CreateMultipartUpload | POST | `/{bucket}/{key}?uploads` | 初始化分段上传 |
| UploadPart | PUT | `/{bucket}/{key}?partNumber=&uploadId=` | 上传分段 |
| CompleteMultipartUpload | POST | `/{bucket}/{key}?uploadId=` | 完成分段上传 |
| AbortMultipartUpload | DELETE | `/{bucket}/{key}?uploadId=` | 取消分段上传 |
| ListParts | GET | `/{bucket}/{key}?uploadId=` | 列出已上传分段 |

## 使用示例

### 使用 AWS CLI

```bash
# 配置
aws configure --profile memesplora
# AWS Access Key ID: your-access-key
# AWS Secret Access Key: your-secret-key
# Default region: us-east-1

# 列出 Bucket
aws s3 --endpoint-url http://localhost:5213 ls

# 上传文件
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/

# 下载文件
aws s3 --endpoint-url http://localhost:5213 cp s3://my-space/file.txt .

# 列出对象
aws s3 --endpoint-url http://localhost:5213 ls s3://my-space/
```

### 使用 rclone

```bash
# 配置远程
rclone config
# 选择 S3 Compatible
# endpoint: http://localhost:5213
# access_key_id: your-access-key
# secret_access_key: your-secret-key

# 上传文件
rclone copy file.txt memesplora:my-space/

# 下载文件
rclone copy memesplora:my-space/file.txt .

# 列出文件
rclone ls memesplora:my-space/
```

### 使用 MinIO Client

```bash
# 配置别名
mc alias set memesplora http://localhost:5213 your-access-key your-secret-key

# 列出 Bucket
mc ls memesplora

# 上传文件
mc cp file.txt memesplora/my-space/

# 下载文件
mc cp memesplora/my-space/file.txt .
```

## 错误响应

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Error>
    <Code>NoSuchKey</Code>
    <Message>The specified key does not exist.</Message>
    <Key>file.txt</Key>
    <RequestId>...</RequestId>
    <HostId>...</HostId>
</Error>
```

## 签名验证

支持 AWS Signature V4 签名算法：

1. 计算签名密钥
2. 构造规范请求
3. 计算签名
4. 验证签名与请求头中的 `Authorization` 一致

## 注意事项

- Bucket 名称对应 Memesplora 中的空间名称
- Object Key 对应文件路径
- 当前不支持 Bucket Policy 和 ACL（所有访问通过用户认证控制）
- 不支持 S3 版本控制