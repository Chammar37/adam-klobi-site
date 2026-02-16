import SignupForm from '../components/SignupForm'
import TourDates from '../components/TourDates'
import './TourPage.css'

function TourPage() {
  return (
    <main className="tour-page">
      <SignupForm text="BE THE FIRST TO KNOW" accentColor="#e63318" />
      <div className="tour-dates-section">
        <TourDates />
      </div>
    </main>
  )
}

export default TourPage
