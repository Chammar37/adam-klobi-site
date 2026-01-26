import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import MusicPage from './pages/MusicPage.jsx'
import TourPage from './pages/TourPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/tour" element={<TourPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
