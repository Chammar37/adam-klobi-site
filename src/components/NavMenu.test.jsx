import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
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

  // Hamburger is CSS-hidden on desktop (display: none outside ≤816px media query),
  // so getByRole won't find it in jsdom. Use querySelector for DOM structure tests.
  describe('hamburger menu', () => {
    it('renders a hamburger button in the DOM', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      const btn = document.querySelector('.hamburger')
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveAttribute('aria-label', 'Open menu')
    })

    it('hamburger has aria-expanded false when closed', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      const btn = document.querySelector('.hamburger')
      expect(btn).toHaveAttribute('aria-expanded', 'false')
    })

    it('opens mobile overlay when hamburger is clicked', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      expect(document.querySelector('.mobile-nav-overlay')).toBeInTheDocument()
      expect(document.querySelector('.hamburger')).toHaveAttribute('aria-label', 'Close menu')
    })

    it('hamburger has aria-expanded true when open', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      expect(document.querySelector('.hamburger')).toHaveAttribute('aria-expanded', 'true')
    })

    it('closes overlay when X is clicked', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      expect(document.querySelector('.mobile-nav-overlay')).toBeInTheDocument()
      fireEvent.click(document.querySelector('.hamburger'))
      expect(document.querySelector('.mobile-nav-overlay')).not.toBeInTheDocument()
    })

    it('mobile overlay contains 5 menu items (no Home)', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      const items = document.querySelectorAll('.mobile-nav-item')
      expect(items).toHaveLength(5)
      const labels = Array.from(items).map((el) => el.querySelector('span').textContent)
      expect(labels).toEqual(['Music', 'Merch', 'Tour', 'Videos', 'About'])
      expect(labels).not.toContain('Home')
    })

    it('mobile menu items have images', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      const items = document.querySelectorAll('.mobile-nav-item')
      items.forEach((item) => {
        expect(item.querySelector('img')).toBeInTheDocument()
      })
    })

    it('mobile menu items have correct links', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      const links = document.querySelectorAll('.mobile-nav-overlay a')
      const hrefs = Array.from(links).map((a) => a.getAttribute('href'))
      expect(hrefs).toEqual(['/music', '/merch', '/tour', '/videos', '/about'])
    })

    it('locks body scroll when menu is open', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('unlocks body scroll when menu is closed', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      fireEvent.click(document.querySelector('.hamburger'))
      fireEvent.click(document.querySelector('.hamburger'))
      expect(document.body.style.overflow).toBe('')
    })

    it('adds nav-menu--home class on home route', () => {
      renderWithRouter(<NavMenu />, { route: '/' })
      expect(document.querySelector('.nav-menu--home')).toBeInTheDocument()
    })

    it('does not add nav-menu--home class on non-home routes', () => {
      renderWithRouter(<NavMenu />, { route: '/music' })
      expect(document.querySelector('.nav-menu--home')).not.toBeInTheDocument()
    })

    it('hamburger is inside nav-menu--home on home page (CSS hides it)', () => {
      renderWithRouter(<NavMenu />, { route: '/' })
      const btn = document.querySelector('.hamburger')
      expect(btn.closest('.nav-menu--home')).not.toBeNull()
    })
  })
})
