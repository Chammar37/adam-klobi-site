import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111',
          color: '#fff',
          fontFamily: "'Roboto Mono', monospace",
          textAlign: 'center',
          padding: '2rem',
        }}>
          <p style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
            SOMETHING WENT WRONG
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.65rem 1.5rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#000',
              background: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            RELOAD
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
