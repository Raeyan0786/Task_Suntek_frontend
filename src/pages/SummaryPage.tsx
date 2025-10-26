import React from 'react'
import { useTaskStore } from '../stores/taskStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SummaryPage() {
  const { summary, loading } = useTaskStore()

  if (loading) return <p>Loading summary...</p>
  if (!summary) return <p>No summary available.</p>

  const formatTime = (totalTimeSeconds: number) => {
  const hours = Math.floor(totalTimeSeconds / 3600);
  const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const seconds = totalTimeSeconds % 60;

  return ` ${hours}h ${minutes}m ${seconds}s `;
};

  return (
    <div className="sticky top-6">
      <Card className="p-4 shadow-md border border-gray-200 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Today’s Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Total Time */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Total tracked:</span>
            <span className="text-gray-900 font-semibold">
              ⏱ {formatTime(summary.totalTimeSeconds)}
            </span>
          </div>

          {/* Tasks Worked On */}
          <div>
            <h5 className="text-gray-800 font-semibold mb-2">Tasks Worked On</h5>
            <ul className="space-y-1">
              {summary.tasksWorked?.map((t: any) => (
                <li
                  key={t.taskId}
                  className="flex justify-between text-gray-700 text-sm border-b border-gray-100 pb-1"
                >
                  <span>{t.title}</span>
                  <span>{formatTime(t.totalSeconds)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Task Status Breakdown */}
          <div>
            <h5 className="text-gray-800 font-semibold mb-2">Task Status Breakdown</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex justify-between">
                <span>✅ Completed</span>
                <span>{summary.completedTasks?.length ?? 0}</span>
              </li>
              <li className="flex justify-between">
                <span>🚧 In Progress</span>
                <span>{summary.inProgressTasks?.length ?? 0}</span>
              </li>
              <li className="flex justify-between">
                <span>🕒 Pending</span>
                <span>{summary.pendingTasks?.length ?? 0}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
