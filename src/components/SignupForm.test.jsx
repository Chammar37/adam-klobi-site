import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../test/test-utils'
import SignupForm from './SignupForm'

describe('SignupForm', () => {
  it('renders text prop', () => {
    renderWithRouter(<SignupForm text="JOIN THE LIST" accentColor="#ff0000" />)
    expect(screen.getByText('JOIN THE LIST')).toBeInTheDocument()
  })

  it('renders email input and submit button', () => {
    renderWithRouter(<SignupForm text="Sign up" accentColor="#ff0000" />)
    expect(screen.getByRole('button', { name: 'SIGN UP' })).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('sets --accent-color CSS variable', () => {
    renderWithRouter(<SignupForm text="Sign up" accentColor="#3344ff" />)
    const wrapper = document.querySelector('.signup')
    expect(wrapper.style.getPropertyValue('--accent-color')).toBe('#3344ff')
  })

  it('clears input after submit', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SignupForm text="Sign up" accentColor="#ff0000" />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'test@example.com')
    expect(input).toHaveValue('test@example.com')
    await user.click(screen.getByRole('button', { name: 'SIGN UP' }))
    expect(input).toHaveValue('')
  })
})
