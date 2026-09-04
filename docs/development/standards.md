# Development Guide

## Code Standards

- **Go**: Follow [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Follow ESLint recommended configuration
- Use `gofmt` for Go code formatting
- Use `prettier` for frontend code formatting

## Concurrency Safety

- Use `sync.RWMutex` for read-heavy scenarios
- Always acquire locks in the same order to prevent deadlocks
- Use `defer` to release locks
- Avoid calling external interfaces while holding locks

## Error Handling

```go
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}
```

## Testing

- Unit test coverage should be at least 80% for core modules
- API layer needs integration tests
- Use `testing` standard library

## CI/CD

The project uses GitHub Actions for CI/CD:

- **Backend CI**: Build, test, and vet on push/PR
- **Frontend CI**: TypeScript check and build
- **Docs CI**: Build and deploy VitePress to GitHub Pages

See [CI/CD Configuration](/development/ci-cd) for details.