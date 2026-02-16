import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import InteractiveImage from './InteractiveImage'

// jsdom doesn't have ResizeObserver — without real dimensions,
// useCoverTransform's `transform` stays null and toContainer
// returns raw image-space values as a passthrough fallback.
// This is by design (see VIEWPORT-IMAGE-ARCHITECTURE.md).
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock canvas-related APIs
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  drawImage: vi.fn(),
  getImageData: vi.fn(() => ({
    data: new Uint8ClampedArray(4),
  })),
}))

// Matches the active hotspots in App.jsx
const mockHotspots = [
  {
    id: 'tv',
    label: 'Videos',
    image: '/hotspots/tv/tv off_.webp',
    hoverImage: '/hotspots/tv/tv on.webp',
    position: { x: 5, y: 48 },
    size: { width: 10, height: 15 },
    link: '/videos',
    zIndex: 5,
    priority: 20,
    glow: '#ffffff',
  },
  {
    id: 'computer',
    label: 'Merch',
    image: '/hotspots/computer/computer off.webp',
    hoverImage: '/hotspots/computer/computer on.webp',
    position: { x: 80, y: 30 },
    size: { width: 12, height: 18 },
    link: '/merch',
    glow: '#ffffff',
  },
  {
    id: 'cd-tower',
    label: 'Music',
    image: '/hotspots/CD tower.webp',
    position: { x: 45, y: 32.5 },
    size: { width: 10, height: 20 },
    link: '/music',
    glow: '#ffffff',
  },
  {
    id: 'silver-camera',
    label: 'About',
    image: '/hotspots/camera/silver_cam.webp',
    hoverImage: '/hotspots/camera/silver_cam_on.webp',
    position: { x: 24, y: 39 },
    size: { width: 6, height: 7 },
    link: '/about',
    glow: '#ffffff',
  },
]

describe('InteractiveImage', () => {
  it('renders the base image with object-position', () => {
    renderWithRouter(
      <InteractiveImage baseImage="/base-image.webp" hotspots={[]} objectPosition={[50, 35]} />
    )
    const img = screen.getByAltText('Interactive scene')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/base-image.webp')
    expect(img.style.objectPosition).toBe('50% 35%')
  })

  it('renders hotspot wrappers for each hotspot', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    expect(wrappers).toHaveLength(4)
  })

  // In jsdom, transform is null so toContainer returns raw image-space values
  it('positions hotspots as passthrough when transform is unavailable', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    // TV hotspot: x:5, y:48
    expect(wrappers[0].style.left).toBe('5%')
    expect(wrappers[0].style.top).toBe('48%')
    // Computer hotspot: x:80, y:30
    expect(wrappers[1].style.left).toBe('80%')
    expect(wrappers[1].style.top).toBe('30%')
  })

  it('sizes hotspots using percentage width/height', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    // TV: w:10, h:15
    expect(wrappers[0].style.width).toBe('10%')
    expect(wrappers[0].style.height).toBe('15%')
    // Computer: w:12, h:18
    expect(wrappers[1].style.width).toBe('12%')
    expect(wrappers[1].style.height).toBe('18%')
  })

  it('sets aria-label on hotspot wrappers', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    expect(screen.getByLabelText('Videos')).toBeInTheDocument()
    expect(screen.getByLabelText('Merch')).toBeInTheDocument()
    expect(screen.getByLabelText('Music')).toBeInTheDocument()
    expect(screen.getByLabelText('About')).toBeInTheDocument()
  })

  it('applies has-glow class to all hotspots with glow', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const glowWrappers = document.querySelectorAll('.hotspot-wrapper.has-glow')
    expect(glowWrappers).toHaveLength(4)
  })

  it('sets --glow-color CSS variable', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const tvWrapper = screen.getByLabelText('Videos')
    expect(tvWrapper.style.getPropertyValue('--glow-color')).toBe('#ffffff')
  })

  it('sets zIndex when specified', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const tvWrapper = screen.getByLabelText('Videos')
    expect(tvWrapper.style.zIndex).toBe('5')
  })

  it('renders hotspot images', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const images = screen.getAllByRole('img')
    // base image + 4 hotspot images
    expect(images).toHaveLength(5)
  })

  it('renders logo when provided', () => {
    const logo = { src: '/Adam_Klobi_Logo.svg', alt: 'Logo', href: '/' }
    renderWithRouter(
      <InteractiveImage baseImage="/base-image.webp" hotspots={[]} logo={logo} />
    )
    const logoImg = screen.getByAltText('Logo')
    expect(logoImg).toBeInTheDocument()
    expect(logoImg).toHaveAttribute('src', '/Adam_Klobi_Logo.svg')
  })

  it('does not render logo when not provided', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={[]} />)
    expect(document.querySelector('.image-logo')).not.toBeInTheDocument()
  })

  it('sets pointerEvents none on hotspot wrappers', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    wrappers.forEach((wrapper) => {
      expect(wrapper.style.pointerEvents).toBe('none')
    })
  })

  it('renders mobile menu when mobileItems provided', () => {
    const mobileItems = [
      { image: '/mobile/disc.webp', label: 'Music', link: '/music' },
      { image: '/mobile/globe.webp', label: 'Tour', link: '/tour' },
    ]
    renderWithRouter(
      <InteractiveImage baseImage="/base-image.webp" hotspots={[]} mobileItems={mobileItems} />
    )
    const items = document.querySelectorAll('.mobile-menu-item')
    expect(items).toHaveLength(2)
    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Tour')).toBeInTheDocument()
  })

  it('does not render mobile menu when no mobileItems', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.webp" hotspots={[]} />)
    expect(document.querySelector('.mobile-menu')).not.toBeInTheDocument()
  })
})
