import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
import MusicPage from './pages/MusicPage.jsx'
import TourPage from './pages/TourPage.jsx'
import MerchPage from './pages/MerchPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import VideosPage from './pages/VideosPage.jsx'
import NavMenu from './components/NavMenu.jsx'
import Footer from './components/Footer.jsx'
import './index.css'

function AppShell() {
  const { pathname } = useLocation()
  return (
    <>
      <NavMenu />
      <div className="page-transition" key={pathname}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/videos" element={<VideosPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </StrictMode>,
)
