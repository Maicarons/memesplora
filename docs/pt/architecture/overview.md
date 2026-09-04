# Visao Geral da Arquitetura

## Arquitetura do Sistema

```
┌──────────────────────────────────────────────────────────────────┐
│                   Camada de Interface do Usuario                   │
│   Interface Web (React)  ·  Clientes S3 (rclone, AWS CLI)  ·  WebDAV    │
└──────────────┬──────────────────────┬────────────────┬───────────┘
               │                      │                │
        ┌──────▼──────┐       ┌──────▼──────┐  ┌─────▼──────┐
        │  API REST   │       │  API S3     │  │  WebDAV    │
        │  :5212      │       │  :5213      │  │  :5214     │
        └──────┬──────┘       └──────┬──────┘  └─────┬──────┘
               │                      │                │
        ┌──────▼──────────────────────▼────────────────▼──────┐
        │                    Gin Router                        │
        │         Middleware: CORS → Auth → Limitacao de Taxa  │
        └──────────┬───────────────────────────────────────────┘
                   │
        ┌──────────▼───────────────────────────────────────────┐
        │                Camada de Servico                      │
        │  Auth · Gerenciamento de Arquivos · Espacos · Compartilhamentos  │
        └──────────┬───────────────────────────────────────────┘
                   │
        ┌──────────▼───────────────────────────────────────────┐
        │              Abstracao de Armazenamento               │
        │         Sistema de Arquivos em Memoria (Inode + Blocos)   │
        │  ┌──────────┐ ┌──────────┐ ┌──────────────────────┐  │
        │  │ Driver   │ │ Driver   │ │ Camada de Swap/      │  │
        │  │ RAM      │ │ VRAM     │ │ Persistencia (opcional)│  │
        │  └────┬─────┘ └────┬─────┘ └──────────────────────┘  │
        └───────┼─────────────┼─────────────────────────────────┘
                │             │
        ┌───────▼─────────────▼─────────────────────────────────┐
        │              Camada de Gerenciamento de Dispositivos   │
        │  mmap / VirtualAlloc / CUDA / NVML                     │
        └───────────────────────────────────────────────────────┘
```

## Mapa de Portas

| Porta | Servico | Descricao |
|:----:|---------|-----------|
| 5212 | API REST + Interface Web | Porta principal para API HTTP e frontend |
| 5213 | API S3 | Protocolo compativel com AWS S3 |
| 5214 | WebDAV | Protocolo WebDAV |

## Pilha de Tecnologias

| Camada | Tecnologia |
|-------|-----------|
| Backend | Go 1.22+, Gin, ent, golang.org/x/net/webdav |
| Frontend | React 18, TypeScript, Ant Design 5, Zustand, Vite |
| Banco de Dados | SQLite / PostgreSQL (apenas metadados) |
| RAM | mmap (Linux/macOS) / VirtualAlloc (Windows) |
| VRAM | CUDA + NVML (esboco, pronto para integracao) |