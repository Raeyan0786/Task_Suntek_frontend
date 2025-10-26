import { io } from 'socket.io-client'
import { getToken } from './auth'

export const createSocket = () => {
  const token = getToken()
  if(!token) return null
  return io((import.meta.env.VITE_API_BASE || 'http://localhost:4000').replace('/api',''), { auth: { token } })
}
