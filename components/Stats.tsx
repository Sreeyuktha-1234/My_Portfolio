'use client'

import { motion, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value, duration])

  return <span ref={ref}>{display}{suffix}</span>
}

function RadialProgress({ value, color, size = 110 }: { value: number; color: string; size?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const circumference = 2 * Math.PI * 38
  const progress = isInView ? (1 - value / 100) * circumference : circumference

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <defs>
          <filter id={`glow-${color}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
        <motion.circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          filter={`url(#glow-${color})`}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: progress } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">
          <AnimatedCounter value={value} suffix="%" />
        </span>
      </div>
    </div>
  )
}

function GrowingBar({ height, color, delay, label }: { height: number; color: string; delay: number; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 flex-1">
      <div className="relative h-32 w-full flex items-end justify-center">
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: `${height}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[40px] rounded-t-md relative"
          style={{
            background: `linear-gradient(to top, ${color}, ${color}80)`,
            boxShadow: `0 0 20px ${color}50`,
          }}
        >
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 1.2 }}
          >
            {height}%
          </motion.div>
        </motion.div>
      </div>
      <div className="text-[10px] text-neutral-500 text-center uppercase tracking-wider">{label}</div>
    </div>
  )
}

const stats = [
  { value: 13, label: 'Query Accuracy', color: '#10b981' },
  { value: 35, label: 'Processing Time', color: '#f59e0b' },
  { value: 24, label: 'Efficiency Gain', color: '#f43f5e' },
  { value: 18, label: 'Precision', color: '#14b8a6' },
]

const yearMetrics = [
  { year: '2021', val: 35, label: 'Capital One' },
  { year: '2022', val: 50, label: 'HCA Healthcare' },
  { year: '2023', val: 70, label: 'Scaling ML' },
  { year: '2024', val: 85, label: 'GenAI focus' },
  { year: '2025', val: 100, label: 'Adobe' },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-emerald/[0.02] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-emerald text-sm font-medium uppercase tracking-widest mb-4 block">Impact</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Measurable <span className="gradient-text">Results</span>
          </h2>
        </motion.div>

        {/* Radial gauges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group flex flex-col items-center text-center p-6 rounded-2xl glass gradient-border"
            >
              <RadialProgress value={stat.value} color={stat.color} size={110} />
              <div className="text-sm text-neutral-400 font-medium mt-4">{stat.label}</div>
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" style={{ background: `${stat.color}10` }} />
            </motion.div>
          ))}
        </div>

        {/* Career trajectory chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-8 rounded-2xl glass gradient-border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Career Trajectory</h3>
              <p className="text-xs text-neutral-500 mt-1">Impact growth over time</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-accent-emerald" />
              Impact Index
            </div>
          </div>
          <div className="flex items-end gap-2 h-40 pt-6">
            {yearMetrics.map((m, i) => {
              const colors = ['#f43f5e', '#f59e0b', '#14b8a6', '#10b981', '#10b981']
              return (
                <GrowingBar
                  key={m.year}
                  height={m.val}
                  color={colors[i]}
                  delay={0.6 + i * 0.15}
                  label={`${m.year} · ${m.label}`}
                />
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
