// Feedback.jsx — FINAL FIXED VERSION
//
// WHAT WAS WRONG:
// The hidden form's target was "feedback_hidden_iframe" but
// the iframe wasn't ready yet when the form submitted.
// The browser couldn't find the target iframe, so it
// navigated the main page to Google Forms instead.
//
// THE FIX:
// 1. Make sure the iframe exists FIRST (it's in the JSX)
// 2. Use a ref to confirm the iframe is mounted
// 3. Append the hidden form inside the component div (near the iframe)
// 4. Small delay before submitting to ensure iframe is ready

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════
// YOUR REAL FEEDBACK FORM VALUES
// ═══════════════════════════════════════════════════════
const FEEDBACK_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdwmjvMIDzJRGo2xTTqdcvUgzCiDzQV2wzsOBAZhd6Ea2lIuw/formResponse'
const FEEDBACK_EMAIL_FIELD = 'entry.1666026261'
const FEEDBACK_MESSAGE_FIELD = 'entry.480930978'
// ═══════════════════════════════════════════════════════

// Unique iframe name — must not conflict with waitlist form's iframe
const IFRAME_NAME = 'seven_feedback_iframe_target'

export default function Feedback() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    setIsSubmitting(true)

    // ═══════════════════════════════════════════
    // Create a hidden form, append it INSIDE our component
    // (near the iframe), then submit after a tiny delay
    // to ensure the iframe target is findable.
    // ═══════════════════════════════════════════

    const hiddenForm = document.createElement('form')
    hiddenForm.action = FEEDBACK_FORM_ACTION
    hiddenForm.method = 'POST'
    hiddenForm.target = IFRAME_NAME  // Must match iframe's "name" attribute
    hiddenForm.style.display = 'none'

    // Email field (optional)
    const emailInput = document.createElement('input')
    emailInput.type = 'hidden'
    emailInput.name = FEEDBACK_EMAIL_FIELD
    emailInput.value = email.trim()
    hiddenForm.appendChild(emailInput)

    // Message field (required)
    const messageInput = document.createElement('input')
    messageInput.type = 'hidden'
    messageInput.name = FEEDBACK_MESSAGE_FIELD
    messageInput.value = message.trim()
    hiddenForm.appendChild(messageInput)

    // Append the hidden form INSIDE our component container
    // (right next to the iframe so the browser can find the target)
    if (containerRef.current) {
      containerRef.current.appendChild(hiddenForm)
    } else {
      document.body.appendChild(hiddenForm)
    }

    // Small delay to ensure iframe is ready, then submit
    setTimeout(() => {
      hiddenForm.submit()

      // Clean up the hidden form after submission
      setTimeout(() => {
        if (hiddenForm.parentNode) {
          hiddenForm.parentNode.removeChild(hiddenForm)
        }
      }, 500)
    }, 100)

    // Show success state after a delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setEmail('')
      setMessage('')

      // Reset after 5 seconds so they can send another message
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <section id="feedback-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-seven-card">
      {/* 
        This ref container holds everything including the iframe.
        Hidden forms are appended here so they can find the iframe target.
      */}
      <div ref={containerRef} className="max-w-2xl mx-auto">
        {/* ════════════════════════════════════════
            IMPORTANT: This iframe MUST be rendered FIRST
            and ALWAYS present in the DOM (not conditionally rendered).
            The hidden form targets this iframe by name.
            ════════════════════════════════════════ */}
        <iframe
          name={IFRAME_NAME}
          title="Feedback form submission target"
          style={{
            display: 'none',
            width: 0,
            height: 0,
            border: 'none',
            position: 'absolute',
          }}
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-3xl mb-4 block">💬</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Have a question or suggestion?
          </h2>
          <p className="text-seven-gray text-base">
            We read every single message. Your feedback shapes Seven.
          </p>
        </motion.div>

        {/* Form / Success State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="feedback-form"
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Email (optional) */}
                <div>
                  <label
                    htmlFor="feedback-email"
                    className="block text-xs text-seven-gray font-mono mb-1.5"
                  >
                    YOUR EMAIL{' '}
                    <span className="text-seven-gray/50">
                      (optional — if you want a reply)
                    </span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-seven-dark border border-seven-border
                      rounded-lg text-white placeholder-seven-gray/40
                      focus:outline-none focus:border-seven-green
                      focus:ring-1 focus:ring-seven-green/50
                      transition-all duration-200 text-sm font-mono
                      disabled:opacity-50"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="feedback-message"
                    className="block text-xs text-seven-gray font-mono mb-1.5"
                  >
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts, suggestions, questions, feature requests..."
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full px-4 py-3 bg-seven-dark border border-seven-border
                      rounded-lg text-white placeholder-seven-gray/40
                      focus:outline-none focus:border-seven-green
                      focus:ring-1 focus:ring-seven-green/50
                      transition-all duration-200 text-sm font-mono
                      resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full px-6 py-3.5 bg-seven-green/10 border border-seven-green/20
                    text-seven-green font-semibold rounded-lg
                    hover:bg-seven-green/20 hover:border-seven-green/30
                    active:scale-[0.98] transition-all duration-200 text-sm
                    disabled:opacity-40 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
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
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="feedback-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 text-center border-seven-green/20"
              >
                <div
                  className="w-12 h-12 rounded-full bg-seven-green/10
                  flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-6 h-6 text-seven-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">
                  Message sent! Thank you.
                </h3>
                <p className="text-seven-gray text-sm">
                  We read every message. If you left your email, we'll get back
                  to you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}