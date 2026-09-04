# Contribuindo

## Estilo de Codigo

- **Go**: Siga os [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Siga as regras do ESLint
- Use `gofmt` e `prettier` para formatacao

## Formato da Mensagem de Commit

```
<tipo>(<escopo>): <assunto>

<corpo>
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Estrategia de Branch

- `main`: Versoes estaveis
- `develop`: Branch de desenvolvimento
- `feature/*`: Branches de funcionalidades
- `fix/*`: Correcoes de bugs

## Processo de Pull Request

1. Fork o repositorio
2. Crie uma branch de funcionalidade: `git checkout -b feature/sua-funcionalidade`
3. Commit suas alteracoes
4. Execute os testes: `make test`
5. Crie um Pull Request

## Revisao de Codigo

Todos os PRs requerem a revisao de pelo menos um mantenedor. Areas de foco:
- Seguranca de memoria
- Seguranca de concorrencia (correcao de locks)
- Completude do tratamento de erros
- Compatibilidade da API