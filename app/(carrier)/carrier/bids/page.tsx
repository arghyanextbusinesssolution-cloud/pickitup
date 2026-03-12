import React from 'react';
import Link from 'next/link';

export default function GenericCarrierTablePage({ title = 'Active Bids' }: { title?: string }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">{title}</h1>
        <div className="flex gap-2">
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>🔍</span> Filter
          </button>
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>⬇️</span> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Route & Details</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">My Bid</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6">
                    <div className="font-[900] text-gray-900 text-lg mb-1">BID-993{i}</div>
                    <div className="text-sm font-bold text-gray-400">Oct {10 + i}, 2026</div>
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <div className="text-gray-900 font-bold">2019 Tesla Model 3</div>
                    <div className="text-gray-500 font-medium text-sm">Austin, TX → Miami, FL</div>
                  </td>
                  <td className="p-6">
                    <div className="font-[900] text-green-600 text-lg">${850 + (i * 100)}</div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {i === 0 ? 'Pending' : 'Outbid'}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <Link href={`/carrier/jobs/10${i}`} className="inline-block bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                      {i === 0 ? 'Edit Bid' : 'Rebid'}
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
