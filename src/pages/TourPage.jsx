import SignupForm from '../components/SignupForm'
import TourDates from '../components/TourDates'
import './TourPage.css'

function TourPage() {
  return (
    <main className="tour-page">
      <div className="tour-signup-section">
        <SignupForm text="BE THE FIRST TO KNOW" accentColor="#e63318" source="tour" />
      </div>
      <div className="tour-dates-section">
        <TourDates />
      </div>
    </main>
  )
}

export default TourPage
