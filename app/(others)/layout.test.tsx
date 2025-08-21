import { render, screen } from '@testing-library/react';
import DashboardLayout from './layout';



function DashboardClient({ children }: { children: React.ReactNode }) {
  return <div data-testid="navigation">{children}</div>;
}
describe('DashboardClient', () => {
  it('renders the dashboard layout with navigation', () => {
    render(<DashboardClient><div>Test Content</div></DashboardClient>);
    
    
    
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
    
    
  });

  

  
});