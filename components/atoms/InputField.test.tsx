import {render, screen, fireEvent} from '@testing-library/react';
import InputField from './InputField';

describe('InputField component', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    render(<InputField label='Test Input' value={100} id='1' onChange={onChange} disabled={false} placeholder='Enter text'/>);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });
  
    it('displays the correct label', () => {
        const onChange = jest.fn();
        render(<InputField label='Test Input' value={100} id='1' onChange={onChange} disabled={false} placeholder='Enter text'/>);
        const label = screen.getByText('Test Input');
        expect(label).toBeInTheDocument();
    });

  it('behaves correctly when disabled', () => {
    const onChange = jest.fn();
    render(<InputField label='Test Input' value={100} id='1' onChange={onChange} disabled={true} placeholder='Enter text'/>);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, {target: {value: 100}});
    expect(onChange).not.toHaveBeenCalled();

  });
});