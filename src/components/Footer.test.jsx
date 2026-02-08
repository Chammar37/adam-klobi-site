import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the AK logo', () => {
    renderWithRouter(<Footer />)
    const logo = screen.getByAltText('AK')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/AK_Footer.svg')
  })

  it('renders 6 social links', () => {
    renderWithRouter(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(6)
  })

  it('has Spotify link with correct href', () => {
    renderWithRouter(<Footer />)
    const link = screen.getByLabelText('Spotify')
    expect(link).toHaveAttribute('href', 'https://open.spotify.com/artist/adamklobi')
  })

  it('has Apple Music link with correct href', () => {
    renderWithRouter(<Footer />)
    const link = screen.getByLabelText('Apple Music')
    expect(link).toHaveAttribute('href', 'https://music.apple.com/artist/adamklobi')
  })

  it('has YouTube link with correct href', () => {
    renderWithRouter(<Footer />)
    const link = screen.getByLabelText('YouTube')
    expect(link).toHaveAttribute('href', 'https://youtube.com/@adamklobi')
  })

  it('has TikTok link with correct href', () => {
    renderWithRouter(<Footer />)
    const link = screen.getByLabelText('TikTok')
    expect(link).toHaveAttribute('href', 'https://tiktok.com/@adamklobi')
  })

  it('has Instagram link with correct href', () => {
    renderWithRouter(<Footer />)
    const link = screen.getByLabelText('Instagram')
    expect(link).toHaveAttribute('href', 'https://instagram.com/adam.klobi')
  })

  it('has WhatsApp link with correct href', () => {
    renderWithRouter(<Footer />)
    const link = screen.getByLabelText('WhatsApp')
    expect(link).toHaveAttribute('href', 'https://wa.me/adamklobi')
  })

  it('all social links open in new tab', () => {
    renderWithRouter(<Footer />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  it('all social links have noopener noreferrer', () => {
    renderWithRouter(<Footer />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
