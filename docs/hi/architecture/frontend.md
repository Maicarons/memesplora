# फ्रंटएंड आर्किटेक्चर

## अवलोकन

फ्रंटएंड React 18 + TypeScript + Ant Design 5.x का उपयोग करके बनाया गया है, जो एक सिंगल-पेज एप्लिकेशन (SPA) है, जो REST API के माध्यम से बैकएंड के साथ संचार करता है।

## तकनीकी स्टैक

| तकनीक | संस्करण | उपयोग |
|------|:----:|------|
| React | 18.x | UI फ्रेमवर्क |
| TypeScript | 5.x | प्रकार सुरक्षा |
| Vite | 5.x | बिल्ड टूल |
| Ant Design | 5.x | UI घटक पुस्तकालय |
| React Router | 6.x | रूटिंग |
| Zustand | 4.x | स्थिति प्रबंधन |
| TanStack Query | 5.x | सर्वर स्थिति |
| Axios | 1.x | HTTP क्लाइंट |

## रूट डिज़ाइन

```
/                → /files पर रीडायरेक्ट
/login           → लॉगिन पेज
/dashboard       → डैशबोर्ड
/files           → फ़ाइल प्रबंधन (डिफ़ॉल्ट स्पेस)
/files/:spaceId  → निर्दिष्ट स्पेस का फ़ाइल प्रबंधन
/devices         → डिवाइस प्रबंधन
/spaces/:id      → स्पेस विवरण
/shares          → शेयर प्रबंधन
/admin           → प्रबंधन पैनल
/share/:key      → सार्वजनिक शेयर पेज (लॉगिन आवश्यक नहीं)
```

## घटक ट्री

```
App
├── Layout
│   ├── Sidebar (साइडबार)
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

## स्थिति प्रबंधन

वैश्विक स्थिति प्रबंधन के लिए Zustand का उपयोग करें:

```typescript
// प्रमाणीकरण स्थिति
interface AuthState {
    user: User | null
    token: string | null
    isAdmin: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => void
}

// फ़ाइल स्थिति
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

// डिवाइस स्थिति
interface DeviceState {
    devices: Device[]
    fetchDevices: () => Promise<void>
    createSpace: (deviceId: string, size: number, name: string) => Promise<void>
}
```

## API कॉल परत

API कॉल को एनकैप्सुलेट करने के लिए Axios का उपयोग करें, प्रमाणीकरण और त्रुटियों को एकीकृत रूप से संभालें:

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

## पेज लेआउट संदर्भ

Cloudreve शैली का फ़ाइल प्रबंधन पेज लेआउट:

```
┌──────────────────────────────────────────────────────────────┐
│  Header: Logo | सर्च बॉक्स | उपयोगकर्ता अवतार और ड्रॉपडाउन    │
├──────────┬───────────────────────────────────────────────────┤
│ Sidebar  │  Content                                          │
│ (240px)  │                                                   │
│          │  Breadcrumb: मेरी फ़ाइलें > दस्तावेज़ > प्रोजेक्ट  │
│  📊 डैशबोर्ड│  ┌──────────────────────────────────────────────┐ │
│  📁 मेरी फ़ाइलें│  │ Toolbar: [नया फ़ोल्डर] [अपलोड] [डाउनलोड]  │ │
│  💾 स्टोरेज डिवाइस│  │ [शेयर] [हटाएं] [अधिक] [सूची/ग्रिड] [सॉर्ट]│ │
│  🔗 शेयर प्रबंधन│  ├──────────────────────────────────────────────┤ │
│  ⚙️ प्रबंधन पैनल│  │ फ़ाइल सूची:                                  │ │
│          │  │ ☐ │ 📄 प्रकार │ फ़ाइल नाम │ आकार │ संशोधित तिथि │ │
│  👤 उपयोगकर्ता│  │ ☐ │ 📁 │ दस्तावेज़  │ 4.2KB │ 3 दिन पहले  │ │
│          │  │ ☐ │ 📄 │ report.pdf │ 2.1MB │ 1 दिन पहले  │ │
│          │  │ ☐ │ 🖼 │ photo.jpg  │ 5.3MB │ 2 घंटे पहले │ │
│          │  │ ...                                         │ │
│          │  └──────────────────────────────────────────────┘ │
│          │  Footer: कुल 42 आइटम | उपयोग 2.3GB / कुल 8GB    │
└──────────┴───────────────────────────────────────────────────┘
```