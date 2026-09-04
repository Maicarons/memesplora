# S3 প্রোটোকল

## ওভারভিউ

Memesplora AWS S3-এর সাথে সামঞ্জস্যপূর্ণ একটি API প্রদান করে, যা যেকোনো S3-সামঞ্জস্যপূর্ণ ক্লায়েন্ট (যেমন rclone, AWS CLI, MinIO ক্লায়েন্ট) ব্যবহার করে সরাসরি স্টোরেজ স্পেস অ্যাক্সেস করতে দেয়।

## পোর্ট

S3 API `:5213` পোর্টে শোনে।

## অথেনটিকেশন

AWS Signature V4 সিগনেচার অ্যালগরিদম ব্যবহার করে। Access Key এবং Secret Key ওয়েব ম্যানেজমেন্ট ইন্টারফেস থেকে পাওয়া যায়।

## সমর্থিত S3 API

### Bucket অপারেশন

| অপারেশন | HTTP | পাথ | বিবরণ |
|------|------|------|------|
| ListBuckets | GET | `/` | সব Bucket (স্পেস) তালিকা |
| HeadBucket | HEAD | `/{bucket}` | Bucket আছে কিনা পরীক্ষা |
| GetBucketLocation | GET | `/{bucket}?location` | Bucket অঞ্চল পাওয়া |

### অবজেক্ট অপারেশন

| অপারেশন | HTTP | পাথ | বিবরণ |
|------|------|------|------|
| GetObject | GET | `/{bucket}/{key}` | অবজেক্ট ডাউনলোড |
| PutObject | PUT | `/{bucket}/{key}` | অবজেক্ট আপলোড |
| DeleteObject | DELETE | `/{bucket}/{key}` | অবজেক্ট মুছে ফেলা |
| HeadObject | HEAD | `/{bucket}/{key}` | অবজেক্ট মেটাডেটা পাওয়া |
| ListObjects | GET | `/{bucket}` | অবজেক্ট তালিকা |
| ListObjectsV2 | GET | `/{bucket}?list-type=2` | অবজেক্ট তালিকা V2 |
| DeleteObjects | POST | `/{bucket}?delete` | ব্যাচ মুছে ফেলা |
| CopyObject | PUT | `/{bucket}/{key}` (x-amz-copy-source) | অবজেক্ট কপি |

### মাল্টিপার্ট আপলোড

| অপারেশন | HTTP | পাথ | বিবরণ |
|------|------|------|------|
| CreateMultipartUpload | POST | `/{bucket}/{key}?uploads` | মাল্টিপার্ট আপলোড শুরু |
| UploadPart | PUT | `/{bucket}/{key}?partNumber=&uploadId=` | পার্ট আপলোড |
| CompleteMultipartUpload | POST | `/{bucket}/{key}?uploadId=` | মাল্টিপার্ট আপলোড সম্পন্ন |
| AbortMultipartUpload | DELETE | `/{bucket}/{key}?uploadId=` | মাল্টিপার্ট আপলোড বাতিল |
| ListParts | GET | `/{bucket}/{key}?uploadId=` | আপলোড করা পার্ট তালিকা |

## ব্যবহারের উদাহরণ

### AWS CLI ব্যবহার

```bash
# কনফিগার
aws configure --profile memesplora
# AWS Access Key ID: your-access-key
# AWS Secret Access Key: your-secret-key
# Default region: us-east-1

# Bucket তালিকা
aws s3 --endpoint-url http://localhost:5213 ls

# ফাইল আপলোড
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/

# ফাইল ডাউনলোড
aws s3 --endpoint-url http://localhost:5213 cp s3://my-space/file.txt .

# অবজেক্ট তালিকা
aws s3 --endpoint-url http://localhost:5213 ls s3://my-space/
```

### rclone ব্যবহার

```bash
# রিমোট কনফিগার
rclone config
# S3 Compatible নির্বাচন
# endpoint: http://localhost:5213
# access_key_id: your-access-key
# secret_access_key: your-secret-key

# ফাইল আপলোড
rclone copy file.txt memesplora:my-space/

# ফাইল ডাউনলোড
rclone copy memesplora:my-space/file.txt .

# ফাইল তালিকা
rclone ls memesplora:my-space/
```

### MinIO ক্লায়েন্ট ব্যবহার

```bash
# আলিয়াস কনফিগার
mc alias set memesplora http://localhost:5213 your-access-key your-secret-key

# Bucket তালিকা
mc ls memesplora

# ফাইল আপলোড
mc cp file.txt memesplora/my-space/

# ফাইল ডাউনলোড
mc cp memesplora/my-space/file.txt .
```

## এরর রেসপন্স

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

## সিগনেচার ভেরিফিকেশন

AWS Signature V4 সিগনেচার অ্যালগরিদম সমর্থন করে:

1. সিগনেচার কী গণনা
2. ক্যানোনিকাল রিকোয়েস্ট তৈরি
3. সিগনেচার গণনা
4. `Authorization` হেডারের সাথে সিগনেচার মিলিয়ে দেখা

## গুরুত্বপূর্ণ নোট

- Bucket নাম Memesplora-র স্পেস নামের সাথে সম্পর্কিত
- Object Key ফাইল পাথের সাথে সম্পর্কিত
- বর্তমানে Bucket Policy এবং ACL সমর্থিত নয় (সব অ্যাক্সেস ইউজার অথেনটিকেশন দ্বারা নিয়ন্ত্রিত)
- S3 ভার্সনিং সমর্থিত নয়