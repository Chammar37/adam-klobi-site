import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './InteractiveImage.css'

/**
 * InteractiveImage - Displays a base image with PNG cutout hotspots overlaid
 * Uses canvas hit-testing to only trigger interactions on non-transparent pixels
 */
function InteractiveImage({ baseImage, hotspots = [], logo }) {
  const [hoveredId, setHoveredId] = useState(null)
  const canvasDataRef = useRef({}) // Stores ImageData for each hotspot
  const containerRef = useRef(null)
  const navigate = useNavigate()

  // Load hotspot images into canvas for hit testing
  useEffect(() => {
    hotspots.forEach((hotspot) => {
      // If no image, use region-based detection (entire area is clickable)
      if (!hotspot.image) {
        canvasDataRef.current[hotspot.id] = null // Mark as region-based
      } else {
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
        // Use the main image for hit testing (default state)
        img.src = hotspot.image
      }

      // Preload hover image if it exists (so it appears instantly on hover)
      if (hotspot.hoverImage) {
        const hoverImg = new Image()
        hoverImg.src = hotspot.hoverImage
      }
    })
  }, [hotspots])

  // Check if a point is on a non-transparent pixel for a hotspot
  const isOpaqueAtPoint = useCallback((hotspot, containerX, containerY, containerWidth, containerHeight) => {
    // Check if point is within hotspot bounds
    const hotspotLeft = (hotspot.position.x / 100) * containerWidth
    const hotspotTop = (hotspot.position.y / 100) * containerHeight
    const hotspotWidth = hotspot.size ? (hotspot.size.width / 100) * containerWidth : 0
    const hotspotHeight = hotspot.size ? (hotspot.size.height / 100) * containerHeight : 0

    // Check bounds
    if (containerX < hotspotLeft || containerX > hotspotLeft + hotspotWidth ||
        containerY < hotspotTop || containerY > hotspotTop + hotspotHeight) {
      return false
    }

    // Get relative position within hotspot
    const relativeX = containerX - hotspotLeft
    const relativeY = containerY - hotspotTop

    const data = canvasDataRef.current[hotspot.id]
    // If null, it's a region-based hotspot (entire area is clickable)
    // If undefined, image hasn't loaded yet (fallback to clickable)
    if (data === null || data === undefined) return true

    // Convert to image pixel coords
    const pixelX = Math.floor((relativeX / hotspotWidth) * data.width)
    const pixelY = Math.floor((relativeY / hotspotHeight) * data.height)

    // Bounds check
    if (pixelX < 0 || pixelX >= data.width || pixelY < 0 || pixelY >= data.height) {
      return false
    }

    // Get alpha value (4th byte in RGBA)
    const index = (pixelY * data.width + pixelX) * 4
    const alpha = data.imageData.data[index + 3]

    return alpha > 10
  }, [])

  // Find the hotspot with highest priority that has an opaque pixel at the given point
  // Uses 'priority' for event handling (defaults to zIndex, then 0)
  const findHotspotAtPoint = useCallback((containerX, containerY, containerWidth, containerHeight) => {
    let bestHotspot = null
    let bestPriority = -Infinity

    for (const hotspot of hotspots) {
      if (isOpaqueAtPoint(hotspot, containerX, containerY, containerWidth, containerHeight)) {
        const priority = hotspot.priority ?? hotspot.zIndex ?? 0
        if (priority > bestPriority) {
          bestPriority = priority
          bestHotspot = hotspot
        }
      }
    }

    return bestHotspot
  }, [hotspots, isOpaqueAtPoint])

  const handleContainerMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const hotspot = findHotspotAtPoint(x, y, rect.width, rect.height)
    setHoveredId(hotspot ? hotspot.id : null)
  }, [findHotspotAtPoint])

  const handleContainerMouseLeave = useCallback(() => {
    setHoveredId(null)
  }, [])

  const handleContainerClick = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const hotspot = findHotspotAtPoint(x, y, rect.width, rect.height)
    if (!hotspot) return

    if (hotspot.link) {
      if (hotspot.link.startsWith('#')) {
        // Hash link - scroll to section
        const section = document.querySelector(hotspot.link)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (hotspot.link.startsWith('http')) {
        // External URL
        window.location.href = hotspot.link
      } else {
        // Internal route - use React Router
        navigate(hotspot.link)
      }
    }
  }, [findHotspotAtPoint, navigate])

  return (
    <div
      ref={containerRef}
      className="interactive-image-container"
      onMouseMove={handleContainerMouseMove}
      onMouseLeave={handleContainerMouseLeave}
      onClick={handleContainerClick}
    >
      {/* Logo */}
      {logo && (
        <a href={logo.href} className="image-logo-link">
          <img
            src={logo.src}
            alt={logo.alt || 'Logo'}
            className="image-logo"
            draggable={false}
          />
        </a>
      )}

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
          className={`hotspot-wrapper ${hoveredId === hotspot.id ? 'hovered' : ''} ${hotspot.glow ? 'has-glow' : ''} ${hotspot.tilt ? 'has-tilt' : ''} ${hotspot.enlarge ? 'has-enlarge' : ''}`}
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
            ...(hotspot.zIndex !== undefined && {
              zIndex: hotspot.zIndex,
            }),
            pointerEvents: 'none',
          }}
          aria-label={hotspot.label}
        >
          {/* Show image: hoverImage when hovered, otherwise default image (if exists) */}
          {(hotspot.image || (hoveredId === hotspot.id && hotspot.hoverImage)) && (
            <img
              src={hoveredId === hotspot.id && hotspot.hoverImage ? hotspot.hoverImage : hotspot.image}
              alt={hotspot.label}
              className={`hotspot-image ${hotspot.hoverImageSize ? 'custom-size' : ''}`}
              style={
                hoveredId === hotspot.id && hotspot.hoverImageSize
                  ? {
                      width: `${hotspot.hoverImageSize.width}%`,
                      height: `${hotspot.hoverImageSize.height}%`,
                      ...(hotspot.hoverImagePosition && {
                        position: 'absolute',
                        left: `${hotspot.hoverImagePosition.x}%`,
                        top: `${hotspot.hoverImagePosition.y}%`,
                      }),
                    }
                  : undefined
              }
              draggable={false}
            />
          )}

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
