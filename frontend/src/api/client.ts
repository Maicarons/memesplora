import axios from 'axios'
import type { ApiResponse } from '@/types/api'

const client = axios.create({
  baseURL: '/api/v3',
  timeout: 30000,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export async function login(username: string, password: string): Promise<ApiResponse<any>> {
  return client.post('/admin/login', { username, password })
}

export async function getSession(): Promise<ApiResponse<any>> {
  return client.get('/user/session')
}

export async function listDevices(): Promise<ApiResponse<any>> {
  return client.get('/device')
}

export async function getDevice(id: string): Promise<ApiResponse<any>> {
  return client.get(`/device/${id}`)
}

export async function listSpaces(): Promise<ApiResponse<any>> {
  return client.get('/space')
}

export async function createSpace(data: { name: string; description?: string; total_size: number; device_id: string }): Promise<ApiResponse<any>> {
  return client.post('/space', data)
}

export async function getSpace(id: string): Promise<ApiResponse<any>> {
  return client.get(`/space/${id}`)
}

export async function deleteSpace(id: string): Promise<ApiResponse<any>> {
  return client.delete(`/space/${id}`)
}

export async function resizeSpace(id: string, newSize: number): Promise<ApiResponse<any>> {
  return client.post(`/space/${id}/resize`, { new_size: newSize })
}

export async function listFiles(spaceId: string, path: string = '/', page: number = 1, pageSize: number = 50): Promise<ApiResponse<any>> {
  return client.get(`/space/${spaceId}/files`, { params: { path, page, page_size: pageSize } })
}

export async function uploadFile(spaceId: string, path: string, file: File): Promise<ApiResponse<any>> {
  const formData = new FormData()
  formData.append('file', file)
  return client.post(`/space/${spaceId}/files?path=${encodeURIComponent(path)}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export async function downloadFile(spaceId: string, fileId: string): Promise<Blob> {
  const response = await axios.get(`/api/v3/space/${spaceId}/files/${fileId}`, {
    responseType: 'blob',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return response.data
}

export async function deleteFile(spaceId: string, fileId: string): Promise<ApiResponse<any>> {
  return client.delete(`/space/${spaceId}/files/${fileId}`)
}

export async function renameFile(spaceId: string, fileId: string, name: string): Promise<ApiResponse<any>> {
  return client.post(`/space/${spaceId}/files/${fileId}/rename`, { name })
}

export async function moveFile(spaceId: string, fileId: string, destPath: string): Promise<ApiResponse<any>> {
  return client.post(`/space/${spaceId}/files/${fileId}/move`, { dest_path: destPath })
}

export async function copyFile(spaceId: string, fileId: string, destPath: string): Promise<ApiResponse<any>> {
  return client.post(`/space/${spaceId}/files/${fileId}/copy`, { dest_path: destPath })
}

export async function createDir(spaceId: string, path: string): Promise<ApiResponse<any>> {
  return client.post(`/space/${spaceId}/dirs`, { path })
}

export async function createShare(data: { file_id: string; space_id: string; expire_at?: string; download_limit?: number; is_password?: boolean; password?: string }): Promise<ApiResponse<any>> {
  return client.post('/share', data)
}

export async function listShares(): Promise<ApiResponse<any>> {
  return client.get('/share/list')
}

export async function deleteShare(id: string): Promise<ApiResponse<any>> {
  return client.delete(`/share/${id}`)
}

export default client