# Guia de Desenvolvimento

## Padroes de Codigo

- **Go**: Siga os [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Siga a configuracao recomendada do ESLint
- Use `gofmt` para formatacao de codigo Go
- Use `prettier` para formatacao de codigo frontend

## Seguranca de Concorrencia

- Use `sync.RWMutex` para cenarios com muita leitura
- Sempre adquira locks na mesma ordem para evitar deadlocks
- Use `defer` para liberar locks
- Evite chamar interfaces externas enquanto mantem locks

## Tratamento de Erros

```go
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}
```

## Testes

- A cobertura de testes unitarios deve ser de pelo menos 80% para modulos principais
- A camada de API precisa de testes de integracao
- Use a biblioteca padrao `testing`

## CI/CD

O projeto usa GitHub Actions para CI/CD:

- **CI do Backend**: Compilar, testar e verificar no push/PR
- **CI do Frontend**: Verificacao TypeScript e compilacao
- **CI da Documentacao**: Compilar e implantar VitePress no GitHub Pages

Consulte [Configuracao CI/CD](/pt/development/ci-cd) para detalhes.