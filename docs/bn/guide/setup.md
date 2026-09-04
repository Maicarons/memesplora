# ডেভেলপমেন্ট এনভায়রনমেন্ট সেটআপ

## প্রস্তুতি

### প্রয়োজনীয় টুলসমূহ
- **Go**: 1.22 বা উচ্চতর
- **Node.js**: 20 LTS বা উচ্চতর
- **npm**: 10+ বা **pnpm** 8+
- **Git**: সর্বশেষ সংস্করণ

### ঐচ্ছিক টুলসমূহ
- **Docker**: কন্টেইনারাইজড ডিপ্লয়মেন্টের জন্য
- **CUDA Toolkit**: 12+, GPU VRAM ডেভেলপমেন্টের জন্য
- **Make**: Makefile কমান্ড ব্যবহারের জন্য

## প্রকল্প ক্লোন করুন

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## ডিপেন্ডেন্সি ইনস্টল করুন

### ব্যাকএন্ড

```bash
cd backend
go mod tidy
```

### ফ্রন্টএন্ড

```bash
cd frontend
npm install
```

### ডকুমেন্টেশন

```bash
cd docs
npm install
```

## ডেভেলপমেন্ট মোড

### ব্যাকএন্ড শুরু করুন

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### ফ্রন্টএন্ড শুরু করুন (পৃথক টার্মিনাল)

```bash
cd frontend
npm run dev
```

### ডকুমেন্টেশন শুরু করুন (পৃথক টার্মিনাল)

```bash
cd docs
npm run dev
```

## ইনস্টলেশন যাচাই করুন

1. ব্যাকএন্ড: `http://localhost:5212/health` এ `{"status":"ok"}` রিটার্ন করা উচিত
2. ফ্রন্টএন্ড: `http://localhost:5173` এ লগইন পেজ দেখানো উচিত
3. ডক্স: `http://localhost:5174` এ ডকুমেন্টেশন সাইট দেখানো উচিত

## GPU ডেভেলপমেন্ট সেটআপ

### NVIDIA CUDA

1. NVIDIA ড্রাইভার ইনস্টল করুন (545+ প্রস্তাবিত)
2. CUDA Toolkit 12+ ইনস্টল করুন

```bash
nvidia-smi  # GPU যাচাই করুন
nvcc --version  # CUDA যাচাই করুন
```