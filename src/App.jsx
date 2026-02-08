import InteractiveImage from './components/InteractiveImage'
import ArtistBio from './components/ArtistBio'
import './App.css'

function App() {
  return (
    <main>
      <section className="hero-section">
        <InteractiveImage
          baseImage="/base-image.jpg"
          mobileItems={[
            { image: '/hotspots/CD tower.png', label: 'Music', link: '/music' },
            { image: '/hotspots/computer/computer on.png', label: 'Merch', link: '/merch' },
            { image: '/hotspots/street sign.png', label: 'Tour', link: '/tour' },
          ]}
          hotspots={[
            // {
            //   id: 'glob',
            //   label: 'Tour',
            //   image: '/hotspots/glob.png',
            //   position: { x: 66.3, y: 21.3 },
            //   size: { width: 17.5, height: 28 },
            //   link: '/tour'
            // },
            {
              id: 'guitar-case',
              label: 'Tour',
              image: '/hotspots/guitar_test.png',
              position: { x: 2, y: 48.5 },
              size: { width: 42, height: 49 },
              glow: '#0054ff',
              link: '/tour',
              zIndex: 10,
              priority: 1,
              enlarge: true,
            },
            {
              id: 'tv',
              label: 'Videos',
              image: '/hotspots/tv/tv off_.png',
              hoverImage: '/hotspots/tv/tv on.png',
              position: { x: 5, y: 48 },
              size: { width: 10, height: 15 },
              link: '/videos',
              zIndex: 5,
              priority: 20
            },
            {
              id: 'computer',
              label: 'Merch',
              image: '/hotspots/computer/computer off.png',
              hoverImage: '/hotspots/computer/computer on.png',
              position: { x: 80, y: 30 },
              size: { width: 12, height: 18 },
              link: '/merch',
              glow: '#ffffff',
            },
            // {
            //   id: 'amp',
            //   label: 'Amp',
            //   image: '/hotspots/amp.png',
            //   position: { x: 39.5, y: 69.5 },
            //   size: { width: 27, height: 23 },
            //   glow: '#ffffff',
            //   link: '#amp'
            // },
            // {
            //   id: 'street-sign',
            //   label: 'Street Sign',
            //   image: '/hotspots/street sign.png',
            //   position: { x: 57, y: 14.3 },
            //   size: { width: 14, height: 14 },
            //   link: '#street-sign',
            //   glow: '#ff0000'
            // },
            // {
            //   id: 'guitar',
            //   label: 'Guitar',
            //   image: '/hotspots/guitar-bigback.png',
            //   position: { x: 0, y: 0 },
            //   size: { width: 100, height: 100 },
            //   link: '#guitar',
            //   glow: '#ffffff',
            // },
            {
              id: 'cd-tower',
              label: 'Music',
              image: '/hotspots/CD tower.png',
              position: { x: 45, y: 32.5 },
              size: { width: 10, height: 20 },
              link: '/music',
              glow: '#ffffff',
            },
            // {
            //   id: 'jvc',
            //   label: 'JVC',
            //   image: '/hotspots/JVC.png',
            //   position: { x: 32.5, y: 52.5 },
            //   size: { width: 6, height: 3.5 },
            //   link: '#jvc',
            //   glow: '#ffffff',
            //   enlarge: true,
            // },
            {
              id: 'silver-camera',
              label: 'About',
              image: '/hotspots/camera/silver_cam.png',
              hoverImage: '/hotspots/camera/silver_cam_on.png',
              position: { x: 24, y: 39 },
              size: { width: 6, height: 7 },
              link: '/about',
              glow: '#ffffff',
            },
            // {
            //   id: 'plane',
            //   label: 'Plane',
            //   image: '/hotspots/Plane.png',
            //   position: { x: 69.2, y: 5.2 },
            //   size: { width: 12, height: 10 },
            //   link: '#plane',
            //   glow: '#ffffff',
            // }
          ]}
        />
      </section>
    </main>
  )
}

export default App
