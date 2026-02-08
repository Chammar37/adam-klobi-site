import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import NavMenu from './NavMenu'

describe('NavMenu', () => {
  it('renders the logo image', () => {
    renderWithRouter(<NavMenu />)
    const logo = screen.getByAltText('Adam Klobi')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/Adam_Klobi_Logo.svg')
  })

  it('renders all 6 navigation links', () => {
    renderWithRouter(<NavMenu />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Merch')).toBeInTheDocument()
    expect(screen.getByText('Tour')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Videos')).toBeInTheDocument()
  })

  it('links have correct hrefs', () => {
    renderWithRouter(<NavMenu />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Music').closest('a')).toHaveAttribute('href', '/music')
    expect(screen.getByText('Merch').closest('a')).toHaveAttribute('href', '/merch')
    expect(screen.getByText('Tour').closest('a')).toHaveAttribute('href', '/tour')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about')
    expect(screen.getByText('Videos').closest('a')).toHaveAttribute('href', '/videos')
  })

  it('applies active class to Home on / route', () => {
    renderWithRouter(<NavMenu />, { route: '/' })
    expect(screen.getByText('Home')).toHaveClass('active')
    expect(screen.getByText('Music')).not.toHaveClass('active')
  })

  it('applies active class to Music on /music route', () => {
    renderWithRouter(<NavMenu />, { route: '/music' })
    expect(screen.getByText('Music')).toHaveClass('active')
    expect(screen.getByText('Home')).not.toHaveClass('active')
  })

  it('applies active class to Merch on /merch route', () => {
    renderWithRouter(<NavMenu />, { route: '/merch' })
    expect(screen.getByText('Merch')).toHaveClass('active')
    expect(screen.getByText('Home')).not.toHaveClass('active')
  })

  it('applies active class to Tour on /tour route', () => {
    renderWithRouter(<NavMenu />, { route: '/tour' })
    expect(screen.getByText('Tour')).toHaveClass('active')
    expect(screen.getByText('Home')).not.toHaveClass('active')
  })

  it('applies active class to About on /about route', () => {
    renderWithRouter(<NavMenu />, { route: '/about' })
    expect(screen.getByText('About')).toHaveClass('active')
    expect(screen.getByText('Home')).not.toHaveClass('active')
  })

  it('applies active class to Videos on /videos route', () => {
    renderWithRouter(<NavMenu />, { route: '/videos' })
    expect(screen.getByText('Videos')).toHaveClass('active')
    expect(screen.getByText('Home')).not.toHaveClass('active')
  })

  it('only one link is active at a time', () => {
    renderWithRouter(<NavMenu />, { route: '/music' })
    const links = screen.getAllByRole('link').filter((l) => l.closest('.nav-links'))
    const activeLinks = links.filter((l) => l.classList.contains('active'))
    expect(activeLinks).toHaveLength(1)
  })

  it('logo links to home page', () => {
    renderWithRouter(<NavMenu />)
    const logoLink = screen.getByAltText('Adam Klobi').closest('a')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
