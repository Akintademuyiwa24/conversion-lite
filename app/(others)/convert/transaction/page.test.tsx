import { render, screen } from '@testing-library/react';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '@/store/store'; // Adjust the import path as necessary

import TransactionHistory from './page';
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));



describe('TransactionHistory', () => {
  const mockTransactions = [
    { amount: 100, fromCurrency: 'USD', toCurrency: 'EUR', result: 85.5 },
    { amount: 250, fromCurrency: 'GBP', toCurrency: 'JPY', result: 32500 },
    { amount: 50, fromCurrency: 'CAD', toCurrency: 'USD', result: 37.5 },
    { amount: 1000, fromCurrency: 'EUR', toCurrency: 'GBP', result: 870 },
  ];

  beforeEach(() => {
    // Reset localStorage mock
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockTransactions));
  });

  it('renders search input with correct placeholder', () => {
    render(
      <Provider store={store}>
        <TransactionHistory />
      </Provider>
    );
    
    const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
    expect(searchInput).toBeInTheDocument();
  });

  it('filters transactions by fromCurrency', async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <TransactionHistory />
      </Provider>
    );
    
    const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
    
    await user.type(searchInput, 'USD');
    
    
    expect(screen.getAllByText('USD')).toHaveLength(2); // Should find 2 USD entries
    expect(screen.queryByText('GBP')).not.toBeInTheDocument(); // GBP->JPY should be hidden
    expect(screen.queryByText('JPY')).not.toBeInTheDocument(); // This transaction should be filtered out
  });


  it('renders the transaction history heading', () => {
    render(<Provider store={store}><TransactionHistory /></Provider>);
    const heading = screen.getByRole('heading', { name: /Last 5 Conversions/i });
    expect(heading).toBeInTheDocument();
  });

  it('filters transactions by toCurrency', async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <TransactionHistory />
      </Provider>
    );
    
    const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
    
    // Search for EUR
    await user.type(searchInput, 'EUR');
    expect(screen.getAllByText('EUR')).toHaveLength(2);
  });

  it('filters transactions by amount', async () => {
    const user = userEvent.setup();
    
    render(
      <Provider store={store}>
        <TransactionHistory />
      </Provider>
    );
    
    const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
    
    
    await user.type(searchInput, '100');
    
    // Should show transaction with amount 100 and 1000 (contains "100")
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    
    expect(screen.queryByText('250')).not.toBeInTheDocument();
  });

  it('filters transactions by result', async () => {
  const user = userEvent.setup();
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
  
  // Search for result "85" (should find 85.5)
  await user.type(searchInput, '85');
  
  expect(screen.getByText('85.50')).toBeInTheDocument();
  // Should not show other transactions
  expect(screen.queryByText('32500')).not.toBeInTheDocument();
});

it('search is case insensitive for currencies', async () => {
  const user = userEvent.setup();
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
  
  // Search for lowercase "usd"
  await user.type(searchInput, 'usd');
  
  // Should still find USD transactions
  expect(screen.getAllByText('USD')).toHaveLength(2);
});

it('shows "No conversions found" when search has no results', async () => {
  const user = userEvent.setup();
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
  
  // Search for something that doesn't exist
  await user.type(searchInput, 'NONEXISTENT');
  
  expect(screen.getByText('No conversions found.')).toBeInTheDocument();
});

it('clears search and shows all transactions when input is empty', async () => {
  const user = userEvent.setup();
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const searchInput = screen.getByPlaceholderText('Search by amount, currency, or result...');
  
  // First search for something specific
  await user.type(searchInput, 'USD');
  
  // Then clear the search
  await user.clear(searchInput);
  
  // Should show all transactions again
  expect(screen.getAllByText('USD')).toHaveLength(2);
  expect(screen.getAllByText('GBP')).toHaveLength(2); // GBP appears twice (from and to)
  expect(screen.getAllByText('EUR')).toHaveLength(2); // EUR appears twice (from and to)
});

it('handles empty localStorage gracefully', () => {
  // Mock empty localStorage for this test
  mockLocalStorage.getItem.mockReturnValueOnce('[]');
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  expect(screen.getByText('No conversions found.')).toBeInTheDocument();
});

//pagination tests
// Add these after your existing tests, before the closing });

it('displays correct pagination info', () => {
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  // Should show "Page 1 of 1" since we have 4 items (fits on 1 page)
  expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
});

it('disables Previous button on first page', () => {
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const prevButton = screen.getByText('Previous');
  expect(prevButton).toBeDisabled();
  expect(prevButton).toHaveClass('cursor-not-allowed');
});

it('disables Next button when on last page', () => {
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const nextButton = screen.getByText('Next');
  expect(nextButton).toBeDisabled();
  expect(nextButton).toHaveClass('cursor-not-allowed');
});

it('handles pagination with more than 5 items', () => {
  // Mock more transactions to test pagination
  const manyTransactions = [
    ...mockTransactions,
    { amount: 200, fromCurrency: 'AUD', toCurrency: 'NZD', result: 180 },
    { amount: 300, fromCurrency: 'CHF', toCurrency: 'SEK', result: 2800 },
  ];
  
  mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(manyTransactions));
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  // Should show "Page 1 of 2" since we have 6 items (5 per page)
  expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  
  // Next button should be enabled
  const nextButton = screen.getByText('Next');
  expect(nextButton).not.toBeDisabled();
});

it('navigates to next page when Next button is clicked', async () => {
  const user = userEvent.setup();
  
  // Mock 6 transactions to enable pagination
  const manyTransactions = [
    ...mockTransactions,
    { amount: 200, fromCurrency: 'AUD', toCurrency: 'NZD', result: 180 },
    { amount: 300, fromCurrency: 'CHF', toCurrency: 'SEK', result: 2800 },
  ];
  
  mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(manyTransactions));
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const nextButton = screen.getByText('Next');
  await user.click(nextButton);
  
  // Should now be on page 2
  expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  
  // Previous button should now be enabled
  const prevButton = screen.getByText('Previous');
  expect(prevButton).not.toBeDisabled();
});

it('handles null localStorage gracefully', () => {
  // Mock localStorage to return null
  mockLocalStorage.getItem.mockReturnValueOnce(null);
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  expect(screen.getByText('No conversions found.')).toBeInTheDocument();
});

it('navigates to previous page when Previous button is clicked', async () => {
  const user = userEvent.setup();
  
  // Mock 6 transactions to enable pagination
  const manyTransactions = [
    ...mockTransactions,
    { amount: 200, fromCurrency: 'AUD', toCurrency: 'NZD', result: 180 },
    { amount: 300, fromCurrency: 'CHF', toCurrency: 'SEK', result: 2800 },
  ];
  
  mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(manyTransactions));
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  // Go to page 2 first
  const nextButton = screen.getByText('Next');
  await user.click(nextButton);
  
  // Now test previous button
  const prevButton = screen.getByText('Previous');
  await user.click(prevButton);
  
  expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  expect(prevButton).toBeDisabled();
});

it('renders back button correctly', async () => {
  const user = userEvent.setup();
  
  render(
    <Provider store={store}>
      <TransactionHistory />
    </Provider>
  );
  
  const backButton = screen.getByText('← Back to Converter');
  expect(backButton).toBeInTheDocument();
  
  // Test that the button is clickable (this covers the onClick handler exists)
  await user.click(backButton);
  
  // Since router.back() doesn't cause a visible state change in tests,
  // we can just verify the button works without testing the navigation itself
  expect(backButton).toBeInTheDocument();
});
});

  
  
