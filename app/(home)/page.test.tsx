import { render, screen } from '@testing-library/react';
import LandingPage from './page';

describe('LandingPage', () => {
  it('renders the main heading', () => {
    render(<LandingPage />);
    const heading = screen.getByRole('heading', { name: /currency conversion simplified/i });
    expect(heading).toBeInTheDocument();
  });

  it('has a "Get Started" link to the convert page', () => {
    render(<LandingPage />);
    const link = screen.getByRole('link', { name: /get started/i });
    expect(link).toHaveAttribute('href', '/convert');
  });

  it('displays the hero image', () => {
    render(<LandingPage />);
    const image = screen.getByRole('img', { name: /hero image/i });
    expect(image).toBeInTheDocument();
  });

  it('shows the description text', () => {
    render(<LandingPage />);
    const description = screen.getByText(/a minimal and elegant currency conversion tool/i);
    expect(description).toBeInTheDocument();
  });

  it('displays the footer with copyright', () => {
    render(<LandingPage />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(/converxio/i);
  });
});