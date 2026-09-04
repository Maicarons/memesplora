# هندسة الواجهة الأمامية

## نظرة عامة

الواجهة الأمامية مبنية باستخدام React 18 + TypeScript + Ant Design 5.x، وهي تطبيق صفحة واحدة (SPA) يتواصل مع الواجهة الخلفية عبر REST API.

## رصة التقنيات

| التقنية | الإصدار | الاستخدام |
|------|:----:|------|
| React | 18.x | إطار عمل UI |
| TypeScript | 5.x | أمان الأنواع |
| Vite | 5.x | أداة البناء |
| Ant Design | 5.x | مكتبة مكونات UI |
| React Router | 6.x | التوجيه |
| Zustand | 4.x | إدارة الحالة |
| TanStack Query | 5.x | حالة الخادم |
| Axios | 1.x | عميل HTTP |

## تصميم التوجيه

```
/                → إعادة توجيه إلى /files
/login           → صفحة تسجيل الدخول
/dashboard       → لوحة التحكم
/files           → إدارة الملفات (المساحة الافتراضية)
/files/:spaceId  → إدارة الملفات لمساحة محددة
/devices         → إدارة الأجهزة
/spaces/:id      → تفاصيل المساحة
/shares          → إدارة المشاركات
/admin           → لوحة الإدارة
/share/:key      → صفحة المشاركة العامة (بدون تسجيل دخول)
```

## شجرة المكونات

```
App
├── Layout
│   ├── Sidebar (الشريط الجانبي)
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
├── الصفحات
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

## إدارة الحالة

استخدام Zustand لإدارة الحالة العامة:

```typescript
// حالة المصادقة
interface AuthState {
    user: User | null
    token: string | null
    isAdmin: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

// حالة الملفات
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

// حالة الأجهزة
interface DeviceState {
    devices: Device[]
    fetchDevices: () => Promise<void>
    createSpace: (deviceId: string, size: number, name: string) => Promise<void>
}
```

## طبقة استدعاء API

استخدام Axios لتغليف استدعاءات API، مع معالجة موحدة للمصادقة والأخطاء:

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

## تخطيط الصفحة المرجعي

تخطيط صفحة إدارة الملفات على نمط Cloudreve:

```
┌──────────────────────────────────────────────────────────────┐
│  Header: Logo | مربع البحث | صورة المستخدم والقائمة المنسدلة  │
├──────────┬───────────────────────────────────────────────────┤
│ Sidebar  │  Content                                          │
│ (240px)  │                                                   │
│          │  Breadcrumb: ملفاتي > مستندات > مشروع             │
│  📊 لوحة  │  ┌──────────────────────────────────────────────┐ │
│  📁 ملفاتي│  │ Toolbar: [مجلد جديد] [رفع] [تنزيل] [مشاركة]  │ │
│  💾 أجهزة │  │ [حذف] [المزيد]      [قائمة/شبكة] [ترتيب]    │ │
│  🔗 مشاركات│  ├──────────────────────────────────────────────┤ │
│  ⚙️ إدارة │  │ قائمة الملفات:                                │ │
│          │  │ ☐ │ 📄 النوع │ اسم الملف │ الحجم │ تاريخ التعديل│ │
│  👤 مستخدم│  │ ☐ │ 📁 │ مستندات │ 4.2KB │ منذ 3 أيام │ │
│          │  │ ☐ │ 📄 │ report.pdf │ 2.1MB │ منذ يوم │ │
│          │  │ ☐ │ 🖼 │ photo.jpg │ 5.3MB │ منذ ساعتين │ │
│          │  │ ...                                         │ │
│          │  └──────────────────────────────────────────────┘ │
│          │  Footer: إجمالي 42 عنصر | مستخدم 2.3GB / إجمالي 8GB │
└──────────┴───────────────────────────────────────────────────┘
```