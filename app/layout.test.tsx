import { render } from '@testing-library/react';
import RootLayout from './layout';

// Mock ReduxProvider
jest.mock('@/store/ReduxProvider', () => ({
  ReduxProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('RootLayout', () => {
  it('renders children within ReduxProvider', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    const { getByTestId } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('applies correct font classes', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    const bodyElement = document.querySelector('body');
    expect(bodyElement).toHaveClass('antialiased');
  });

  it('sets correct html lang attribute', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    const htmlElement = document.querySelector('html');
    expect(htmlElement).toHaveAttribute('lang', 'en');
  });
});
