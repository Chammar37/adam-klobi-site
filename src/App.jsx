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
              id: 'guitar-case',
              label: 'Music',
              image: '/hotspots/guitar_test.png',
              position: { x: 3, y: 49 },
              size: { width: 40, height: 45 },
              glow: '#0054ff',
              link: '#songs'
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
