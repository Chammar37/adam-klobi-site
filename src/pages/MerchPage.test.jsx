import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import MerchPage from './MerchPage'

describe('MerchPage', () => {
  it('renders signup text', () => {
    renderWithRouter(<MerchPage />)
    expect(screen.getByText('SIGN UP FOR MERCH UPDATES')).toBeInTheDocument()
  })
})
