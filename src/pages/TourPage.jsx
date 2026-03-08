import SignupForm from '../components/SignupForm'
import TourDates from '../components/TourDates'
import PageTitle from '../components/PageTitle'
import './TourPage.css'

function TourPage() {
  return (
    <main className="tour-page">
      <PageTitle>Tour</PageTitle>
      <div className="tour-signup-section">
        <h2 className="tour-headline">TOUR DATES COMING SOON</h2>
        <p className="tour-subline">BE THE FIRST TO KNOW</p>
        <SignupForm text="" accentColor="#e63318" source="tour" autoFocus />
      </div>
      <div className="tour-dates-section">
        <TourDates />
      </div>
    </main>
  )
}

export default TourPage
