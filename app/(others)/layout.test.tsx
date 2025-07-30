import { render, screen } from '@testing-library/react';
import DashboardLayout, {DashboardClient} from './layout';




describe('DashboardClient', () => {
  it('renders the dashboard layout with navigation', () => {
    render(<DashboardClient><div>Test Content</div></DashboardClient>);
    
    const layout = screen.getByTestId('dashboard-layout');
    expect(layout).toBeInTheDocument();
    
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
    
    const content = screen.getByText('Test Content');
    expect(content).toBeInTheDocument();
  });

  it('renders the async dashboard layout function', async () => {
    const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
    const result = await DashboardLayout({ children: <TestChild /> });
    
    // This should cover line 5 in the async function
    expect(result).toBeDefined();
    expect(result.type).toBe(DashboardClient);
  });

  
});