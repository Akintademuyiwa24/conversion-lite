import { render, screen } from '@testing-library/react';
import FromCurrencySelector from './FromCurrencySelector';
import selectEvent from 'react-select-event';

describe('FromCurrencySelector', () => {
  it('renders correctly', () => {

    const onChange = jest.fn();
    const onChangeAmount = jest.fn();
    const options = [
      { value: 'usd', label: 'USD' },
      { value: 'eur', label: 'EUR' },
      { value: 'gbp', label: 'GBP' },
    ];
    render(
      <FromCurrencySelector
        fromCurrency='usd'
        amount= {100}
        options={options}
        disabled={false}
        onChange={onChange}
        onChangeAmount={onChangeAmount}
      />
    );
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
  });

  it('fires onChange when dropdown value changes', async () => {
    const onChange = jest.fn();
    const onChangeAmount = jest.fn();
    const options = [
      { value: 'usd', label: 'USD' },
      { value: 'eur', label: 'EUR' },
      { value: 'gbp', label: 'GBP' },
    ];
    render(
      <FromCurrencySelector
        fromCurrency='usd'
        amount={100}
        options={options}
        disabled={false}
        onChange={onChange}
        onChangeAmount={onChangeAmount}
      />
    );

    await selectEvent.select(screen.getByLabelText(/from/i), 'USD');

  expect(onChange).toHaveBeenCalled();
  expect(onChange.mock.calls[0][0]).toEqual(expect.objectContaining({ value: 'usd' }));
  });
});

