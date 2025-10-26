import React from 'react'
import Button from './Button'
import { useAuthStore } from '../stores/auth'

export default function Navbar(){
  const logout = useAuthStore(s => s.logout)
  return (
    <div className='flex items-center justify-between mb-6'>
      <div className='flex items-center gap-3'>
        <div className='text-xl font-bold'>⏱️ TaskTime</div>
        <div className='text-sm text-slate-500'>Focus & track</div>
      </div>
      <div>
        <Button variant='ghost' onClick={()=>logout()}>Logout</Button>
      </div>
    </div>
  )
}
