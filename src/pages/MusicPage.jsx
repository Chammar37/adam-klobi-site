import SongsList from '../components/SongsList'
import '../App.css'

function MusicPage() {
  return (
    <main>
      <section className="content-section">
        <div className="section-container">
          <h2 className="section-title">Music</h2>
          <SongsList />
        </div>
      </section>
    </main>
  )
}

export default MusicPage
