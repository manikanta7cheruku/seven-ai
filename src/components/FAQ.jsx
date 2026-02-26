// FAQ.jsx — Frequently Asked Questions section.
// Uses an accordion pattern — click a question to expand the answer.
// Only one question can be open at a time.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'Is Seven really 100% free?',
    answer:
      'Yes. Seven is completely free to download and use. No subscriptions, no premium tiers, no hidden costs. The AI runs on YOUR hardware, so there are no server costs for us to pass on to you.',
  },
  {
    question: 'Does Seven work without internet?',
    answer:
      'Yes! After the initial setup (which downloads the AI model), Seven works completely offline. Your voice commands, conversations, and memory — everything runs locally on your machine. No internet required.',
  },
  {
    question: 'What about my privacy? Can you see my data?',
    answer:
      'We literally cannot. Seven runs 100% on your computer. Your conversations, commands, voice data, and memory files never leave your machine. There is no server, no cloud, no telemetry, no tracking. We have zero access to your data.',
  },
  {
    question: 'Will Seven work on my old laptop?',
    answer:
      'If it has Windows 10 or 11 and at least 8GB of RAM, yes. Seven auto-detects your hardware and picks the best AI model. Older machines use a lighter model (TinyLlama 1.1B) that works on CPU only — no GPU needed.',
  },
  {
    question: 'How is Seven different from Alexa, Siri, or Cortana?',
    answer:
      'Those assistants send everything to the cloud. Seven runs entirely on your PC. It can control your windows, apps, system settings, and remember your preferences — all without any data leaving your machine. Think Jarvis from Iron Man, but real.',
  },
  {
    question: 'Is there a Mac or Linux version?',
    answer:
      'Not yet. Seven is Windows-only right now. Mac and Linux support is planned for the future. Join the waitlist and we\'ll notify you when your platform is supported.',
  },
  {
    question: 'How do I get help or report a bug?',
    answer:
      'Join our Discord community (link in the footer) or reach out on Twitter. We\'re a small team and we read every message. You can also use the feedback form on this page to share suggestions.',
  },
  {
    question: 'Will Seven slow down my computer?',
    answer:
      'Seven only uses resources when you\'re actively talking to it. When idle, it uses minimal CPU and RAM. If you have a GPU, the AI runs on it — leaving your CPU free for other tasks.',
  },
]

export default function FAQ() {
  // Track which question is currently open (-1 = none)
  const [openIndex, setOpenIndex] = useState(-1)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="faq-section" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-seven-gray text-lg">
            Everything you need to know about Seven.
          </p>
        </motion.div>

        {/* Questions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card overflow-hidden"
            >
              {/* Question button */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-5
                  text-left hover:bg-white/[0.02] transition-colors duration-200"
                aria-expanded={openIndex === index}
              >
                <span className="text-white text-sm sm:text-base font-medium pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-seven-green text-xl shrink-0 font-light"
                >
                  +
                </motion.span>
              </button>

              {/* Answer — expands/collapses */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="h-px bg-seven-border mb-4" />
                      <p className="text-seven-gray text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}