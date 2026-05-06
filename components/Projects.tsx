'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    title: 'Enterprise RAG Pipeline',
    impact: '13% accuracy boost',
    tech: ['Azure OpenAI', 'LangChain', 'FAISS', 'FastAPI'],
    category: 'GenAI',
    color: '#10b981',
    description: 'Production RAG with vector embeddings, semantic search, and hybrid retrieval',
  },
  {
    title: 'Real-Time Fraud Detection',
    impact: '18% precision gain',
    tech: ['PySpark', 'XGBoost', 'Kubernetes', 'SHAP'],
    category: 'ML',
    color: '#f43f5e',
    description: 'ML models on high-volume credit card transactions with anomaly detection',
  },
  {
    title: 'Healthcare Sepsis Prediction',
    impact: '3-6h earlier detection',
    tech: ['GCP', 'TensorFlow', 'BigQuery', 'Looker'],
    category: 'Healthcare',
    color: '#f59e0b',
    description: 'Time-series ensemble models processing 1M+ patient EHR records',
  },
  {
    title: 'Identity Resolution Pipeline',
    impact: 'Enterprise-scale personalization',
    tech: ['Azure ML', 'Synapse', 'Spark'],
    category: 'MLOps',
    color: '#14b8a6',
    description: 'Unified customer embeddings for churn prediction at Adobe',
  },
  {
    title: 'Medical Imaging CV',
    impact: 'Enhanced diagnostic support',
    tech: ['TensorFlow', 'Keras', 'OpenCV'],
    category: 'CV',
    color: '#f97316',
    description: 'CNN models for chest X-ray abnormality detection',
  },
  {
    title: 'LLM Content Platform',
    impact: '24% efficiency gain',
    tech: ['Azure OpenAI', 'Claude', 'LangChain'],
    category: 'GenAI',
    color: '#10b981',
    description: 'Enterprise content generation with structured outputs',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-bg-card border border-neutral-800/50 hover:border-neutral-700/50 transition-colors duration-500"
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, ${project.color}12, transparent)`,
        }}
      />

      {/* Top accent bar */}
      <div className="h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ backgroundColor: project.color }} />

      <div className="relative p-7">
        {/* Category + Number */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium tracking-wide"
            style={{ backgroundColor: `${project.color}12`, color: project.color }}
          >
            {project.category}
          </span>
          <span className="text-5xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500">
            0{index + 1}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-neutral-500 mb-5 leading-relaxed">{project.description}</p>

        {/* Impact highlight */}
        <motion.div
          className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
          <span className="text-sm font-semibold text-white">{project.impact}</span>
        </motion.div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/[0.03] text-neutral-500 border border-neutral-800/30 group-hover:border-neutral-700/50 transition-colors duration-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent-emerald text-sm font-medium uppercase tracking-widest mb-4 block">
            Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
