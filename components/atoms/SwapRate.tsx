import { RiArrowUpDownLine } from "react-icons/ri";

interface SwapRateProps {
    onChange: () => void
}



function SwapRate({onChange}: SwapRateProps){
    return (
        <div className="bg-slate-800 p-[10px] border-0 mb-2  mt-2 rounded-2xl text-center m-auto max-w-[50px]">
            <div className="flex justify-center items-center gap-2">
                <button aria-label="swap" onClick={onChange}><RiArrowUpDownLine size={30} className="rounded-md dark:bg-slate-700 bg-slate-200"/></button> 
            </div>
        </div>
    )
}

export default SwapRate