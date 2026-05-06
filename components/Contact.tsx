'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa'

const links = [
  { icon: FaEnvelope, label: 'Email', value: 'sreeyukthas46@gmail.com', href: 'mailto:sreeyukthas46@gmail.com' },
  { icon: FaPhone, label: 'Phone', value: '+1 (940) 277-7569', href: 'tel:+19402777569' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'yukthas', href: 'https://www.linkedin.com/in/yukthas/' },
  { icon: FaGithub, label: 'GitHub', value: 'sreeyuktha', href: 'https://github.com/sreeyuktha' },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-emerald/[0.03] rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent-amber text-sm font-medium uppercase tracking-widest mb-4 block">
            Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s build something
            <br />
            <span className="gradient-text">amazing together</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Open to new opportunities and collaborations in AI/ML.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-hover
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="group flex items-center gap-4 p-5 rounded-2xl glass gradient-border hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent-emerald/10 transition-colors duration-300">
                <link.icon className="text-xl text-neutral-400 group-hover:text-accent-emerald transition-colors duration-300" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider">{link.label}</div>
                <div className="text-white font-medium text-sm">{link.value}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
