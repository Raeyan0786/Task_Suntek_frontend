// src/pages/TasksPage.tsx
import React, { useEffect } from 'react'
import TaskCard from '../components/TaskCard'
import { useTaskStore } from '../stores/taskStore'

export default function TasksPage() {
  const {
    tasks,
    fetchTasks,
    fetchSummary,
    initSocket,
  } = useTaskStore()

  useEffect(() => {
    fetchTasks()
    fetchSummary()
    initSocket()
  }, [])

  return (
    <div className="max-w-2xl space-y-4">
      {tasks.length > 0 ? (
        tasks.map(task => <TaskCard key={task._id} task={task} />)
      ) : (
        <p className="text-center text-gray-500">No tasks found</p>
      )}
    </div>
  )
}

