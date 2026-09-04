# Arquitetura do Frontend

## Visao Geral

O frontend e construido com React 18 + TypeScript + Ant Design 5.x, e e uma aplicacao de pagina unica (SPA) que se comunica com o backend atraves da API REST.

## Pilha de Tecnologias

| Tecnologia | Versao | Finalidade |
|------------|:----:|-----------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Seguranca de tipos |
| Vite | 5.x | Ferramenta de compilacao |
| Ant Design | 5.x | Biblioteca de componentes UI |
| React Router | 6.x | Roteamento |
| Zustand | 4.x | Gerenciamento de estado |
| TanStack Query | 5.x | Estado do servidor |
| Axios | 1.x | Cliente HTTP |

## Design de Rotas

```
/                -> Redirecionar para /files
/login           -> Pagina de login
/dashboard       -> Painel
/files           -> Gerenciamento de arquivos (espaco padrao)
/files/:spaceId  -> Gerenciamento de arquivos de um espaco especifico
/devices         -> Gerenciamento de dispositivos
/spaces/:id      -> Detalhes do espaco
/shares          -> Gerenciamento de compartilhamentos
/admin           -> Painel administrativo
/share/:key      -> Pagina de compartilhamento publico (sem necessidade de login)
```

## Arvore de Componentes

```
App
├── Layout
│   ├── Sidebar (Barra lateral)
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

## Gerenciamento de Estado

Usando Zustand para gerenciar estado global:

```typescript
// Estado de autenticacao
interface AuthState {
    user: User | null
    token: string | null
    isAdmin: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

// Estado de arquivos
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

// Estado de dispositivos
interface DeviceState {
    devices: Device[]
    fetchDevices: () => Promise<void>
    createSpace: (deviceId: string, size: number, name: string) => Promise<void>
}
```

## Camada de Chamadas de API

Usando Axios para encapsular chamadas de API, com tratamento unificado de autenticacao e erros:

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

## Layout de Referencia da Pagina

Layout de gerenciamento de arquivos inspirado no Cloudreve:

```
┌──────────────────────────────────────────────────────────────────┐
│  Header: Logo | Barra de busca | Avatar do usuario & menu suspenso  │
├──────────┬───────────────────────────────────────────────────────┤
│ Sidebar  │  Content                                              │
│ (240px)  │                                                       │
│          │  Breadcrumb: Meus arquivos > Documentos > Projeto      │
│  📊 Painel│  ┌──────────────────────────────────────────────────┐ │
│  📁 Meus  │  │ Toolbar: [Nova pasta] [Upload] [Download] [Compartilhar]│ │
│    arquivos│  │ [Excluir] [Mais]      [Alternar lista/grid] [Ordenar]│ │
│  💾 Dispos.│  ├──────────────────────────────────────────────────┤ │
│  🔗 Comp. │  │ Lista de arquivos:                                │ │
│  ⚙️ Admin │  │  ☐ │ 📄 Tipo │ Nome       │ Tamanho │ Data modif. │ │
│          │  │  ☐ │ 📁  │ Documentos   │ 4.2KB  │ 3 dias atras │ │
│  👤 Usuario│  │  ☐ │ 📄  │ relatorio.pdf│ 2.1MB  │ 1 dia atras  │ │
│          │  │  ☐ │ 🖼  │ foto.jpg     │ 5.3MB  │ 2 horas atras│ │
│          │  │  ...                                             │ │
│          │  └──────────────────────────────────────────────────┘ │
│          │  Footer: Total 42 itens | Usado 2.3GB / Total 8GB   │
└──────────┴───────────────────────────────────────────────────────┘
```