// useCounter.js — Animated counter that counts up from 0 to a target number.
//
// HOW IT WORKS:
// 1. Given a target number (e.g., 1247), it counts up from 0
// 2. Uses requestAnimationFrame for smooth animation
// 3. Eases out (starts fast, slows down near the end)
//
// USAGE: const count = useCounter(1247, 2000, true)
// - target: the number to count to
// - duration: how long the animation takes (ms)
// - start: boolean to trigger the animation

import { useEffect, useState, useRef } from 'react'

export default function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!start) return

    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      // Progress goes from 0 to 1
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out function: fast start, slow finish
      // This makes the counter feel more natural
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(easedProgress * target))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    // Cleanup: cancel animation if component unmounts mid-count
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [target, duration, start])

  return count
}