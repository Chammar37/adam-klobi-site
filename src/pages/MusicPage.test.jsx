import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import MusicPage from './MusicPage'

vi.mock('../lib/sanity', () => ({
  fetchLatestRelease: vi.fn(),
  fetchSingles: vi.fn(),
  urlFor: () => ({
    width: () => ({
      url: () => 'https://cdn.sanity.io/mock.jpg',
      height: () => ({ url: () => 'https://cdn.sanity.io/mock.jpg' }),
    }),
  }),
}))

import { fetchLatestRelease, fetchSingles } from '../lib/sanity'

describe('MusicPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state initially', () => {
    fetchLatestRelease.mockReturnValue(new Promise(() => {}))
    fetchSingles.mockReturnValue(new Promise(() => {}))
    renderWithRouter(<MusicPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders release when data loads', async () => {
    fetchLatestRelease.mockResolvedValue({
      _id: 'r1',
      title: 'New Album',
      description: 'Coming soon',
      artwork: { _type: 'image', asset: { _ref: 'img1' } },
      link: 'https://example.com/presave',
    })
    fetchSingles.mockResolvedValue([])
    renderWithRouter(<MusicPage />)
    await waitFor(() => {
      expect(screen.getByText('Coming soon')).toBeInTheDocument()
      expect(screen.getByText('PRE-SAVE')).toBeInTheDocument()
    })
  })

  it('renders singles when data loads', async () => {
    fetchLatestRelease.mockResolvedValue(null)
    fetchSingles.mockResolvedValue([
      {
        _id: 's1',
        title: 'Single One',
        description: 'First single',
        artwork: { _type: 'image', asset: { _ref: 'img2' } },
        link: 'https://example.com/single1',
      },
    ])
    renderWithRouter(<MusicPage />)
    await waitFor(() => {
      expect(screen.getByText('First single')).toBeInTheDocument()
    })
  })
})
