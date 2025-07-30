import { render, screen } from '@testing-library/react';
import SignInPage from './page';
import { ClerkProvider } from '@clerk/nextjs';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '/sign-in',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  SignIn: () => <div data-testid="clerk-signin">Mock SignIn Component</div>,
}));

describe('SignInPage', () => {
  it('renders the SignIn component', () => {
    render(<ClerkProvider><SignInPage /></ClerkProvider>);
    
    const signInComponent = screen.getByTestId('sign-in-page');
    expect(signInComponent).toBeInTheDocument();
  });

  it('has a centered layout', () => {
    render(<ClerkProvider><SignInPage /></ClerkProvider>);

    const container = screen.getByTestId('sign-in-page');
    expect(container).toHaveClass('flex flex-col justify-center items-center mx-auto h-screen');
  });
});