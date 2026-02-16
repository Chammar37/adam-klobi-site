import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorBoundary from './ErrorBoundary'

function ThrowingComponent() {
  throw new Error('Test explosion')
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>
    )
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('renders fallback UI when child throws', () => {
    // Suppress React's console.error for the expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('SOMETHING WENT WRONG')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'RELOAD' })).toBeInTheDocument()

    spy.mockRestore()
  })

  it('reload button redirects to home', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const user = userEvent.setup()
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    )

    await user.click(screen.getByRole('button', { name: 'RELOAD' }))
    expect(window.location.href).toContain('/')

    spy.mockRestore()
  })
})
