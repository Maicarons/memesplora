# डेवलपमेंट वातावरण सेट करना

## पूर्वापेक्षाएँ

### आवश्यक उपकरण
- **Go**: 1.22 या उच्चतर
- **Node.js**: 20 LTS या उच्चतर
- **npm**: 10+ या **pnpm** 8+
- **Git**: नवीनतम संस्करण

### वैकल्पिक उपकरण
- **Docker**: कंटेनरीकृत डिप्लॉयमेंट के लिए
- **CUDA Toolkit**: 12+, GPU VRAM डेवलपमेंट के लिए
- **Make**: Makefile कमांड उपयोग के लिए

## प्रोजेक्ट क्लोन करें

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## निर्भरताएँ स्थापित करें

### बैकएंड

```bash
cd backend
go mod tidy
```

### फ्रंटएंड

```bash
cd frontend
npm install
```

### दस्तावेज़ीकरण

```bash
cd docs
npm install
```

## डेवलपमेंट मोड

### बैकएंड शुरू करें

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### फ्रंटएंड शुरू करें (अलग टर्मिनल)

```bash
cd frontend
npm run dev
```

### दस्तावेज़ीकरण शुरू करें (अलग टर्मिनल)

```bash
cd docs
npm run dev
```

## स्थापना सत्यापित करें

1. बैकएंड: `http://localhost:5212/health` को `{"status":"ok"}` लौटाना चाहिए
2. फ्रंटएंड: `http://localhost:5173` को लॉगिन पेज दिखाना चाहिए
3. दस्तावेज़: `http://localhost:5174` को दस्तावेज़ीकरण साइट दिखानी चाहिए

## GPU डेवलपमेंट सेटअप

### NVIDIA CUDA

1. NVIDIA ड्राइवर स्थापित करें (545+ अनुशंसित)
2. CUDA Toolkit 12+ स्थापित करें

```bash
nvidia-smi  # GPU सत्यापित करें
nvcc --version  # CUDA सत्यापित करें
```