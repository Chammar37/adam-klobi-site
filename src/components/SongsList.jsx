import { useState, useEffect } from 'react'
import { fetchSongs, urlFor } from '../lib/sanity'
import './SongsList.css'

function SongsList({ featured = false }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await fetchSongs()
        const filteredSongs = featured
          ? data.filter((song) => song.featured)
          : data
        setSongs(filteredSongs)
      } catch (err) {
        setError('Failed to load songs')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadSongs()
  }, [featured])

  if (loading) return <div className="songs-loading">Loading songs...</div>
  if (error) return <div className="songs-error">{error}</div>
  if (songs.length === 0) return null

  return (
    <div className="songs-list">
      {songs.map((song) => (
        <div key={song._id} className="song-card">
          {song.artwork && (
            <div className="song-artwork">
              <img
                src={urlFor(song.artwork).width(300).height(300).url()}
                alt={song.title}
              />
            </div>
          )}
          <div className="song-info">
            <h3 className="song-title">{song.title}</h3>
            {song.releaseDate && (
              <p className="song-date">
                {new Date(song.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
            <div className="song-links">
              {song.spotifyUrl && (
                <a
                  href={song.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stream-link spotify"
                >
                  Spotify
                </a>
              )}
              {song.appleMusicUrl && (
                <a
                  href={song.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stream-link apple"
                >
                  Apple Music
                </a>
              )}
              {song.youtubeUrl && (
                <a
                  href={song.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stream-link youtube"
                >
                  YouTube
                </a>
              )}
              {song.soundcloudUrl && (
                <a
                  href={song.soundcloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stream-link soundcloud"
                >
                  SoundCloud
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SongsList
