// roadmap.js — The development timeline for Seven.
// status: 'complete' | 'in-progress' | 'upcoming'
// These statuses control the dot color and styling in the Roadmap component.

const roadmap = [
  {
    id: 1,
    version: 'V1.0 — V1.7',
    title: 'Foundation',
    description: 'Voice chat, memory, app control, window mastery, system control, web search, voice identity.',
    status: 'complete', // Green dot
  },
  {
    id: 2,
    version: 'V1.8',
    title: 'Scheduler',
    description: 'Reminders, timers, alarms, recurring events — all by voice.',
    status: 'in-progress', // Yellow pulsing dot
  },
  {
    id: 3,
    version: 'V1.9',
    title: 'Velocity',
    description: 'Sub-1.5 second response time. Instant feels.',
    status: 'upcoming', // Gray dot
  },
  {
    id: 4,
    version: 'V2.0',
    title: 'Vision',
    description: '"What\'s on my screen?" — Seven sees and understands your display.',
    status: 'upcoming',
  },
  {
    id: 5,
    version: 'V2.1',
    title: 'Active Targeting',
    description: '"Click the send button." — Seven interacts with UI elements directly.',
    status: 'upcoming',
  },
  {
    id: 6,
    version: 'V3.0',
    title: 'Mobile App',
    description: 'Seven on Android & iOS. Your local AI, in your pocket.',
    status: 'upcoming',
  },
  {
    id: 7,
    version: 'V3.1',
    title: 'Desktop ↔ Mobile Bridge',
    description: 'Control your PC from your phone. Seamless sync.',
    status: 'upcoming',
  },
]

export default roadmap