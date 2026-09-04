# 前端架构

## 概述

前端使用 React 18 + TypeScript + Ant Design 5.x 构建，是一个单页应用（SPA），通过 REST API 与后端通信。

## 技术栈

| 技术 | 版本 | 用途 |
|------|:----:|------|
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| Ant Design | 5.x | UI 组件库 |
| React Router | 6.x | 路由 |
| Zustand | 4.x | 状态管理 |
| TanStack Query | 5.x | 服务端状态 |
| Axios | 1.x | HTTP 客户端 |

## 路由设计

```
/                → 重定向到 /files
/login           → 登录页面
/dashboard       → 仪表盘
/files           → 文件管理（默认空间）
/files/:spaceId  → 指定空间的文件管理
/devices         → 设备管理
/spaces/:id      → 空间详情
/shares          → 分享管理
/admin           → 管理后台
/share/:key      → 公共分享页面（无需登录）
```

## 组件树

```
App
├── Layout
│   ├── Sidebar (侧边栏)
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

## 状态管理

使用 Zustand 管理全局状态：

```typescript
// 认证状态
interface AuthState {
    user: User | null
    token: string | null
    isAdmin: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

// 文件状态
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

// 设备状态
interface DeviceState {
    devices: Device[]
    fetchDevices: () => Promise<void>
    createSpace: (deviceId: string, size: number, name: string) => Promise<void>
}
```

## API 调用层

使用 Axios 封装 API 调用，统一处理认证和错误：

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

## 页面布局参考

Cloudreve 风格的文件管理页面布局：

```
┌──────────────────────────────────────────────────────────────┐
│  Header: Logo | 搜索框 | 用户头像 & 下拉菜单                  │
├──────────┬───────────────────────────────────────────────────┤
│ Sidebar  │  Content                                          │
│ (240px)  │                                                   │
│          │  Breadcrumb: 我的文件 > 文档 > 项目                │
│  📊 仪表盘│  ┌──────────────────────────────────────────────┐ │
│  📁 我的文件│  │ Toolbar: [新建文件夹] [上传] [下载] [分享]  │ │
│  💾 存储设备│  │ [删除] [更多]          [列表/网格切换] [排序]│ │
│  🔗 分享管理│  ├──────────────────────────────────────────────┤ │
│  ⚙️ 管理后台│  │ 文件列表:                                    │ │
│          │  │  ☐ │ 📄 类型 │ 文件名     │ 大小   │ 修改日期  │ │
│  👤 用户信息│  │  ☐ │ 📁  │ 文档       │ 4.2KB  │ 3天前    │ │
│          │  │  ☐ │ 📄  │ report.pdf  │ 2.1MB  │ 1天前    │ │
│          │  │  ☐ │ 🖼  │ photo.jpg   │ 5.3MB  │ 2小时前  │ │
│          │  │  ...                                         │ │
│          │  └──────────────────────────────────────────────┘ │
│          │  Footer: 共 42 项 | 已用 2.3GB / 总 8GB          │
└──────────┴───────────────────────────────────────────────────┘
```