'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const highlights = [
  { label: 'GenAI & LLMs', icon: '01' },
  { label: 'Cloud Native', icon: '02' },
  { label: 'MLOps', icon: '03' },
  { label: 'Production ML', icon: '04' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-emerald/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-accent-emerald text-sm font-medium uppercase tracking-widest mb-4 block"
            >
              About
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Building AI that
              <br />
              <span className="gradient-text">drives impact</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-neutral-400 text-lg leading-relaxed mb-6"
            >
              GenAI & ML Engineer at <span className="text-white font-medium">Adobe</span>,
              specializing in scalable RAG pipelines, real-time ML systems, and
              cloud-native AI solutions across healthcare, fintech, and enterprise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: '4+', label: 'Years Experience' },
                { value: '3', label: 'Industries' },
                { value: '10+', label: 'ML Systems Shipped' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group relative p-6 rounded-2xl glass gradient-border hover:bg-white/[0.03] transition-all duration-500"
              >
                <span className="text-4xl font-bold text-accent-emerald/10 group-hover:text-accent-emerald/20 transition-colors duration-500">
                  {item.icon}
                </span>
                <p className="text-white font-medium mt-2">{item.label}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-emerald group-hover:w-full transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
