import { useEffect, useState } from 'react'

export default function TimerBar({ activeLog }: { activeLog: any }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!activeLog) return

    const start = new Date(activeLog.startedAt).getTime()

    const tick = () => {
      const now = Date.now()
      setElapsed(Math.floor((now - start) / 1000))
    }

    tick()
    const interval = setInterval(tick, 1000)

    return () => clearInterval(interval)
  }, [activeLog])

  const seconds = elapsed % 60
  const minutes = Math.floor(elapsed / 60) % 60
  const hours = Math.floor(elapsed / 3600)

  return (
    <div className="bg-green-600 text-white p-2 rounded-lg flex justify-between items-center">
      <span>⏱ {hours}h {minutes}m {seconds}s</span>
    </div>
  )
}
