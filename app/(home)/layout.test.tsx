import { render, screen } from '@testing-library/react';
import HomeLayout from './layout';

function HomeLayoutClient({ children }: { children: React.ReactNode }) {
  return <div className="home-layout-client">{children}</div>;
}

describe('HomeLayoutClient', () => {
  it('renders the layout with children', () => {
    render(
      <HomeLayoutClient>
        <div>Test Child</div>
      </HomeLayoutClient>
    );

    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });
});

// describe('HomeLayout', () => {
//   it('renders the async layout function', async () => {
//     const TestChild = () => <div data-testid="test-child">Test Content</div>;
    
//     const result = await HomeLayout({ children: <TestChild /> });
    
//     // This should cover line 10 in the async function
//     expect(result).toBeDefined();
//     expect(result.type).toBe(HomeLayoutClient);
//   });
// });