// Features.jsx — Section 2: "What can Seven do?"
// Added id="features-section" so the "Explore what Seven can do" button
// in the success card can scroll here.

import { motion } from 'framer-motion'
import FeatureCard from './FeatureCard'
import features from '../data/features'

export default function Features() {
  return (
    // ⬇️ THIS ID IS IMPORTANT — the success card's "Explore" button scrolls here
    <section id="features-section" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What can Seven do?
          </h2>
          <p className="text-seven-gray text-lg font-mono">
            Everything Jarvis does.{' '}
            <span className="text-seven-green">On your hardware.</span>
          </p>
        </motion.div>

        {/* Feature card grid: 1 col mobile, 2 cols tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}