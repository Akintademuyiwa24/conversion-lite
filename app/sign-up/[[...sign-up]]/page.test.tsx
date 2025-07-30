import { render, screen } from '@testing-library/react';
import SignUpPage from './page';

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
  SignUp: () => <div data-testid="clerk-signUp">Mock SignUp Component</div>,
}));

describe('SignUpPage', () => {
  it('renders the SignUp component', () => {
    render(<ClerkProvider><SignUpPage /></ClerkProvider>);

    const signUpComponent = screen.getByTestId('sign-up-page');
    expect(signUpComponent).toBeInTheDocument();
  });

  it('has a centered layout', () => {
    render(<ClerkProvider><SignUpPage /></ClerkProvider>);

    const container = screen.getByTestId('sign-up-page');
    expect(container).toHaveClass('flex flex-col justify-center items-center mx-auto h-screen');
  });
});