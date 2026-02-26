// Confetti.jsx — Fires a confetti animation when triggered.
// Uses the canvas-confetti library (3KB, very lightweight).
//
// USAGE: <Confetti fire={shouldFire} />
// When `fire` changes from false to true, confetti shoots!

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti({ fire }) {
  useEffect(() => {
    if (!fire) return

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    // Fire confetti from the center of the screen
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00FF88', '#FFFFFF', '#00CC6A', '#88FFBB'],
      disableForReducedMotion: true,
    })
  }, [fire])

  // This component doesn't render anything visible
  return null
}