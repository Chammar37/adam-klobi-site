import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import TourPage from './TourPage'

vi.mock('../components/TourDates', () => ({
  default: () => <div data-testid="tour-dates">TourDates Mock</div>,
}))

describe('TourPage', () => {
  it('renders signup text', () => {
    renderWithRouter(<TourPage />)
    expect(screen.getByText('SIGN UP TO BE NOTIFIED AS DATES DROP')).toBeInTheDocument()
  })

  it('renders TourDates component', () => {
    renderWithRouter(<TourPage />)
    expect(screen.getByTestId('tour-dates')).toBeInTheDocument()
  })
})
