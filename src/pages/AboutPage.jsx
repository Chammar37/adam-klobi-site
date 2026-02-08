import './AboutPage.css'

function AboutPage() {
  return (
    <main className="about-page">
      <p className="about-bio">
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
        Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim
        Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut
        Aliquip Ex Ea Commodo Consequat.
      </p>
      <p className="about-contact">
        For all inquiries:{' '}
        <a href="mailto:contact@adamklobi.com">contact@adamklobi.com</a>
      </p>
    </main>
  )
}

export default AboutPage
