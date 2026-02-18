import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavMenu.css'

const MOBILE_MENU_ITEMS = [
  { label: 'Music', link: '/music', image: '/mobile/mobile_disc 1.webp', width: 165, height: 161 },
  { label: 'Merch', link: '/merch', image: '/mobile/mobile_computer 1.webp', width: 213, height: 214 },
  { label: 'Tour', link: '/tour', image: '/mobile/mobile_globe 1.webp', width: 141, height: 182 },
  { label: 'Videos', link: '/videos', image: '/mobile/mobile_vhs 1.webp', width: 203, height: 116 },
  { label: 'About', link: '/about', image: '/mobile/mobile_phone 1.webp', width: 361, height: 214 },
]

function NavMenu() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <nav className={`nav-menu${pathname === '/' ? ' nav-menu--home' : ''}`}>
      <Link to="/" className={`nav-logo${isOpen ? ' nav-logo--hidden' : ''}`}>
        <img src="/ak_logo.svg" alt="Adam Klobi" width={557} height={118} />
      </Link>
      <ul className="nav-links">
        <li><Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/music" className={pathname === '/music' ? 'active' : ''}>Music</Link></li>
        <li><Link to="/merch" className={pathname === '/merch' ? 'active' : ''}>Merch</Link></li>
        <li><Link to="/tour" className={pathname === '/tour' ? 'active' : ''}>Tour</Link></li>
        <li><Link to="/videos" className={pathname === '/videos' ? 'active' : ''}>Videos</Link></li>
        <li><Link to="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
      </ul>

      <button
        className={`hamburger${isOpen ? ' hamburger--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>

      {isOpen && (
        <div className="mobile-nav-overlay">
          <div className="mobile-nav-logo">
            <img src="/ak_logo.svg" alt="Adam Klobi" width={557} height={118} />
          </div>
          <div className="mobile-nav-items">
            {MOBILE_MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className={`mobile-nav-item${pathname === item.link ? ' active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.image && (
                  <img src={item.image} alt={item.label} width={item.width} height={item.height} />
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavMenu
