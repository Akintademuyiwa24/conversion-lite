import { render, screen } from '@testing-library/react';
import LearnPage from './LearnMorePage';

describe('LearnMorePage', () => {
  it('renders the main heading', () => {
    render(<LearnPage />);
    const heading = screen.getByRole('heading', { name: /learn more about this product here!/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays the product description', () => {
    render(<LearnPage />);
    const description = screen.getByText(/this is a sleek and responsive currency converter application/i);
    expect(description).toBeInTheDocument();
  });

  it('renders core features section', () => {
    render(<LearnPage />);
    const featuresHeading = screen.getByRole('heading', { name: /core features/i });
    expect(featuresHeading).toBeInTheDocument();
  });

  it('displays feature cards', () => {
    render(<LearnPage />);
    
    expect(screen.getByText(/real-time conversion/i)).toBeInTheDocument();
    expect(screen.getByText(/clean & responsive ui/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile-first design/i)).toBeInTheDocument();
  });

  it('renders currency conversion logic section', () => {
    render(<LearnPage />);
    const logicHeading = screen.getByRole('heading', { name: /currency conversion logic/i });
    expect(logicHeading).toBeInTheDocument();
  });

  it('displays conversion process steps', () => {
    render(<LearnPage />);
    
    expect(screen.getByText(/the input is validated to ensure it is a number/i)).toBeInTheDocument();
    expect(screen.getByText(/the form dispatches an action to redux/i)).toBeInTheDocument();
    expect(screen.getByText(/redux sends a request to the exchange rate api/i)).toBeInTheDocument();
    expect(screen.getByText(/the api returns the converted value/i)).toBeInTheDocument();
    expect(screen.getByText(/the result is stored in redux and displayed on the ui/i)).toBeInTheDocument();
  });

  it('displays error handling information', () => {
    render(<LearnPage />);
    expect(screen.getByText(/if the api fails, an error state is triggered/i)).toBeInTheDocument();
  });

  it('has proper responsive layout classes', () => {
    render(<LearnPage />);
    const container = screen.getByRole('heading', { name: /learn more about this product here!/i }).closest('div');
    expect(container).toHaveClass('max-w-7xl');
  });
});
