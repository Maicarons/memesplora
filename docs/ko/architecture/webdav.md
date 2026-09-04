# WebDAV 프로토콜

## 개요

Memesplora는 WebDAV 프로토콜을 지원하여 스토리지 공간을 네트워크 드라이브로 마운트하고 운영 체제의 파일 관리자에서 직접 파일 작업을 수행할 수 있습니다.

## 포트

WebDAV 서비스는 `:5214` 포트에서 수신 대기합니다.

## 인증

WebDAV는 웹 관리 인터페이스에서 얻은 사용자 자격 증명으로 HTTP Basic Auth를 사용합니다.

## 지원되는 메서드

| 메서드 | 설명 |
|--------|-------------|
| PROPFIND | 리소스 속성 및 컬렉션 멤버 가져오기 |
| PROPPATCH | 리소스 속성 수정 |
| MKCOL | 컬렉션(디렉토리) 생성 |
| GET | 리소스 콘텐츠 가져오기 |
| PUT | 리소스 업로드 |
| DELETE | 리소스 삭제 |
| COPY | 리소스 복사 |
| MOVE | 리소스 이동 |
| LOCK | 리소스 잠금 |
| UNLOCK | 리소스 잠금 해제 |

## 사용 예제

### macOS Finder
```
이동 > 서버에 연결 > http://localhost:5214
```

### Windows 탐색기
```
"내 PC" 우클릭 > 네트워크 드라이브 연결 > http://localhost:5214
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

## 구현

메모리 내 파일시스템을 `webdav.FileSystem` 인터페이스에 연결하기 위해 어댑터 패턴과 함께 `golang.org/x/net/webdav` 패키지를 사용합니다.
