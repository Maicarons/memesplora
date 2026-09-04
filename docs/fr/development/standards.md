# Guide de developpement

## Normes de code

- **Go** : Suivez les [Commentaires de relecture de code Go](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React** : Suivez la configuration recommandee ESLint
- Utilisez `gofmt` pour le formatage du code Go
- Utilisez `prettier` pour le formatage du code frontend

## Securite de la concurrence

- Utilisez `sync.RWMutex` pour les scenarios de lecture intensive
- Acquerez toujours les verrous dans le meme ordre pour prevenir les interblocages
- Utilisez `defer` pour liberer les verrous
- Evitez d'appeler des interfaces externes tout en maintenant des verrous

## Gestion des erreurs

```go
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}
```

## Tests

- La couverture des tests unitaires doit etre d'au moins 80% pour les modules principaux
- La couche API necessite des tests d'integration
- Utilisez la bibliotheque standard `testing`

## CI/CD

Le projet utilise GitHub Actions pour le CI/CD :

- **CI Backend** : Construction, test et vet sur push/PR
- **CI Frontend** : Verification TypeScript et construction
- **CI Documentation** : Construction et deploiement VitePress sur GitHub Pages

Voir la [Configuration CI/CD](/fr/development/ci-cd) pour plus de details.