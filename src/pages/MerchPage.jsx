import PageTitle from '../components/PageTitle'
import SignupForm from '../components/SignupForm'
import './MerchPage.css'

function MerchPage() {
  return (
    <main className="merch-page">
      <PageTitle>Merch</PageTitle>
      <SignupForm text="SIGN UP FOR MERCH UPDATES" accentColor="#3a3aff" source="merch" autoFocus />
    </main>
  )
}

export default MerchPage
