// Navbar.jsx — Sticky navigation with section links.
//
// WHAT CHANGED:
// - Removed GitHub link (not needed in navbar)
// - Added section navigation menu (Features, Privacy, Roadmap, FAQ)
// - Mobile: hamburger menu that opens a full-screen overlay
// - Desktop: horizontal links
// - Active section highlighting as user scrolls
// - "Get Early Access" CTA button in navbar

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// All navigable sections on the page
const NAV_SECTIONS = [
  { id: 'features-section', label: 'Features' },
  { id: 'privacy-section', label: 'Privacy' },
  { id: 'how-it-works-section', label: 'How It Works' },
  { id: 'roadmap-section', label: 'Roadmap' },
  { id: 'faq-section', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Track scroll position for navbar background + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine which section is currently in view
      const scrollPosition = window.scrollY + 100 // Offset for navbar height

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_SECTIONS[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_SECTIONS[i].id)
          break
        }
      }

      // If at the very top, no section is active
      if (window.scrollY < 300) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to a section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navbarHeight = 64 // Height of the navbar
      const sectionTop = section.offsetTop - navbarHeight
      window.scrollTo({ top: sectionTop, behavior: 'smooth' })
    }
    setMobileMenuOpen(false) // Close mobile menu after clicking
  }

  // Scroll to hero and focus email input
  const scrollToSignup = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      const emailInput = document.querySelector('input[type="email"]')
      if (emailInput) emailInput.focus()
    }, 800)
    setMobileMenuOpen(false)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? 'bg-seven-dark/90 backdrop-blur-xl border-b border-seven-border/50'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ── */}
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 group z-50"
            >
              <span className="text-seven-green text-xl group-hover:scale-110
                transition-transform duration-200">
                ◆
              </span>
              <span className="font-mono font-bold text-lg tracking-wider text-white
                group-hover:text-seven-green transition-colors duration-200">
                SEVEN
              </span>
            </Link>

            {/* ── Desktop Navigation (hidden on mobile) ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-mono
                    transition-all duration-200 relative
                    ${activeSection === section.id
                      ? 'text-seven-green'
                      : 'text-seven-gray hover:text-white'
                    }
                  `}
                >
                  {section.label}
                  {/* Active indicator dot */}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2
                        w-1 h-1 rounded-full bg-seven-green"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}

              {/* CTA Button */}
              <button
                onClick={scrollToSignup}
                className="ml-3 px-4 py-1.5 bg-seven-green text-seven-dark
                  font-semibold rounded-lg text-sm hover:brightness-110
                  active:scale-95 transition-all duration-200"
              >
                Get Early Access
              </button>
            </div>

            {/* ── Mobile Hamburger Button ── */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden z-50 w-10 h-10 flex flex-col items-center
                justify-center gap-1.5 rounded-lg hover:bg-white/5
                transition-colors duration-200"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                animate={mobileMenuOpen
                  ? { rotate: 45, y: 6 }
                  : { rotate: 0, y: 0 }
                }
                className="w-5 h-0.5 bg-white rounded-full block"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileMenuOpen
                  ? { opacity: 0 }
                  : { opacity: 1 }
                }
                className="w-5 h-0.5 bg-white rounded-full block"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileMenuOpen
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0 }
                }
                className="w-5 h-0.5 bg-white rounded-full block"
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-seven-dark/95 backdrop-blur-xl
              md:hidden flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-2 w-full max-w-xs"
            >
              {NAV_SECTIONS.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    w-full px-6 py-3.5 rounded-xl text-center font-mono
                    transition-all duration-200 text-base
                    ${activeSection === section.id
                      ? 'text-seven-green bg-seven-green/10 border border-seven-green/20'
                      : 'text-seven-gray hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {section.label}
                </motion.button>
              ))}

              {/* Mobile CTA */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + NAV_SECTIONS.length * 0.05 }}
                onClick={scrollToSignup}
                className="w-full mt-4 px-6 py-3.5 bg-seven-green text-seven-dark
                  font-bold rounded-xl text-base active:scale-95
                  transition-all duration-200"
              >
                Get Early Access
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}