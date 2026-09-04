# Arsitektur Frontend

## Ikhtisar

Frontend dibangun menggunakan React 18 + TypeScript + Ant Design 5.x, merupakan aplikasi satu halaman (SPA) yang berkomunikasi dengan backend melalui REST API.

## Tumpukan Teknologi

| Teknologi | Versi | Penggunaan |
|-----------|:----:|-----------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Keamanan tipe |
| Vite | 5.x | Alat build |
| Ant Design | 5.x | Pustaka komponen UI |
| React Router | 6.x | Routing |
| Zustand | 4.x | Manajemen status |
| TanStack Query | 5.x | Status sisi server |
| Axios | 1.x | Klien HTTP |

## Desain Rute

```
/                -> Redirect ke /files
/login           -> Halaman login
/dashboard       -> Dasbor
/files           -> Manajemen file (ruang default)
/files/:spaceId  -> Manajemen file ruang tertentu
/devices         -> Manajemen perangkat
/spaces/:id      -> Detail ruang
/shares          -> Manajemen berbagi
/admin           -> Panel admin
/share/:key      -> Halaman berbagi publik (tanpa login)
```

## Pohon Komponen

```
App
├── Layout
│   ├── Sidebar (Bilah Samping)
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

## Manajemen Status

Menggunakan Zustand untuk mengelola status global:

```typescript
// Status otentikasi
interface AuthState {
    user: User | null
    token: string | null
    isAdmin: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

// Status file
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

// Status perangkat
interface DeviceState {
    devices: Device[]
    fetchDevices: () => Promise<void>
    createSpace: (deviceId: string, size: number, name: string) => Promise<void>
}
```

## Lapisan Panggilan API

Menggunakan Axios untuk membungkus panggilan API, menangani otentikasi dan kesalahan secara terpadu:

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

## Referensi Tata Letak Halaman

Tata letak halaman manajemen file bergaya Cloudreve:

```
┌──────────────────────────────────────────────────────────────┐
│  Header: Logo | Kotak pencarian | Avatar & dropdown pengguna  │
├──────────┬───────────────────────────────────────────────────┤
│ Sidebar  │  Content                                          │
│ (240px)  │                                                   │
│          │  Breadcrumb: File Saya > Dokumen > Proyek          │
│  📊 Dasbor│  ┌──────────────────────────────────────────────┐ │
│  📁 File Saya│  │ Toolbar: [Folder Baru] [Unggah] [Unduh] [Bagikan]│ │
│  💾 Perangkat│  │ [Hapus] [Lainnya]  [Tampilan Daftar/Grid] [Urut]│ │
│  🔗 Berbagi │  ├──────────────────────────────────────────────┤ │
│  ⚙️ Admin  │  │ Daftar file:                                  │ │
│          │  │  ☐ │ 📄 Tipe │ Nama file  │ Ukuran  │ Diubah   │ │
│  👤 Info   │  │  ☐ │ 📁  │ Dokumen    │ 4.2KB  │ 3 hari   │ │
│          │  │  ☐ │ 📄  │ report.pdf │ 2.1MB  │ 1 hari   │ │
│          │  │  ☐ │ 🖼  │ photo.jpg  │ 5.3MB  │ 2 jam    │ │
│          │  │  ...                                         │ │
│          │  └──────────────────────────────────────────────┘ │
│          │  Footer: Total 42 item | Terpakai 2.3GB / Total 8GB│
└──────────┴───────────────────────────────────────────────────┘
```