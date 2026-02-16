import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './InteractiveImage.css'

/**
 * Computes coordinate mapping between image space and container space
 * when object-fit: cover is applied. The image is scaled to fill the
 * container and cropped — this hook tracks the offset/scale so hotspot
 * positions can be accurately mapped between the two coordinate systems.
 */
function useCoverTransform(containerRef, imageRef, objectPosition = [50, 50]) {
  const [transform, setTransform] = useState(null)

  const compute = useCallback(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    const contW = container.clientWidth
    const contH = container.clientHeight
    const imgNatW = image.naturalWidth
    const imgNatH = image.naturalHeight

    if (!contW || !contH || !imgNatW || !imgNatH) return

    const contAR = contW / contH
    const imgAR = imgNatW / imgNatH
    const [posX, posY] = objectPosition

    let displayW, displayH, offsetX, offsetY

    if (contAR > imgAR) {
      // Container wider than image → scale by width, crop top/bottom
      displayW = contW
      displayH = contW / imgAR
      offsetX = 0
      offsetY = (displayH - contH) * (posY / 100)
    } else {
      // Container taller than image → scale by height, crop left/right
      displayH = contH
      displayW = contH * imgAR
      offsetX = (displayW - contW) * (posX / 100)
      offsetY = 0
    }

    setTransform({ displayW, displayH, offsetX, offsetY, contW, contH })
  }, [containerRef, imageRef, objectPosition])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(compute)
    observer.observe(container)
    compute()

    return () => observer.disconnect()
  }, [containerRef, compute])

  // Image space % → Container space %
  const toContainer = useCallback((imgX, imgY, imgW = 0, imgH = 0) => {
    if (!transform) return { x: imgX, y: imgY, w: imgW, h: imgH }
    const { displayW, displayH, offsetX, offsetY, contW, contH } = transform
    return {
      x: ((imgX / 100 * displayW - offsetX) / contW) * 100,
      y: ((imgY / 100 * displayH - offsetY) / contH) * 100,
      w: (imgW / 100) * (displayW / contW) * 100,
      h: (imgH / 100) * (displayH / contH) * 100,
    }
  }, [transform])

  // Container px → Image space %
  const toImage = useCallback((contPxX, contPxY) => {
    if (!transform) return null
    const { displayW, displayH, offsetX, offsetY } = transform
    return {
      x: ((contPxX + offsetX) / displayW) * 100,
      y: ((contPxY + offsetY) / displayH) * 100,
    }
  }, [transform])

  return { toContainer, toImage, onImageLoad: compute }
}

/**
 * InteractiveImage - Displays a base image with PNG cutout hotspots overlaid.
 * Uses object-fit: cover to fill the viewport, with coordinate transforms
 * to keep hotspot positions accurate despite image cropping.
 * Uses canvas hit-testing to only trigger interactions on non-transparent pixels.
 */
function InteractiveImage({ baseImage, hotspots = [], logo, mobileItems = [], objectPosition = [50, 50] }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [flickerId, setFlickerId] = useState(null)
  const canvasDataRef = useRef({})
  const preloadedRef = useRef(new Set())
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const navigate = useNavigate()

  // Random TV flicker effect
  useEffect(() => {
    const flickerTarget = hotspots.find(h => h.id === 'tv' && h.hoverImage)
    if (!flickerTarget) return

    let timeout
    const scheduleFlicker = () => {
      const delay = 1000 + Math.random() * 3000
      timeout = setTimeout(() => {
        if (hoveredId !== 'tv') {
          setFlickerId('tv')
          const onDuration = 300 + Math.random() * 500
          setTimeout(() => setFlickerId(null), onDuration)
        }
        scheduleFlicker()
      }, delay)
    }
    scheduleFlicker()

    return () => clearTimeout(timeout)
  }, [hotspots, hoveredId])

  const { toContainer, toImage, onImageLoad } = useCoverTransform(containerRef, imageRef, objectPosition)

  // Load hotspot images into canvas for hit testing
  useEffect(() => {
    hotspots.forEach((hotspot) => {
      if (!hotspot.image) {
        canvasDataRef.current[hotspot.id] = null
      } else {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          ctx.drawImage(img, 0, 0)
          canvasDataRef.current[hotspot.id] = {
            imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
            width: canvas.width,
            height: canvas.height,
          }
        }
        img.src = hotspot.image
      }

      if (hotspot.hoverImage) {
        const hoverImg = new Image()
        hoverImg.src = hotspot.hoverImage
        preloadedRef.current.add(hoverImg)
      }
    })
  }, [hotspots])

  // Check if a point (in image space %) hits an opaque pixel of a hotspot
  const isOpaqueAtPoint = useCallback((hotspot, imgPctX, imgPctY) => {
    const hx = hotspot.position.x
    const hy = hotspot.position.y
    const hw = hotspot.size?.width ?? 0
    const hh = hotspot.size?.height ?? 0

    if (imgPctX < hx || imgPctX > hx + hw || imgPctY < hy || imgPctY > hy + hh) {
      return false
    }

    // Relative position within hotspot (0-1)
    const relX = (imgPctX - hx) / hw
    const relY = (imgPctY - hy) / hh

    const data = canvasDataRef.current[hotspot.id]
    if (data === null || data === undefined) return true

    const pixelX = Math.floor(relX * data.width)
    const pixelY = Math.floor(relY * data.height)

    if (pixelX < 0 || pixelX >= data.width || pixelY < 0 || pixelY >= data.height) {
      return false
    }

    const index = (pixelY * data.width + pixelX) * 4
    return data.imageData.data[index + 3] > 10
  }, [])

  // Find the hotspot with highest priority at a point (image space %)
  const findHotspotAtPoint = useCallback((imgPctX, imgPctY) => {
    let bestHotspot = null
    let bestPriority = -Infinity

    for (const hotspot of hotspots) {
      if (isOpaqueAtPoint(hotspot, imgPctX, imgPctY)) {
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
    const imgPt = toImage(e.clientX - rect.left, e.clientY - rect.top)
    if (!imgPt) return
    const hotspot = findHotspotAtPoint(imgPt.x, imgPt.y)
    setHoveredId(hotspot ? hotspot.id : null)
  }, [findHotspotAtPoint, toImage])

  const handleContainerMouseLeave = useCallback(() => {
    setHoveredId(null)
  }, [])

  const handleContainerClick = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const imgPt = toImage(e.clientX - rect.left, e.clientY - rect.top)
    if (!imgPt) return

    const hotspot = findHotspotAtPoint(imgPt.x, imgPt.y)
    if (!hotspot?.link) return

    if (hotspot.link.startsWith('#')) {
      const section = document.querySelector(hotspot.link)
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    } else if (hotspot.link.startsWith('http')) {
      window.location.href = hotspot.link
    } else {
      navigate(hotspot.link)
    }
  }, [findHotspotAtPoint, navigate, toImage])

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
            width={logo.width}
            height={logo.height}
            className="image-logo"
            draggable={false}
          />
        </a>
      )}

      {/* Base image — object-fit: cover fills the viewport container */}
      <img
        ref={imageRef}
        src={baseImage}
        alt="Interactive scene"
        className="base-image"
        width={5634}
        height={3761}
        draggable={false}
        fetchPriority="high"
        onLoad={onImageLoad}
        style={{ objectPosition: `${objectPosition[0]}% ${objectPosition[1]}%` }}
      />

      {/* PNG Cutout Hotspots — positions mapped from image space to container space */}
      {hotspots.map((hotspot) => {
        const mapped = toContainer(
          hotspot.position.x, hotspot.position.y,
          hotspot.size?.width ?? 0, hotspot.size?.height ?? 0
        )
        return (
          <div
            key={hotspot.id}
            className={`hotspot-wrapper ${hoveredId === hotspot.id ? 'hovered' : ''} ${hotspot.glow ? 'has-glow' : ''} ${hotspot.tilt ? 'has-tilt' : ''} ${hotspot.enlarge ? 'has-enlarge' : ''}`}
            style={{
              left: `${mapped.x}%`,
              top: `${mapped.y}%`,
              width: `${mapped.w}%`,
              height: `${mapped.h}%`,
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
            {(hotspot.image || ((hoveredId === hotspot.id || flickerId === hotspot.id) && hotspot.hoverImage)) && (
              <img
                src={(hoveredId === hotspot.id || flickerId === hotspot.id) && hotspot.hoverImage ? hotspot.hoverImage : hotspot.image}
                alt={hotspot.label}
                width={hotspot.naturalWidth}
                height={hotspot.naturalHeight}
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

          </div>
        )
      })}

      {/* Mobile menu */}
      {mobileItems.length > 0 && (
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-bg">
            <img src={baseImage} alt="" width={5634} height={3761} draggable={false} />
          </div>
          <div className="mobile-menu-logo">
            <img src="/Adam_Klobi_Logo.svg" alt="Adam Klobi" width={557} height={118} draggable={false} />
          </div>
          <div className="mobile-menu-items">
            {mobileItems.map((item) => (
              <Link key={item.label} to={item.link} className="mobile-menu-item">
                <img src={item.image} alt={item.label} width={item.width} height={item.height} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveImage
