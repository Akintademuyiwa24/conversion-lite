'use client'

import { useEffect, useState } from "react";
import ConvertFooter from "../atoms/Footer"
import LiveRate from "../atoms/SwapRate";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatter" 
import { useGetRatesQuery } from "@/features/currencyAPI";
import FromCurrencySelector from "../molecules/FromCurrencySelector";
import ToCurrencySelector from "../molecules/ToCurrencySelector";


interface FromCurrencyChangeOption {
    value: string;
    label: string;
}

interface ToCurrencyChangeOption {
    value: string;
    label: string;
}

function CurrencyConverter() {
 

    // State to hold the amount entered by the user
    const [amount, setAmount] = useState<number>();

    // State for the base currency (the one converting from)
    const[fromCurrency, setFromCurrency] = useState("USD");

    // State for the target currency (the one converting to)
    const [toCurrency, setToCurrency] = useState("NGN")

    
    // State to hold the result of the conversion
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    const [hasConverted, setHasConverted ] = useState(Boolean(null))

    const [isOnline, setIsOnline] = useState(true); // Default to true for SSR
    const [isMounted, setIsMounted] = useState(false);
    
   
    const { isLoading, error, data: rates } = useGetRatesQuery(fromCurrency);

    
   const currencyOptions = Object.keys(rates || {}).map((currency) => ({
    label: currency,
    value: currency
   }))

 
  
//    handler to do the conversion when user clicks "Convert"
   const handleConvert = () => {
    if(rates && toCurrency && amount) {
        const rate = rates[toCurrency]
        const result = amount  * rate
        setConvertedAmount(result)
        setHasConverted(true)

        const conversion = {
            amount,
            fromCurrency,
            toCurrency,
            result,
            data: new Date().toISOString() // Adding a timestamp for the conversion
        };

        const prev = JSON.parse(localStorage.getItem('conversions') || '[]');

        const updatedConversions = [...prev, conversion]; // Keep only the last 5 conversions
        localStorage.setItem('conversions', JSON.stringify(updatedConversions));

    }
    
   }

    // hook to do conversion live after the intial conversion triggered by the convert button
   useEffect(() => {

        if(hasConverted && rates && toCurrency && amount && !isNaN(Number(amount))) {
            const rate = rates[toCurrency]
            const result = amount * rate
            setConvertedAmount(result)
        }
   }, [amount,rates, toCurrency, hasConverted])

   // Swap handler
    const handleSwap = () => {
        const swapCurrency = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(swapCurrency);
    
  };

  
   //handler for the amount field
   const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = e.target.valueAsNumber;
    
    // Only set valid numbers to state
    if (inputValue === "" || inputValue === undefined) {
        setAmount(undefined); // Keep empty state as undefined
        setConvertedAmount(null);
        setHasConverted(false);
    } else if (!isNaN(numericValue)) {
        setAmount(numericValue); // Only set if it's a valid number
    }
    // If invalid input (NaN), don't update amount state at all
}


const handleFromCurrencyChange = (option: FromCurrencyChangeOption | null) => {
    setFromCurrency(option ? option.value : "USD");

}

   //Handle "to currency" input
   const handleToCurrencyChange = (option: ToCurrencyChangeOption | null) => {
        setToCurrency(option ? option.value : "NGN");
        
   }

   //disable convert button/component
   const convertButtonDisabled = 
    !amount || 
    amount === undefined || 
    isNaN(amount) || 
    !fromCurrency || 
    !toCurrency || 
    fromCurrency === toCurrency || 
    !!error;

  useEffect(() => {
    // Set the initial online state after component mounts
    setIsMounted(true);
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
 
  return (
    <div className="pt-6 flex flex-col justify-center mt-28 border rounded-lg border-green-800">
        {isLoading && <p>Fetching currency rates...</p>}
        {error && <p>Failed to load rates</p>}
        {isMounted && !isOnline && <p>You are offline. Some features may not work.</p>}
        
        <FromCurrencySelector amount={amount || ""} onChangeAmount={handleAmount} disabled={!!error} onChange={handleFromCurrencyChange} fromCurrency={fromCurrency} options={currencyOptions}/>
        <LiveRate onChange = {handleSwap}/>
        <ToCurrencySelector options = {currencyOptions} disabled={!!error} onChange = {handleToCurrencyChange} toCurrency = {toCurrency} />

        <div className="flex flex-col items-center justify-center w-full">
            {convertedAmount !== null && (
            <div className="font-mono px-4 py-2 text-sm text-black border border-green-950 bg-green-100 rounded-lg focus:ring mx-2 my-2 text-center">
                {amount &&
                `${formatCurrency(amount)} ${fromCurrency} = ${formatCurrency(convertedAmount)} ${toCurrency}`
                }
            </div>
            )}
            
            {!hasConverted && !error && (
            <div className="text-gray-500 text-sm mx-2 my-2 text-center">
                Enter an amount and select currencies to convert.
            </div>
            )}

            {/* Button to show conversion history */}
            <button
            className="my-4 px-4 py-2 bg-gray-700 text-white rounded"
           
            >
            <Link href="/convert/transaction" className="w-full flex justify-center">
                View Conversion History
            </Link>
            </button>
        </div>


        {/* Footer with the convert button */}
        <ConvertFooter onConvert = {handleConvert} disabled = {convertButtonDisabled}/>
        
    </div>
)}

export default CurrencyConverter
