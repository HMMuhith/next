'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoadingLine() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState('#ff2d55') // start red

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setVisible(true)
    setProgress(30)
    setColor('#ff2d55') // red

    const t1 = setTimeout(() => {
      setProgress(50)
      setColor('#ffff00') // yellow
    }, 300)

    const t2 = setTimeout(() => {
      setProgress(70)
      setColor('#34c759') // green
    }, 600)

    const t3 = setTimeout(() => {
      setProgress(100)
      setColor('#0070f3') // blue
    }, 900)

    const t4 = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 1200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [pathname, searchParams])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: progress + '%',
        background: color,
        opacity: visible ? 1 : 0,
        transition: 'width 0.2s ease, opacity 0.4s ease, background 0.2s ease',
        zIndex: 9999,
      }}
    />
  )
}
