# आरंभ करना

## परिचय

Memesplora सिस्टम मेमोरी (RAM) और GPU वीडियो मेमोरी (VRAM) को हाई-स्पीड फ़ाइल सिस्टम में बदल देता है। उपयोगकर्ता स्टोरेज डिवाइस चुन सकते हैं, कस्टम-आकार के स्थान बना सकते हैं, और फ़ाइलों को नियमित फ़ाइल सिस्टम की तरह प्रबंधित कर सकते हैं — REST API, S3-संगत प्रोटोकॉल और WebDAV के समर्थन के साथ।

## सिस्टम आवश्यकताएँ

### हार्डवेयर
- **CPU**: कोई भी x86_64 / ARM64 प्रोसेसर
- **RAM**: सेवा के लिए कम से कम 512MB खाली
- **GPU (वैकल्पिक)**: VRAM स्टोरेज के लिए CUDA 12+ समर्थन वाला NVIDIA GPU

### सॉफ्टवेयर
- **OS**: Linux (अनुशंसित), Windows, macOS
- **Go**: 1.22+ (केवल डेवलपमेंट)
- **Node.js**: 20+ (केवल फ्रंटएंड डेवलपमेंट)

## त्वरित स्थापना

### विकल्प 1: पूर्व-निर्मित बाइनरी डाउनलोड करें

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### विकल्प 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### विकल्प 3: स्रोत से निर्माण

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# बैकएंड
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# फ्रंटएंड (वैकल्पिक, डेवलपमेंट के लिए)
cd ../frontend
npm install
npm run dev
```

## पहला उपयोग

1. अपना ब्राउज़र `http://localhost:5212` पर खोलें
2. सर्वर स्टार्टअप लॉग में एडमिन पासवर्ड ढूंढें
3. उपलब्ध स्टोरेज डिवाइस देखने के लिए "डिवाइस" पेज पर जाएं
4. एक स्टोरेज स्पेस बनाएं
5. फ़ाइलें प्रबंधित करना शुरू करें!

## कॉन्फ़िगरेशन

```yaml
# config.yaml
server:
  http_port: 5212        # REST API और Web UI पोर्ट
  s3_port: 5213          # S3-संगत API पोर्ट
  webdav_port: 5214      # WebDAV सेवा पोर्ट
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "change-me-to-a-random-string"
  token_expire: 24h
```

## क्लाइंट कनेक्शन

### S3 क्लाइंट

```bash
# rclone का उपयोग करके
rclone config
# S3 कम्पैटिबल चुनें, endpoint: http://localhost:5213

# AWS CLI का उपयोग करके
aws configure
# endpoint सेट करें: http://localhost:5213
```

### WebDAV क्लाइंट

```
# macOS Finder
Go > Connect to Server > http://localhost:5214

# Windows Explorer
राइट-क्लिक करें "This PC" > Map network drive > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```