import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../test/test-utils'
import MerchGrid from './MerchGrid'
import { mockMerchItems } from '../test/mocks/sanity'

const mockQuickBuy = vi.fn()

vi.mock('../lib/sanity', () => ({
  fetchMerchItems: vi.fn(),
  urlFor: () => ({
    width: () => ({ height: () => ({ url: () => 'https://cdn.sanity.io/mock-merch.jpg' }) }),
  }),
}))

vi.mock('../lib/shopify', () => ({
  quickBuy: (...args) => mockQuickBuy(...args),
}))

import { fetchMerchItems } from '../lib/sanity'

describe('MerchGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state', () => {
    fetchMerchItems.mockReturnValue(new Promise(() => {}))
    renderWithRouter(<MerchGrid />)
    expect(screen.getByText('Loading merch...')).toBeInTheDocument()
  })

  it('shows error state', async () => {
    fetchMerchItems.mockRejectedValue(new Error('Network error'))
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByText('Failed to load merch')).toBeInTheDocument()
    })
  })

  it('renders nothing when empty', async () => {
    fetchMerchItems.mockResolvedValue([])
    const { container } = renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.queryByText('Loading merch...')).not.toBeInTheDocument()
    })
    expect(container.querySelector('.merch-grid')).not.toBeInTheDocument()
  })

  it('renders item titles', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByText('Tour T-Shirt')).toBeInTheDocument()
      expect(screen.getByText('Vinyl LP')).toBeInTheDocument()
      expect(screen.getByText('Poster')).toBeInTheDocument()
    })
  })

  it('renders item descriptions', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByText('Official tour tee')).toBeInTheDocument()
      expect(screen.getByText('Limited edition vinyl')).toBeInTheDocument()
    })
  })

  it('renders item prices', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByText('$35.00')).toBeInTheDocument()
      expect(screen.getByText('$25.99')).toBeInTheDocument()
      expect(screen.getByText('$15.00')).toBeInTheDocument()
    })
  })

  it('renders item images', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByAltText('Tour T-Shirt')).toBeInTheDocument()
      expect(screen.getByAltText('Vinyl LP')).toBeInTheDocument()
    })
  })

  it('shows Featured badge on featured items', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByText('Featured')).toBeInTheDocument()
    })
    // Only 1 featured badge (merch-1)
    expect(screen.getAllByText('Featured')).toHaveLength(1)
  })

  it('applies featured class to featured items', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByText('Tour T-Shirt')).toBeInTheDocument()
    })
    const cards = document.querySelectorAll('.merch-card')
    expect(cards[0]).toHaveClass('featured')
    expect(cards[1]).not.toHaveClass('featured')
  })

  it('renders Buy Now button for items with shopifyProductId', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      const buttons = screen.getAllByText('Buy Now')
      expect(buttons).toHaveLength(2) // merch-1 and merch-2
    })
  })

  it('does not render Buy Now for items without shopifyProductId', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getByText('Poster')).toBeInTheDocument()
    })
    // Poster (merch-3) has no shopifyProductId
    const posterCard = screen.getByText('Poster').closest('.merch-card')
    expect(posterCard.querySelector('.buy-button')).not.toBeInTheDocument()
  })

  it('calls quickBuy when Buy Now is clicked', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    mockQuickBuy.mockResolvedValue(undefined)
    const user = userEvent.setup()
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getAllByText('Buy Now')).toHaveLength(2)
    })
    await user.click(screen.getAllByText('Buy Now')[0])
    expect(mockQuickBuy).toHaveBeenCalledWith('gid://shopify/Product/1')
  })

  it('disables button during purchase', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    mockQuickBuy.mockReturnValue(new Promise(() => {})) // never resolves
    const user = userEvent.setup()
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getAllByText('Buy Now')).toHaveLength(2)
    })
    await user.click(screen.getAllByText('Buy Now')[0])
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeDisabled()
    })
  })

  it('re-enables button on purchase failure', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    mockQuickBuy.mockRejectedValue(new Error('Checkout failed'))
    const user = userEvent.setup()
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(screen.getAllByText('Buy Now')).toHaveLength(2)
    })
    await user.click(screen.getAllByText('Buy Now')[0])
    await waitFor(() => {
      expect(screen.getAllByText('Buy Now')).toHaveLength(2)
    })
  })

  it('renders merch-grid container', async () => {
    fetchMerchItems.mockResolvedValue(mockMerchItems)
    renderWithRouter(<MerchGrid />)
    await waitFor(() => {
      expect(document.querySelector('.merch-grid')).toBeInTheDocument()
    })
  })
})
