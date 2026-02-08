import { useState } from 'react'
import TourDates from '../components/TourDates'
import './TourPage.css'

function TourPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: integrate with mailing list service
    console.log('Sign up:', email)
    setEmail('')
  }

  return (
    <main className="tour-page">
      <div className="tour-signup">
        <p className="tour-signup-text">SIGN UP TO BE NOTIFIED AS DATES DROP</p>
        <form className="tour-signup-form" onSubmit={handleSubmit}>
          <button type="submit" className="tour-signup-btn">SIGN UP</button>
          <input
            type="email"
            className="tour-signup-input"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </form>
      </div>
      <div className="tour-dates-section">
        <TourDates />
      </div>
    </main>
  )
}

export default TourPage
