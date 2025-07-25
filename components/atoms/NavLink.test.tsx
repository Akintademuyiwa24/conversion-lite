import {render, screen} from '@testing-library/react';
import NavLink from './NavLink';

describe('NavLink component', () => {
  it('renders correctly', () => {
    render(<NavLink href='/test' icon={<span data-testid="icon" />} label='Test Link' isActive={false} />);
    const link = screen.getByRole('link', {name: 'Test Link'});
    expect(link).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('navigates to the correct URL', () => {
    render(<NavLink href='/test' icon={<span data-testid="icon" />} label='Test Link' isActive={false} />);
    const link = screen.getByRole('link', {name: 'Test Link'});
    expect(link).toHaveAttribute('href', '/test');
  });
});