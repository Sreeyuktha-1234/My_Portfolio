'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading')

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    // Hide siblings (everything in body except this preloader root)
    body.classList.add('preloader-active')

    const start = Date.now()
    const duration = 2600

    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        // Hold at 100% briefly, then fade
        setTimeout(() => {
          // Reveal page first (so it's solid behind the fading preloader)
          body.classList.remove('preloader-active')
          setPhase('fading')
        }, 350)
        setTimeout(() => {
          setPhase('done')
          root.style.overflow = ''
          body.style.overflow = ''
        }, 350 + 600)
      }
    }, 16)

    return () => {
      clearInterval(interval)
      root.style.overflow = ''
      body.style.overflow = ''
      body.classList.remove('preloader-active')
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      data-preloader
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 99999,
        background: '#0a0a0a',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
        isolation: 'isolate',
      }}
    >
      {/* Solid full-cover backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#0a0a0a', zIndex: 0 }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: 'rgba(16, 185, 129, 0.06)',
          filter: 'blur(120px)',
          zIndex: 1,
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: 1,
        }}
      />

      <div className="relative flex flex-col items-center" style={{ zIndex: 2 }}>
        {/* SYS logo with rotating rings */}
        <div className="relative mb-12">
          <div
            className="absolute -inset-6 rounded-full border border-dashed border-accent-emerald/30"
            style={{ animation: 'spin 3s linear infinite' }}
          />
          <div
            className="absolute -inset-12 rounded-full border border-dashed border-accent-amber/20"
            style={{ animation: 'spin 5s linear infinite reverse' }}
          />
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'rgba(16, 185, 129, 0.3)',
              filter: 'blur(20px)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />

          {/* Logo container */}
          <div
            className="relative w-28 h-28 rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(20, 20, 20, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)',
            }}
          >
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl font-bold text-white">S</span>
              <span className="text-4xl font-bold gradient-text">Y</span>
              <span className="text-4xl font-bold text-white">S</span>
              <span className="text-4xl font-bold text-accent-emerald">.</span>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute w-3 h-3 border-t border-l border-accent-emerald" style={{ top: -2, left: -2 }} />
          <div className="absolute w-3 h-3 border-t border-r border-accent-emerald" style={{ top: -2, right: -2 }} />
          <div className="absolute w-3 h-3 border-b border-r border-accent-emerald" style={{ bottom: -2, right: -2 }} />
          <div className="absolute w-3 h-3 border-b border-l border-accent-emerald" style={{ bottom: -2, left: -2 }} />
        </div>

        {/* Progress bar */}
        <div className="w-64 mb-6">
          <div
            className="h-[2px] w-full rounded-full overflow-hidden relative"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #10b981, #f59e0b, #f43f5e)',
                transition: 'width 100ms linear',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'shimmer-slide 1.2s linear infinite',
                }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono">
            <span className="text-neutral-500">{Math.round(progress)}%</span>
            <span className="text-neutral-500">100%</span>
          </div>
        </div>

        {/* Pulsing LOADING */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" style={{ animation: 'dot-pulse 1.2s ease-in-out infinite' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" style={{ animation: 'dot-pulse 1.2s ease-in-out 0.2s infinite' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" style={{ animation: 'dot-pulse 1.2s ease-in-out 0.4s infinite' }} />
          </div>
          <span
            className="text-xs font-medium tracking-[0.3em] text-neutral-400 uppercase"
            style={{ animation: 'text-pulse 1.5s ease-in-out infinite' }}
          >
            Loading
          </span>
        </div>

        {/* Tagline */}
        <div className="absolute -bottom-32 text-center">
          <div className="text-[10px] text-neutral-600 uppercase tracking-[0.4em]">Sree Yuktha Sunkara</div>
          <div className="text-[10px] text-neutral-700 mt-1">AI · ML · GenAI</div>
        </div>
      </div>
    </div>
  )
}
