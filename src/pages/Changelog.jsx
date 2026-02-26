// Changelog.jsx — Version history page (future use).
// Pulls data from the roadmap data file to show completed milestones.
// Can be expanded with detailed release notes later.

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import roadmap from '../data/roadmap'

export default function Changelog() {
  return (
    <div className="bg-seven-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* ── Page heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="text-seven-gray hover:text-white text-sm font-mono
                transition-colors duration-200 mb-4 inline-block"
            >
              ← Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Changelog
            </h1>
            <p className="text-seven-gray">
              What's been built, what's in progress, and what's next.
            </p>
          </motion.div>

          {/* ── Version entries ── */}
          <div className="space-y-8">
            {roadmap.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono font-bold text-white">
                    {item.version}
                  </span>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-full border
                    ${item.status === 'complete'
                      ? 'text-seven-green border-seven-green/30 bg-seven-green/10'
                      : item.status === 'in-progress'
                        ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
                        : 'text-seven-gray border-seven-border bg-seven-border/30'
                    }
                  `}>
                    {item.status === 'complete' ? '✅ Complete' :
                     item.status === 'in-progress' ? '🔨 In Progress' : '📋 Planned'}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-seven-gray text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}