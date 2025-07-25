import { render, screen, fireEvent } from '@testing-library/react'
import SwapRate from './SwapRate'

describe('SwapRate component', () => {
  it('renders correctly', () => {
    const onChange = jest.fn()
    render(<SwapRate onChange={onChange} />)

    const button = screen.getByRole('button', { name: /swap/i })
    
    fireEvent.click(button)
    expect(onChange).toHaveBeenCalled()
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveClass('rounded-md bg-slate-200')
  });
});