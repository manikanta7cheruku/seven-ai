// HowItWorks.jsx — Section 4: "Setup in 5 minutes"
// Shows 3 horizontal steps with connecting lines (vertical on mobile).
// Each step fades in with a stagger.

import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Download',
      description: 'Download Seven (250MB). One file, that\'s it.',
      icon: '⬇️',
    },
    {
      number: '02',
      title: 'Install',
      description: 'Click Next, Next, Next. Standard Windows installer.',
      icon: '📦',
    },
    {
      number: '03',
      title: 'Talk',
      description: 'Say "Hey Seven." You\'re live.',
      icon: '🎙️',
    },
  ]

  return (
    <section id="how-it-works-section" className="py-24 px-4 sm:px-6 lg:px-8">
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
            Setup in 5 minutes
          </h2>
          <p className="text-seven-gray text-lg">
            No terminal. No config files.{' '}
            <span className="text-white font-medium">Just click.</span>
          </p>
        </motion.div>

        {/* ── Steps container ── */}
        {/* Horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connecting line (desktop only) — a horizontal line behind the steps */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%]
            h-px bg-seven-border" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number circle */}
              <div className="w-24 h-24 rounded-2xl glass-card flex flex-col items-center
                justify-center mb-6 border-seven-border hover:border-seven-green/30
                transition-colors duration-200">
                <span className="text-2xl mb-1">{step.icon}</span>
                <span className="text-seven-green font-mono text-xs">{step.number}</span>
              </div>

              {/* Step title */}
              <h3 className="font-mono font-semibold text-white text-lg mb-2">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="text-seven-gray text-sm max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Note below steps ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-seven-gray text-sm mt-12 font-mono"
        >
          Seven auto-downloads the AI model on first run.{' '}
          <span className="text-white">Works offline forever after that.</span>
        </motion.p>
      </div>
    </section>
  )
}