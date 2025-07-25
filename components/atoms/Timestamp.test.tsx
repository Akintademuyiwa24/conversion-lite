import { render, screen } from '@testing-library/react'
import Timestamp from './Timestamp'

describe('Timestamp component', () => {
  it('renders the current year', () => {
    render(<Timestamp />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(currentYear)).toBeInTheDocument()
  })

  it('renders the current year as text', () => {
    render(<Timestamp />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument()
  })
})
