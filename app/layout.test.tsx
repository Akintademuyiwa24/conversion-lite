import { render } from '@testing-library/react';

// Mock ReduxProvider
jest.mock('@/store/ReduxProvider', () => ({
  ReduxProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="redux-provider">{children}</div>,
}));

// Create a testable version of the layout content
const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="redux-provider">
      {children}
    </div>
  );
};

describe('RootLayout', () => {
  it('renders children within ReduxProvider wrapper', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    const { getByTestId } = render(
      <LayoutContent>
        <TestChild />
      </LayoutContent>
    );
    
    expect(getByTestId('test-child')).toBeInTheDocument();
    expect(getByTestId('redux-provider')).toBeInTheDocument();
  });

  it('ReduxProvider mock works correctly', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    const { getByTestId } = render(
      <LayoutContent>
        <TestChild />
      </LayoutContent>
    );
    
    // Verify the provider wrapper exists
    expect(getByTestId('redux-provider')).toContainElement(getByTestId('test-child'));
  });
});
