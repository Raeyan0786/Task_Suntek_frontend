import React, { useEffect } from 'react';
import TasksPage from './TasksPage';
import SummaryPage from './SummaryPage';
import { useAuthStore } from '../stores/auth';
import { useTaskStore } from '../stores/taskStore';
import AddOrUpdateTask from '@/components/AddOrUpdateTask';

export default function Dashboard() {
  const logout = useAuthStore((s) => s.logout);
  const { fetchTasks, fetchSummary, initSocket } = useTaskStore();

  useEffect(() => {
    fetchTasks();
    fetchSummary();
    initSocket();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800">Task Time Tracker</h2>

          <div className="flex gap-4">
            <AddOrUpdateTask />
            <button
              onClick={logout}
              className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TasksPage />
          </div>

          <div className="lg:col-span-1">
            <SummaryPage />
          </div>
        </div>
      </div>
    </main>
  );
}
