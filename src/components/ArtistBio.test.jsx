import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import ArtistBio from './ArtistBio'
import { mockArtistBio } from '../test/mocks/sanity'

vi.mock('../lib/sanity', () => ({
  fetchArtistBio: vi.fn(),
  urlFor: () => ({
    width: (w) => ({
      height: (h) => ({ url: () => `https://cdn.sanity.io/mock-${w}x${h}.jpg` }),
      url: () => `https://cdn.sanity.io/mock-${w}.jpg`,
    }),
  }),
}))

vi.mock('@portabletext/react', () => ({
  PortableText: ({ value }) => (
    <div data-testid="portable-text">
      {value?.map((block) =>
        block.children?.map((child) => (
          <span key={child._key}>{child.text}</span>
        ))
      )}
    </div>
  ),
}))

import { fetchArtistBio } from '../lib/sanity'

describe('ArtistBio', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state', () => {
    fetchArtistBio.mockReturnValue(new Promise(() => {}))
    renderWithRouter(<ArtistBio />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows error state', async () => {
    fetchArtistBio.mockRejectedValue(new Error('Network error'))
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Failed to load bio')).toBeInTheDocument()
    })
  })

  it('renders nothing when bio is null', async () => {
    fetchArtistBio.mockResolvedValue(null)
    const { container } = renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    expect(container.querySelector('.artist-bio')).not.toBeInTheDocument()
  })

  it('renders artist name', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Adam Klobi')).toBeInTheDocument()
    })
  })

  it('renders press photo', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      const photo = screen.getByAltText('Adam Klobi')
      expect(photo).toBeInTheDocument()
    })
  })

  it('renders bio text via PortableText', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Adam Klobi is a musician.')).toBeInTheDocument()
    })
  })

  it('renders Instagram social link', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      const link = screen.getByText('Instagram').closest('a')
      expect(link).toHaveAttribute('href', 'https://instagram.com/adam.klobi')
    })
  })

  it('renders X/Twitter social link', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      const link = screen.getByText('X/Twitter').closest('a')
      expect(link).toHaveAttribute('href', 'https://twitter.com/adamklobi')
    })
  })

  it('renders TikTok social link', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('TikTok').closest('a')).toHaveAttribute(
        'href',
        'https://tiktok.com/@adamklobi'
      )
    })
  })

  it('renders YouTube social link', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('YouTube').closest('a')).toHaveAttribute(
        'href',
        'https://youtube.com/@adamklobi'
      )
    })
  })

  it('renders Spotify social link', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Spotify').closest('a')).toHaveAttribute(
        'href',
        'https://open.spotify.com/artist/adamklobi'
      )
    })
  })

  it('renders Apple Music social link', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Apple Music').closest('a')).toHaveAttribute(
        'href',
        'https://music.apple.com/artist/adamklobi'
      )
    })
  })

  it('renders contact email mailto link', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      const link = screen.getByText('adam@klobi.com').closest('a')
      expect(link).toHaveAttribute('href', 'mailto:adam@klobi.com')
    })
  })

  it('renders press photo gallery', async () => {
    fetchArtistBio.mockResolvedValue(mockArtistBio)
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Press Photos')).toBeInTheDocument()
      const galleryItems = document.querySelectorAll('.gallery-item')
      expect(galleryItems).toHaveLength(2)
    })
  })

  it('handles partial data - no socialLinks', async () => {
    fetchArtistBio.mockResolvedValue({
      ...mockArtistBio,
      socialLinks: null,
    })
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Adam Klobi')).toBeInTheDocument()
    })
    expect(screen.queryByText('Instagram')).not.toBeInTheDocument()
  })

  it('handles partial data - no contactEmail', async () => {
    fetchArtistBio.mockResolvedValue({
      ...mockArtistBio,
      contactEmail: null,
    })
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Adam Klobi')).toBeInTheDocument()
    })
    expect(screen.queryByText('Contact:')).not.toBeInTheDocument()
  })

  it('handles partial data - no pressPhoto', async () => {
    fetchArtistBio.mockResolvedValue({
      ...mockArtistBio,
      pressPhoto: null,
    })
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Adam Klobi')).toBeInTheDocument()
    })
    expect(document.querySelector('.bio-photo')).not.toBeInTheDocument()
  })

  it('handles partial data - no pressPhotos gallery', async () => {
    fetchArtistBio.mockResolvedValue({
      ...mockArtistBio,
      pressPhotos: null,
    })
    renderWithRouter(<ArtistBio />)
    await waitFor(() => {
      expect(screen.getByText('Adam Klobi')).toBeInTheDocument()
    })
    expect(screen.queryByText('Press Photos')).not.toBeInTheDocument()
  })
})
