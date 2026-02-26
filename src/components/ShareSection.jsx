// ShareSection.jsx — Social sharing section on the page + used in success card.
// Shares a professional message, not just a bare link.

import { useState } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════
// CONFIGURE YOUR SHARE CONTENT
// ═══════════════════════════════════════════
const SHARE_URL = 'https://meetseven.vercel.app/' // PLACEHOLDER: Replace with real URL
const SHARE_TITLE = 'Seven — Your Local AI Assistant'
const SHARE_TEXT =
  "Just discovered Seven — a fully local AI assistant that controls your PC by voice. No cloud, no API keys, 100% private. It's like Jarvis but it runs on YOUR machine. Check it out 👇"
const SHARE_HASHTAGS = 'SevenAI,LocalAI,Privacy'
// ═══════════════════════════════════════════

// Generate share URLs for each platform
const getShareLinks = () => ({
  twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    SHARE_TEXT
  )}&url=${encodeURIComponent(SHARE_URL)}&hashtags=${SHARE_HASHTAGS}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    SHARE_URL
  )}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(
    SHARE_TEXT + '\n\n' + SHARE_URL
  )}`,
  telegram: `https://t.me/share/url?url=${encodeURIComponent(
    SHARE_URL
  )}&text=${encodeURIComponent(SHARE_TEXT)}`,
  email: `mailto:?subject=${encodeURIComponent(
    SHARE_TITLE
  )}&body=${encodeURIComponent(SHARE_TEXT + '\n\n' + SHARE_URL)}`,
})

// ═══════════════════════════════════════════
// INLINE SHARE BUTTONS (used inside success card)
// ═══════════════════════════════════════════
export function InlineShareButtons() {
  const [copied, setCopied] = useState(false)
  const links = getShareLinks()

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = SHARE_URL
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {/* Twitter/X */}
      <a
        href={links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-seven-dark border border-seven-border hover:border-white/20
          transition-all duration-200 text-[11px] text-seven-gray
          hover:text-white"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share
      </a>

      {/* LinkedIn */}
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-seven-dark border border-seven-border hover:border-[#0A66C2]/40
          transition-all duration-200 text-[11px] text-seven-gray
          hover:text-[#0A66C2]"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        Share
      </a>

      {/* WhatsApp */}
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-seven-dark border border-seven-border hover:border-green-500/40
          transition-all duration-200 text-[11px] text-seven-gray
          hover:text-green-400"
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Share
      </a>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-seven-dark border border-seven-border hover:border-seven-green/30
          transition-all duration-200 text-[11px] text-seven-gray
          hover:text-seven-green"
      >
        {copied ? (
          <>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Copy Link
          </>
        )}
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════
// STANDALONE SHARE SECTION (on the page)
// ═══════════════════════════════════════════
export default function ShareSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl mb-3 block">🫶</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Know someone who'd love Seven?
          </h3>
          <p className="text-seven-gray text-sm mb-6">
            Share Seven with your friends. Help us build the future of local AI.
          </p>
          <InlineShareButtons />
        </motion.div>
      </div>
    </section>
  )
}