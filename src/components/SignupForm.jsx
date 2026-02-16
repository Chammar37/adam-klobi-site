import { useState } from 'react'
import './SignupForm.css'

function SignupForm({ text, accentColor, source }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('sending')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="signup" style={{ '--accent-color': accentColor }}>
      <p className="signup-text">{text}</p>
      {status === 'success' ? (
        <p className="signup-status">You're in!</p>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="signup-input"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'sending'}
          />
          <button type="submit" className="signup-btn" disabled={status === 'sending'}>
            {status === 'sending' ? '...' : 'SIGN UP'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="signup-status signup-error">Something went wrong. Try again.</p>
      )}
    </div>
  )
}

export default SignupForm
