// requirements.js — System requirement tiers for Seven.
// Three tiers: minimum (CPU only), recommended (mid GPU), best (high GPU).

const requirements = [
  {
    id: 1,
    tier: 'Minimum',
    specs: [
      'Windows 10 / 11',
      '8GB RAM',
      'No GPU needed',
      'CPU inference mode',
      '~4 second response',
    ],
    model: 'TinyLlama 1.1B',
    highlight: false, // Not highlighted
  },
  {
    id: 2,
    tier: 'Recommended',
    specs: [
      'Windows 10 / 11',
      '16GB RAM',
      'GTX 1660 (4GB VRAM)',
      'GPU-accelerated',
      '~2 second response',
    ],
    model: 'Phi-3 Mini 3.8B',
    highlight: true, // This tier gets the green border highlight
  },
  {
    id: 3,
    tier: 'Best',
    specs: [
      'Windows 10 / 11',
      '32GB RAM',
      'RTX 3060+ (8GB VRAM)',
      'Full GPU power',
      '<1.5 second response',
    ],
    model: 'Llama3 8B',
    highlight: false,
  },
]

export default requirements