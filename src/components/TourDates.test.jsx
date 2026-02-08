import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor, cleanup } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import TourDates from './TourDates'
import { mockTourDates } from '../test/mocks/sanity'

vi.mock('../lib/sanity', () => ({
  fetchTourDates: vi.fn(),
}))

import { fetchTourDates } from '../lib/sanity'

describe('TourDates', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows loading state', () => {
    fetchTourDates.mockReturnValue(new Promise(() => {}))
    renderWithRouter(<TourDates />)
    expect(screen.getByText('Loading tour dates...')).toBeInTheDocument()
  })

  it('shows error state', async () => {
    fetchTourDates.mockRejectedValue(new Error('Network error'))
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('Failed to load tour dates')).toBeInTheDocument()
    })
  })

  it('renders nothing when empty', async () => {
    let resolve
    fetchTourDates.mockImplementation(() => new Promise(r => { resolve = r }))
    const { container } = renderWithRouter(<TourDates />)
    expect(screen.getByText('Loading tour dates...')).toBeInTheDocument()
    resolve([])
    await waitFor(() => {
      expect(screen.queryByText('Loading tour dates...')).not.toBeInTheDocument()
    })
    // TourDates returns null for empty array
    expect(container.querySelector('.tour-dates')).not.toBeInTheDocument()
  })

  it('renders venue names', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('The Fillmore')).toBeInTheDocument()
      expect(screen.getByText('Brixton Academy')).toBeInTheDocument()
      expect(screen.getByText('Secret Venue')).toBeInTheDocument()
    })
  })

  it('renders city and country', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('San Francisco, USA')).toBeInTheDocument()
      expect(screen.getByText('London, UK')).toBeInTheDocument()
      expect(screen.getByText('Berlin, Germany')).toBeInTheDocument()
    })
  })

  it('renders formatted month', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('Aug')).toBeInTheDocument()
    })
  })

  it('renders formatted day', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument()
    })
  })

  it('renders formatted year', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      const years = screen.getAllByText('2025')
      expect(years.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders formatted time', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      // The exact format depends on locale, just check something renders in tour-time
      const times = document.querySelectorAll('.tour-time')
      expect(times.length).toBe(3)
    })
  })

  it('renders Get Tickets link for available shows', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      const ticketLink = screen.getByText('Get Tickets')
      expect(ticketLink.closest('a')).toHaveAttribute(
        'href',
        'https://tickets.com/show1'
      )
    })
  })

  it('renders Sold Out badge for sold-out shows', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('Sold Out')).toBeInTheDocument()
    })
  })

  it('renders TBA badge when no ticket URL and not sold out', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('TBA')).toBeInTheDocument()
    })
  })

  it('applies sold-out class to sold-out cards', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('Brixton Academy')).toBeInTheDocument()
    })
    const soldOutCard = screen.getByText('Brixton Academy').closest('.tour-card')
    expect(soldOutCard).toHaveClass('sold-out')
  })

  it('renders show notes when present', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      expect(screen.getByText('Doors at 7pm')).toBeInTheDocument()
    })
  })

  it('ticket link opens in new tab', async () => {
    fetchTourDates.mockResolvedValue(mockTourDates)
    renderWithRouter(<TourDates />)
    await waitFor(() => {
      const ticketLink = screen.getByText('Get Tickets').closest('a')
      expect(ticketLink).toHaveAttribute('target', '_blank')
      expect(ticketLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
