import InteractiveImage from './components/InteractiveImage'
import './App.css'

function App() {
  return (
    <main>
      <section className="hero-section">
        <InteractiveImage
          baseImage="/base-image.webp"
          mobileItems={[
            { image: '/mobile/mobile_disc 1.webp', label: 'Music', link: '/music' },
            { image: '/mobile/mobile_globe 1.webp', label: 'Tour', link: '/tour' },
            { image: '/mobile/mobile_vhs 1.webp', label: 'Videos', link: '/videos' },
            { image: '/mobile/mobile_phone 1.webp', label: 'Contact', link: '/about' },
            { image: '/mobile/mobile_computer 1.webp', label: 'Merch', link: '/merch' },
          ]}
          hotspots={[
            // {
            //   id: 'guitar-case',
            //   label: 'Tour',
            //   image: '/hotspots/guitar_test.webp',
            //   position: { x: 2, y: 48.5 },
            //   size: { width: 42, height: 49 },
            //   glow: '#0054ff',
            //   link: '/tour',
            //   zIndex: 10,
            //   priority: 1,
            //   enlarge: true,
            // },
            {
              id: 'tv',
              label: 'Videos',
              image: '/hotspots/tv/tv off_.webp',
              hoverImage: '/hotspots/tv/tv on.webp',
              position: { x: 5, y: 48 },
              size: { width: 10, height: 15 },
              link: '/videos',
              zIndex: 5,
              priority: 20
            },
            {
              id: 'computer',
              label: 'Merch',
              image: '/hotspots/computer/computer off.webp',
              hoverImage: '/hotspots/computer/computer on.webp',
              position: { x: 80, y: 30 },
              size: { width: 12, height: 18 },
              link: '/merch',
              glow: '#ffffff',
            },
            {
              id: 'cd-tower',
              label: 'Music',
              image: '/hotspots/CD tower.webp',
              position: { x: 45, y: 32.5 },
              size: { width: 10, height: 20 },
              link: '/music',
              glow: '#ffffff',
            },
            {
              id: 'silver-camera',
              label: 'About',
              image: '/hotspots/camera/silver_cam.webp',
              hoverImage: '/hotspots/camera/silver_cam_on.webp',
              position: { x: 24, y: 39 },
              size: { width: 6, height: 7 },
              link: '/about',
              glow: '#ffffff',
            },
          ]}
        />
      </section>
    </main>
  )
}

export default App
