import React from 'react';

export default function EarningsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Earnings & Payouts</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">💵</div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Available Balance</div>
            <div className="text-2xl font-[900] text-gray-900">$3,450.00</div>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl">🕒</div>
          <div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Pending (In Transit)</div>
            <div className="text-2xl font-[900] text-gray-900">$1,850.00</div>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-purple-200 shadow-sm flex items-center gap-6 relative overflow-hidden group hover:border-purple-600 transition-colors cursor-pointer">
          <div className="absolute inset-0 bg-purple-50 group-hover:bg-purple-100 transition-colors -z-10"></div>
          <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-md">🏦</div>
          <div>
            <div className="text-sm font-bold text-purple-900 uppercase tracking-widest mb-1">Next Payout</div>
            <div className="text-2xl font-[900] text-purple-900">Oct 15</div>
            <span className="text-xs font-bold text-purple-600 absolute top-4 right-4 group-hover:underline">Edit Setup</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Recent Transactions</h2>
          <button className="text-purple-600 font-bold hover:text-purple-700 text-sm uppercase tracking-widest">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-6">
                  <div className="font-[900] text-gray-900 mb-1">Oct 12, 2026</div>
                  <div className="text-xs font-bold text-gray-400">10:45 AM</div>
                </td>
                <td className="p-6">
                  <div className="text-gray-900 font-bold">Payout to Checking ****4921</div>
                  <div className="text-gray-400 text-sm">Automatic Bi-Weekly Transfer</div>
                </td>
                <td className="p-6">
                  <div className="font-[900] text-red-600 text-lg">-$4,200.00</div>
                </td>
                <td className="p-6">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-green-100 text-green-700">Completed</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-6">
                  <div className="font-[900] text-gray-900 mb-1">Oct 10, 2026</div>
                  <div className="text-xs font-bold text-gray-400">02:30 PM</div>
                </td>
                <td className="p-6">
                  <div className="text-gray-900 font-bold">Delivery Confirmed: Tesla Model 3</div>
                  <div className="text-purple-600 text-sm hover:underline cursor-pointer">BKG-8830</div>
                </td>
                <td className="p-6">
                  <div className="font-[900] text-green-600 text-lg">+$850.00</div>
                </td>
                <td className="p-6">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-green-100 text-green-700">Cleared</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
