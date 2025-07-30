import { render, screen } from '@testing-library/react'
import ConversionPage from './page'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';


// Mock currency API
const mockUseGetRatesQuery = jest.fn();
jest.mock('@/features/currencyAPI', () => ({
  useGetRatesQuery: () => mockUseGetRatesQuery(),
  currencyAPI: {
    reducerPath: 'currencyAPI',
    reducer: () => ({}),
    middleware: () => () => (next: (action: unknown) => unknown) => (action: unknown) => next(action),
  },
}));

// mock the store
const createStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: { mode: 'light' as 'light' | 'dark' },
    },
  });

describe('ConversionPage', () => {
  beforeEach(() => {
    mockUseGetRatesQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: { USD: 1, EUR: 0.85 },
    });
  });

  it('renders without crashing', () => {
    render(<Provider store={createStore()}><ConversionPage /></Provider>)
    expect(screen.getByTestId('input-label')).toBeInTheDocument()
  })

    it('renders the from currency conversion field and input field', () => {
        render(<Provider store={createStore()}><ConversionPage /></Provider>)
        expect(screen.getByTestId('from-currency-selector')).toBeInTheDocument();
    });

    it('renders the to currency conversion field', () => {
        render(<Provider store={createStore()}><ConversionPage /></Provider>)
        expect(screen.getByTestId('to-currency-selector')).toBeInTheDocument();
    });
})
