import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const isConfigured = projectId && /^[a-z0-9]+$/.test(projectId)

if (!isConfigured && import.meta.env.DEV) {
  console.warn(
    '[Sanity] CMS not configured. Set VITE_SANITY_PROJECT_ID in .env to enable CMS features.'
  )
}

export const client = isConfigured
  ? createClient({
      projectId,
      dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export const urlFor = (source) => builder?.image(source)

// Query helpers
export const fetchTourDates = async () => {
  if (!client) return []
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

export const fetchLatestRelease = async () => {
  if (!client) return null
  return client.fetch(`
    *[_type == "release" && latest == true][0] {
      _id,
      title,
      description,
      artwork,
      supportingImage,
      link,
      buttonLabel,
      releaseDate
    }
  `)
}

export const fetchSingles = async () => {
  if (!client) return []
  return client.fetch(`
    *[_type == "single"] | order(releaseDate desc) {
      _id,
      title,
      description,
      artwork,
      link,
      buttonLabel,
      releaseDate
    }
  `)
}

export const fetchVideos = async () => {
  if (!client) return []
  return client.fetch(`
    *[_type == "video"] | order(publishedAt desc) {
      _id,
      title,
      youtubeUrl,
      publishedAt,
      featured
    }
  `)
}

