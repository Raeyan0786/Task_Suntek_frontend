// src/stores/taskStore.ts
import { create } from 'zustand'
import api from '../api/client'
import { io, Socket } from 'socket.io-client'
import { getToken, getUser } from '../utils/auth'

export type TimeLog = {
  _id: string
  taskId: string
  isActive: boolean
  startedAt: string
  stoppedAt?: string
  durationSeconds?: number
}

export type Task = {
  _id: string
  title: string
  description: string
  status: string
  isActive: boolean
  timeLogs?: TimeLog[] // all logs for this task
  activeLog?: TimeLog | null // ✅ <-- added this for real-time tracking
  totalSeconds: number
}

export type TaskSummary = {
  taskId: string
  title: string
  totalSeconds: number
}

export type DailySummary = {
  totalTimeSeconds: number
  tasksWorked: TaskSummary[]
  completedTasks: Task[]
  inProgressTasks: Task[]
  pendingTasks: Task[]
}

type TaskStore = {
  tasks: Task[]
  summary: DailySummary | null
  loading: boolean
  socket: Socket | null

  fetchTasks: () => Promise<void>
  fetchSummary: () => Promise<void>
  startTask: (taskId: string) => Promise<void>
  stopTask: (taskId: string) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  initSocket: () => void
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  summary: null,
  loading: true,
  socket: null,

  async fetchTasks() {
    try {
      const res = await api.get('/tasks')
      set({ tasks: res.data })
    } catch (err) {
      console.error('❌ Failed to fetch tasks:', err)
    }
  },

  async fetchSummary() {
    try {
      const res = await api.get('/summary/daily')
      set({ summary: res.data })
    } catch (err) {
      console.error('❌ Failed to fetch summary:', err)
    } finally {
      set({ loading: false })
    }
  },

  async startTask(taskId) {
    try {
      const res = await api.post('/time-logs/start', { taskId })
      const log = res.data
      set(state => ({
        tasks: state.tasks.map(t =>
          t._id === taskId ? { ...t, isActive: true, activeLog: log } : t
        ),
      }))
      get().socket?.emit('timer:started', log)
      await get().fetchSummary()
    } catch (err) {
      console.error('❌ Start task failed:', err)
    }
  },

  async stopTask(taskId) {
    try {
      await api.post('/time-logs/stop', { taskId })
      set(state => ({
        tasks: state.tasks.map(t =>
          t._id === taskId ? { ...t, isActive: false, activeLog: null } : t
        ),
      }))
      get().socket?.emit('timer:stopped', { taskId })
      await get().fetchSummary()
    } catch (err) {
      console.error('❌ Stop task failed:', err)
    }
  },

  async deleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`)
      await get().fetchTasks()
      await get().fetchSummary()
    } catch (err) {
      console.error('❌ Delete task failed:', err)
    }
  },

  initSocket() {
    const token = getToken()
    const user= getUser()

    if (!token || !user) return
    
    const socket = io('https://suntek-backend.onrender.com/', {
      auth: { token },
      transports: ['websocket', 'polling'],
    })

    socket.on('connect', () => {
      console.log('✅ Socket connected')
      socket.emit('join', `user:${user}`)
    })

    socket.on('timer:started', (log: TimeLog) => {
      set(state => ({
        tasks: state.tasks.map(t =>
          t._id === log.taskId ? { ...t, isActive: true, activeLog: log } : t
        ),
      }))
    })

    socket.on('timer:stopped', (data: { taskId: string }) => {
      set(state => ({
        tasks: state.tasks.map(t =>
          t._id === data.taskId ? { ...t, isActive: false, activeLog: null } : t
        ),
      }))
    })

    set({ socket })
  },
}))
