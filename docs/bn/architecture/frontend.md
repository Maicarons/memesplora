# ফ্রন্টএন্ড আর্কিটেকচার

## ওভারভিউ

ফ্রন্টএন্ডটি React 18 + TypeScript + Ant Design 5.x ব্যবহার করে তৈরি, এটি একটি সিঙ্গেল পেজ অ্যাপ্লিকেশন (SPA) যা REST API-র মাধ্যমে ব্যাকএন্ডের সাথে যোগাযোগ করে।

## টেক স্ট্যাক

| প্রযুক্তি | সংস্করণ | ব্যবহার |
|------|:----:|------|
| React | 18.x | UI ফ্রেমওয়ার্ক |
| TypeScript | 5.x | টাইপ নিরাপত্তা |
| Vite | 5.x | বিল্ড টুল |
| Ant Design | 5.x | UI কম্পোনেন্ট লাইব্রেরি |
| React Router | 6.x | রাউটিং |
| Zustand | 4.x | স্টেট ম্যানেজমেন্ট |
| TanStack Query | 5.x | সার্ভার স্টেট |
| Axios | 1.x | HTTP ক্লায়েন্ট |

## রাউট ডিজাইন

```
/                → /files এ রিডিরেক্ট
/login           → লগইন পেজ
/dashboard       → ড্যাশবোর্ড
/files           → ফাইল ম্যানেজমেন্ট (ডিফল্ট স্পেস)
/files/:spaceId  → নির্দিষ্ট স্পেসের ফাইল ম্যানেজমেন্ট
/devices         → ডিভাইস ম্যানেজমেন্ট
/spaces/:id      → স্পেসের বিবরণ
/shares          → শেয়ার ম্যানেজমেন্ট
/admin           → অ্যাডমিন প্যানেল
/share/:key      → পাবলিক শেয়ার পেজ (লগইন প্রয়োজন নেই)
```

## কম্পোনেন্ট ট্রি

```
App
├── Layout
│   ├── Sidebar (সাইডবার)
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

## স্টেট ম্যানেজমেন্ট

Zustand ব্যবহার করে গ্লোবাল স্টেট ম্যানেজমেন্ট:

```typescript
// অথেনটিকেশন স্টেট
interface AuthState {
    user: User | null
    token: string | null
    isAdmin: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

// ফাইল স্টেট
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

// ডিভাইস স্টেট
interface DeviceState {
    devices: Device[]
    fetchDevices: () => Promise<void>
    createSpace: (deviceId: string, size: number, name: string) => Promise<void>
}
```

## API কল লেয়ার

Axios ব্যবহার করে API কল এনক্যাপসুলেশন, অথেনটিকেশন এবং এরর হ্যান্ডলিং একীভূত:

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

## পেজ লেআউট রেফারেন্স

Cloudreve-শৈলীর ফাইল ম্যানেজমেন্ট পেজ লেআউট:

```
┌──────────────────────────────────────────────────────────────┐
│  Header: Logo | সার্চ বক্স | ইউজার অ্যাভাটার & ড্রপডাউন       │
├──────────┬───────────────────────────────────────────────────┤
│ Sidebar  │  Content                                          │
│ (240px)  │                                                   │
│          │  Breadcrumb: আমার ফাইল > ডকুমেন্ট > প্রকল্প        │
│  📊 ড্যাশবোর্ড│  ┌──────────────────────────────────────────────┐ │
│  📁 আমার ফাইল│  │ Toolbar: [নতুন ফোল্ডার] [আপলোড] [ডাউনলোড] [শেয়ার]│ │
│  💾 স্টোরেজ ডিভাইস│  │ [মুছে ফেলা] [আরও]          [লিস্ট/গ্রিড সুইচ] [সর্ট]│ │
│  🔗 শেয়ার ম্যানেজমেন্ট│  ├──────────────────────────────────────────────┤ │
│  ⚙️ অ্যাডমিন প্যানেল│  │ ফাইল তালিকা:                                    │ │
│          │  │ ☐ │ 📄 টাইপ │ ফাইলের নাম │ সাইজ │ পরিবর্তনের তারিখ │
│          │  │ ☐ │ 📁  │ ডকুমেন্ট    │ 4.2KB │ ৩ দিন আগে     │
│  👤 ইউজার তথ্য│  │ ☐ │ 📄  │ report.pdf │ 2.1MB │ ১ দিন আগে     │
│          │  │ ☐ │ 🖼  │ photo.jpg  │ 5.3MB │ ২ ঘন্টা আগে   │
│          │  │ ...                                         │
│          │  └──────────────────────────────────────────────┘ │
│          │  Footer: মোট ৪২টি আইটেম | ব্যবহৃত 2.3GB / মোট 8GB │
└──────────┴───────────────────────────────────────────────────┘
```