# Contribuer

## Style de code

- **Go** : Suivez les [Commentaires de relecture de code Go](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React** : Suivez les regles ESLint
- Utilisez `gofmt` et `prettier` pour le formatage

## Format des messages de commit

```
<type>(<scope>): <sujet>

<corps>
```

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Strategie de branches

- `main` : Versions stables
- `develop` : Branche de developpement
- `feature/*` : Branches de fonctionnalites
- `fix/*` : Corrections de bogues

## Processus de demande de tirage (Pull Request)

1. Forkez le depot
2. Creez une branche de fonctionnalite : `git checkout -b feature/ma-fonctionnalite`
3. Validez vos modifications
4. Executez les tests : `make test`
5. Creez une demande de tirage (Pull Request)

## Relecture de code

Toutes les PR necessitent au moins une relecture par un mainteneur. Points d'attention :
- Securite memoire
- Securite de la concurrence (correction des verrous)
- Exhaustivite de la gestion des erreurs
- Compatibilite de l'API