# Descripción general de la arquitectura

## Arquitectura del sistema

```
┌──────────────────────────────────────────────────────────────────┐
│                   Capa de interfaz de usuario                     │
│   Interfaz web (React)  ·  Clientes S3 (rclone, AWS CLI)  ·  WebDAV    │
└──────────────┬──────────────────────┬────────────────┬───────────┘
               │                      │                │
        ┌──────▼──────┐       ┌──────▼──────┐  ┌─────▼──────┐
        │  API REST   │       │  API S3     │  │  WebDAV    │
        │  :5212      │       │  :5213      │  │  :5214     │
        └──────┬──────┘       └──────┬──────┘  └─────┬──────┘
               │                      │                │
        ┌──────▼──────────────────────▼────────────────▼──────┐
        │                    Enrutador Gin                    │
        │    Middleware: CORS → Autenticación → Límite de velocidad    │
        └──────────┬───────────────────────────────────────────┘
                   │
        ┌──────────▼───────────────────────────────────────────┐
        │                  Capa de servicio                     │
        │  Autenticación · Gestión de archivos · Gestión de espacios · Compartir  │
        └──────────┬───────────────────────────────────────────┘
                   │
        ┌──────────▼───────────────────────────────────────────┐
        │              Abstracción de almacenamiento             │
        │         Sistema de archivos en memoria (basado en Inodo + Bloques)    │
        │  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐  │
        │  │ RAM      │ │ VRAM    │ │ Intercambio/Persistencia  │
        │  │ Controlador │ │ Controlador │ │ (opcional)            │  │
        │  └────┬─────┘ └────┬─────┘ └──────────────────────┘  │
        └───────┼─────────────┼─────────────────────────────────┘
                │             │
        ┌───────▼─────────────▼─────────────────────────────────┐
        │              Capa de gestión de dispositivos           │
        │  mmap / VirtualAlloc / CUDA / NVML                    │
        └───────────────────────────────────────────────────────┘
```

## Mapa de puertos

| Puerto | Servicio | Descripción |
|:----:|---------|-------------|
| 5212 | API REST + Interfaz web | Puerto principal para API HTTP y frontend |
| 5213 | API S3 | Protocolo compatible con AWS S3 |
| 5214 | WebDAV | Protocolo WebDAV |

## Stack tecnológico

| Capa | Tecnología |
|-------|-----------|
| Backend | Go 1.22+, Gin, ent, golang.org/x/net/webdav |
| Frontend | React 18, TypeScript, Ant Design 5, Zustand, Vite |
| Base de datos | SQLite / PostgreSQL (solo metadatos) |
| RAM | mmap (Linux/macOS) / VirtualAlloc (Windows) |
| VRAM | CUDA + NVML (esqueleto, listo para integración) |