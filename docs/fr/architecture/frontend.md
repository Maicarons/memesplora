# Architecture du Frontend

## Aperçu

Le frontend est construit avec React 18 + TypeScript + Ant Design 5.x, fournissant une application monopage (SPA) qui communique avec le backend via l'API REST.

## Stack Technique

| Technologie | Version | Objectif |
|-----------|:-------:|---------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Sécurité des types |
| Vite | 5.x | Outil de construction |
| Ant Design | 5.x | Bibliothèque de composants UI |
| React Router | 6.x | Routage |
| Zustand | 4.x | Gestion d'état |
| TanStack Query | 5.x | Gestion d'état serveur |
| Axios | 1.x | Client HTTP |

## Routes

```
/                → Rediriger vers /files
/login           → Page de connexion
/dashboard       → Tableau de bord
/files           → Gestion des fichiers (espace par défaut)
/files/:spaceId  → Gestion des fichiers (espace spécifique)
/devices         → Gestion des périphériques
/shares          → Gestion des partages
/admin           → Panneau d'administration
/share/:key      → Page de partage public (sans authentification)
```

## Gestion d'État

Utilise Zustand pour l'état global avec des stores pour l'authentification, l'état des fichiers et les préférences UI (barre latérale, mode sombre).

## Couche API

Utilise Axios avec des intercepteurs pour l'injection automatique de jetons JWT et la gestion des redirections 401.
