'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const courses = [
  'Machine Learning', 'Deep Learning', 'NLP', 'Feature Engineering',
  'Information Retrieval', 'Data Visualization', 'Advanced AI',
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-coral/20 to-transparent" />

      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent-coral text-sm font-medium uppercase tracking-widest mb-4 block">
            Education
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Academic <span className="gradient-text-warm">Foundation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative p-8 md:p-12 rounded-3xl glass gradient-border"
        >
          <div className="absolute -top-6 left-8 px-4 py-2 rounded-full bg-bg text-accent-emerald text-sm font-bold border border-accent-emerald/20">
            M.S.
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 mt-2">
            Artificial Intelligence — Machine Learning
          </h3>
          <p className="text-lg text-accent-amber font-medium mb-8">
            University of North Texas
          </p>

          <div className="flex flex-wrap gap-2">
            {courses.map((course, i) => (
              <motion.span
                key={course}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="px-4 py-2 rounded-full text-sm text-neutral-300 bg-white/5 border border-neutral-800/50 hover:border-accent-emerald/30 transition-all duration-300"
              >
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
