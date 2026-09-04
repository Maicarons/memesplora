# 기여하기

## 코드 스타일

- **Go**: [Go 코드 리뷰 코멘트](https://go.dev/wiki/CodeReviewComments) 준수
- **TypeScript/React**: ESLint 규칙 준수
- 포맷팅에 `gofmt` 및 `prettier` 사용

## 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>
```

타입: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 브랜치 전략

- `main`: 안정적인 릴리스
- `develop`: 개발 브랜치
- `feature/*`: 기능 브랜치
- `fix/*`: 버그 수정

## 풀 리퀘스트 프로세스

1. 저장소 포크
2. 기능 브랜치 생성: `git checkout -b feature/your-feature`
3. 변경사항 커밋
4. 테스트 실행: `make test`
5. 풀 리퀘스트 생성

## 코드 리뷰

모든 PR은 최소 한 명의 관리자 리뷰가 필요합니다. 중점 영역:
- 메모리 안전성
- 동시성 안전성 (잠금 정확성)
- 오류 처리 완전성
- API 호환성