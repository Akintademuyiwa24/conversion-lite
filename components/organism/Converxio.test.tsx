import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Converxio from './Converxio';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
import selectEvent from 'react-select-event';

// Mock currency API
const mockUseGetRatesQuery = jest.fn();
jest.mock('./../../features/currencyAPI', () => ({
  useGetRatesQuery: () => mockUseGetRatesQuery(),
  currencyAPI: {
    reducerPath: 'currencyAPI',
    reducer: () => ({}),
    middleware: () => () => (next: (action: unknown) => unknown) => (action: unknown) => next(action),
  },
}));

// Create mock store
const createStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: { mode: 'light' as 'light' | 'dark' },
    },
  });

describe('Converxio Component (Basic)', () => {
  beforeEach(() => {
    mockUseGetRatesQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: { USD: 1, EUR: 0.85 },
    });
  });

  it('renders the Convert button', async () => {
    render(
      <Provider store={createStore()}>
        <Converxio />
      </Provider>
    );
    expect(await screen.findByRole('button', { name: /convert/i })).toBeInTheDocument();
  });

  it('renders the History link', async () => {
    render(
      <Provider store={createStore()}>
        <Converxio />
      </Provider>
    );
    expect(await screen.findByRole('link', { name: /history/i })).toBeInTheDocument();
  });


    it('performs a basic conversion', async () => {
        render(
            <Provider store={createStore()}>
                <Converxio />
            </Provider>
        );

        const input = screen.getByLabelText(/enter amount/i);
        fireEvent.change(input, { target: { value: '100' } });

        await selectEvent.select(screen.getByLabelText(/to/i), 'EUR');

        fireEvent.click(screen.getByRole('button', { name: /convert/i }));

        await waitFor(() => {
            expect(screen.getByText((content) => content.startsWith('100.00 USD ='))).toBeInTheDocument();
        });
    });
});
