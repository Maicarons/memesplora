# Структура проекта

```
memesplora/
├── backend/                    # Бэкенд на Go
│   ├── cmd/server/main.go     # Точка входа
│   └── internal/
│       ├── device/            # Управление устройствами RAM/VRAM
│       ├── fs/                # Файловая система в памяти
│       ├── api/               # Обработчики REST API
│       ├── api/middleware/     # Аутентификация, CORS, ограничение запросов
│       ├── s3/                # S3-совместимый API
│       ├── webdav/            # Протокол WebDAV
│       └── service/           # Слой бизнес-логики
├── frontend/                   # React SPA
│   └── src/
│       ├── api/               # API-клиент (Axios)
│       ├── components/        # Общие компоненты
│       ├── pages/             # Компоненты страниц
│       ├── stores/            # Управление состоянием (Zustand)
│       ├── types/             # Определения TypeScript-типов
│       └── utils/             # Вспомогательные функции
├── docs/                       # Документация VitePress
│   ├── .vitepress/config.ts   # Конфигурация VitePress
│   ├── guide/                 # Руководства пользователя (английский)
│   ├── architecture/          # Документация по архитектуре (английский)
│   ├── api/                   # Справочник API (английский)
│   ├── zh-CN/                 # Китайская документация
│   ├── hi/                    # Хинди (главная страница)
│   ├── es/                    # Испанский (главная страница)
│   ├── ru/                    # Русская документация
│   └── ...                    # Другие языки
├── scripts/                    # Скрипты сборки и тестирования
├── .github/workflows/         # CI/CD пайплайны
├── Dockerfile
├── docker-compose.yml
└── Makefile
```