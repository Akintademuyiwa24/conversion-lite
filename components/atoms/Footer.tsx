import Image from "next/image";
import {
  RefreshCcw
} from 'lucide-react'




interface FooterProps {
    onConvert : () => void
    disabled: boolean
}

export default function Footer({onConvert, disabled}: FooterProps) {
    
    return(
        <div className="p-[8px] mt-5 b-0 bg-emerald-700 border-0 rounded-b-md flex justify-center item-center">
            <span onClick={() =>  {
                if(disabled) return
                onConvert()
            }} className="flex pt-2 pb-2 flex-col justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300">
                <RefreshCcw size={20} className="text-white" />
                <button className="text-white  cursor" disabled = {disabled}>Convert</button>
                <p ></p>
            </span>
            
        </div>
    )
}