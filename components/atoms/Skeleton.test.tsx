import { render, screen } from '@testing-library/react';
import CurrencyConverterSkeleton from './Skeleton';

describe('CurrencyConverterSkeleton', () => {
  it('renders skeleton component', () => {
    render(<CurrencyConverterSkeleton />);
    const skeleton = screen.getByTestId('skeleton-container') || 
                    document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('has proper animation class', () => {
    render(<CurrencyConverterSkeleton />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders with correct layout structure', () => {
    render(<CurrencyConverterSkeleton />);
    const container = document.querySelector('.pt-6.flex.flex-col');
    expect(container).toBeInTheDocument();
  });
});
