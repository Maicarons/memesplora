# Contributing

## Code Style

- **Go**: Follow [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Follow ESLint rules
- Use `gofmt` and `prettier` for formatting

## Commit Message Format

```
<type>(<scope>): <subject>

<body>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Branch Strategy

- `main`: Stable releases
- `develop`: Development branch
- `feature/*`: Feature branches
- `fix/*`: Bug fixes

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Run tests: `make test`
5. Create a Pull Request

## Code Review

All PRs require at least one maintainer review. Focus areas:
- Memory safety
- Concurrency safety (lock correctness)
- Error handling completeness
- API compatibility