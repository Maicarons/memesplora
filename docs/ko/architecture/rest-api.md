# REST API 아키텍처

## 개요

REST API는 Memesplora의 기본 인터페이스로, 완전한 파일 관리, 공간 관리 및 시스템 관리 기능을 제공합니다.

## 기본 URL

`http://localhost:5212/api/v3`

## 인증

JWT Bearer 토큰 (로그인 후 획득).

## 응답 형식

```json
{"code": 0, "message": "success", "data": {}}
```

## API 엔드포인트

### 인증
- `POST /api/v3/admin/login` - 관리자 로그인
- `GET /api/v3/user/session` - 현재 세션 가져오기

### 디바이스
- `GET /api/v3/device` - 디바이스 목록
- `GET /api/v3/device/:id` - 디바이스 상세 정보
- `GET /api/v3/device/:id/health` - 디바이스 상태 확인

### 공간
- `GET /api/v3/space` - 공간 목록
- `POST /api/v3/space` - 공간 생성
- `GET /api/v3/space/:id` - 공간 상세 정보
- `DELETE /api/v3/space/:id` - 공간 삭제
- `POST /api/v3/space/:id/resize` - 공간 크기 조정

### 파일
- `GET /api/v3/space/:id/files` - 파일 목록
- `POST /api/v3/space/:id/files` - 파일 업로드
- `GET /api/v3/space/:id/files/:fileId` - 파일 다운로드
- `DELETE /api/v3/space/:id/files/:fileId` - 파일 삭제
- `POST /api/v3/space/:id/files/:fileId/rename` - 파일 이름 변경
- `POST /api/v3/space/:id/files/:fileId/move` - 파일 이동
- `POST /api/v3/space/:id/files/:fileId/copy` - 파일 복사
- `POST /api/v3/space/:id/dirs` - 디렉토리 생성

### 공유
- `POST /api/v3/share` - 공유 링크 생성
- `GET /api/v3/share/list` - 공유 목록
- `DELETE /api/v3/share/:id` - 공유 삭제
- `GET /api/v3/share/:key/download` - 공유 키로 다운로드

## 오류 코드

| 코드 | 설명 |
|:----:|-------------|
| 0 | 성공 |
| 40001 | 잘못된 매개변수 |
| 40002 | 인증 실패 |
| 40003 | 권한 부족 |
| 40004 | 리소스를 찾을 수 없음 |
| 50001 | 내부 서버 오류 |
