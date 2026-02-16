import { useState } from 'react'
import './SignupForm.css'

function SignupForm({ text, accentColor }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: integrate with mailing list service
    console.log('Sign up:', email)
    setEmail('')
  }

  return (
    <div className="signup" style={{ '--accent-color': accentColor }}>
      <p className="signup-text">{text}</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <button type="submit" className="signup-btn">SIGN UP</button>
        <input
          type="email"
          className="signup-input"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </form>
    </div>
  )
}

export default SignupForm
