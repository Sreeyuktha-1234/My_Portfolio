'use client'

import { motion } from 'framer-motion'

const row1 = ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'Azure ML', 'Docker', 'Kubernetes', 'FastAPI', 'Spark', 'RAG']
const row2 = ['GCP', 'AWS', 'BigQuery', 'PostgreSQL', 'MongoDB', 'Airflow', 'OpenCV', 'Scikit-learn', 'Snowflake', 'MLflow']

function MarqueeRow({ items, direction = 1, speed = 30 }: { items: string[]; direction?: number; speed?: number }) {
  const doubled = [...items, ...items]

  return (
    <div className="flex overflow-hidden py-3 group">
      <motion.div
        className="flex gap-4 flex-nowrap"
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex-shrink-0 px-6 py-3 rounded-full glass border border-neutral-800/50 hover:border-accent-emerald/30 transition-all duration-300 group-hover:[animation-play-state:paused]"
          >
            <span className="text-sm text-neutral-400 whitespace-nowrap font-medium">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="py-12 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
      <MarqueeRow items={row1} direction={1} speed={25} />
      <MarqueeRow items={row2} direction={-1} speed={30} />
    </section>
  )
}
