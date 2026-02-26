// DownloadPage.jsx — Standalone download page (future use).
// Currently shows a placeholder message.
// When Seven launches, this can be expanded with the full download experience.

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DownloadPage() {
  return (
    <div className="bg-seven-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-6">🚧</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Coming Soon
          </h1>
          <p className="text-seven-gray mb-8 max-w-md mx-auto">
            Seven isn't ready for download yet.
            Join the waitlist on the homepage and we'll email you the moment it's ready.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-seven-green
              text-seven-dark font-semibold rounded-lg hover:bg-seven-green/90
              transition-all duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}