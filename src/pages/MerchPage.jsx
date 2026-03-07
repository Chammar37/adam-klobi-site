import PageTitle from '../components/PageTitle'
import SignupForm from '../components/SignupForm'
import './MerchPage.css'

function MerchPage() {
  return (
    <main className="merch-page">
      <PageTitle>Merch</PageTitle>
      <SignupForm text="SIGN UP FOR MERCH UPDATES" accentColor="#3344ff" source="merch" />
    </main>
  )
}

export default MerchPage
