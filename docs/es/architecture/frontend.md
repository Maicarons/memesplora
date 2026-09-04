# Arquitectura del Frontend

## Visión General

El frontend está construido con React 18 + TypeScript + Ant Design 5.x, proporcionando una aplicación de página única (SPA) que se comunica con el backend a través de la API REST.

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|:-------:|---------|
| React | 18.x | Framework de UI |
| TypeScript | 5.x | Seguridad de tipos |
| Vite | 5.x | Herramienta de compilación |
| Ant Design | 5.x | Biblioteca de componentes UI |
| React Router | 6.x | Enrutamiento |
| Zustand | 4.x | Gestión de estado |
| TanStack Query | 5.x | Gestión de estado del servidor |
| Axios | 1.x | Cliente HTTP |

## Rutas

```
/                → Redirigir a /files
/login           → Página de inicio de sesión
/dashboard       → Panel de control
/files           → Gestión de archivos (espacio predeterminado)
/files/:spaceId  → Gestión de archivos (espacio específico)
/devices         → Gestión de dispositivos
/shares          → Gestión de comparticiones
/admin           → Panel de administración
/share/:key      → Página de compartición pública (sin autenticación)
```

## Gestión de Estado

Utiliza Zustand para el estado global con almacenes para autenticación, estado de archivos y preferencias de UI (barra lateral, modo oscuro).

## Capa de API

Utiliza Axios con interceptores para la inyección automática de tokens JWT y manejo de redirección 401.
