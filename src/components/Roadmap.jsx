// Roadmap.jsx — Section 6: Development timeline.
// Vertical timeline with colored dots:
//   - Green: complete
//   - Yellow (pulsing): in progress
//   - Gray: upcoming

import { motion } from 'framer-motion'
import roadmap from '../data/roadmap'

export default function Roadmap() {
  // Map status to dot colors and styles
  const getStatusStyles = (status) => {
    switch (status) {
      case 'complete':
        return {
          dot: 'bg-seven-green',
          line: 'bg-seven-green/30',
          label: '✅ COMPLETE',
          labelColor: 'text-seven-green',
        }
      case 'in-progress':
        return {
          dot: 'bg-yellow-400',
          line: 'bg-seven-border',
          label: '🔨 IN PROGRESS',
          labelColor: 'text-yellow-400',
        }
      case 'upcoming':
        return {
          dot: 'bg-seven-gray/50',
          line: 'bg-seven-border',
          label: 'UPCOMING',
          labelColor: 'text-seven-gray',
        }
      default:
        return {
          dot: 'bg-seven-gray/50',
          line: 'bg-seven-border',
          label: '',
          labelColor: 'text-seven-gray',
        }
    }
  }

  return (
    <section id="roadmap-section" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What's coming
          </h2>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {roadmap.map((item, index) => {
            const styles = getStatusStyles(item.status)
            const isLast = index === roadmap.length - 1

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 pb-10"
              >
                {/* ── Left side: dot + line ── */}
                <div className="flex flex-col items-center">
                  {/* The dot */}
                  <div className="relative">
                    <div
                      className={`w-4 h-4 rounded-full ${styles.dot} shrink-0`}
                    />
                    {/* Pulsing ring for "in progress" items */}
                    {item.status === 'in-progress' && (
                      <div className="absolute inset-0 w-4 h-4 rounded-full
                        bg-yellow-400 animate-pulse-slow" />
                    )}
                  </div>
                  {/* The connecting line (not shown for the last item) */}
                  {!isLast && (
                    <div className={`w-px flex-1 mt-2 ${styles.line}`} />
                  )}
                </div>

                {/* ── Right side: content ── */}
                <div className="pb-2 -mt-0.5">
                  {/* Version + status label */}
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-mono font-bold text-white text-sm">
                      {item.version}
                    </span>
                    <span className={`font-mono text-xs ${styles.labelColor}`}>
                      {styles.label}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  {/* Description */}
                  <p className="text-seven-gray text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}