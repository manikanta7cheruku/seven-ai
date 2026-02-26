// FloatingActions.jsx — Floating buttons that appear when scrolling:
//
// 1. "Get Early Access" button — opens a mini waitlist form
// 2. "Back to Top" arrow — scrolls to the top of the page
//
// Both buttons appear after the user scrolls past the hero section.
// They float in the bottom-right corner of the screen.
// On mobile, they're slightly smaller but still touch-friendly (48px min).

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingActions() {
  const [showButtons, setShowButtons] = useState(false)
  const [showMiniForm, setShowMiniForm] = useState(false)

  // Show buttons after scrolling past 600px (roughly past hero)
  useEffect(() => {
    const handleScroll = () => {
      setShowButtons(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToHeroForm = () => {
    // Scroll to the hero section where the main form is
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Focus the email input after scrolling
    setTimeout(() => {
      const emailInput = document.querySelector(
        'input[type="email"]'
      )
      if (emailInput) emailInput.focus()
    }, 800)
  }

  return (
    <AnimatePresence>
      {showButtons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          {/* ── GET EARLY ACCESS BUTTON ── */}
          <motion.button
            onClick={scrollToHeroForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-seven-green
              text-seven-dark font-bold rounded-full text-sm
              shadow-[0_4px_20px_rgba(0,255,136,0.3)]
              hover:shadow-[0_4px_30px_rgba(0,255,136,0.4)]
              transition-shadow duration-300
              min-h-[48px]"
          >
            {/* Rocket icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98
                0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926
                14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581
                -5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041
                -.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24
                2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0
                004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            <span className="hidden sm:inline">Get Early Access</span>
            <span className="sm:hidden">Join</span>
          </motion.button>

          {/* ── SCROLL TO TOP BUTTON ── */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-seven-card border border-seven-border
              hover:border-seven-green/30 flex items-center justify-center
              text-seven-gray hover:text-white transition-all duration-200
              shadow-lg"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}