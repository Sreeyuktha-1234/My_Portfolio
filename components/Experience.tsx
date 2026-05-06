'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const experiences = [
  {
    company: 'Adobe',
    role: 'AI ML Engineer',
    period: 'Mar 2025 - Present',
    color: '#10b981',
    highlights: [
      'Real-time identity resolution & customer embeddings at enterprise scale',
      'RAG pipelines with 13% query accuracy boost',
      'LLM-powered content generation, 24% efficiency gain',
      'Foundation model integration — Firefly, GPT, Claude, Mistral',
    ],
    tech: ['Azure ML', 'RAG', 'LLMs', 'Vector DB', 'FastAPI'],
  },
  {
    company: 'HCA Healthcare',
    role: 'Data Scientist',
    period: 'Apr 2022 - Jun 2023',
    color: '#f59e0b',
    highlights: [
      'ML pipelines on GCP processing 1M+ patient records, 35% faster',
      'Sepsis detection models — AUC improved from 0.79 to 0.87',
      'Real-time risk alerts 3-6 hours earlier than standard workflows',
      'CNN models for chest X-ray abnormality detection',
    ],
    tech: ['GCP', 'TensorFlow', 'BigQuery', 'Docker', 'K8s'],
  },
  {
    company: 'Capital One',
    role: 'Data Scientist',
    period: 'Jan 2021 - Apr 2022',
    color: '#f43f5e',
    highlights: [
      'Real-time fraud detection — 18% precision improvement',
      'Anomaly detection with Isolation Forest & autoencoders',
      'Feature engineering boosted AUC from 0.87 to 0.93',
      'Automated ML lifecycle — deployment cut from weeks to 3 days',
    ],
    tech: ['PySpark', 'XGBoost', 'SHAP', 'Docker', 'CI/CD'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent-amber text-sm font-medium uppercase tracking-widest mb-4 block">
            Career
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Where I&apos;ve <span className="gradient-text-warm">worked</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-emerald/30 via-accent-amber/30 to-accent-coral/30 hidden md:block" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative mb-16 last:mb-0 md:grid md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? '' : 'md:direction-rtl'
              }`}
            >
              <div className={`hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-all duration-300 ${
                hoveredIndex === i ? 'scale-150 bg-opacity-100' : ''
              }`}
                style={{ borderColor: exp.color, backgroundColor: hoveredIndex === i ? exp.color : '#0a0a0a' }}
              />

              <div className={`${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`} style={{ direction: 'ltr' }}>
                <div className="group p-6 rounded-2xl glass hover:bg-white/[0.03] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: exp.color }} />
                    <span className="text-sm text-neutral-500 font-medium">{exp.period}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-lg font-medium mb-5" style={{ color: exp.color }}>{exp.company}</p>

                  <ul className="space-y-2 mb-5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-neutral-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: exp.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/5 text-neutral-400 border border-neutral-800/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
