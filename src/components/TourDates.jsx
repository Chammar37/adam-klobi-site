import { useState, useEffect } from 'react'
import { fetchTourDates } from '../lib/sanity'
import './TourDates.css'

function TourDates() {
  const [dates, setDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDates = async () => {
      try {
        const data = await fetchTourDates()
        setDates(data)
      } catch (err) {
        setError('Failed to load tour dates')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadDates()
  }, [])

  if (loading) return <div className="tour-loading">Loading tour dates...</div>
  if (error) return <div className="tour-error">{error}</div>
  if (dates.length === 0) {
    return (
      <div className="tour-empty">
        <p>No upcoming shows at the moment. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="tour-dates">
      {dates.map((show) => {
        const showDate = new Date(show.date)
        const month = showDate.toLocaleDateString('en-US', { month: 'short' })
        const day = showDate.getDate()
        const year = showDate.getFullYear()
        const time = showDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        })

        return (
          <div key={show._id} className={`tour-card ${show.soldOut ? 'sold-out' : ''}`}>
            <div className="tour-date">
              <span className="tour-month">{month}</span>
              <span className="tour-day">{day}</span>
              <span className="tour-year">{year}</span>
            </div>
            <div className="tour-info">
              <h3 className="tour-venue">{show.venue}</h3>
              <p className="tour-location">
                {show.city}, {show.country}
              </p>
              <p className="tour-time">{time}</p>
              {show.notes && <p className="tour-notes">{show.notes}</p>}
            </div>
            <div className="tour-action">
              {show.soldOut ? (
                <span className="sold-out-badge">Sold Out</span>
              ) : show.ticketUrl ? (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ticket-button"
                >
                  Get Tickets
                </a>
              ) : (
                <span className="tba-badge">TBA</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TourDates
