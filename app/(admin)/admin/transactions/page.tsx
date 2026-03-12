import React from 'react';

export default function AdminTransactionsPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Escrow & Financials</h1>
                <div className="flex gap-2">
                    <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
                        <span>⬇️</span> Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-900 text-white rounded-[2rem] p-6 shadow-xl border border-gray-800">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Held in Escrow</div>
                    <div className="text-3xl font-[900] mb-2">$425,850.00</div>
                    <div className="text-xs font-bold text-green-500 uppercase tracking-wide">Across 412 Shipments</div>
                </div>
                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Payouts</div>
                    <div className="text-3xl font-[900] text-gray-900 mb-2">$32,140.00</div>
                    <div className="text-xs font-bold text-yellow-500 uppercase tracking-wide">42 Carriers Awaiting</div>
                </div>
                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Platform Revenue (MTD)</div>
                    <div className="text-3xl font-[900] text-green-600 mb-2">$84,500.00</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">From booking fees</div>
                </div>
                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Disputed Funds</div>
                    <div className="text-3xl font-[900] text-red-500 mb-2">$8,400.00</div>
                    <div className="text-xs font-bold text-red-400 uppercase tracking-wide">Action Required</div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Parties</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">System Status</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6">
                                        <div className="font-[900] text-gray-900 text-lg mb-0.5">TXN-48{i}92</div>
                                        <div className="text-sm font-bold text-gray-400">Oct {10 + i}, 2026 10:45 AM</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm font-bold text-gray-900 mb-1">From: <span className="text-blue-600">John Doe (U{100 + i})</span></div>
                                        <div className="text-sm font-bold text-gray-900">To: <span className="text-purple-600">Cooper Motors (C{200 + i})</span></div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-[900] text-gray-900 text-lg">${1250 + (i * 50)}.00</div>
                                        <div className="text-xs font-bold text-green-500">+$125.00 Fee</div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${i === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                i === 2 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {i === 1 ? 'Escrow Held' : i === 2 ? 'Disputed' : 'Payout Issued'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                                            Log
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
