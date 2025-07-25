
import { FaFulcrum } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

function LearnPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
            <h2 className="text-3xl font-bold mb-4 text-center">Learn More About This Product!</h2>
            <p className="mb-8 text-lg leading-relaxed text-center">
                This is a sleek and responsive currency converter application that allows users to convert one currency to another
                in real-time using up-to-date exchange rates. It was built as part of a learning project to explore core frontend technologies
                like <strong>Nextjs</strong>, <strong>Typescript</strong>, <strong>Redux</strong>, <strong>TailwindCSS</strong>, and <strong>API integration</strong>.
            </p>
            <Features />
            <CurrencyConversion />
        </div>
    );
}

const Features = () => {
    return (
        <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Core Features</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Real-time currency conversion</li>
                <li>Clean and responsive UI</li>
                <li>Mobile-first design</li>
            </ul>
        </section>
    );
};

const CurrencyConversion = () => {
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Currency Conversion Logic</h3>
            <div className="space-y-6">
                <p className="text-gray-700">When a user selects a currency and enters an amount:</p>
                <div className="space-y-4">
                    {[
                        "The input is validated to ensure it is a number",
                        "The form dispatches an action to Redux",
                        "Redux sends a request to the Exchange Rate API with the base and target currencies",
                        "The API returns the converted value",
                        "The result is stored in Redux and displayed on the UI"
                    ].map((text, i) => (
                        <div key={i} className="flex items-start gap-3 text-gray-800">
                            <FaFulcrum className="mt-1 text-blue-600" />
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-start gap-3 text-red-600 mt-6">
                    <MdError className="mt-1" />
                    <p>If the API fails, an error state is triggered</p>
                </div>
            </div>
        </section>
    );
};

export default LearnPage;
