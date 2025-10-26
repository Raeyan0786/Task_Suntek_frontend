import React from 'react'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'ghost'|'primary' }

export default function Button({ variant='default', className, ...rest }: Props){
  const base = 'px-3 py-2 rounded-md font-medium transition'
  const styles = {
    default: 'bg-white border text-slate-700 hover:shadow',
    ghost: 'bg-transparent',
    primary: 'bg-sky-600 text-white hover:bg-sky-700'
  }
  return <button className={clsx(base, styles[variant], className)} {...rest} />
}
