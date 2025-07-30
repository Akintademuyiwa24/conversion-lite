// import { useState, useEffect } from "react";
import InputField from "../atoms/InputField";
import SelectDropDown from "../atoms/DropDown";

type OptionType = {
    label: string;
    value: string;
};
interface FromCurrencySelectorProps {
    options: { label: string, value: string }[];  // Array of objects with label and value (for dropdown options)
    fromCurrency: string;  // The currently selected currency
    amount: number | string;  // The amount entered by the user, can be number or string
    onChange: (option: OptionType | null) => void;  // The onChange handler for the dropdown
    onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;// The onChange handler for the dropdown
    disabled?: boolean; // Optional prop to disable the dropdown
    
  }

    const FromCurrencySelector : React.FC<FromCurrencySelectorProps> = ({fromCurrency, options,amount,onChange, onChangeAmount, disabled}) => {
        const selectedFromOption = options.find(opt => opt.value === fromCurrency) || null;
        
    return (
        <div>
            <div data-testid="from-currency-selector" className="flex flex-col justify-center items-center bg-slate-100 rounded-xl mx-4 sm:mx-8 md:mx-16 lg:mx-20 p-4 sm:p-6 md:p-8">
        {
                <SelectDropDown
                    label="From"
                    id="from"
                    options={options}
                    onChange={onChange}
                    value={selectedFromOption}
                    disabled={disabled}
                    menuPlacement="top" // opens upward

                />

            
        }
        
        
            <InputField
                value={typeof amount === 'string' ? amount : (amount || "")}
                label="Enter Amount"
                id="Amount"
                onChange={onChangeAmount}
                disabled={disabled}
            />
            </div>
        </div>
    )
}

export default FromCurrencySelector