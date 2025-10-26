import React from 'react'
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>){
  return <input className='w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-200' {...props} />
}
