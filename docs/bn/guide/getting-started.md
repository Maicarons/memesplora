# শুরু করুন

## ভূমিকা

Memesplora সিস্টেম মেমোরি (RAM) এবং GPU ভিডিও মেমোরি (VRAM) কে একটি উচ্চ-গতির ফাইল সিস্টেমে রূপান্তর করে। ব্যবহারকারীরা স্টোরেজ ডিভাইস নির্বাচন করতে পারেন, কাস্টম-আকারের স্থান তৈরি করতে পারেন, এবং REST API, S3-সামঞ্জস্যপূর্ণ প্রোটোকল এবং WebDAV সমর্থনসহ নিয়মিত ফাইল সিস্টেমের মতোই ফাইল পরিচালনা করতে পারেন।

## সিস্টেম প্রয়োজনীয়তা

### হার্ডওয়্যার
- **CPU**: যেকোনো x86_64 / ARM64 প্রসেসর
- **RAM**: পরিষেবার জন্য কমপক্ষে 512MB ফ্রি
- **GPU (ঐচ্ছিক)**: VRAM স্টোরেজের জন্য CUDA 12+ সমর্থনসহ NVIDIA GPU

### সফটওয়্যার
- **OS**: Linux (প্রস্তাবিত), Windows, macOS
- **Go**: 1.22+ (শুধুমাত্র ডেভেলপমেন্ট)
- **Node.js**: 20+ (শুধুমাত্র ফ্রন্টএন্ড ডেভেলপমেন্ট)

## দ্রুত ইনস্টল

### অপশন 1: প্রি-বিল্ট বাইনারি ডাউনলোড

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### অপশন 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### অপশন 3: সোর্স থেকে বিল্ড

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# ব্যাকএন্ড
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# ফ্রন্টএন্ড (ঐচ্ছিক, ডেভেলপমেন্টের জন্য)
cd ../frontend
npm install
npm run dev
```

## প্রথম ব্যবহার

1. আপনার ব্রাউজারে `http://localhost:5212` খুলুন
2. সার্ভার স্টার্টআপ লগে অ্যাডমিন পাসওয়ার্ড খুঁজুন
3. উপলব্ধ স্টোরেজ ডিভাইস দেখতে "Devices" পৃষ্ঠায় যান
4. একটি স্টোরেজ স্পেস তৈরি করুন
5. ফাইল ম্যানেজ করা শুরু করুন!

## কনফিগারেশন

```yaml
# config.yaml
server:
  http_port: 5212        # REST API এবং Web UI পোর্ট
  s3_port: 5213          # S3-সামঞ্জস্যপূর্ণ API পোর্ট
  webdav_port: 5214      # WebDAV সার্ভিস পোর্ট
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "change-me-to-a-random-string"
  token_expire: 24h
```

## ক্লায়েন্ট সংযোগ

### S3 ক্লায়েন্ট

```bash
# rclone ব্যবহার করে
rclone config
# S3 Compatible নির্বাচন করুন, endpoint: http://localhost:5213

# AWS CLI ব্যবহার করে
aws configure
# endpoint সেট করুন: http://localhost:5213
```

### WebDAV ক্লায়েন্ট

```
# macOS Finder
Go > Connect to Server > http://localhost:5214

# Windows Explorer
"এই পিসি" তে রাইট-ক্লিক করুন > Map network drive > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```