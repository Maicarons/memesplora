# প্রকল্প কাঠামো

```
memesplora/
├── backend/                    # Go ব্যাকএন্ড
│   ├── cmd/server/main.go     # এন্ট্রি পয়েন্ট
│   └── internal/
│       ├── device/            # RAM/VRAM ডিভাইস ব্যবস্থাপনা
│       ├── fs/                # ইন-মেমোরি ফাইলসিস্টেম
│       ├── api/               # REST API হ্যান্ডলার
│       ├── api/middleware/     # Auth, CORS, রেট লিমিটিং
│       ├── s3/                # S3-সামঞ্জস্যপূর্ণ API
│       ├── webdav/            # WebDAV প্রোটোকল
│       └── service/           # বিজনেস লজিক লেয়ার
├── frontend/                   # React SPA
│   └── src/
│       ├── api/               # API ক্লায়েন্ট (Axios)
│       ├── components/        # শেয়ার্ড কম্পোনেন্ট
│       ├── pages/             # পেজ কম্পোনেন্ট
│       ├── stores/            # Zustand স্টেট ম্যানেজমেন্ট
│       ├── types/             # TypeScript টাইপ ডেফিনিশন
│       └── utils/             # ইউটিলিটি ফাংশন
├── docs/                       # VitePress ডকুমেন্টেশন
│   ├── .vitepress/config.ts   # VitePress কনফিগারেশন
│   ├── guide/                 # ব্যবহারকারী গাইড (বাংলা)
│   ├── architecture/          # আর্কিটেকচার ডক্স (বাংলা)
│   ├── api/                   # API রেফারেন্স (বাংলা)
│   ├── zh-CN/                 # চীনা ডকুমেন্টেশন
│   ├── hi/                    # হিন্দি (ল্যান্ডিং পেজ)
│   ├── es/                    # স্প্যানিশ (ল্যান্ডিং পেজ)
│   └── ...                    # অন্যান্য ভাষা
├── scripts/                    # বিল্ড এবং টেস্ট স্ক্রিপ্ট
├── .github/workflows/         # CI/CD পাইপলাইন
├── Dockerfile
├── docker-compose.yml
└── Makefile
```