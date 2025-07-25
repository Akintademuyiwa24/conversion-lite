import { render, screen } from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '@/store/store'; // Adjust the import path as necessary

import TransactionHistory from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('TransactionHistory', () => {
  it('renders the transaction history heading', () => {
    render(<Provider store={store}><TransactionHistory /></Provider>);
    const heading = screen.getByRole('heading', { name: /Last 5 Conversions/i });
    expect(heading).toBeInTheDocument();
  });

});
