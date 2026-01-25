import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// Query helpers
export const fetchSongs = async () => {
  return client.fetch(`
    *[_type == "song"] | order(releaseDate desc) {
      _id,
      title,
      artwork,
      releaseDate,
      spotifyUrl,
      appleMusicUrl,
      youtubeUrl,
      soundcloudUrl,
      featured
    }
  `)
}

export const fetchFeaturedSongs = async () => {
  return client.fetch(`
    *[_type == "song" && featured == true] | order(releaseDate desc) {
      _id,
      title,
      artwork,
      releaseDate,
      spotifyUrl,
      appleMusicUrl,
      youtubeUrl,
      soundcloudUrl
    }
  `)
}

export const fetchTourDates = async () => {
  return client.fetch(`
    *[_type == "tourDate" && date >= now()] | order(date asc) {
      _id,
      venue,
      city,
      country,
      date,
      ticketUrl,
      soldOut,
      notes
    }
  `)
}

export const fetchMerchItems = async () => {
  return client.fetch(`
    *[_type == "merchItem"] | order(featured desc) {
      _id,
      title,
      image,
      price,
      shopifyProductId,
      description,
      featured
    }
  `)
}

export const fetchArtistBio = async () => {
  return client.fetch(`
    *[_type == "artistBio"][0] {
      _id,
      name,
      bio,
      pressPhoto,
      pressPhotos,
      contactEmail,
      socialLinks
    }
  `)
}

export const fetchSiteImages = async (location) => {
  const query = location
    ? `*[_type == "siteImage" && location == $location]`
    : `*[_type == "siteImage"]`

  return client.fetch(query, { location })
}
