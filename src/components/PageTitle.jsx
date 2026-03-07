import './PageTitle.css'

function PageTitle({ children }) {
  return (
    <h1 className="page-title">
      {children}
    </h1>
  )
}

export default PageTitle
