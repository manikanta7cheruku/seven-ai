// Home.jsx — Complete landing page with all sections.

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Privacy from '../components/Privacy'
import HowItWorks from '../components/HowItWorks'
import Requirements from '../components/Requirements'
import Roadmap from '../components/Roadmap'
import FAQ from '../components/FAQ'
import ShareSection from '../components/ShareSection'
import CTA from '../components/CTA'
import Feedback from '../components/Feedback'
import Download from '../components/Download'
import Footer from '../components/Footer'
import FloatingActions from '../components/FloatingActions'

// 🚀 LAUNCH DAY: Change to true
const SHOW_DOWNLOAD = false

export default function Home() {
  return (
    <main className="bg-seven-dark min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Privacy />
      <HowItWorks />
      <Requirements />
      <Roadmap />
      <FAQ />
      <ShareSection />
      <CTA />
      <Feedback />
      {SHOW_DOWNLOAD && <Download />}
      <Footer />
      <FloatingActions />
    </main>
  )
}