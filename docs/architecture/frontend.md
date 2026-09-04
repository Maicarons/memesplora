# Frontend Architecture

## Overview

The frontend is built with React 18 + TypeScript + Ant Design 5.x, providing a single-page application (SPA) that communicates with the backend via the REST API.

## Tech Stack

| Technology | Version | Purpose |
|-----------|:-------:|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| Ant Design | 5.x | UI component library |
| React Router | 6.x | Routing |
| Zustand | 4.x | State management |
| TanStack Query | 5.x | Server state management |
| Axios | 1.x | HTTP client |

## Routes

```
/                → Redirect to /files
/login           → Login page
/dashboard       → Dashboard
/files           → File management (default space)
/files/:spaceId  → File management (specific space)
/devices         → Device management
/shares          → Share management
/admin           → Admin panel
/share/:key      → Public share page (no auth)
```

## State Management

Uses Zustand for global state with stores for auth, file state, and UI preferences (sidebar, dark mode).

## API Layer

Uses Axios with interceptors for automatic JWT token injection and 401 redirect handling.