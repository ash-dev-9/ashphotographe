import { useEffect, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="loading-screen" style={{ opacity: progress >= 100 ? 0 : 1 }}>
      <div className="loading-content">
        <div className="loading-logo">Ash photogRaf</div>
        <div className="loading-bar">
          <div className="loading-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <div className="loading-text">Loading experience...</div>
      </div>
    </div>
  )
}
