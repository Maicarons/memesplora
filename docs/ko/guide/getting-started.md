# 시작하기

## 소개

Memesplora는 시스템 메모리 (RAM)와 GPU 비디오 메모리 (VRAM)를 초고속 파일 시스템으로 변환합니다. 사용자는 스토리지 장치를 선택하고, 사용자 정의 크기의 공간을 생성하며, 일반 파일 시스템처럼 파일을 관리할 수 있습니다 — REST API, S3 호환 프로토콜 및 WebDAV를 지원합니다.

## 시스템 요구 사항

### 하드웨어
- **CPU**: 모든 x86_64 / ARM64 프로세서
- **RAM**: 서비스에 최소 512MB 여유 공간
- **GPU (선택 사항)**: VRAM 스토리지를 위한 CUDA 12+ 지원 NVIDIA GPU

### 소프트웨어
- **OS**: Linux (권장), Windows, macOS
- **Go**: 1.22+ (개발 전용)
- **Node.js**: 20+ (프론트엔드 개발 전용)

## 빠른 설치

### 옵션 1: 사전 빌드된 바이너리 다운로드

```bash
# Linux
wget https://github.com/Maicarons/memesplora/releases/latest/download/memesplora-linux-amd64.tar.gz
tar -xzf memesplora-linux-amd64.tar.gz
./memesplora
```

### 옵션 2: Docker

```bash
docker run -d \
  --name memesplora \
  -p 5212:5212 \
  -p 5213:5213 \
  -p 5214:5214 \
  -e MEMESPLORA_MEMORY_SIZE=1073741824 \
  memesplora/memesplora:latest
```

### 옵션 3: 소스에서 빌드

```bash
git clone https://github.com/Maicarons/memesplora.git
cd memesplora

# 백엔드
cd backend
go build -o memesplora ./cmd/server
MEMESPLORA_MEMORY_SIZE=1073741824 ./memesplora

# 프론트엔드 (선택 사항, 개발용)
cd ../frontend
npm install
npm run dev
```

## 첫 사용

1. 브라우저에서 `http://localhost:5212`로 접속
2. 서버 시작 로그에서 관리자 비밀번호 확인
3. "장치" 페이지에서 사용 가능한 스토리지 장치 확인
4. 스토리지 공간 생성
5. 파일 관리 시작!

## 설정

```yaml
# config.yaml
server:
  http_port: 5212        # REST API 및 웹 UI 포트
  s3_port: 5213          # S3 호환 API 포트
  webdav_port: 5214      # WebDAV 서비스 포트
  host: "0.0.0.0"

database:
  driver: sqlite
  dsn: "./data/memesplora.db"

auth:
  jwt_secret: "change-me-to-a-random-string"
  token_expire: 24h
```

## 클라이언트 연결

### S3 클라이언트

```bash
# rclone 사용
rclone config
# S3 호환 선택, 엔드포인트: http://localhost:5213

# AWS CLI 사용
aws configure
# 엔드포인트 설정: http://localhost:5213
```

### WebDAV 클라이언트

```
# macOS Finder
이동 > 서버에 연결 > http://localhost:5214

# Windows 탐색기
"내 PC" 우클릭 > 네트워크 드라이브 연결 > http://localhost:5214

# Linux
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```