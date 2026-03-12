import React from 'react';
import Link from 'next/link';

export default function PaymentsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Payment History</h1>
        <div className="flex gap-2">
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>⬇️</span> Download CSV
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl">💳</div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Spent</div>
            <div className="text-2xl font-[900] text-gray-900">$4,250.00</div>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl">🔒</div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">In Escrow</div>
            <div className="text-2xl font-[900] text-gray-900">$1,850.00</div>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">↩️</div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Refunded</div>
            <div className="text-2xl font-[900] text-gray-900">$0.00</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Shipment</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6">
                    <div className="font-[900] text-gray-900 text-lg mb-1">TXN-902{i}</div>
                    <div className="text-sm font-bold text-gray-400">Oct {10 + i}, 2026</div>
                  </td>
                  <td className="p-6">
                    <div className="text-gray-900 font-bold">2019 Tesla Model 3</div>
                    <div className="text-purple-600 text-sm hover:underline cursor-pointer">BKG-883{i}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-[900] text-gray-900 text-lg">${850 + (i * 100)}</div>
                    <div className="text-xs font-bold text-gray-400">Visa ending in 4242</div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                      {i === 0 ? 'Held in Escrow' : 'Released to Carrier'}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                      Receipt
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
