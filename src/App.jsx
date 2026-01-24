import InteractiveImage from './components/InteractiveImage'

function App() {
  return (
    <main>
      <section className="hero-section">
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
              id: 'curtains',
              label: 'Merch',
              hoverImage: '/hotspots/curtains/open curtains.png',
              position: { x: 5, y: 0 },
              size: { width: 45, height: 4 },
              hoverImageSize: { width: 100, height: 1200 },
              hoverImagePosition: { x: 0, y: 0 },
              noWobble: true,
              link: '#merch'
            },
            {
              id: 'tv',
              label: 'TV',
              image: '/hotspots/tv/tv off_.png',
              hoverImage: '/hotspots/tv/tv on.png',
              position: { x: 5, y: 50 },
              size: { width: 10, height: 15 },
              noWobble: true,
              link: '#tv'
            },
            {
              id: 'guitar-case',
              label: 'Music',
              image: '/hotspots/guitar_test.png',
              position: { x: 3, y: 49 },
              size: { width: 40, height: 45 },
              glow: '#0054ff',
              link: '#songs'
            },
            {
              id: 'computer',
              label: 'Computer',
              image: '/hotspots/computer/computer off.png',
              hoverImage: '/hotspots/computer/computer on.png',
              position: { x: 80, y: 30 },  // Adjust position
              size: { width: 12, height: 18 },  // Adjust size
              noWobble: true,
              link: '#computer'
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
              image: '/hotspots/guitar.png',
              position: { x: 49, y: 43 },
              size: { width: 50, height: 35 },
              link: '#guitar'
            },
            {
              id: 'cd-tower',
              label: 'CD Tower',
              image: '/hotspots/CD tower.png',
              position: { x: 45, y: 32.5 },  // Adjust position
              size: { width: 10, height: 20 },  // Adjust size
              link: '#cd-tower',
              glow: '#ffffff',
            },
            {
              id: 'jvc',
              label: 'JVC',
              image: '/hotspots/JVC.png',
              position: { x: 32.5, y: 52.5 },  // Adjust position
              size: { width: 6, height: 3.5 },  // Adjust size
              link: '#jvc',
              glow: '#ffffff',
            },
            {
              id: 'silver-camera',
              label: 'Camera',
              image: '/hotspots/Silver camera.png',
              position: { x: 70, y: 60 },  // Adjust position
              size: { width: 5, height: 5 },  // Adjust size
              link: '#camera'
            },
            {
              id: 'plane',
              label: 'Plane',
              image: '/hotspots/Plane.png',
              position: { x: 69.2, y: 5.2 },  // Adjust position
              size: { width: 12, height: 10 },  // Adjust size
              link: '#plane',
              glow: '#ffffff',
            },
          ]}
        />
      </section>

      {/* Target sections for scroll navigation */}
      <section id="songs" style={{ minHeight: '100vh', padding: '4rem' }}>
        <h2>Songs</h2>
      </section>
      <section id="merch" style={{ minHeight: '100vh', padding: '4rem' }}>
        <h2>Merch</h2>
      </section>
      <section id="tours" style={{ minHeight: '100vh', padding: '4rem' }}>
        <h2>Tours</h2>
      </section>
    </main>
  )
}

export default App
