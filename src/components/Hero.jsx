// Hero.jsx — The opening section. First impression matters most.
// Every word and animation is intentional here.

import { motion } from 'framer-motion'
import WaitlistForm from './WaitlistForm'
import Counter from './Counter'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Subtle radial glow behind the content */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[600px] h-[400px] bg-seven-green/5 rounded-full blur-[120px]" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8
        pt-24 pb-20 text-center">

        {/* ── Badge: "SEVEN" branding ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            border border-seven-border bg-seven-card/50 text-seven-green
            font-mono text-xs tracking-[0.2em] uppercase
            shadow-[0_0_20px_rgba(0,255,136,0.05)]">
            <span className="animate-pulse-slow">◆</span>
            LOCAL AI ASSISTANT
          </span>
        </motion.div>

        {/* ── Main headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6
            tracking-tight"
        >
          <span className="text-white">Your AI. Your Machine.</span>
          <br />
          <span className="text-seven-green relative">
            Your Rules.
            {/* Decorative underline */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-seven-green/30
                origin-left rounded-full"
            />
          </span>
        </motion.h1>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg lg:text-xl text-seven-gray
            max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A fully local AI assistant that controls your entire PC by voice.
          <br className="hidden sm:block" />
          No cloud. No API keys.{' '}
          <span className="text-white font-medium">
            Nothing leaves your machine. Ever.
          </span>
        </motion.p>

        {/* ── Demo video ── */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mb-12"
        >
          <div className="relative max-w-3xl mx-auto group"> */}
            {/* Glow effect behind the video */}
            {/* <div className="absolute -inset-1 bg-gradient-to-r from-seven-green/20
              via-seven-green/5 to-seven-green/20 rounded-xl blur-xl
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-xl overflow-hidden border border-seven-border
              shadow-[0_0_60px_-12px_rgba(0,255,136,0.1)]
              bg-seven-card"> */}
              {/*
                ═══════════════════════════════════════════
                VIDEO PLACEHOLDER
                
                Replace this div with your real video:
                
                Option A — Self-hosted MP4:
                <video
                  src="/demo.mp4"
                  controls
                  poster="/demo-poster.jpg"
                  className="w-full aspect-video"
                />
                
                Option B — YouTube embed:
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID"
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media"
                  allowFullScreen
                />
                ═══════════════════════════════════════════
              */}
              {/* <div className="aspect-video flex items-center justify-center
                cursor-pointer group/play">
                <div className="text-center"> */}
                  {/* Play button */}
                  {/* <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-seven-green/10
                      border border-seven-green/30 flex items-center justify-center
                      mx-auto mb-4 group-hover/play:bg-seven-green/20
                      transition-colors duration-200"
                  >
                    <svg className="w-6 h-6 text-seven-green ml-1" fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <p className="text-seven-gray text-sm font-mono">
                    Watch the 60-second demo
                  </p>
                  <p className="text-seven-gray/50 text-xs font-mono mt-1">
                    Coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}
        {/* ── Demo video ── */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.45 }}
  className="mb-12"
>
  <div className="relative max-w-3xl mx-auto group">

    {/* ── Subtle glow (only on hover) ── */}
    <div className="absolute -inset-3 rounded-2xl
      bg-seven-green/0 group-hover:bg-seven-green/[0.03]
      blur-2xl transition-all duration-1000 ease-out" />

    {/* ── Video container ── */}
    <div className="relative rounded-xl overflow-hidden
      border border-seven-border/40
      group-hover:border-seven-border/70
      transition-all duration-500 ease-out
      bg-seven-dark">

      {/* ── Minimal top bar ── */}
      <div className="flex items-center px-4 py-2
        bg-seven-dark border-b border-seven-border/30">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-seven-border/40" />
          <div className="w-2 h-2 rounded-full bg-seven-border/40" />
          <div className="w-2 h-2 rounded-full bg-seven-border/40" />
        </div>
        <span className="flex-1 text-center text-[10px] font-mono 
          text-seven-gray/30 tracking-widest uppercase">
          Seven Preview
        </span>
        <div className="w-[40px]" />
      </div>

      {/* ── Video ── */}
      <div className="relative">
        <video
          src="/main.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full aspect-video object-cover
            group-hover:brightness-[1.05]
            transition-all duration-500 ease-out"
        />

        {/* ── Soft bottom fade ── */}
        <div className="absolute bottom-0 left-0 right-0 h-16
          bg-gradient-to-t from-seven-dark/50 to-transparent
          pointer-events-none" />
      </div>
    </div>
  </div>

  {/* ── Caption ── */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.9 }}
    className="text-center text-seven-gray/30 text-xs font-mono mt-4
      tracking-wide"
  >
    Runs entirely on your machine · No data ever leaves
  </motion.p>
</motion.div>

        {/* ── Waitlist Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <WaitlistForm variant="hero" />
          <Counter />
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-seven-gray/60 text-xs
              font-mono tracking-wider"
          >
            <span>EXPLORE</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}