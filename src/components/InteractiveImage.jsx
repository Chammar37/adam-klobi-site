import { useState, useEffect, useRef, useCallback } from 'react'
import './InteractiveImage.css'

/**
 * InteractiveImage - Displays a base image with PNG cutout hotspots overlaid
 * Uses canvas hit-testing to only trigger interactions on non-transparent pixels
 */
function InteractiveImage({ baseImage, hotspots = [] }) {
  const [hoveredId, setHoveredId] = useState(null)
  const canvasDataRef = useRef({}) // Stores ImageData for each hotspot

  // Load hotspot images into canvas for hit testing
  useEffect(() => {
    hotspots.forEach((hotspot) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0)

        // Store the image data for hit testing
        canvasDataRef.current[hotspot.id] = {
          imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
          width: canvas.width,
          height: canvas.height,
        }
      }
      img.src = hotspot.image
    })
  }, [hotspots])

  // Check if a point (relative to element) is on a non-transparent pixel
  const isOpaqueAt = useCallback((hotspotId, relativeX, relativeY, elementWidth, elementHeight) => {
    const data = canvasDataRef.current[hotspotId]
    if (!data) return true // Fallback to clickable if not loaded yet

    // Convert element-relative coords to image pixel coords
    const pixelX = Math.floor((relativeX / elementWidth) * data.width)
    const pixelY = Math.floor((relativeY / elementHeight) * data.height)

    // Bounds check
    if (pixelX < 0 || pixelX >= data.width || pixelY < 0 || pixelY >= data.height) {
      return false
    }

    // Get alpha value (4th byte in RGBA)
    const index = (pixelY * data.width + pixelX) * 4
    const alpha = data.imageData.data[index + 3]

    // Consider opaque if alpha > 10 (small threshold for anti-aliasing)
    return alpha > 10
  }, [])

  const getRelativeCoords = (e, element) => {
    const rect = element.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    }
  }

  const handleMouseMove = (e, hotspot) => {
    const { x, y, width, height } = getRelativeCoords(e, e.currentTarget)
    const isOpaque = isOpaqueAt(hotspot.id, x, y, width, height)

    if (isOpaque && hoveredId !== hotspot.id) {
      setHoveredId(hotspot.id)
    } else if (!isOpaque && hoveredId === hotspot.id) {
      setHoveredId(null)
    }
  }

  const handleMouseLeave = () => {
    setHoveredId(null)
  }

  const handleClick = (e, hotspot) => {
    const { x, y, width, height } = getRelativeCoords(e, e.currentTarget)
    const isOpaque = isOpaqueAt(hotspot.id, x, y, width, height)

    if (!isOpaque) return // Ignore clicks on transparent areas

    if (hotspot.link) {
      if (hotspot.link.startsWith('#')) {
        const section = document.querySelector(hotspot.link)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.location.href = hotspot.link
      }
    }
  }

  return (
    <div className="interactive-image-container">
      {/* Base image */}
      <img
        src={baseImage}
        alt="Interactive scene"
        className="base-image"
        draggable={false}
      />

      {/* PNG Cutout Hotspots */}
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className={`hotspot-wrapper ${hoveredId === hotspot.id ? 'hovered' : ''} ${hotspot.glow ? 'has-glow' : ''}`}
          style={{
            left: `${hotspot.position.x}%`,
            top: `${hotspot.position.y}%`,
            ...(hotspot.size && {
              width: `${hotspot.size.width}%`,
              height: `${hotspot.size.height}%`,
            }),
            ...(hotspot.glow && {
              '--glow-color': hotspot.glow,
            }),
          }}
          onMouseMove={(e) => handleMouseMove(e, hotspot)}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => handleClick(e, hotspot)}
          role="button"
          tabIndex={0}
          aria-label={hotspot.label}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick(e, hotspot)
            }
          }}
        >
          <img
            src={hotspot.image}
            alt={hotspot.label}
            className="hotspot-image"
            draggable={false}
          />

          {/* Label shown on hover */}
          {hoveredId === hotspot.id && (
            <span className="hotspot-label">{hotspot.label}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default InteractiveImage
