# 개발 환경 설정

## 사전 요구 사항

### 필수 도구
- **Go**: 1.22 이상
- **Node.js**: 20 LTS 이상
- **npm**: 10+ 또는 **pnpm** 8+
- **Git**: 최신 버전

### 선택 도구
- **Docker**: 컨테이너화된 배포용
- **CUDA Toolkit**: 12+, GPU VRAM 개발용
- **Make**: Makefile 명령어 사용용

## 프로젝트 클론

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora
```

## 의존성 설치

### 백엔드

```bash
cd backend
go mod tidy
```

### 프론트엔드

```bash
cd frontend
npm install
```

### 문서

```bash
cd docs
npm install
```

## 개발 모드

### 백엔드 시작

```bash
cd backend
MEMESPLORA_MEMORY_SIZE=1073741824 go run ./cmd/server
```

### 프론트엔드 시작 (별도 터미널)

```bash
cd frontend
npm run dev
```

### 문서 시작 (별도 터미널)

```bash
cd docs
npm run dev
```

## 설치 확인

1. 백엔드: `http://localhost:5212/health` → `{"status":"ok"}` 반환
2. 프론트엔드: `http://localhost:5173` → 로그인 페이지 표시
3. 문서: `http://localhost:5174` → 문서 사이트 표시

## GPU 개발 설정

### NVIDIA CUDA

1. NVIDIA 드라이버 설치 (545+ 권장)
2. CUDA Toolkit 12+ 설치

```bash
nvidia-smi  # GPU 확인
nvcc --version  # CUDA 확인
```