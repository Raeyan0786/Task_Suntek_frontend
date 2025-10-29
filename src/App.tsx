import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { useAuthStore } from './stores/auth'
import { Toaster } from 'react-hot-toast'
import './index.css'
import { setNavigator } from './utils/history'

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const token = useAuthStore(s => s.token)
  if (!token) return <Navigate to='/login' replace />
  return children
}

export default function App(){

  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);
  return (
    <div className='app-shell'>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </div>
  )
}
