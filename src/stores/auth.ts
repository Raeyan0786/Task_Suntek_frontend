import { create } from 'zustand'
import { clearToken, getToken, setLocalStorage, getUser } from '../utils/auth'

type User = any // replace 'any' with your actual user type if available

interface AuthState {
  token: string | null
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken() || null,
  user: getUser() || null,
  setAuth: (token, user) => {
    setLocalStorage("user",user)
    set({ token, user })
  },
  logout: () => {
    clearToken()
    set({ token: null, user: null })
  }
}))
