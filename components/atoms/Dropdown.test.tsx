import { render, screen } from '@testing-library/react';
import SelectDropDown from './DropDown';
import userEvent from '@testing-library/user-event';

describe('SelectDropDown component', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ];
    render(
      <SelectDropDown
        options={options}
        onChange={onChange}
        label="Select an option"
        disabled={false}
        id="1"
        menuPlacement="top"
        value={null}
      />
    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('opens dropdown and selects an option', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ];

    render(
      <SelectDropDown
        options={options}
        onChange={onChange}
        label="Select an option"
        disabled={false}
        id="1"
        menuPlacement="top"
        value={null}
      />
    );

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);

    const optionToSelect = await screen.findByText('Option 1');
    await user.click(optionToSelect);

    expect(onChange).toHaveBeenCalledWith({ value: 'option1', label: 'Option 1' }, expect.objectContaining({ action: 'select-option' }));
  });

  it('does not open when disabled', () => {
    const onChange = jest.fn();
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ];

    render(
      <SelectDropDown
        options={options}
        onChange={onChange}
        label="Disabled"
        disabled={true}
        id="2"
        menuPlacement="top"
        value={null}
      />
    );

    const select = screen.getByLabelText('Disabled');
    expect(select).toBeDisabled();
  });

  it('renders with undefined disabled prop', () => {
    const onChange = jest.fn();
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ];

    render(
      <SelectDropDown
        options={options}
        onChange={onChange}
        label="Select an option"
        id="3"
        menuPlacement="bottom"
        value={null}
      />
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).not.toBeDisabled();
  });

  it('renders with default empty options array', () => {
    const onChange = jest.fn();

    render(
      <SelectDropDown
        // @ts-expect-error Testing default parameter behavior
        options={undefined}
        onChange={onChange}
        label="Empty options"
        id="4"
        value={null}
      />
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });
  
});