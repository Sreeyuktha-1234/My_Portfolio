'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionDivider({ color = 'emerald' }: { color?: 'emerald' | 'amber' | 'coral' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colors = {
    emerald: 'from-transparent via-accent-emerald/30 to-transparent',
    amber: 'from-transparent via-accent-amber/30 to-transparent',
    coral: 'from-transparent via-accent-coral/30 to-transparent',
  }

  return (
    <div ref={ref} className="flex items-center justify-center py-4">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full max-w-md h-px bg-gradient-to-r ${colors[color]}`}
      />
    </div>
  )
}
