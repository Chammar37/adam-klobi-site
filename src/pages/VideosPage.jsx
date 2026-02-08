import { useState, useEffect } from 'react'
import { fetchVideos } from '../lib/sanity'
import './VideosPage.css'

function getYouTubeId(url) {
  if (!url) return null
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&/#]+)/
  )
  return match ? match[1] : null
}

function VideosPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos()
        setVideos(data)
      } catch (err) {
        setError('Failed to load videos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  return (
    <main className="videos-page">
      <div className="videos-container">
        {loading && <div className="videos-loading">Loading videos...</div>}
        {error && <div className="videos-error">{error}</div>}
        {!loading && !error && videos.length === 0 && (
          <div className="videos-empty">No videos yet. Check back soon!</div>
        )}
        {videos.map((video) => {
          const videoId = getYouTubeId(video.youtubeUrl)
          if (!videoId) return null
          return (
            <div key={video._id} className="video-card">
              <div className="video-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

            </div>
          )
        })}
      </div>
    </main>
  )
}

export default VideosPage
