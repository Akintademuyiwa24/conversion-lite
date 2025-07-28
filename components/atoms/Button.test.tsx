import {render, screen} from '@testing-library/react';
import Button from './Button';


describe('Button', () => {
    it('renders with the given children correctly', () => {
        render(<Button>Get Started</Button>);
        expect(screen.getByText('Get Started')).toBeInTheDocument();
    })

    it('renders with the given children correctly', () => {
        render(<Button>Sign up</Button>);
        expect(screen.getByText('Sign up')).toBeInTheDocument();
    })

    it('renders with the given children correctly', () => {
        render(<Button>Sign in</Button>);
        expect(screen.getByText('Sign in')).toBeInTheDocument();
    })


    it('applies a size prop', () => {
        render(<Button size='lg'>Get Started</Button>)
        expect(screen.getByText('Get Started')).toHaveClass('h-12 px-6 py-3 text-base rounded-lg');
    })
    it('applies a variant prop', () => {
        render(<Button variant='primary'>Get Started</Button>)
        expect(screen.getByText('Get Started')).toHaveClass('bg-purple-500 text-white hover:bg-purple-700 active:bg-purple-800');
    })
    it('applies a variant prop', () => {
        render(<Button variant='primary'>Get Started</Button>)
        expect(screen.getByText('Get Started')).toHaveClass('bg-purple-500 text-white hover:bg-purple-700 active:bg-purple-800');
    })
    it('applies a default base-style prop', () => {
        render(<Button variant='primary'>Get Started</Button>)
        expect(screen.getByText('Get Started')).toHaveClass('font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none');
    })
    it('applies a variant prop', () => {
        render(<Button variant='outline'>Sign in</Button>)
        expect(screen.getByText('Sign in')).toHaveClass('border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100');
    })
});
