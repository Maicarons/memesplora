# WebDAV 레퍼런스

## 개요

Memesplora 스토리지를 네트워크 드라이브로 마운트하기 위한 WebDAV 프로토콜입니다.

## 엔드포인트

`http://localhost:5214`

## 인증

HTTP Basic Auth

## 메서드

| 메서드 | 설명 |
|--------|-------------|
| PROPFIND | 속성 및 멤버 목록 조회 |
| MKCOL | 디렉토리 생성 |
| GET | 파일 다운로드 |
| PUT | 파일 업로드 |
| DELETE | 파일 삭제 |
| COPY | 파일 복사 |
| MOVE | 파일 이동 |
| LOCK | 파일 잠금 |
| UNLOCK | 파일 잠금 해제 |

## 예시

### macOS Finder
```
이동 > 서버에 연결 > http://localhost:5214
```

### Windows
```
네트워크 드라이브 연결 > http://localhost:5214
```

### Linux
```bash
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```

### curl
```bash
curl -X PROPFIND http://localhost:5214/ -H "Depth: 1"
curl -X MKCOL http://localhost:5214/new-folder
curl -T file.txt http://localhost:5214/file.txt
```