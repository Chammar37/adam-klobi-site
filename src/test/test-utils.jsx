import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

export function renderWithRouter(ui, { route = '/', ...options } = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
    ...options,
  })
}
