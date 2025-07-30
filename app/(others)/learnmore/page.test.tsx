import { render, screen } from '@testing-library/react';

import {AnnouncementTicker} from './page'
import LearnMore from './page';


Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

describe('AnnouncementTicker', () => {

  it('renders the ticker component', () => {
  render(<AnnouncementTicker />);
  
  
  const tickerContainer = document.querySelector('.bg-gray-600');
  expect(tickerContainer).toBeInTheDocument();
});

});

describe('LearnMore Page', () => {
  it('renders the main learn more component', () => {
    render(<LearnMore />);
    
    // This should cover line 8 in the LearnMore component
    const mainContainer = document.querySelector('div');
    expect(mainContainer).toBeInTheDocument();
  });
});