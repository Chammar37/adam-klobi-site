import SignupForm from '../components/SignupForm'
import TourDates from '../components/TourDates'
import PageTitle from '../components/PageTitle'
import './TourPage.css'

function TourPage() {
  return (
    <main className="tour-page">
      <PageTitle>Tour</PageTitle>
      <div className="tour-signup-section">
        <SignupForm text="TOUR DATES COMING SOON - BE THE FIRST TO KNOW" accentColor="#e63318" source="tour" />
      </div>
      <div className="tour-dates-section">
        <TourDates />
      </div>
    </main>
  )
}

export default TourPage
