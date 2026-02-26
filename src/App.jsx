// App.jsx — The root component that sets up routing.
//
// ROUTES:
// /           → Home (the main landing page with all sections)
// /download   → DownloadPage (placeholder until launch)
// /changelog  → Changelog (version history from roadmap data)
//
// All routes are client-side (React Router).
// Vercel's vercel.json handles SPA routing for direct URL access.

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DownloadPage from './pages/DownloadPage'
import Changelog from './pages/Changelog'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/changelog" element={<Changelog />} />
      </Routes>
    </BrowserRouter>
  )
}