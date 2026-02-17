import InteractiveImage from './components/InteractiveImage'

const OBJECT_POSITION = [50, 35]

const MOBILE_ITEMS = [
  { image: '/mobile/mobile_disc 1.webp', label: 'Music', link: '/music', width: 165, height: 161 },
  { image: '/mobile/mobile_computer 1.webp', label: 'Merch', link: '/merch', width: 213, height: 214 },
  { image: '/mobile/mobile_globe 1.webp', label: 'Tour', link: '/tour', width: 141, height: 182 },
  { image: '/mobile/mobile_vhs 1.webp', label: 'Videos', link: '/videos', width: 203, height: 116 },
  { image: '/mobile/mobile_phone 1.webp', label: 'About', link: '/about', width: 361, height: 214 },
]

const HOTSPOTS = [
  {
    id: 'tv',
    label: 'Videos',
    image: '/hotspots/tv/tv off_.webp',
    hoverImage: '/hotspots/tv/tv on.webp',
    position: { x: 5, y: 48 },
    size: { width: 10, height: 15 },
    naturalWidth: 442,
    naturalHeight: 419,
    link: '/videos',
    zIndex: 5,
    priority: 20,
  },
  {
    id: 'computer',
    label: 'Merch',
    image: '/hotspots/computer/computer off.webp',
    hoverImage: '/hotspots/computer/computer on.webp',
    position: { x: 80, y: 30 },
    size: { width: 12, height: 18 },
    naturalWidth: 579,
    naturalHeight: 491,
    link: '/merch',
    glow: '#ffffff',
  },
  {
    id: 'cd-tower',
    label: 'Music',
    image: '/hotspots/CD tower.webp',
    position: { x: 45, y: 32.5 },
    size: { width: 10, height: 20 },
    naturalWidth: 194,
    naturalHeight: 472,
    link: '/music',
    glow: '#ffffff',
  },
  {
    id: 'globe',
    label: 'Tour',
    image: '/hotspots/GLOBE-1.png',
    position: { x: 70.3, y: 26.7 },
    size: { width: 7, height: 14.1 },
    naturalWidth: 399,
    naturalHeight: 500,
    link: '/tour',
    glow: '#ffffff',
  },
  {
    id: 'silver-camera',
    label: 'About',
    image: '/hotspots/camera/silver_cam.webp',
    hoverImage: '/hotspots/camera/silver_cam_on.webp',
    position: { x: 24, y: 39 },
    size: { width: 6, height: 7 },
    naturalWidth: 290,
    naturalHeight: 227,
    link: '/about',
    glow: '#ffffff',
  },
]

function App() {
  return (
    <main>
      <section className="hero-section">
        <InteractiveImage
          baseImage="/base-image.webp"
          objectPosition={OBJECT_POSITION}
          mobileItems={MOBILE_ITEMS}
          hotspots={HOTSPOTS}
        />
      </section>
    </main>
  )
}

export default App
