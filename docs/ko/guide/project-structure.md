# 프로젝트 구조

```
memesplora/
├── backend/                    # Go 백엔드
│   ├── cmd/server/main.go     # 진입점
│   └── internal/
│       ├── device/            # RAM/VRAM 장치 관리
│       ├── fs/                # 인메모리 파일 시스템
│       ├── api/               # REST API 핸들러
│       ├── api/middleware/     # 인증, CORS, 속도 제한
│       ├── s3/                # S3 호환 API
│       ├── webdav/            # WebDAV 프로토콜
│       └── service/           # 비즈니스 로직 계층
├── frontend/                   # React SPA
│   └── src/
│       ├── api/               # API 클라이언트 (Axios)
│       ├── components/        # 공유 컴포넌트
│       ├── pages/             # 페이지 컴포넌트
│       ├── stores/            # Zustand 상태 관리
│       ├── types/             # TypeScript 타입 정의
│       └── utils/             # 유틸리티 함수
├── docs/                       # VitePress 문서
│   ├── .vitepress/config.ts   # VitePress 설정
│   ├── guide/                 # 사용자 가이드 (영어)
│   ├── architecture/          # 아키텍처 문서 (영어)
│   ├── api/                   # API 참조 (영어)
│   ├── zh-CN/                 # 중국어 문서
│   ├── hi/                    # 힌디어 (랜딩 페이지)
│   ├── es/                    # 스페인어 (랜딩 페이지)
│   └── ...                    # 기타 언어
├── scripts/                    # 빌드 및 테스트 스크립트
├── .github/workflows/         # CI/CD 파이프라인
├── Dockerfile
├── docker-compose.yml
└── Makefile
```