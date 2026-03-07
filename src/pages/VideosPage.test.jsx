import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import VideosPage from './VideosPage'

vi.mock('../lib/sanity', () => ({
  fetchVideos: vi.fn(),
}))

import { fetchVideos } from '../lib/sanity'

describe('VideosPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders page title', () => {
    fetchVideos.mockReturnValue(new Promise(() => {}))
    renderWithRouter(<VideosPage />)
    expect(
      screen.getByRole('heading', { name: 'Videos', level: 1 })
    ).toBeInTheDocument()
  })

  it('renders empty state when no videos are returned', async () => {
    fetchVideos.mockResolvedValue([])
    renderWithRouter(<VideosPage />)
    await waitFor(() => {
      expect(screen.getByText('No videos yet. Check back soon!')).toBeInTheDocument()
    })
  })
})
