import { create } from 'zustand'
import type { User } from '@/types/api'

interface AuthState {
  user: User | null
  token: string | null
  isAdmin: boolean
  setUser: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAdmin: JSON.parse(localStorage.getItem('user') || '{}')?.is_admin || false,

  setUser: (user, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ user, token, isAdmin: user.is_admin })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAdmin: false })
  },

  isAuthenticated: () => !!get().token,
}))

interface FileState {
  currentSpace: string | null
  currentPath: string
  viewMode: 'list' | 'grid'
  selectedFiles: string[]
  setCurrentSpace: (id: string | null) => void
  setCurrentPath: (path: string) => void
  setViewMode: (mode: 'list' | 'grid') => void
  setSelectedFiles: (ids: string[]) => void
  toggleFileSelection: (id: string) => void
  clearSelection: () => void
}

export const useFileStore = create<FileState>((set) => ({
  currentSpace: null,
  currentPath: '/',
  viewMode: 'list',
  selectedFiles: [],
  setCurrentSpace: (id) => set({ currentSpace: id, currentPath: '/', selectedFiles: [] }),
  setCurrentPath: (path) => set({ currentPath: path }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedFiles: (ids) => set({ selectedFiles: ids }),
  toggleFileSelection: (id) => set((state) => ({
    selectedFiles: state.selectedFiles.includes(id)
      ? state.selectedFiles.filter((fid) => fid !== id)
      : [...state.selectedFiles, id],
  })),
  clearSelection: () => set({ selectedFiles: [] }),
}))

interface UIState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))