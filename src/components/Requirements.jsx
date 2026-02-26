// Requirements.jsx — Section 5: System requirements.
// Three tier cards showing minimum, recommended, and best specs.
// The "Recommended" tier is highlighted with a green border.

import { motion } from 'framer-motion'
import requirements from '../data/requirements'

export default function Requirements() {
  return (
    <section id="requirements-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-seven-card">
      <div className="max-w-5xl mx-auto">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What you need
          </h2>
        </motion.div>

        {/* ── Tier cards ── */}
        {/* 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requirements.map((req, index) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className={`
                glass-card p-6 rounded-xl
                ${req.highlight
                  ? 'border-seven-green/50 shadow-[0_0_30px_-10px_rgba(0,255,136,0.2)]'
                  : 'border-seven-border'
                }
              `}
            >
              {/* Tier label */}
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-mono font-bold text-lg tracking-wide
                  ${req.highlight ? 'text-seven-green' : 'text-white'}
                `}>
                  {req.tier}
                </h3>
                {/* "Recommended" badge for the highlighted tier */}
                {req.highlight && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full
                    bg-seven-green/10 text-seven-green border border-seven-green/30">
                    RECOMMENDED
                  </span>
                )}
              </div>

              {/* Divider line */}
              <div className="h-px bg-seven-border mb-4" />

              {/* Spec list */}
              <ul className="space-y-2.5 mb-6">
                {req.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-seven-green mt-0.5 text-xs">▸</span>
                    <span className="text-seven-gray">{spec}</span>
                  </li>
                ))}
              </ul>

              {/* Model info at bottom */}
              <div className="pt-4 border-t border-seven-border">
                <p className="text-xs text-seven-gray">AI Model</p>
                <p className="font-mono text-sm text-white mt-1">{req.model}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Auto-detect note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-seven-gray text-sm mt-10 font-mono"
        >
          Seven <span className="text-white">auto-detects your hardware</span> and picks the best model.
        </motion.p>
      </div>
    </section>
  )
}