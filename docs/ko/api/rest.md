# REST API 참조

## 기본 정보

- **기본 URL**: `http://localhost:5212/api/v3`
- **인증**: JWT Bearer Token
- **형식**: JSON

## 공통 응답

```json
{"code": 0, "message": "success", "data": {}}
```

## 엔드포인트

### 관리자 로그인
```http
POST /api/v3/admin/login
Content-Type: application/json
{"username": "admin", "password": "your-password"}
```

### 디바이스 목록
```http
GET /api/v3/device
Authorization: Bearer <token>
```

### 공간 생성
```http
POST /api/v3/space
Authorization: Bearer <token>
Content-Type: application/json
{"name": "My Space", "total_size": 1073741824, "device_id": "ram_0"}
```

### 파일 목록
```http
GET /api/v3/space/:id/files?path=/&page=1&page_size=50
Authorization: Bearer <token>
```

### 파일 업로드
```http
POST /api/v3/space/:id/files?path=/
Authorization: Bearer <token>
Content-Type: multipart/form-data
file: <file>
```

### 파일 다운로드
```http
GET /api/v3/space/:id/files/:fileId
Authorization: Bearer <token>
```

## 오류 코드

| 코드 | 의미 |
|:----:|---------|
| 0 | 성공 |
| 40001 | 잘못된 매개변수 |
| 40002 | 인증 실패 |
| 40003 | 권한 부족 |
| 40004 | 리소스를 찾을 수 없음 |
| 50001 | 내부 서버 오류 |
