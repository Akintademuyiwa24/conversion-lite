import { formatCurrency } from '@/utils/formatter';

describe('formatCurrency', () => {
  it('formats a number input correctly', () => {
    expect(formatCurrency(1234.56)).toBe('1,234.56');
  });

  it('formats a string input correctly', () => {
    expect(formatCurrency("1234.56")).toBe('1,234.56');
  });

  it('adds .00 if no decimals are provided', () => {
    expect(formatCurrency(500)).toBe('500.00');
  });

  it('formats large numbers with commas', () => {
    expect(formatCurrency(12345678.9)).toBe('12,345,678.90');
  });

});