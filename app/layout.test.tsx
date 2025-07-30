import { render } from '@testing-library/react';
import RootLayout from './layout';

// Mock ReduxProvider
jest.mock('@/store/ReduxProvider', () => ({
  ReduxProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="redux-provider">{children}</div>,
}));

// Mock ClerkProvider
jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="clerk-provider">{children}</div>,
}));

// Mock Inter font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}));

// Mock globals.css import
jest.mock('./globals.css', () => ({}));

describe('RootLayout', () => {
  it('renders the complete HTML structure with providers', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    const { getByTestId } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    // Test that both providers are present
    expect(getByTestId('clerk-provider')).toBeInTheDocument();
    expect(getByTestId('redux-provider')).toBeInTheDocument();
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('has correct provider nesting structure', () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    const { getByTestId } = render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );
    
    // Verify ClerkProvider contains ReduxProvider which contains children
    const clerkProvider = getByTestId('clerk-provider');
    const reduxProvider = getByTestId('redux-provider');
    const child = getByTestId('test-child');
    
    expect(clerkProvider).toContainElement(reduxProvider);
    expect(reduxProvider).toContainElement(child);
  });

  it('renders providers in correct order', () => {
  const TestChild = () => <div data-testid="test-child">Test Content</div>;
  
  const { getByTestId } = render(
    <RootLayout>
      <TestChild />
    </RootLayout>
  );
  
  // Test the providers are rendered and nested correctly
  expect(getByTestId('clerk-provider')).toBeInTheDocument();
  expect(getByTestId('redux-provider')).toBeInTheDocument();
  expect(getByTestId('test-child')).toBeInTheDocument();
});
});