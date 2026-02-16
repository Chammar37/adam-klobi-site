import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import AboutPage from './AboutPage'

describe('AboutPage', () => {
  it('renders bio text', () => {
    renderWithRouter(<AboutPage />)
    expect(screen.getByText(/I'm Adam Klobi/i)).toBeInTheDocument()
  })

  it('renders contact email link', () => {
    renderWithRouter(<AboutPage />)
    const link = screen.getByText('contact@adamklobi.com')
    expect(link.closest('a')).toHaveAttribute('href', 'mailto:contact@adamklobi.com')
  })

  it('renders text message link', () => {
    renderWithRouter(<AboutPage />)
    const link = screen.getByText('555740382')
    expect(link.closest('a')).toHaveAttribute('href', 'sms:555740382')
  })
})
