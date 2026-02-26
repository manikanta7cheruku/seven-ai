// CTA.jsx — Second call-to-action at the bottom of the page.
// Stronger copy + trust signals + same WaitlistForm component.

import { motion } from 'framer-motion'
import WaitlistForm from './WaitlistForm'
import Counter from './Counter'

export default function CTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-seven-dark
        via-seven-card/50 to-seven-dark"
      />

      {/* Glow effect behind the form */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[500px] h-[300px] bg-seven-green/5 rounded-full blur-[100px]
        pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <span className="inline-block text-4xl mb-4">⚡</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Be the first to meet{' '}
            <span className="text-seven-green">Seven</span>.
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-seven-gray text-lg mb-10 leading-relaxed"
        >
          Get early access the moment we launch.
          <br className="hidden sm:block" />
          One email. No spam. That's a promise.
        </motion.p>

        {/* Waitlist form + counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <WaitlistForm variant="cta" />
          <Counter />
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs
            text-seven-gray font-mono"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-seven-green">✓</span> Free forever
          </span>
          <span className="text-seven-border">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-seven-green">✓</span> No credit card
          </span>
          <span className="text-seven-border">|</span>
          <span className="flex items-center gap-1.5">
            <span className="text-seven-green">✓</span> Unsubscribe anytime
          </span>
        </motion.div>
      </div>
    </section>
  )
}