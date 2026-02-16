import './AboutPage.css'

function AboutPage() {
  return (
    <main className="about-page">
      <p className="about-bio">
      What's up, I'm Adam Klobi. <br />
      I write songs shaped by borrowed <br />
      nostalgia and growing up online.
      </p>
      <p className="about-contact">
        Text me:{' '}
        <a href="sms:555740382">555740382</a>
        <br />
        For all inquiries:{' '}
        <a href="mailto:contact@adamklobi.com">contact@adamklobi.com</a>
      </p>
    </main>
  )
}

export default AboutPage
