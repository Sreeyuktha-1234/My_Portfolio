'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0
    let isHovering = false
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Use bubbling pointerover/out to detect hover on interactive elements without scanning the DOM
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      if (t.closest('a, button, [data-hover], input, textarea, [role="button"]')) {
        isHovering = true
      }
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      if (t.closest('a, button, [data-hover], input, textarea, [role="button"]')) {
        isHovering = false
      }
    }

    const tick = () => {
      // Dot follows tighter
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      // Ring lags behind
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      const scale = isHovering ? 2.5 : 1
      const ringScale = isHovering ? 1.5 : 1

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 8}px, ${dotY - 8}px, 0) scale(${scale})`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${ringScale})`
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]"
        style={{
          background: '#10b981',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border border-accent-emerald/30"
        style={{
          willChange: 'transform',
        }}
      />
    </>
  )
}
