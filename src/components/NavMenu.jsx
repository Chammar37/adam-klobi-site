import { Link, useLocation } from 'react-router-dom'
import './NavMenu.css'

function NavMenu() {
  const { pathname } = useLocation()

  return (
    <nav className={`nav-menu${pathname === '/' ? ' nav-menu--home' : ''}`}>
      <Link to="/" className="nav-logo">
        <img src="/Adam_Klobi_Logo.svg" alt="Adam Klobi" width={557} height={118} />
      </Link>
      <ul className="nav-links">
        <li><Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/music" className={pathname === '/music' ? 'active' : ''}>Music</Link></li>
        <li><Link to="/merch" className={pathname === '/merch' ? 'active' : ''}>Merch</Link></li>
        <li><Link to="/tour" className={pathname === '/tour' ? 'active' : ''}>Tour</Link></li>
        <li><Link to="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
        <li><Link to="/videos" className={pathname === '/videos' ? 'active' : ''}>Videos</Link></li>
      </ul>
    </nav>
  )
}

export default NavMenu
