import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/test-utils'
import InteractiveImage from './InteractiveImage'

// Mock canvas-related APIs
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  drawImage: vi.fn(),
  getImageData: vi.fn(() => ({
    data: new Uint8ClampedArray(4),
  })),
}))

const mockHotspots = [
  {
    id: 'guitar-case',
    label: 'Music',
    image: '/hotspots/guitar_test.png',
    position: { x: 2, y: 48.5 },
    size: { width: 42, height: 49 },
    glow: '#0054ff',
    link: '/music',
    zIndex: 10,
    enlarge: true,
  },
  {
    id: 'glob',
    label: 'Tour',
    image: '/hotspots/glob.png',
    position: { x: 66.3, y: 21.3 },
    size: { width: 17.5, height: 28 },
    link: '/tour',
  },
  {
    id: 'tv',
    label: 'TV',
    image: '/hotspots/tv/tv off_.png',
    hoverImage: '/hotspots/tv/tv on.png',
    position: { x: 5, y: 48 },
    size: { width: 10, height: 15 },
    link: '#tv',
    zIndex: 5,
  },
]

describe('InteractiveImage', () => {
  it('renders the base image', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={[]} />)
    const img = screen.getByAltText('Interactive scene')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/base-image.jpg')
  })

  it('renders hotspot wrappers for each hotspot', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    expect(wrappers).toHaveLength(3)
  })

  it('positions hotspots using percentage left/top', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    expect(wrappers[0].style.left).toBe('2%')
    expect(wrappers[0].style.top).toBe('48.5%')
  })

  it('sizes hotspots using percentage width/height', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    expect(wrappers[0].style.width).toBe('42%')
    expect(wrappers[0].style.height).toBe('49%')
  })

  it('sets aria-label on hotspot wrappers', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    expect(screen.getByLabelText('Music')).toBeInTheDocument()
    expect(screen.getByLabelText('Tour')).toBeInTheDocument()
    expect(screen.getByLabelText('TV')).toBeInTheDocument()
  })

  it('applies has-glow class when glow is set', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const guitarWrapper = screen.getByLabelText('Music')
    expect(guitarWrapper).toHaveClass('has-glow')
    const globWrapper = screen.getByLabelText('Tour')
    expect(globWrapper).not.toHaveClass('has-glow')
  })

  it('applies has-enlarge class when enlarge is set', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const guitarWrapper = screen.getByLabelText('Music')
    expect(guitarWrapper).toHaveClass('has-enlarge')
    const globWrapper = screen.getByLabelText('Tour')
    expect(globWrapper).not.toHaveClass('has-enlarge')
  })

  it('sets --glow-color CSS variable', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const guitarWrapper = screen.getByLabelText('Music')
    expect(guitarWrapper.style.getPropertyValue('--glow-color')).toBe('#0054ff')
  })

  it('sets zIndex when specified', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const guitarWrapper = screen.getByLabelText('Music')
    expect(guitarWrapper.style.zIndex).toBe('10')
  })

  it('renders hotspot images', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const images = screen.getAllByRole('img')
    // base image + 3 hotspot images
    expect(images.length).toBeGreaterThanOrEqual(4)
  })

  it('renders logo when provided', () => {
    const logo = { src: '/Adam_Klobi_Logo.svg', alt: 'Logo', href: '/' }
    renderWithRouter(
      <InteractiveImage baseImage="/base-image.jpg" hotspots={[]} logo={logo} />
    )
    const logoImg = screen.getByAltText('Logo')
    expect(logoImg).toBeInTheDocument()
    expect(logoImg).toHaveAttribute('src', '/Adam_Klobi_Logo.svg')
  })

  it('does not render logo when not provided', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={[]} />)
    expect(document.querySelector('.image-logo')).not.toBeInTheDocument()
  })

  it('sets pointerEvents none on hotspot wrappers', () => {
    renderWithRouter(<InteractiveImage baseImage="/base-image.jpg" hotspots={mockHotspots} />)
    const wrappers = document.querySelectorAll('.hotspot-wrapper')
    wrappers.forEach((wrapper) => {
      expect(wrapper.style.pointerEvents).toBe('none')
    })
  })
})
