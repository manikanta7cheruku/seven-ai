// ShareSection.jsx — Social sharing + QR Code section
// Features: Share buttons, QR code modal, fullscreen QR for events

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

// ═══════════════════════════════════════════
// CONFIGURE YOUR SHARE CONTENT
// ═══════════════════════════════════════════
const SHARE_URL = 'https://meetseven.vercel.app/'
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
// QR CODE MODAL — Fullscreen for events
// ═══════════════════════════════════════════
function QRCodeModal({ isOpen, onClose }) {
  const qrRef = useRef(null)

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const size = 1024
    canvas.width = size
    canvas.height = size

    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      // Dark background
      ctx.fillStyle = '#0A0A0A'
      ctx.fillRect(0, 0, size, size)

      // Draw QR centered with padding
      const padding = 80
      const qrSize = size - padding * 2
      ctx.drawImage(img, padding, padding, qrSize, qrSize)

      // Download
      const link = document.createElement('a')
      link.download = 'seven-ai-qr-code.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full
                bg-white/10 border border-white/20 flex items-center
                justify-center text-white/70 hover:text-white
                hover:bg-white/20 transition-all duration-200 z-10"
              aria-label="Close QR code"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* QR Card */}
            <div className="bg-seven-card border border-seven-border
              rounded-2xl overflow-hidden shadow-2xl
              shadow-seven-green/5">

              {/* Header */}
              <div className="px-6 pt-6 pb-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-seven-green
                    animate-pulse" />
                  <span className="text-seven-green font-mono text-xs
                    tracking-widest uppercase">
                    Scan to Join
                  </span>
                  <div className="w-2 h-2 rounded-full bg-seven-green
                    animate-pulse" />
                </div>
                <h3 className="text-white text-xl font-bold">
                  Seven AI
                </h3>
                <p className="text-seven-gray text-xs mt-1">
                  Your Local AI Assistant
                </p>
              </div>

              {/* QR Code */}
              <div className="px-6 pb-4" ref={qrRef}>
                <div className="bg-white rounded-xl p-4 mx-auto
                  max-w-[260px] relative">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6
                    border-t-2 border-l-2 border-seven-green
                    rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-6 h-6
                    border-t-2 border-r-2 border-seven-green
                    rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-6 h-6
                    border-b-2 border-l-2 border-seven-green
                    rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-6 h-6
                    border-b-2 border-r-2 border-seven-green
                    rounded-br-xl" />

                  <QRCodeSVG
                    value={SHARE_URL}
                    size={228}
                    level="H"
                    includeMargin={false}
                    bgColor="#FFFFFF"
                    fgColor="#0A0A0A"
                    className="w-full h-full"
                    imageSettings={{
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230A0A0A'/%3E%3Ctext x='50' y='68' text-anchor='middle' font-size='50' font-weight='bold' fill='%2300FF88' font-family='monospace'%3E7%3C/text%3E%3C/svg%3E",
                      x: undefined,
                      y: undefined,
                      height: 36,
                      width: 36,
                      excavate: true,
                    }}
                  />
                </div>
              </div>

              {/* URL display */}
              <div className="px-6 pb-3">
                <div className="flex items-center justify-center gap-2
                  py-2 px-3 rounded-lg bg-seven-dark border
                  border-seven-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-seven-green" />
                  <span className="text-seven-gray font-mono text-xs
                    select-all">
                    meetseven.vercel.app
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-6 pb-6 flex gap-2">
                <button
                  onClick={downloadQR}
                  className="flex-1 flex items-center justify-center gap-2
                    px-4 py-2.5 rounded-lg bg-seven-green/10 border
                    border-seven-green/20 hover:bg-seven-green/20
                    transition-all duration-200 text-sm text-seven-green
                    font-medium min-h-[44px]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save QR
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(SHARE_URL)
                  }}
                  className="flex-1 flex items-center justify-center gap-2
                    px-4 py-2.5 rounded-lg bg-seven-dark border
                    border-seven-border hover:border-white/20
                    transition-all duration-200 text-sm text-seven-gray
                    hover:text-white font-medium min-h-[44px]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Link
                </button>
              </div>

              {/* Footer tag */}
              <div className="px-6 pb-4">
                <p className="text-center text-[10px] text-seven-gray/40
                  font-mono">
                  100% LOCAL · ZERO CLOUD · COMPLETE PRIVACY
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════
// INLINE QR BUTTON — Small trigger for modals
// ═══════════════════════════════════════════
export function QRButton({ className = '' }) {
  const [showQR, setShowQR] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowQR(true)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-seven-dark border border-seven-border hover:border-seven-green/30
          transition-all duration-200 text-[11px] text-seven-gray
          hover:text-seven-green ${className}`}
        aria-label="Show QR code"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm14 3h.01M17 17h.01M17 14h.01M14 14h3v3h-3v-3zm0 4h.01M20 17h.01M20 20h.01M17 20h.01" />
        </svg>
        QR Code
      </button>
      <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </>
  )
}

// ═══════════════════════════════════════════
// INLINE SHARE BUTTONS (used inside success card)
// ═══════════════════════════════════════════
export function InlineShareButtons() {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const links = getShareLinks()

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
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
    <>
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

        {/* QR Code Button */}
        <button
          onClick={() => setShowQR(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
            bg-seven-dark border border-seven-border
            hover:border-seven-green/30
            transition-all duration-200 text-[11px] text-seven-gray
            hover:text-seven-green"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm14 3h.01M17 17h.01M17 14h.01M14 14h3v3h-3v-3zm0 4h.01M20 17h.01M20 20h.01M17 20h.01" />
          </svg>
          QR Code
        </button>

        {/* Copy Link */}
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
            bg-seven-dark border border-seven-border
            hover:border-seven-green/30
            transition-all duration-200 text-[11px] text-seven-gray
            hover:text-seven-green"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Copy Link
            </>
          )}
        </button>
      </div>
      <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </>
  )
}

// ═══════════════════════════════════════════
// STANDALONE SHARE SECTION (on the page)
// ═══════════════════════════════════════════
export default function ShareSection() {
  const [showQR, setShowQR] = useState(false)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <span className="text-2xl mb-3 block">🫶</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Know someone who'd love Seven?
            </h3>
            <p className="text-seven-gray text-sm mb-6">
              Share Seven with your friends. Help us build the future of
              local AI.
            </p>
            <InlineShareButtons />
          </div>

          {/* Prominent QR Code Card for events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 sm:p-8 max-w-sm mx-auto
              border-seven-green/10 hover:border-seven-green/20
              transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent
                to-seven-green/20" />
              <span className="text-seven-green font-mono text-[10px]
                tracking-[0.2em] uppercase">
                Quick Access
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent
                to-seven-green/20" />
            </div>

            {/* QR Code Display */}
            <div
              onClick={() => setShowQR(true)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-xl p-3 mx-auto max-w-[200px]
                group-hover:shadow-lg group-hover:shadow-seven-green/10
                transition-all duration-300 relative">
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-xl bg-black/0
                  group-hover:bg-black/5 transition-all duration-300
                  flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 text-seven-dark
                    text-xs font-semibold bg-white/90 px-3 py-1
                    rounded-full shadow-sm">
                    Click to enlarge
                  </span>
                </div>
                <QRCodeSVG
                  value={SHARE_URL}
                  size={176}
                  level="H"
                  includeMargin={false}
                  bgColor="#FFFFFF"
                  fgColor="#0A0A0A"
                  className="w-full h-full"
                  imageSettings={{
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230A0A0A'/%3E%3Ctext x='50' y='68' text-anchor='middle' font-size='50' font-weight='bold' fill='%2300FF88' font-family='monospace'%3E7%3C/text%3E%3C/svg%3E",
                    height: 28,
                    width: 28,
                    excavate: true,
                  }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2
              py-2 px-3 rounded-lg bg-seven-dark/50 border
              border-seven-border/50">
              <div className="w-1.5 h-1.5 rounded-full bg-seven-green
                animate-pulse" />
              <span className="text-seven-gray font-mono text-[11px]
                select-all">
                meetseven.vercel.app
              </span>
            </div>

            <p className="text-seven-gray/50 text-[10px] font-mono mt-3
              text-center">
              Scan with your phone camera
            </p>
          </motion.div>
        </motion.div>
      </div>

      <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </section>
  )
}