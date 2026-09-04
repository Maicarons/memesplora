# إعداد بيئة التطوير

## المتطلبات الأساسية

### الأدوات المطلوبة
- **Go**: 1.22 أو أحدث
- **Node.js**: 20 LTS أو أحدث
- **npm**: 10+ أو **pnpm** 8+
- **Git**: أحدث إصدار

### أدوات اختيارية
- **Docker**: للنشر في حاويات
- **CUDA Toolkit**: 12+، لتطوير ذاكرة GPU VRAM
- **Make**: لاستخدام أوامر Makefile

## استنساخ المشروع

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## تثبيت التبعيات

### الواجهة الخلفية

```bash
cd backend
go mod tidy
```

### الواجهة الأمامية

```bash
cd frontend
npm install
```

### التوثيق

```bash
cd docs
npm install
```

## وضع التطوير

### تشغيل الواجهة الخلفية

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### تشغيل الواجهة الأمامية (طرفية منفصلة)

```bash
cd frontend
npm run dev
```

### تشغيل التوثيق (طرفية منفصلة)

```bash
cd docs
npm run dev
```

## التحقق من التثبيت

1. الواجهة الخلفية: `http://localhost:5212/health` يجب أن يعيد `{"status":"ok"}`
2. الواجهة الأمامية: `http://localhost:5173` يجب أن يعرض صفحة تسجيل الدخول
3. التوثيق: `http://localhost:5174` يجب أن يعرض موقع التوثيق

## إعداد تطوير GPU

### NVIDIA CUDA

1. ثبت برنامج تشغيل NVIDIA (يوصى بـ 545+)
2. ثبت CUDA Toolkit 12+

```bash
nvidia-smi  # التحقق من GPU
nvcc --version  # التحقق من CUDA
```