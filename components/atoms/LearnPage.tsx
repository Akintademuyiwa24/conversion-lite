
import { FaFulcrum } from "react-icons/fa6";
import { MdError } from "react-icons/md";

function LearnPage() {
  return (
    <div>
        <div>
            <h2 className="text-white">Learn More About This Product Here!</h2>
            <p className="text-[14px] text-white font-serif p-3 bg-amber-800 mx-8 rounded-lg mt-2">
                This is a sleek and responsive currency converter application that allows user to convert one currency to another in real-time using up-to-date
                exchange rates. It was built as a part of a learning project to explore core frontend technologies like React,
                Typescript, Redux, TailwindCSS, and API integration.
            </p>
        </div>

        <Features/>
        <CurrencyConversion/>
        
    </div>
  )
}

const Features = () => {
    return (
        <div>
            <span>
                <h2 className="font-serif text-xl p-4">Core Features</h2>
                <div className="font-mono flex flex-col text-white gap-4 sm:flex-row mx-8">
                    <p className="bg-amber-700 rounded-lg p-4 text-sm hover:scale-105 transform transition-all">Real-time currency conversion</p>
                    <p className="bg-amber-700 rounded-lg p-4 text-sm hover:scale-105 transform transition-all">Clean and responsive UI</p>
                    <p className="bg-amber-700 rounded-lg p-4 text-sm hover:scale-105 transform transition-all">Mobile-first design</p>
                </div>
            </span>
        </div>
    )
}

const CurrencyConversion = () => {
    return (
        <div >
            <h2 className="font-serif p-2 pt-6 text-black text-xl">Currency Conversion Logic</h2>
            <div className="bg-slate-600 mx-8 rounded-lg pt-4">
                <span className="">
                    <p className="text-white">When a user select a currency and enters an amount:</p>
                    <div className="block text-start p-4 text-white text-[16px]">
                        <span className="flex justify-start items-center gap-2 pb-2"><FaFulcrum size={20} className="text-shadow-sky-800"/><p>The input is validated to ensure it is a number</p></span>
                        <span className="flex justify-start items-center gap-2 "><FaFulcrum size={20} className="text-shadow-sky-800"/><p>The form dispatches an action to Redux</p></span>
                        <span className="flex justify-start items-center gap-2 pb-4"><FaFulcrum size={20} className="text-shadow-sky-800"/><p className="relative top-[10px]">Redux sends a request to the Exchange Rate API with the base and target currencies</p></span>
                        <span className="flex justify-start items-center gap-2 pb-2"><FaFulcrum size={20} className="text-shadow-sky-800"/><p>The API returns the converted value</p></span>
                        <span className="flex justify-start items-center gap-2"><FaFulcrum size={20} className="text-shadow-sky-800"/><p> The result is stored in Redux and displayed on the UI</p></span>
                    </div>
                    <span className="flex flex-col pt-2 sm:flex-row justify-center items-center gap-[2px] bg-black rounded-t-lg mx-10 my-4"><MdError className="text-white bg-red-500 rounded-full border-red-500 border"/> <p className="py-2 px-1 text-white text-sm font-mono">If the API fails, an error state is triggered</p></span>
                </span>
            </div>
        </div>
    )
}

export default LearnPage