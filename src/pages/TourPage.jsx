import TourDates from '../components/TourDates'
import '../App.css'

function TourPage() {
  return (
    <main>
      <section className="content-section">
        <div className="section-container">
          <h2 className="section-title">Tour Dates</h2>
          <TourDates />
        </div>
      </section>
    </main>
  )
}

export default TourPage
