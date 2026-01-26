import InteractiveImage from './components/InteractiveImage'
import SongsList from './components/SongsList'
import TourDates from './components/TourDates'
import MerchGrid from './components/MerchGrid'
import ArtistBio from './components/ArtistBio'
import './App.css'

function App() {
  return (
    <main>
      <section className="hero-section">
        <a href="https://adamklobi.com" className="site-logo-link">
          <img
            src="/Adam_Klobi_Logo.svg"
            alt="Adam Klobi"
            className="site-logo"
          />
        </a>
        <InteractiveImage
          baseImage="/base-image.jpg"
          hotspots={[
            {
              id: 'glob',
              label: 'Tour',
              image: '/hotspots/glob.png',
              position: { x: 66.3, y: 21.3 },
              size: { width: 17.5, height: 28 },
              link: '#tours'
            },
            {
              id: 'guitar-case',
              label: 'Music',
              image: '/hotspots/guitar_test.png',
              position: { x: 2, y: 48.5 },
              size: { width: 42, height: 49 },
              glow: '#0054ff',
              link: '#songs',
              zIndex: 10,
              priority: 1,
              enlarge: true,
            },
            {
              id: 'tv',
              label: 'TV',
              image: '/hotspots/tv/tv off_.png',
              hoverImage: '/hotspots/tv/tv on.png',
              position: { x: 5, y: 48 },
              size: { width: 10, height: 15 },
              link: '#tv',
              zIndex: 5,
              priority: 20
            },
            {
              id: 'computer',
              label: 'Computer',
              image: '/hotspots/computer/computer off.png',
              hoverImage: '/hotspots/computer/computer on.png',
              position: { x: 80, y: 30 },
              size: { width: 12, height: 18 },
              link: '#computer',
              glow: '#ffffff',
            },
            {
              id: 'amp',
              label: 'Amp',
              image: '/hotspots/amp.png',
              position: { x: 39.5, y: 69.5 },
              size: { width: 27, height: 23 },
              glow: '#ffffff',
              link: '#amp'
            },
            {
              id: 'street-sign',
              label: 'Street Sign',
              image: '/hotspots/street sign.png',
              position: { x: 57, y: 14.3 },
              size: { width: 14, height: 14 },
              link: '#street-sign',
              glow: '#ff0000'
            },
            {
              id: 'guitar',
              label: 'Guitar',
              image: '/hotspots/guitar-bigback.png',
              position: { x: 0, y: 0 },
              size: { width: 100, height: 100 },
              link: '#guitar',
              glow: '#ffffff',
            },
            {
              id: 'cd-tower',
              label: 'CD Tower',
              image: '/hotspots/CD tower.png',
              position: { x: 45, y: 32.5 },
              size: { width: 10, height: 20 },
              link: '#cd-tower',
              glow: '#ffffff',
            },
            {
              id: 'jvc',
              label: 'JVC',
              image: '/hotspots/JVC.png',
              position: { x: 32.5, y: 52.5 },
              size: { width: 6, height: 3.5 },
              link: '#jvc',
              glow: '#ffffff',
              enlarge: true,
            },
            {
              id: 'silver-camera',
              label: 'Camera',
              image: '/hotspots/Silver camera.png',
              position: { x: 25, y: 40 },
              size: { width: 4, height: 4 },
              link: '#camera'
            },
            {
              id: 'plane',
              label: 'Plane',
              image: '/hotspots/Plane.png',
              position: { x: 69.2, y: 5.2 },
              size: { width: 12, height: 10 },
              link: '#plane',
              glow: '#ffffff',
            }
          ]}
        />
      </section>

      <section id="songs" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Music</h2>
          <SongsList />
        </div>
      </section>

      <section id="tours" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Tour Dates</h2>
          <TourDates />
        </div>
      </section>

      <section id="merch" className="content-section">
        <div className="section-container">
          <h2 className="section-title">Merch</h2>
          <MerchGrid />
        </div>
      </section>

      <section id="about" className="content-section">
        <div className="section-container">
          <h2 className="section-title">About</h2>
          <ArtistBio />
        </div>
      </section>
    </main>
  )
}

export default App
