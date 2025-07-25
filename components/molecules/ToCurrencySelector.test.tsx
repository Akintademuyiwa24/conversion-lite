import { render, screen } from '@testing-library/react';
import ToCurrencySelector from './ToCurrencySelector';
import selectEvent from 'react-select-event';

describe('ToCurrencySelector', () => {
  it('renders correctly', () => {

    const onChange = jest.fn();
    const options = [
      { value: 'usd', label: 'USD' },
      { value: 'ngn', label: 'NGN' },
      { value: 'gbp', label: 'GBP' },
    ];
    render(
      <ToCurrencySelector
        toCurrency='ngn'
        options={options}
        disabled={false}
        onChange={onChange}
      />
    );
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
  });

  it('fires onChange when dropdown value changes', async () => {
    const onChange = jest.fn();
    const options = [
      { value: 'usd', label: 'USD' },
      { value: 'ngn', label: 'NGN' },
      { value: 'gbp', label: 'GBP' },
    ];
    render(
      <ToCurrencySelector
        toCurrency='ngn'
        options={options}
        disabled={false}
        onChange={onChange}
      />
    );

    await selectEvent.select(screen.getByLabelText(/to/i), 'NGN');

  expect(onChange).toHaveBeenCalled();
  expect(onChange.mock.calls[0][0]).toEqual(expect.objectContaining({ value: 'ngn' }));
  });
});

