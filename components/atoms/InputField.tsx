type InputFieldProps = {
    label: string
    value: number | string
    id: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    disabled?: boolean
}

export default function InputField({label, id, value, onChange, placeholder, disabled} : InputFieldProps) {
    return (
        <div className="p-4 flex flex-col justify-center text-center relative mt-[-30px]">
            <label htmlFor={id} data-testid="input-label" className="block text-sm font-medium text-gray-800 mt-10">
                {label}
            </label>
            <input 
                type="number"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                id={id} 
                className="w-[180px] text-sm rounded-md px-2 py-3 mt-1 dark:text-black outline-0 border border-gray-400"
                disabled={disabled}
                
            />
        </div>
    )
}