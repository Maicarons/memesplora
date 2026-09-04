# Архитектура фронтенда

## Обзор

Фронтенд построен на React 18 + TypeScript + Ant Design 5.x и представляет собой одностраничное приложение (SPA), взаимодействующее с бэкендом через REST API.

## Технологический стек

| Технология | Версия | Назначение |
|------------|:-----:|------------|
| React | 18.x | UI фреймворк |
| TypeScript | 5.x | Типобезопасность |
| Vite | 5.x | Инструмент сборки |
| Ant Design | 5.x | Библиотека UI компонентов |
| React Router | 6.x | Маршрутизация |
| Zustand | 4.x | Управление состоянием |
| TanStack Query | 5.x | Серверное состояние |
| Axios | 1.x | HTTP клиент |

## Маршрутизация

```
/                -> Перенаправление на /files
/login           -> Страница входа
/dashboard       -> Панель управления
/files           -> Управление файлами (пространство по умолчанию)
/files/:spaceId  -> Управление файлами в указанном пространстве
/devices         -> Управление устройствами
/spaces/:id      -> Информация о пространстве
/shares          -> Управление публикациями
/admin           -> Панель администратора
/share/:key      -> Публичная страница публикации (без входа)
```

## Дерево компонентов

```
App
├── Layout
│   ├── Sidebar (Боковая панель)
│   │   ├── Logo
│   │   ├── NavMenu
│   │   │   ├── DashboardItem
│   │   │   ├── FilesItem
│   │   │   ├── DevicesItem
│   │   │   ├── SharesItem
│   │   │   └── AdminItem
│   │   └── UserInfo
│   ├── Header
│   │   ├── Breadcrumb
│   │   ├── SearchBar
│   │   └── UserAvatar
│   └── Content
│       └── RouterView
│
├── Pages
│   ├── LoginPage
│   ├── DashboardPage
│   │   ├── StorageOverview
│   │   └── RecentFiles
│   ├── FilesPage
│   │   ├── Toolbar
│   │   ├── FileTree
│   │   ├── FileList / FileGrid
│   │   ├── UploadDialog
│   │   └── ContextMenu
│   ├── DevicesPage
│   │   ├── DeviceList
│   │   └── CreateSpaceDialog
│   ├── SpaceDetailPage
│   ├── SharesPage
│   ├── AdminPage
│   └── PublicSharePage
```

## Управление состоянием

Используется Zustand для управления глобальным состоянием:

```typescript
// Состояние аутентификации
interface AuthState {
    user: User | null
    token: string | null
    isAdmin: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

// Состояние файлов
interface FileState {
    currentSpace: Space | null
    currentPath: string
    files: FileItem[]
    selectedFiles: string[]
    viewMode: 'list' | 'grid'
    loadFiles: (spaceId: string, path: string) => Promise<void>
    selectFile: (id: string) => void
    deleteFiles: (ids: string[]) => Promise<void>
}

// Состояние устройств
interface DeviceState {
    devices: Device[]
    fetchDevices: () => Promise<void>
    createSpace: (deviceId: string, size: number, name: string) => Promise<void>
}
```

## Слой вызовов API

Используется Axios для инкапсуляции API-вызовов с единообразной обработкой аутентификации и ошибок:

```typescript
// api/client.ts
const apiClient = axios.create({
    baseURL: '/api/v3',
    timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
        }
        return Promise.reject(error)
    }
)
```

## Макет страницы

Страница управления файлами в стиле Cloudreve:

```
┌──────────────────────────────────────────────────────────────────┐
│  Header: Logo | Поле поиска | Аватар пользователя & выпадающее   │
│          меню                                                     │
├──────────┬───────────────────────────────────────────────────────┤
│ Sidebar  │  Content                                              │
│ (240px)  │                                                       │
│          │  Breadcrumb: Мои файлы > Документы > Проект           │
│  📊 Панель│  ┌──────────────────────────────────────────────────┐│
│  📁 Мои   │  │ Toolbar: [Новая папка] [Загрузить] [Скачать]    ││
│    файлы  │  │ [Поделиться] [Удалить] [Ещё] [Вид/Сортировка]   ││
│  💾 Диски │  ├──────────────────────────────────────────────────┤│
│  🔗 Общее │  │ Список файлов:                                   ││
│  ⚙️ Админ │  │ ☐ │ 📄 Тип │ Имя файла  │ Размер │ Дата изм.   ││
│          │  │ ☐ │ 📁 │ Документы    │ 4.2КБ  │ 3 дня назад   ││
│  👤 Инфо  │  │ ☐ │ 📄 │ report.pdf  │ 2.1МБ  │ 1 день назад  ││
│          │  │ ☐ │ 🖼 │ photo.jpg   │ 5.3МБ  │ 2 часа назад  ││
│          │  │ ...                                             ││
│          │  └──────────────────────────────────────────────────┘│
│          │  Footer: Всего 42 элемента | Использовано 2.3ГБ / 8ГБ│
└──────────┴───────────────────────────────────────────────────────┘
```