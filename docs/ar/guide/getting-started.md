# البدء

## مقدمة

يقوم Memesplora بتحويل ذاكرة النظام (RAM) وذاكرة الفيديو لوحدة معالجة الرسومات (VRAM) إلى نظام ملفات فائق السرعة. يمكن للمستخدمين اختيار أجهزة التخزين، وإنشاء مساحات مخصصة الحجم، وإدارة الملفات تمامًا مثل نظام الملفات العادي — مع دعم REST API وبروتوكول متوافق مع S3 وWebDAV.

## متطلبات النظام

### المتطلبات الأساسية (Hardware)
- **المعالج (CPU)**: أي معالج x86_64 / ARM64
- **الذاكرة (RAM)**: 512MB على الأقل خالية للخدمة
- **وحدة معالجة الرسومات (GPU اختياري)**: NVIDIA GPU مع دعم CUDA 12+ لتخزين VRAM

### البرمجيات (Software)
- **نظام التشغيل**: Linux (موصى به)، Windows، macOS
- **Go**: 1.22+ (للتطوير فقط)
- **Node.js**: 20+ (لتطوير الواجهة الأمامية فقط)

## التثبيت السريع

### الخيار 1: تنزيل الملف الثنائي المُجمّع مسبقًا

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### الخيار 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### الخيار 3: البناء من المصدر

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# الواجهة الخلفية
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# الواجهة الأمامية (اختياري، للتطوير)
cd ../frontend
npm install
npm run dev
```

## الاستخدام الأول

1. افتح المتصفح على `http://localhost:5212`
2. ابحث عن كلمة مرور المسؤول في سجل بدء تشغيل الخادم
3. انتقل إلى صفحة "الأجهزة" لعرض أجهزة التخزين المتاحة
4. أنشئ مساحة تخزين
5. ابدأ بإدارة الملفات!

## الإعدادات

```yaml
# config.yaml
server:
  http_port: 5212        # منفذ REST API وواجهة الويب
  s3_port: 5213          # منفذ API المتوافق مع S3
  webdav_port: 5214      # منفذ خدمة WebDAV
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "غيّر-هذا-إلى-سلسلة-عشوائية"
  token_expire: 24h
```

## اتصالات العملاء

### عملاء S3

```bash
# باستخدام rclone
rclone config
# اختر S3 Compatible، endpoint: http://localhost:5213

# باستخدام AWS CLI
aws configure
# عيّن endpoint: http://localhost:5213
```

### عملاء WebDAV

```
# macOS Finder
Go > Connect to Server > http://localhost:5214

# Windows Explorer
انقر يمينًا على "This PC" > Map network drive > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```