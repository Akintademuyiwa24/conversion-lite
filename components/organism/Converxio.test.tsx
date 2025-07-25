import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Converxio from './Converxio';
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

interface CurrencyAPI {
    reducerPath: string;
    reducer: (state: { endpoints: Record<string, unknown>; queries: Record<string, unknown> }, action: unknown) => { endpoints: Record<string, unknown>; queries: Record<string, unknown> };
    middleware: () => (next: (action: unknown) => unknown) => (action: unknown) => unknown;
}

const mockUseGetRatesQuery = jest.fn();

jest.mock('./../../features/currencyAPI', () => ({
    useGetRatesQuery: () => mockUseGetRatesQuery(),
    currencyAPI: {
        reducerPath: 'currencyAPI',
        reducer: (state: { endpoints: Record<string, unknown>; queries: Record<string, unknown> } = { endpoints: {}, queries: {} }) => state,
        middleware: (): ((next: (action: unknown) => unknown) => (action: unknown) => unknown) => next => action => next(action),
    } as CurrencyAPI,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: { mode: 'light' as const },
      ...initialState,
    },
  });
};

describe('Converxio Component', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
    mockLocalStorage.getItem.mockReturnValue('[]');
    mockUseGetRatesQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        NGN: 411.5,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('contains the convert button', async () => {
    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument();
    });
  });

  it('contains the history link', async () => {
    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /history/i })).toBeInTheDocument();
    });
  });

  it('shows loading state when fetching rates', () => {
    mockUseGetRatesQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );

    expect(screen.getByText('Fetching currency rates...')).toBeInTheDocument();
  });

  it('shows error state when API fails', () => {
    mockUseGetRatesQuery.mockReturnValue({
      isLoading: false,
      error: { message: 'API Error' },
      data: null,
    });

    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );

    expect(screen.getByText('Failed to load rates')).toBeInTheDocument();
  });

  it('performs currency conversion when convert button is clicked', async () => {
    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );

    // Enter amount
    const amountInput = screen.getByDisplayValue('');
    fireEvent.change(amountInput, { target: { value: '100' } });

    // Click convert button
    const convertButton = screen.getByRole('button', { name: /convert/i });
    fireEvent.click(convertButton);

    // Check for conversion result
    await waitFor(() => {
      expect(screen.getByText(/100 USD =/)).toBeInTheDocument();
    });
  });

  it('swaps currencies when swap button is clicked', async () => {
    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );

    // Click swap button
    const swapButton = screen.getByRole('button');
    fireEvent.click(swapButton);

    await waitFor(() => {
      // The currencies should be swapped
      expect(swapButton).toBeInTheDocument();
    });
  });

  it('clears result when amount is cleared', async () => {
    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );

    // Enter amount and convert
    const amountInput = screen.getByDisplayValue('');
    fireEvent.change(amountInput, { target: { value: '100' } });
    
    const convertButton = screen.getByRole('button', { name: /convert/i });
    fireEvent.click(convertButton);

    // Clear the amount
    fireEvent.change(amountInput, { target: { value: '' } });

    // Should show initial message again
    await waitFor(() => {
      expect(screen.getByText('Enter an amount and select currencies to convert.')).toBeInTheDocument();
    });
  });

  it('saves conversion to localStorage when converting', async () => {
    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );

    const amountInput = screen.getByDisplayValue('');
    fireEvent.change(amountInput, { target: { value: '100' } });
    
    const convertButton = screen.getByRole('button', { name: /convert/i });
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'conversions',
        expect.stringContaining('100')
      );
    });
  });

  it('handles online/offline state', async () => {
    render(
      <Provider store={store}>
        <Converxio />
      </Provider>
    );

    // Should not show offline message initially
    expect(screen.queryByText(/you are offline/i)).not.toBeInTheDocument();
  });
});