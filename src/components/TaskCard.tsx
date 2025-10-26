// src/components/TaskCard.tsx
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import AddOrUpdateTask from '@/components/AddOrUpdateTask'
import TimerBar from '@/components/TimerBar'
import { useTaskStore, type Task } from '@/stores/taskStore'
import DeleteDailog from './DeleteDailog'
import api from '@/api/client'

interface TaskCardProps {
  task: Task
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    startTask,
    stopTask,
    deleteTask,
    fetchTasks,
    fetchSummary,
  } = useTaskStore()

  const handleDelete = async () => {
    try{
      await deleteTask(task._id)
      await fetchSummary()
    }
    catch(error){
      console.error('Error delete task:', error);
    }
    
  }

  const handleEdit = async (taskStatus:string) => {
    try {
    await api.put(`/tasks/${task._id}`, { status: taskStatus }); // ✅ send object, not raw string
    await fetchTasks();
    await fetchSummary();
  } catch (error) {
    console.error('Error updating task:', error);
  }
  }

  return (
    <Card className="p-4 shadow-md border-gray-200 rounded-2xl">

      <CardContent>

        <div className="p-4 flex flex-col gap-2">
       <div className="flex justify-between items-center">
         <h3 className="font-semibold text-lg">{task.title}</h3>
         <select
          className="border rounded px-2 py-1"
          value={task.status}
          onChange={(e) => handleEdit( e.target.value )}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <p className="text-gray-500">{task.description}</p>

      <div className="flex justify-between items-center mt-2">
        <Button
            size="sm"
            className={ `w-fit px-5 py-1 text-white rounded-lg  transition-colors cursor-pointer 
              ${task.isActive?" bg-red-500  hover:bg-red-600":
              " bg-green-500  hover:bg-green-600"}`}
            variant={task.isActive ? 'destructive' : 'default'}
            onClick={() =>
              task.isActive ? stopTask(task._id) : startTask(task._id)
            }
          >
            {task.isActive ? 'Stop' : 'Start'}
          </Button>

        {task.isActive && task.activeLog && (
          <TimerBar activeLog={task.activeLog} />
        )}

        <div className="flex gap-4 items-center">
          <DeleteDailog handleDelete={handleDelete}/>
          <AddOrUpdateTask isUpdate={true} taskData={task}/>
        </div>
      </div>
    </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard