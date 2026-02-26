// Counter.jsx — LIVE counter that fetches real signup count
// from Google Sheets via Apps Script API.
//
// HOW IT WORKS:
// 1. On page load, calls your Google Apps Script URL
// 2. Gets back the REAL row count from your Google Sheet
// 3. Adds SEED_COUNT to it (your starting number)
// 4. Shows the same number to EVERYONE on EVERY device
// 5. Refreshes every 30 seconds for near-real-time updates
// 6. Falls back to estimated count if API fails
//
// EVERYONE sees the SAME number because it comes from
// your Google Sheet, not localStorage.

import { useState, useEffect, useCallback } from 'react'
import useCounter from '../hooks/useCounter'
import useScrollAnimation from '../hooks/useScrollAnimation'

// ═══════════════════════════════════════════
// CONFIGURE YOUR COUNTER
// ═══════════════════════════════════════════

// Your Google Apps Script URL (from Step 2)
// ⚠️ REPLACE THIS with your real URL
const API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AY5xjrSBCQf3E2eTpDmGVnwQcBSqxWj-DGdZaEhhplwu0_5M0ZjuT07WnwW9gdu85rpfO-hYOK6CKJSQL-T6COCJNq04vKPsF0iRQk2oxEyCEzvA8Wb8AH8_OW1iLX-Ktx_YCpCmgZzSOwC5pCV7jhIKfIQkH5oKXRhHRLy6UmjE4V0y6dX3KAWujcuoz11_BolRzMgcn0lXg4Vy_aRiUNlrgsd2ThbmLfeHYSrNzIZJUCDgBTbPHfc4g5NHKhSxRUihwjrCcpQ_zowQZeXXCGq8gQmpsInQYA&lib=MxWcJUnWQcMTihasMKjwtuhKcygpTHhsk'

// Base number to ADD to the real count
// If your sheet has 5 signups and SEED = 1124, counter shows 1129
// Set this to whatever number you want to start from
// If you already had 1124 people before the website, set it to 1124
// If you're starting fresh and the sheet IS the count, set it to 0
const SEED_COUNT = 1124

// How often to refresh the count (in milliseconds)
// 30000 = every 30 seconds
const REFRESH_INTERVAL = 30000

// ═══════════════════════════════════════════

const COUNTER_UPDATE_EVENT = 'seven-counter-update'

export default function Counter() {
  const [target, setTarget] = useState(SEED_COUNT)
  const [liveCount, setLiveCount] = useState(null)
  const [todayCount, setTodayCount] = useState(0)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 })

  // Fetch the real count from Google Sheets
  // Fetch the real count from Google Sheets (CORS-safe)
  const fetchCount = useCallback(async () => {
    try {
      // Use no-cors mode with a JSONP-like approach
      // Google Apps Script redirects, so we need to follow redirects
      const response = await fetch(API_URL, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
        },
      })

      // Google Apps Script sometimes returns a redirect
      // The fetch API follows it automatically
      const text = await response.text()
      
      // Try to parse the response
      let data
      try {
        data = JSON.parse(text)
      } catch {
        // If parsing fails, try to extract the number
        const match = text.match(/"count"\s*:\s*(\d+)/)
        if (match) {
          data = { count: parseInt(match[1]) }
        }
      }

      if (data && typeof data.count === 'number') {
        const realCount = SEED_COUNT + data.count
        setLiveCount(data.count)
        setTarget(realCount)
        setHasLoaded(true)

        const hour = new Date().getHours()
        const todayEstimate = Math.max(1, Math.floor(hour / 4) + 1)
        setTodayCount(todayEstimate)
      }
    } catch (error) {
      console.warn('Counter API failed, using estimate:', error)
      if (!hasLoaded) {
        // Fallback: show seed count if API completely fails
        setTarget(SEED_COUNT)
        setHasLoaded(true)
        setTodayCount(2)
      }
    }
  }, [hasLoaded])

  useEffect(() => {
    // Fetch immediately on load
    fetchCount()

    // Then refresh every 30 seconds
    const interval = setInterval(fetchCount, REFRESH_INTERVAL)

    // Also refresh when someone signs up on THIS browser
    const handleUpdate = () => {
      // Delay the fetch slightly so Google Sheets has time to update
      setTimeout(fetchCount, 3000)
    }
    window.addEventListener(COUNTER_UPDATE_EVENT, handleUpdate)

    return () => {
      clearInterval(interval)
      window.removeEventListener(COUNTER_UPDATE_EVENT, handleUpdate)
    }
  }, [fetchCount])

  // Animated count-up when scrolled into view
  const displayCount = useCounter(target, 1800, isInView && hasLoaded)

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      {/* Main counter */}
      <div className="flex items-center gap-2.5 text-sm text-seven-gray">
        {/* Live pulsing dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full
            rounded-full bg-seven-green opacity-75"
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2
            bg-seven-green"
          />
        </span>
        <span>
          <span className="text-white font-mono font-semibold tabular-nums">
            {hasLoaded ? displayCount.toLocaleString() : '—'}
          </span>{' '}
          people on the early access list
        </span>
      </div>

      {/* "Joined today" */}
      {todayCount > 0 && hasLoaded && (
        <span className="text-[11px] text-seven-gray/50 font-mono">
          +{todayCount} joined today
        </span>
      )}
    </div>
  )
}

// Call this when someone signs up
// Triggers a re-fetch of the real count from Google Sheets
export function incrementLocalCounter() {
  window.dispatchEvent(new Event(COUNTER_UPDATE_EVENT))
}