import MerchGrid from '../components/MerchGrid'
import '../App.css'

function MerchPage() {
  return (
    <main>
      <section className="content-section">
        <div className="section-container">
          <h2 className="section-title">Merch</h2>
          <MerchGrid />
        </div>
      </section>
    </main>
  )
}

export default MerchPage
