# 개발 가이드

## 코드 표준

- **Go**: [Go 코드 리뷰 코멘트](https://go.dev/wiki/CodeReviewComments) 준수
- **TypeScript/React**: ESLint 권장 설정 준수
- Go 코드 포맷팅에 `gofmt` 사용
- 프론트엔드 코드 포맷팅에 `prettier` 사용

## 동시성 안전성

- 읽기가 많은 시나리오에서는 `sync.RWMutex` 사용
- 교착 상태 방지를 위해 항상 동일한 순서로 잠금 획득
- 잠금 해제에는 `defer` 사용
- 잠금을 보유한 상태에서 외부 인터페이스 호출 금지

## 오류 처리

```go
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}
```

## 테스트

- 핵심 모듈의 단위 테스트 커버리지는 최소 80% 이상
- API 계층은 통합 테스트 필요
- `testing` 표준 라이브러리 사용

## CI/CD

이 프로젝트는 CI/CD에 GitHub Actions를 사용합니다:

- **백엔드 CI**: 푸시/PR 시 빌드, 테스트 및 검사
- **프론트엔드 CI**: TypeScript 확인 및 빌드
- **문서 CI**: VitePress 빌드 및 GitHub Pages에 배포

자세한 내용은 [CI/CD 설정](/ko/development/ci-cd)을 참조하세요.