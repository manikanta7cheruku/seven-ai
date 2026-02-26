// Download.jsx — Section 8: Download section (HIDDEN UNTIL LAUNCH).
//
// This is a placeholder that will be shown when Seven launches.
// Currently hidden via conditional rendering in Home.jsx:
//   {SHOW_DOWNLOAD && <Download />}
//
// When ready to launch:
// 1. Set SHOW_DOWNLOAD = true in Home.jsx
// 2. Replace PLACEHOLDER_DOWNLOAD_URL below with the real .exe URL
// 3. Optionally hide the waitlist forms

import { motion } from 'framer-motion'

export default function Download() {
  return (
    <section
      id="download-section"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-seven-card"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* ── Headline ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-8"
        >
          Seven is <span className="text-seven-green">here</span>.
        </motion.h2>

        {/* ── Download button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <a
            href="#PLACEHOLDER_DOWNLOAD_URL" /* PLACEHOLDER: Replace with real .exe URL */
            className="inline-flex items-center gap-3 px-8 py-4 bg-seven-green
              text-seven-dark font-bold rounded-xl hover:bg-seven-green/90
              active:scale-95 transition-all duration-200 text-lg"
          >
            <span className="text-2xl">⬇</span>
            Download Seven for Windows
          </a>
          <p className="text-seven-gray text-sm mt-3 font-mono">
            v2.1.0 • 250MB • Windows 10/11
          </p>
        </motion.div>

        {/* ── Installation instructions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6 text-left mb-8"
        >
          <h3 className="font-mono font-semibold text-white mb-4">Installation</h3>
          <p className="text-seven-gray text-sm mb-4">
            Download → Run → Next → Next → Next → Done.{' '}
            <span className="text-white">Seven handles the rest.</span>
          </p>

          <h4 className="font-mono text-sm text-white mb-3">On first run, Seven will:</h4>
          <ol className="space-y-2 text-sm text-seven-gray">
            {[
              'Detect your hardware',
              'Download the right AI model (~2-4GB)',
              'Set up your microphone',
              'Ask your name',
              'You\'re ready. Say "Hey Seven."',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-seven-green font-mono text-xs mt-0.5">
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* ── Mobile waitlist ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-seven-gray text-sm mb-2">
            📱 Mobile app coming soon.
          </p>
          <button className="text-seven-green font-mono text-sm underline
            underline-offset-4 hover:text-seven-green/80 transition-colors">
            Join mobile waitlist
          </button>
        </motion.div>
      </div>
    </section>
  )
}