import { render } from '@testing-library/react';
import CurrencyConverterSkeleton from './Skeleton';

describe('CurrencyConverterSkeleton', () => {
  it('renders skeleton component', () => {
    render(<CurrencyConverterSkeleton />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('has proper animation class', () => {
    render(<CurrencyConverterSkeleton />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('renders with correct layout structure', () => {
    render(<CurrencyConverterSkeleton />);
    const container = document.querySelector('.pt-6.flex.flex-col');
    expect(container).toBeInTheDocument();
  });

  it('renders skeleton placeholders for all components', () => {
    render(<CurrencyConverterSkeleton />);
    
    // Check for various skeleton elements
    const grayBoxes = document.querySelectorAll('.bg-gray-300');
    expect(grayBoxes.length).toBeGreaterThan(0);
    
    // Check for rounded elements (simulating buttons, inputs, etc.)
    const roundedElements = document.querySelectorAll('.rounded, .rounded-lg, .rounded-xl');
    expect(roundedElements.length).toBeGreaterThan(0);
  });

  it('has proper responsive classes', () => {
    render(<CurrencyConverterSkeleton />);
    const container = document.querySelector('.min-h-\\[calc\\(100vh-200px\\)\\]');
    expect(container).toBeInTheDocument();
  });
});
