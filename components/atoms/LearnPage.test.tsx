import { render, screen } from '@testing-library/react';

import LearnPage from './LearnPage';

describe('LearnPage', () => {
  it('renders the main heading', () => {
    render(<LearnPage />);
    const heading = screen.getByRole('heading', { name: /Learn More About This Product Here!/i });
    expect(heading).toBeInTheDocument();
  });

});
