import { useState, useEffect } from 'react'
import { fetchLatestRelease, fetchSingles, urlFor } from '../lib/sanity'
import './MusicPage.css'

function MusicPage() {
  const [release, setRelease] = useState(null)
  const [singles, setSingles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [releaseData, singlesData] = await Promise.all([
          fetchLatestRelease(),
          fetchSingles()
        ])
        setRelease(releaseData)
        setSingles(singlesData)
      } catch (err) {
        setError('Failed to load music')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <main className="music-loading">Loading...</main>
  }

  if (error) {
    return <main className="music-loading">{error}</main>
  }

  return (
    <main>
      {/* Hero Album — centered over background image */}
      {release && (
        <section className="music-page-hero">
          <img
            className="music-hero-bg"
            src="/music/tracklist-website-fade.png"
            alt=""
            width={1280}
            height={3107}
          />
          <div className="music-hero-content">
            <div className="music-hero-artwork">
              {release.artwork && (
                <img
                  src={urlFor(release.artwork).width(800).url()}
                  alt={release.title}
                />
              )}
            </div>
            {release.title && (
              <h2 className="music-hero-title">{release.title}</h2>
            )}
            {release.description && (
              <p className="music-hero-description">{release.description}</p>
            )}
            {release.link && (
              <a
                href={release.link}
                target="_blank"
                rel="noopener noreferrer"
                className="music-hero-btn"
              >
                {release.buttonLabel || 'PRE-SAVE'}
              </a>
            )}
          </div>
        </section>
      )}


      {/* Singles — stacked centered layout */}
      {singles.length > 0 && (
        <section className="music-singles">
          {singles.map((single) => (
            <div key={single._id} className="single-card">
              <div className="single-artwork">
                {single.artwork && (
                  <img
                    src={urlFor(single.artwork).width(600).url()}
                    alt={single.title}
                    loading="lazy"
                  />
                )}
              </div>
              {single.title && (
                <h3 className="single-title">{single.title}</h3>
              )}
              {single.description && (
                <p className="single-description">{single.description}</p>
              )}
              {single.link && (
                <a
                  href={single.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="single-btn"
                >
                  {single.buttonLabel || 'PRE-SAVE'}
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

export default MusicPage
