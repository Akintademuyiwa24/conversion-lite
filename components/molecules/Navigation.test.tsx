import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders correctly', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

    it('contains the correct links', () => {
        render(<Navigation />);
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Convert/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Learn More/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /History/i })).toBeInTheDocument();
    });
});


