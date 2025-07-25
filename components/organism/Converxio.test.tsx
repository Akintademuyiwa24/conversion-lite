import { render, screen, waitFor } from '@testing-library/react';
import Converxio from './Converxio';
import { Provider } from 'react-redux'; 
import store from '@/store/store';

interface CurrencyAPI {
    reducerPath: string;
    reducer: (state: { endpoints: Record<string, unknown>; queries: Record<string, unknown> }, action: unknown) => { endpoints: Record<string, unknown>; queries: Record<string, unknown> };
    middleware: () => (next: (action: unknown) => unknown) => (action: unknown) => unknown;
}

jest.mock('./../../features/currencyAPI', () => ({
    useGetRatesQuery: jest.fn(() => ({
        data: { USD: 1.0, EUR: 0.9 },
        isLoading: false,
        isError: false,
    })),
    currencyAPI: {
        reducerPath: 'currencyAPI',
        reducer: (state: { endpoints: Record<string, unknown>; queries: Record<string, unknown> } = { endpoints: {}, queries: {} }, action: unknown) => state,
        middleware: (): ((next: (action: unknown) => unknown) => (action: unknown) => unknown) => next => action => next(action),
    } as CurrencyAPI,
}));


describe('Converxio Component', () => {

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
});