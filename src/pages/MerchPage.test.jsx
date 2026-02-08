import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import MerchPage from './MerchPage'

vi.mock('../components/MerchGrid', () => ({
  default: () => <div data-testid="merch-grid">MerchGrid Mock</div>,
}))

describe('MerchPage', () => {
  it('renders Merch title', () => {
    renderWithRouter(<MerchPage />)
    expect(screen.getByText('Merch')).toBeInTheDocument()
  })

  it('renders MerchGrid component', () => {
    renderWithRouter(<MerchPage />)
    expect(screen.getByTestId('merch-grid')).toBeInTheDocument()
  })
})
