// useScrollAnimation.js — Custom hook using Intersection Observer.
//
// HOW IT WORKS:
// 1. Attach a ref to any DOM element
// 2. When that element scrolls into the viewport, `isInView` becomes true
// 3. Use `isInView` to trigger Framer Motion animations
//
// WHY: Framer Motion's `whileInView` works too, but this hook gives us
// more control (e.g., triggering side effects when something becomes visible).

import { useEffect, useRef, useState } from 'react'

export default function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // If they want reduced motion, just show everything immediately
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once it's in view, keep it visible (don't re-hide on scroll away)
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        threshold: options.threshold || 0.1,  // Trigger when 10% visible
        rootMargin: options.rootMargin || '0px',
        ...options,
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    // Cleanup: stop observing when component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isInView }
}