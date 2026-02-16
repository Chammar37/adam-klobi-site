import { describe, it, expect, vi, beforeAll } from 'vitest'

// We test the unconfigured state by mocking the createClient import
// and verifying the fallback behavior
vi.mock('@sanity/client', () => ({
  createClient: vi.fn(),
}))

vi.mock('@sanity/image-url', () => ({
  default: vi.fn(),
}))

describe('Sanity lib (unconfigured)', () => {
  let sanity

  beforeAll(async () => {
    // With no VITE_SANITY_PROJECT_ID, the module won't call createClient
    // Dynamic import to get fresh module evaluation
    sanity = await import('./sanity.js')
  })

  it('client is null/undefined when not configured', () => {
    expect(sanity.client).toBeFalsy()
  })

  it('urlFor returns undefined for null builder', () => {
    const result = sanity.urlFor({ _type: 'image' })
    expect(result).toBeUndefined()
  })

  it('fetchTourDates returns empty array', async () => {
    const result = await sanity.fetchTourDates()
    expect(result).toEqual([])
  })

  it('fetchLatestRelease returns null', async () => {
    const result = await sanity.fetchLatestRelease()
    expect(result).toBeNull()
  })

  it('fetchSingles returns empty array', async () => {
    const result = await sanity.fetchSingles()
    expect(result).toEqual([])
  })

  it('fetchVideos returns empty array', async () => {
    const result = await sanity.fetchVideos()
    expect(result).toEqual([])
  })
})
