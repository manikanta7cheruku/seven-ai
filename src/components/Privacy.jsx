// Privacy.jsx — Section 3: Privacy manifesto.
// A bold, centered statement about Seven's privacy commitment.
// Background is slightly lighter (#111111) to create visual separation.

import { motion } from 'framer-motion'

export default function Privacy() {
  // The three privacy pillars shown as small cards
  const pillars = [
    { icon: '🔑', label: 'No API Keys' },
    { icon: '☁️', label: 'No Cloud Storage' },
    { icon: '🚫', label: 'No Data Sharing' },
  ]

  return (
    <section id="privacy-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-seven-card">
      <div className="max-w-2xl mx-auto text-center">
        {/* ── Lock icon and headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-4xl mb-6">🔒</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 leading-snug">
            "Your data never leaves your machine."
          </h2>
        </motion.div>

        {/* ── Manifesto text ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 text-seven-gray text-base sm:text-lg leading-relaxed mb-12"
        >
          <p>
            Seven runs <span className="text-white font-medium">100% on YOUR hardware</span>.
            Your conversations, your commands, your memories — none of it touches any server.
            Not ours, not Google's, not anyone's.
          </p>
          <p className="text-white font-semibold text-lg sm:text-xl">
            No cloud. No telemetry. No tracking.
          </p>
          <p className="text-seven-gray">
            That's not a feature.{' '}
            <span className="text-seven-green font-medium">That's the entire point.</span>
          </p>
        </motion.div>

        {/* ── Three privacy pillars ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="glass-card px-5 py-3 flex items-center gap-2"
            >
              <span className="text-lg">{pillar.icon}</span>
              <span className="text-white text-sm font-mono">{pillar.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}