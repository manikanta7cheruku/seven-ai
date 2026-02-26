// WaitlistForm.jsx — Production waitlist form with:
//
// 1. Real email validation (format + disposable domain blocking)
// 2. Google Forms submission via hidden iframe
// 3. Three states: Form → Success Card → Returning Visitor
// 4. Success card includes:
//    - "You're on the Early Access List!" message
//    - LinkedIn follow button
//    - "Explore what Seven can do" scroll button
//    - "Add another email" option
// 5. Confetti animation on success
// 6. Duplicate submission prevention
// 7. Loading spinner while submitting

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from './Confetti'
import { incrementLocalCounter } from './Counter'
import disposableEmailDomains from '../data/disposableEmails'
import { InlineShareButtons } from './ShareSection'

// ═══════════════════════════════════════════════════════
// YOUR REAL GOOGLE FORM VALUES
// ═══════════════════════════════════════════════════════
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfd8GCfsVhgU7HxLFmTPrJDdECgFJ-zNhQHtposJGnD8MPLHw/formResponse'
const GOOGLE_FORM_FIELD = 'entry.1875726419'

// ⚠️ REPLACE WITH YOUR REAL LINKEDIN URL
const LINKEDIN_URL = 'https://www.linkedin.com/in/YOUR_LINKEDIN_HERE'
// ═══════════════════════════════════════════════════════

export default function WaitlistForm({ variant = 'default' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [fireConfetti, setFireConfetti] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alreadySignedUp, setAlreadySignedUp] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  // Check if user already signed up (on page load)
  useEffect(() => {
    const storedEmails = JSON.parse(
      localStorage.getItem('seven-waitlist-emails') || '[]'
    )
    if (storedEmails.length > 0) {
      setAlreadySignedUp(true)
      setSubmittedEmail(storedEmails[storedEmails.length - 1])
    }
  }, [])

  // ─── EMAIL VALIDATION ───
  const isValidEmailFormat = (emailStr) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return regex.test(emailStr) && emailStr.includes('.')
  }

  const isDisposableEmail = (emailStr) => {
    const domain = emailStr.split('@')[1]?.toLowerCase()
    return disposableEmailDomains.includes(domain)
  }

  const isDuplicateEmail = (emailStr) => {
    const storedEmails = JSON.parse(
      localStorage.getItem('seven-waitlist-emails') || '[]'
    )
    return storedEmails.includes(emailStr.toLowerCase().trim())
  }

  const validateEmail = (emailStr) => {
    if (!emailStr.trim()) {
      return 'Please enter your email address.'
    }
    if (!isValidEmailFormat(emailStr)) {
      return "That doesn't look like a valid email. Please check and try again."
    }
    if (isDisposableEmail(emailStr)) {
      return 'Please use a real email address. Temporary emails are not accepted.'
    }
    if (isDuplicateEmail(emailStr)) {
      return "This email is already on the list! Try a different one."
    }
    return null // No error
  }

  // ─── SCROLL TO FEATURES ───
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // ─── ADD ANOTHER EMAIL (reset form) ───
  const handleAddAnother = () => {
    setSubmitted(false)
    setEmail('')
    setError('')
    // Keep alreadySignedUp as false so the form shows
    setAlreadySignedUp(false)
  }

  // ─── FORM SUBMISSION ───
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)

    // Submit to Google Forms via hidden iframe
    const form = e.target
    form.submit()

    // Show success after a brief delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFireConfetti(true)
      setAlreadySignedUp(true)
      setSubmittedEmail(email)
      incrementLocalCounter()

      // Store email in localStorage (array of all emails submitted from this browser)
      const storedEmails = JSON.parse(
        localStorage.getItem('seven-waitlist-emails') || '[]'
      )
      storedEmails.push(email.toLowerCase().trim())
      localStorage.setItem(
        'seven-waitlist-emails',
        JSON.stringify(storedEmails)
      )

      // Also keep the old key for Counter compatibility
      localStorage.setItem('seven-waitlist-email', email)

      setTimeout(() => setFireConfetti(false), 3000)
    }, 1000)
  }

  return (
    <div className="w-full max-w-md">
      <Confetti fire={fireConfetti} />

      <AnimatePresence mode="wait">
        {/* ══════════════════════════════════════════════
            STATE 3: Returning visitor (already signed up)
            ══════════════════════════════════════════════ */}
        {alreadySignedUp && !submitted ? (
          <motion.div
            key="already-signed-up"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-5 border-seven-green/10"
          >
            {/* Status */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-full bg-seven-green/15
                flex items-center justify-center shrink-0"
              >
                <svg
                  className="w-4 h-4 text-seven-green"
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
              <div>
                <p className="text-white text-sm font-semibold">
                  You're on the early access list
                </p>
                <p className="text-seven-gray text-xs font-mono">
                  {submittedEmail}
                </p>
              </div>
            </div>

            <div className="h-px bg-seven-border my-3" />

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                {/* LinkedIn */}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5
                    rounded-lg bg-seven-dark border border-seven-border
                    hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5
                    transition-all duration-200 text-xs text-seven-gray
                    hover:text-[#0A66C2]"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037
                      -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
                      c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286
                      zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063
                      2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064
                      2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0
                      .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24
                      23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  Follow
                </a>

                {/* Explore */}
                <button
                  onClick={scrollToFeatures}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5
                    rounded-lg bg-seven-green/10 border border-seven-green/20
                    hover:bg-seven-green/20 transition-all duration-200
                    text-xs text-seven-green"
                >
                  Explore Seven ↓
                </button>
              </div>

              {/* Add another email */}
              <button
                onClick={handleAddAnother}
                className="text-[11px] text-seven-gray/50 hover:text-seven-gray
                  transition-colors duration-200 font-mono py-1"
              >
                              {/* Share with friends */}
              <div className="pt-3 border-t border-seven-border">
                <p className="text-[11px] text-seven-gray/50 font-mono mb-2.5 text-center">
                  SHARE SEVEN WITH FRIENDS
                </p>
                <InlineShareButtons />
              </div>
                + Add another email
              </button>
            </div>
          </motion.div>
        ) : !submitted ? (
          /* ══════════════════════════════════════════════
             STATE 1: The signup form
             ══════════════════════════════════════════════ */
          <motion.form
            key="signup-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            action={GOOGLE_FORM_ACTION}
            method="POST"
            target="hidden_iframe"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                name={GOOGLE_FORM_FIELD}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
                className={`
                  w-full px-4 py-3.5 bg-seven-card border rounded-lg
                  text-white placeholder-seven-gray/60
                  focus:outline-none focus:border-seven-green
                  focus:ring-1 focus:ring-seven-green/50
                  transition-all duration-200 text-sm font-mono
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${error ? 'border-red-500/50' : 'border-seven-border'}
                `}
                aria-label="Email address"
                aria-describedby={error ? 'email-error' : undefined}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    className="text-red-400 text-xs mt-1.5 ml-1"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 bg-seven-green text-seven-dark font-bold
                rounded-lg hover:brightness-110 active:scale-[0.97]
                transition-all duration-200 text-sm whitespace-nowrap
                min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 tracking-wide"
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
                  Adding you...
                </>
              ) : (
                'Get Early Access'
              )}
            </button>
          </motion.form>
        ) : (
          /* ══════════════════════════════════════════════
             STATE 2: Success card (just signed up!)
             ══════════════════════════════════════════════ */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6 border-seven-green/20
              shadow-[0_0_40px_-10px_rgba(0,255,136,0.15)]"
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.15,
              }}
              className="w-16 h-16 rounded-full bg-seven-green/10
                border-2 border-seven-green/30 flex items-center
                justify-center mx-auto mb-5"
            >
              <motion.svg
                className="w-8 h-8 text-seven-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </motion.svg>
            </motion.div>

            {/* Success heading */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-white font-bold text-xl mb-2 text-center"
            >
              You're on the Early Access List!
            </motion.h3>

            {/* Confirmation */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-seven-gray text-sm text-center mb-4 leading-relaxed"
            >
              We'll notify{' '}
              <span
                className="text-white font-mono text-xs bg-seven-dark
                px-2 py-1 rounded-md border border-seven-border
                inline-block mt-1"
              >
                {submittedEmail}
              </span>{' '}
              <br />
              the moment Seven is ready to download.
            </motion.p>

            {/* Perk badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap justify-center gap-2 mb-5"
            >
              {[
                { icon: '🚀', text: 'Priority Access' },
                { icon: '📧', text: 'Launch Day Email' },
                { icon: '🔕', text: 'Zero Spam' },
              ].map((perk, i) => (
                <motion.span
                  key={perk.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-seven-green/10
                    text-seven-green border border-seven-green/20 font-mono
                    flex items-center gap-1.5"
                >
                  <span>{perk.icon}</span>
                  {perk.text}
                </motion.span>
              ))}
            </motion.div>

            <div className="h-px bg-seven-border my-5" />

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              {/* LinkedIn + Explore row */}
              <div className="flex gap-2">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                    rounded-lg bg-[#0A66C2]/10 border border-[#0A66C2]/20
                    hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/40
                    transition-all duration-200 text-sm text-[#0A66C2]
                    group"
                >
                  <svg
                    className="w-4 h-4 group-hover:scale-110
                      transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037
                      -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
                      c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286
                      zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063
                      2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064
                      2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0
                      .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24
                      23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  Follow for updates
                </a>

                <button
                  onClick={scrollToFeatures}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                    rounded-lg bg-seven-green/10 border border-seven-green/20
                    hover:bg-seven-green/20 hover:border-seven-green/30
                    transition-all duration-200 text-sm text-seven-green
                    font-medium group"
                >
                  Explore Seven
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-y-0.5
                      transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
               {/* Share with friends */}
              <div className="pt-3 border-t border-seven-border">
                <p className="text-[11px] text-seven-gray/50 font-mono mb-2.5 text-center">
                  SHARE SEVEN WITH FRIENDS
                </p>
                <InlineShareButtons />
              </div>

              {/* Add another email */}
              <button
                onClick={handleAddAnother}
                className="w-full text-center text-[11px] text-seven-gray/40
                  hover:text-seven-gray transition-colors duration-200
                  font-mono py-1.5"
              >
                + Add another email to the waitlist
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden iframe for Google Forms */}
      <iframe
        name="hidden_iframe"
        title="Hidden form submission target"
        className="hidden"
        aria-hidden="true"
      />
    </div>
  )
}