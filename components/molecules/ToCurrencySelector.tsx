
import SelectDropDown from "../atoms/DropDown";

type OptionType = {
    label: string;
    value: string;
};
interface ToCurrencySelectorProps {
    options: { label: string, value: string }[];  // Array of objects with label and value (for dropdown options)
    toCurrency: string;  // The currently selected currency
    onChange: (option: OptionType | null) => void;  // The onChange handler for the dropdown
    disabled?: boolean; // Optional prop to disable the dropdown    
  }


 const ToCurrencySelector: React.FC<ToCurrencySelectorProps> =  ({options, toCurrency, onChange, disabled}) => {
    // Find the selected option object
    const selectedToOption = options.find(opt => opt.value === toCurrency) || null;
    

    return (
        <div>
            <div className="flex justify-center items-center bg-slate-100 rounded-xl mx-4 sm:mx-8 md:mx-16 lg:mx-20 p-4 sm:p-6 md:p-8">
                <SelectDropDown
                    label="To"
                    id="to"
                    onChange={onChange}
                    value={selectedToOption}
                    options={options}
                    disabled={disabled}
                    menuPlacement="bottom" // opens downward
                />
            </div>
        </div>
    )
}

export default ToCurrencySelector
