# प्रोजेक्ट संरचना

```
memesplora/
├── backend/                    # Go बैकएंड
│   ├── cmd/server/main.go     # प्रवेश बिंदु
│   └── internal/
│       ├── device/            # RAM/VRAM डिवाइस प्रबंधन
│       ├── fs/                # इन-मेमोरी फ़ाइलसिस्टम
│       ├── api/               # REST API हैंडलर
│       ├── api/middleware/     # Auth, CORS, रेट लिमिटिंग
│       ├── s3/                # S3-संगत API
│       ├── webdav/            # WebDAV प्रोटोकॉल
│       └── service/           # व्यावसायिक तर्क परत
├── frontend/                   # React SPA
│   └── src/
│       ├── api/               # API क्लाइंट (Axios)
│       ├── components/        # साझा घटक
│       ├── pages/             # पेज घटक
│       ├── stores/            # Zustand स्थिति प्रबंधन
│       ├── types/             # TypeScript प्रकार परिभाषाएं
│       └── utils/             # उपयोगिता फ़ंक्शन
├── docs/                       # VitePress दस्तावेज़ीकरण
│   ├── .vitepress/config.ts   # VitePress कॉन्फ़िगरेशन
│   ├── guide/                 # उपयोगकर्ता गाइड (अंग्रेज़ी)
│   ├── architecture/          # आर्किटेक्चर दस्तावेज़ (अंग्रेज़ी)
│   ├── api/                   # API संदर्भ (अंग्रेज़ी)
│   ├── zh-CN/                 # चीनी दस्तावेज़ीकरण
│   ├── hi/                    # हिंदी (लैंडिंग पेज)
│   ├── es/                    # स्पेनिश (लैंडिंग पेज)
│   └── ...                    # अन्य भाषाएं
├── scripts/                    # बिल्ड और टेस्ट स्क्रिप्ट
├── .github/workflows/         # CI/CD पाइपलाइन
├── Dockerfile
├── docker-compose.yml
└── Makefile
```