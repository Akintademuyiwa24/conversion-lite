'use client';

import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

type HistoryProp = {
    data: string;
    amount: number;
    fromCurrency: string;
    toCurrency: string;
    result: number;
};

export default function TransactionHistory() {
    const [history, setHistory] = useState<HistoryProp[]>([]);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<HistoryProp[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const router = useRouter();
    const mode = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('conversions') || '[]');
        setHistory(stored);
        setFiltered(stored);
    }, []);

    useEffect(() => {
        if (!search) {
            setFiltered(history);
        } else {
            setFiltered(
                history.filter(
                    (conv) =>
                        conv.fromCurrency.toLowerCase().includes(search.toLowerCase()) ||
                        conv.toCurrency.toLowerCase().includes(search.toLowerCase()) ||
                        conv.amount.toString().includes(search) ||
                        conv.result.toString().includes(search)
                )
            );
        }
    }, [search, history]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    return (
        <div>
            <div className="flex flex-col gap-5 mb-8">
                <button
                    onClick={() => router.back()}
                    className={`self-start border-none rounded-md px-4 py-2 font-medium text-base cursor-pointer shadow-sm transition-colors duration-200 ${
                        mode === "dark" 
                            ? "bg-gray-700 text-gray-100 hover:bg-gray-600" 
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                >
                    ← Back to Converter
                </button>

                <h2 className={`text-2xl font-bold m-0 tracking-wide ${
                    mode === "dark" ? "text-gray-100" : "text-gray-900"
                }`}>
                    Last 5 Conversions
                </h2>

                <input
                    type="text"
                    placeholder="Search by amount, currency, or result..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`px-4 py-3 mt-5 rounded-lg border text-base outline-none shadow-sm w-full transition-colors duration-200 ${
                        mode === "dark" 
                            ? "border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:border-gray-500" 
                            : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400"
                    }`}
                    style={{ maxWidth: "340px" }}
                />
            </div>

            {filtered.length === 0 ? (
                <div className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
                    No conversions found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table
                        className={`w-full rounded-xl shadow-lg text-center overflow-hidden ${
                            mode === "dark" ? "bg-gray-900" : "bg-white"
                        }`}
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <thead className="">
                            <tr className="pl-10 text-right">
                                <th
                                    className={`text-left p-4 font-semibold text-base border-b ${
                                        mode === "dark" ? "text-gray-100 bg-gray-700 border-gray-600" : "text-gray-900 bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    Date
                                </th>
                                <th
                                    className={`text-left p-4 font-semibold text-base border-b ${
                                        mode === "dark" ? "text-gray-100 bg-gray-700 border-gray-600" : "text-gray-900 bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    Amount
                                </th>
                                <th
                                    className={`text-left p-4 font-semibold text-base border-b ${
                                        mode === "dark" ? "text-gray-100 bg-gray-700 border-gray-600" : "text-gray-900 bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    From
                                </th>
                                <th
                                    className={`text-left p-4 font-semibold text-base border-b ${
                                        mode === "dark" ? "text-gray-100 bg-gray-700 border-gray-600" : "text-gray-900 bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    To
                                </th>
                                <th
                                    className={`text-left p-4 font-semibold text-base border-b ${
                                        mode === "dark" ? "text-gray-100 bg-gray-700 border-gray-600" : "text-gray-900 bg-gray-50 border-gray-200"
                                    }`}
                                >
                                    Result
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                            {paginated.map((conv, idx) => (
                                <tr
                                    key={idx}
                                    className={`border-b-4 border-transparent ${
                                        mode === "dark" ? "bg-gray-700" : "bg-gray-100"
                                    }`}
                                >
                                    <td className="p-4 text-sm">
                                        {new Date(conv.data).toLocaleString()}
                                    </td>
                                    <td className="p-4 font-medium">
                                        {conv.amount}
                                    </td>
                                    <td className="p-4 uppercase tracking-wide">
                                        {conv.fromCurrency}
                                    </td>
                                    <td className="p-4 uppercase tracking-wide">
                                        {conv.toCurrency}
                                    </td>
                                    <td className="p-4 font-semibold text-green-500">
                                        {formatCurrency(conv.result)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md border-none font-medium text-base transition-colors duration-200 ${
                                currentPage === 1 
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                                    : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                            }`}
                        >
                            Previous
                        </button>
                        <span className={`font-medium text-base ${
                            mode === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-md border-none font-medium text-base transition-colors duration-200 ${
                                currentPage === totalPages 
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                                    : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
