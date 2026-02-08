import { useState, useEffect } from 'react'
import { fetchLatestRelease, fetchSingles, urlFor } from '../lib/sanity'
import './MusicPage.css'

function MusicPage() {
  const [release, setRelease] = useState(null)
  const [singles, setSingles] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <main>
      {/* Hero Album — side-by-side layout */}
      {release && (
        <section className="music-page-hero">
          <div className="music-hero-inner">
            <div className="music-hero-info">
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
                  PRE-SAVE
                </a>
              )}
            </div>
            <div className="music-hero-artwork">
              {release.artwork && (
                <img
                  src={urlFor(release.artwork).width(800).url()}
                  alt={release.title}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Supporting image beneath hero */}
      {release?.supportingImage && (
        <section className="music-supporting-image">
          <img
            src={urlFor(release.supportingImage).width(800).url()}
            alt={`${release.title} tracklist`}
          />
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
                  />
                )}
              </div>
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
                  PRE-SAVE
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
