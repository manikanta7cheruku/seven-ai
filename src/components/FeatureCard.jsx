// FeatureCard.jsx — A single glassmorphism card for the Features grid.
// Receives: icon (emoji), title, description, and animation delay index.
//
// Each card has:
// - Glassmorphism background (semi-transparent + blur)
// - Hover lift effect (moves up 4px + green glow shadow)
// - Fade-in animation when scrolled into view

import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description, index }) {
  return (
    <motion.div
      // Scroll-triggered entrance animation
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% visible
      transition={{
        duration: 0.5,
        delay: index * 0.1, // Stagger: each card appears 0.1s after the previous
        ease: 'easeOut',
      }}
      // Hover effect: lift up + green glow
      whileHover={{
        y: -4,
        boxShadow: '0 10px 40px rgba(0, 255, 136, 0.1)',
      }}
      className="glass-card p-6 cursor-default
        transition-colors duration-200 hover:border-seven-green/30"
    >
      {/* Emoji icon — large and prominent */}
      <div className="text-3xl mb-3">{icon}</div>

      {/* Card title */}
      <h3 className="font-mono font-semibold text-white text-sm mb-2 tracking-wide">
        {title}
      </h3>

      {/* One-line description */}
      <p className="text-seven-gray text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}