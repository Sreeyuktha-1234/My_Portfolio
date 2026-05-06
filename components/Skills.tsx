'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const categories = [
  {
    id: 'genai',
    title: 'GenAI & LLMs',
    color: '#10b981',
    angle: 0,
    skills: ['RAG', 'LangChain', 'Prompt Eng.', 'AutoGen', 'Vector DBs', 'HuggingFace', 'MCP'],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    color: '#f59e0b',
    angle: 90,
    skills: ['Deep Learning', 'Time-Series', 'Anomaly Detection', 'CNNs', 'RNNs', 'GNNs'],
  },
  {
    id: 'cloud',
    title: 'Cloud & MLOps',
    color: '#f43f5e',
    angle: 180,
    skills: ['Azure ML', 'GCP', 'AWS', 'Docker', 'Kubernetes', 'MLflow', 'CI/CD'],
  },
  {
    id: 'data',
    title: 'Data Engineering',
    color: '#14b8a6',
    angle: 270,
    skills: ['Spark', 'Kafka', 'Airflow', 'PostgreSQL', 'Snowflake', 'BigQuery'],
  },
]

function SkillConstellation({ activeCategory }: { activeCategory: typeof categories[0] }) {
  const radius = 180
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Connection lines from center */}
      <svg className="absolute inset-0 w-full h-full" viewBox="-200 -200 400 400">
        <defs>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor={activeCategory.color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={activeCategory.color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Static rings — were pulsing infinitely, killed for perf */}
        <circle cx="0" cy="0" r="70" fill="none" stroke={activeCategory.color} strokeWidth="0.5" opacity="0.25" />
        <circle cx="0" cy="0" r="90" fill="none" stroke={activeCategory.color} strokeWidth="0.5" opacity="0.15" />

        {activeCategory.skills.map((_, i) => {
          const angle = (i / activeCategory.skills.length) * Math.PI * 2 - Math.PI / 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <motion.line
              key={i}
              x1="0" y1="0" x2={x} y2={y}
              stroke={activeCategory.color}
              strokeWidth="0.5"
              strokeDasharray="2 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            />
          )
        })}

        <circle cx="0" cy="0" r="80" fill="url(#centerGlow)" />
      </svg>

      {/* Center hub */}
      <motion.div
        key={activeCategory.id}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div
          className="px-5 py-3 rounded-full glass-strong text-center"
          style={{ borderColor: `${activeCategory.color}40`, boxShadow: `0 0 40px ${activeCategory.color}30` }}
        >
          <div className="text-sm font-bold" style={{ color: activeCategory.color }}>
            {activeCategory.title}
          </div>
        </div>
      </motion.div>

      {/* Orbiting skill nodes */}
      {activeCategory.skills.map((skill, i) => {
        const angle = (i / activeCategory.skills.length) * Math.PI * 2 - Math.PI / 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          // Static positioner — plain div with translate so framer-motion can't overwrite it
          <div
            key={`${activeCategory.id}-${skill}`}
            className="absolute top-1/2 left-1/2 z-10"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                opacity: { delay: 0.2 + i * 0.06, duration: 0.4 },
                scale: { delay: 0.2 + i * 0.06, type: 'spring', stiffness: 200 },
              }}
              className="px-3 py-1.5 rounded-full glass text-xs font-medium whitespace-nowrap border"
              style={{ borderColor: `${activeCategory.color}30`, color: activeCategory.color }}
            >
              {skill}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

const techStack = [
  'Python', 'TensorFlow', 'PyTorch', 'Azure', 'GCP', 'AWS',
  'Docker', 'Kubernetes', 'Spark', 'Airflow', 'PostgreSQL', 'MongoDB',
  'FastAPI', 'LangChain', 'OpenCV', 'Scikit-learn',
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent-emerald text-sm font-medium uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Skill <span className="gradient-text">Constellation</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Category selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-3"
          >
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                data-hover
                onClick={() => setActiveIndex(i)}
                className={`relative w-full text-left p-5 rounded-2xl transition-all duration-500 group overflow-hidden ${
                  activeIndex === i ? 'glass-strong' : 'glass hover:bg-white/[0.03]'
                }`}
                style={activeIndex === i ? { boxShadow: `inset 0 0 0 1px ${cat.color}30` } : {}}
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="skill-active"
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: cat.color }}
                  />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-lg font-bold transition-colors ${activeIndex === i ? 'text-white' : 'text-neutral-400'}`}>
                      {cat.title}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {cat.skills.length} skills
                    </div>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: activeIndex === i ? cat.color : 'transparent',
                      border: `1px solid ${cat.color}`,
                      boxShadow: activeIndex === i ? `0 0 12px ${cat.color}` : 'none',
                    }}
                  />
                </div>
              </button>
            ))}
          </motion.div>

          {/* Constellation visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <SkillConstellation activeCategory={categories[activeIndex]} />
          </motion.div>
        </div>

        {/* Core stack marquee-style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-widest text-center mb-6">
            Core Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.03 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="group px-4 py-2 rounded-lg bg-bg-card border border-neutral-800/50 hover:border-accent-emerald/30 transition-colors duration-300"
              >
                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
