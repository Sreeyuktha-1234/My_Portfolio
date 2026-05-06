'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NeuralNetwork from './NeuralNetwork'
import OrbitalRings from './OrbitalRings'

const roles = ['AI ML Engineer', 'GenAI Specialist', 'RAG Architect', 'MLOps Engineer']

function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[currentIndex]

    if (!isDeleting && displayed === current) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setDisplayed(
          isDeleting
            ? current.slice(0, displayed.length - 1)
            : current.slice(0, displayed.length + 1)
        )
      },
      isDeleting ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentIndex])

  return (
    <span className="text-accent-emerald">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[1em] bg-accent-emerald ml-1 align-middle"
      />
    </span>
  )
}

function GlitchName() {
  return (
    <div className="relative">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight relative"
      >
        <span className="block text-white">Sree Yuktha</span>
        <span className="block gradient-text relative">
          Sunkara
          <motion.span
            className="absolute inset-0 gradient-text opacity-0"
            animate={{
              opacity: [0, 0.7, 0, 0.5, 0],
              x: [0, -2, 0, 2, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
            aria-hidden
          >
            Sunkara
          </motion.span>
        </span>
      </motion.h1>
    </div>
  )
}

function MetricCard({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass rounded-xl px-4 py-3"
    >
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralNetwork />
      <OrbitalRings />

      {/* Ambient glows — static, no per-frame blur repaint */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent-emerald/[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent-amber/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating metric cards (top corners) */}
      <div className="absolute top-28 left-6 md:left-12 z-20 hidden md:block">
        <MetricCard value="13%" label="Accuracy↑" color="#10b981" delay={1.5} />
      </div>
      <div className="absolute top-28 right-6 md:right-12 z-20 hidden md:block">
        <MetricCard value="35%" label="Speed↑" color="#f59e0b" delay={1.7} />
      </div>
      <div className="absolute bottom-32 left-6 md:left-12 z-20 hidden md:block">
        <MetricCard value="1M+" label="Records" color="#f43f5e" delay={1.9} />
      </div>
      <div className="absolute bottom-32 right-6 md:right-12 z-20 hidden md:block">
        <MetricCard value="3" label="Industries" color="#14b8a6" delay={2.1} />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
            </span>
            <span className="text-sm text-neutral-400 font-medium">Available for opportunities</span>
          </motion.div>
        </motion.div>

        <GlitchName />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-3xl font-light my-8 h-12 flex items-center justify-center"
        >
          <TypewriterText />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            data-hover
            className="group relative px-8 py-4 bg-accent-emerald text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent-emerald/25"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            data-hover
            className="px-8 py-4 rounded-full font-semibold text-white border border-neutral-700 hover:border-accent-emerald/50 transition-all duration-300 hover:bg-accent-emerald/5"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-neutral-500 uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-accent-emerald/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
