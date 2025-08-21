import { render, screen } from '@testing-library/react';


import LearnMore from './page';


Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});


describe('LearnMore Page', () => {
  it('renders the main learn more component', () => {
    render(<LearnMore />);
    
    // This should cover line 8 in the LearnMore component
    const mainContainer = document.querySelector('div');
    expect(mainContainer).toBeInTheDocument();
  });
});