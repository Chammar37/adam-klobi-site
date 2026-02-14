import { FaSpotify, FaApple, FaYoutube, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-ak">
        <img src="/AK_Footer.svg" alt="AK" />
      </div>
      <div className="footer-socials">
        <a href="https://open.spotify.com/artist/adamklobi" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
          <FaSpotify />
        </a>
        <a href="https://music.apple.com/artist/adamklobi" target="_blank" rel="noopener noreferrer" aria-label="Apple Music">
          <FaApple />
        </a>
        <a href="https://youtube.com/@adamklobi" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a href="https://tiktok.com/@adamklobi" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <FaTiktok />
        </a>
        <a href="https://instagram.com/adam.klobi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="mailto:contact@adamklobi.com" aria-label="Email">
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  )
}

export default Footer
