import React from 'react';
import Link from 'next/link';

export default function AdminDisputesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Resolution Center</h1>
        <div className="flex gap-2">
          <button className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>⚠️</span> Active Alerts (12)
          </button>
          <button className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2 shadow-sm">
            Filter Queue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Active Cases</div>
          <div className="text-4xl font-[900] text-gray-900">42</div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-red-200 shadow-sm bg-red-50/30 text-red-900">
          <div className="text-sm font-bold text-red-500 uppercase tracking-widest mb-1">Needs Immediate Review</div>
          <div className="text-4xl font-[900]">12</div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Average Resolution Time</div>
          <div className="text-4xl font-[900] text-gray-900">3.2 Days</div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Case ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Shipment / Value</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Claim Details</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6">
                    <div className="font-[900] text-gray-900 text-lg mb-0.5">CAS-104{i}</div>
                    <div className="text-sm font-bold text-gray-400">Opened Oct {10 - i}, 2026</div>
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <div className="text-sm font-bold text-gray-900">Vintage Oak Dining Table</div>
                    <div className="text-sm font-bold text-red-500 mt-1">Escrow: ${850 + (i * 50)}.00</div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-gray-900">{i % 2 === 0 ? 'Damage on Delivery' : 'No Show / Delay'}</div>
                    <div className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">Filed by: Shipper</div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${i < 3 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {i < 3 ? 'Awaiting Admin' : 'Gathering Evidence'}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <Link href={`/admin/disputes/CAS-104${i}`} className="inline-block bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-white hover:bg-gray-900 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                      Adjudicate
                    </Link>
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
