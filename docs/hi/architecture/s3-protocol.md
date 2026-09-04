# S3 प्रोटोकॉल

## अवलोकन

Memesplora AWS S3 के साथ संगत API प्रदान करता है, जिससे किसी भी S3-संगत क्लाइंट (जैसे rclone, AWS CLI, MinIO Client) का उपयोग करके सीधे स्टोरेज स्पेस तक पहुंचा जा सकता है।

## पोर्ट

S3 API `:5213` पोर्ट पर सुनता है।

## प्रमाणीकरण

AWS Signature V4 सिग्नेचर एल्गोरिदम का उपयोग करें। Access Key और Secret Key Web प्रबंधन इंटरफ़ेस से प्राप्त करें।

## समर्थित S3 API

### Bucket संचालन

| संचालन | HTTP | पथ | विवरण |
|------|------|------|------|
| ListBuckets | GET | `/` | सभी Bucket (स्पेस) सूचीबद्ध करें |
| HeadBucket | HEAD | `/{bucket}` | जांचें कि Bucket मौजूद है या नहीं |
| GetBucketLocation | GET | `/{bucket}?location` | Bucket क्षेत्र प्राप्त करें |

### ऑब्जेक्ट संचालन

| संचालन | HTTP | पथ | विवरण |
|------|------|------|------|
| GetObject | GET | `/{bucket}/{key}` | ऑब्जेक्ट डाउनलोड करें |
| PutObject | PUT | `/{bucket}/{key}` | ऑब्जेक्ट अपलोड करें |
| DeleteObject | DELETE | `/{bucket}/{key}` | ऑब्जेक्ट हटाएं |
| HeadObject | HEAD | `/{bucket}/{key}` | ऑब्जेक्ट मेटाडेटा प्राप्त करें |
| ListObjects | GET | `/{bucket}` | ऑब्जेक्ट सूचीबद्ध करें |
| ListObjectsV2 | GET | `/{bucket}?list-type=2` | ऑब्जेक्ट सूचीबद्ध करें V2 |
| DeleteObjects | POST | `/{bucket}?delete` | बैच हटाएं |
| CopyObject | PUT | `/{bucket}/{key}` (x-amz-copy-source) | ऑब्जेक्ट कॉपी करें |

### मल्टीपार्ट अपलोड

| संचालन | HTTP | पथ | विवरण |
|------|------|------|------|
| CreateMultipartUpload | POST | `/{bucket}/{key}?uploads` | मल्टीपार्ट अपलोड प्रारंभ करें |
| UploadPart | PUT | `/{bucket}/{key}?partNumber=&uploadId=` | भाग अपलोड करें |
| CompleteMultipartUpload | POST | `/{bucket}/{key}?uploadId=` | मल्टीपार्ट अपलोड पूरा करें |
| AbortMultipartUpload | DELETE | `/{bucket}/{key}?uploadId=` | मल्टीपार्ट अपलोड रद्द करें |
| ListParts | GET | `/{bucket}/{key}?uploadId=` | अपलोड किए गए भाग सूचीबद्ध करें |

## उपयोग उदाहरण

### AWS CLI का उपयोग करना

```bash
# कॉन्फ़िगर करें
aws configure --profile memesplora
# AWS Access Key ID: your-access-key
# AWS Secret Access Key: your-secret-key
# Default region: us-east-1

# Bucket सूचीबद्ध करें
aws s3 --endpoint-url http://localhost:5213 ls

# फ़ाइल अपलोड करें
aws s3 --endpoint-url http://localhost:5213 cp file.txt s3://my-space/

# फ़ाइल डाउनलोड करें
aws s3 --endpoint-url http://localhost:5213 cp s3://my-space/file.txt .

# ऑब्जेक्ट सूचीबद्ध करें
aws s3 --endpoint-url http://localhost:5213 ls s3://my-space/
```

### rclone का उपयोग करना

```bash
# रिमोट कॉन्फ़िगर करें
rclone config
# S3 कम्पैटिबल चुनें
# endpoint: http://localhost:5213
# access_key_id: your-access-key
# secret_access_key: your-secret-key

# फ़ाइल अपलोड करें
rclone copy file.txt memesplora:my-space/

# फ़ाइल डाउनलोड करें
rclone copy memesplora:my-space/file.txt .

# फ़ाइलें सूचीबद्ध करें
rclone ls memesplora:my-space/
```

### MinIO Client का उपयोग करना

```bash
# एलियास कॉन्फ़िगर करें
mc alias set memesplora http://localhost:5213 your-access-key your-secret-key

# Bucket सूचीबद्ध करें
mc ls memesplora

# फ़ाइल अपलोड करें
mc cp file.txt memesplora/my-space/

# फ़ाइल डाउनलोड करें
mc cp memesplora/my-space/file.txt .
```

## त्रुटि प्रतिक्रिया

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

## सिग्नेचर सत्यापन

AWS Signature V4 सिग्नेचर एल्गोरिदम का समर्थन करता है:

1. सिग्नेचर कुंजी की गणना करें
2. कैननिकल अनुरोध बनाएं
3. सिग्नेचर की गणना करें
4. हेडर में `Authorization` के साथ सिग्नेचर सत्यापित करें

## ध्यान देने योग्य बातें

- Bucket नाम Memesplora में स्पेस नाम से मेल खाता है
- Object Key फ़ाइल पथ से मेल खाता है
- वर्तमान में Bucket Policy और ACL समर्थित नहीं है (सभी एक्सेस उपयोगकर्ता प्रमाणीकरण द्वारा नियंत्रित)
- S3 वर्शनिंग समर्थित नहीं है