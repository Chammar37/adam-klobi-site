import { useState, useEffect } from 'react'
import { fetchArtistBio, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'
import './ArtistBio.css'

function ArtistBio() {
  const [bio, setBio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadBio = async () => {
      try {
        const data = await fetchArtistBio()
        setBio(data)
      } catch (err) {
        setError('Failed to load bio')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadBio()
  }, [])

  if (loading) return <div className="bio-loading">Loading...</div>
  if (error) return <div className="bio-error">{error}</div>
  if (!bio) return null

  return (
    <div className="artist-bio">
      {bio.pressPhoto && (
        <div className="bio-photo">
          <img
            src={urlFor(bio.pressPhoto).width(600).height(600).url()}
            alt={bio.name}
          />
        </div>
      )}
      <div className="bio-content">
        <h2 className="bio-name">{bio.name}</h2>
        {bio.bio && (
          <div className="bio-text">
            <PortableText value={bio.bio} />
          </div>
        )}
        {bio.socialLinks && (
          <div className="bio-socials">
            {bio.socialLinks.instagram && (
              <a
                href={bio.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                Instagram
              </a>
            )}
            {bio.socialLinks.twitter && (
              <a
                href={bio.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                X/Twitter
              </a>
            )}
            {bio.socialLinks.tiktok && (
              <a
                href={bio.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                TikTok
              </a>
            )}
            {bio.socialLinks.youtube && (
              <a
                href={bio.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                YouTube
              </a>
            )}
            {bio.socialLinks.spotify && (
              <a
                href={bio.socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                Spotify
              </a>
            )}
            {bio.socialLinks.appleMusic && (
              <a
                href={bio.socialLinks.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                Apple Music
              </a>
            )}
          </div>
        )}
        {bio.contactEmail && (
          <p className="bio-contact">
            Contact: <a href={`mailto:${bio.contactEmail}`}>{bio.contactEmail}</a>
          </p>
        )}
      </div>
      {bio.pressPhotos && bio.pressPhotos.length > 0 && (
        <div className="bio-gallery">
          <h3>Press Photos</h3>
          <div className="gallery-grid">
            {bio.pressPhotos.map((photo, index) => (
              <a
                key={index}
                href={urlFor(photo).width(1200).url()}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-item"
              >
                <img
                  src={urlFor(photo).width(300).height(300).url()}
                  alt={`${bio.name} press photo ${index + 1}`}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ArtistBio
