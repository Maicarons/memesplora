export interface User {
  id: number
  username: string
  nickname: string
  email: string
  is_admin: boolean
  storage_used: number
  max_storage: number
}

export interface Device {
  id: string
  name: string
  device_type: 'ram' | 'vram' | 'swap'
  total_size: number
  free_size: number
  used_size: number
  healthy: boolean
  model?: string
}

export interface Space {
  id: string
  name: string
  description: string
  total_size: number
  used_size: number
  block_size: number
  device_id: string
  device_type: string
  status: string
  owner_id: number
  created_at: string
}

export interface FileItem {
  id: string
  name: string
  type: 'file' | 'directory'
  size: number
  mime_type?: string
  modified_at: string
  path?: string
}

export interface Share {
  id: string
  share_key: string
  file_id: string
  space_id: string
  owner_id: number
  download_limit: number
  download_count: number
  expire_at?: string
  is_password: boolean
  created_at: string
}

export interface ApiResponse<T> {
  code: number
  message?: string
  data?: T
}

export interface LoginResponse {
  token: string
  user: User
}

export interface FileListResponse {
  files: FileItem[]
  total: number
  page: number
  page_size: number
}