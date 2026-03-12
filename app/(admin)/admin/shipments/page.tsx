import React from 'react';
import Link from 'next/link';

export default function GlobalShipmentsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Active Shipments</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by ID, route, or status..."
            className="bg-white border-2 border-gray-200 px-6 py-3 rounded-xl transition-all font-medium min-w-[300px]"
          />
          <button className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2 shadow-sm">
            Search
          </button>
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>⬇️</span> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Listing ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Route</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Participants</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status / Bids</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6">
                    <div className="font-[900] text-gray-900 text-lg mb-0.5">SHP-104{i}</div>
                    <div className="text-sm font-bold text-gray-500">2019 Tesla Model 3</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                      <span>Austin, TX</span>
                      <span className="text-gray-300">→</span>
                      <span>Miami, FL</span>
                    </div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">1,340 miles</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-[8px] font-bold">S</span>
                      <span className="text-sm font-bold text-gray-900">U{100 + i}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-[8px] font-bold">C</span>
                      <span className="text-sm font-bold text-gray-500">{i % 2 === 0 ? `C${200 + i}` : 'None'}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-1 ${i % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      {i % 2 === 0 ? 'In Transit' : 'Awaiting Bids'}
                    </span>
                    {i % 2 !== 0 && <div className="text-xs font-bold text-gray-400">14 Active Bids</div>}
                  </td>
                  <td className="p-6 text-right">
                    <button className="bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                      Monitor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
          <button className="hover:text-gray-900 transition-colors">← Previous</button>
          <span>Page 1 of 85</span>
          <button className="hover:text-gray-900 transition-colors">Next →</button>
        </div>
      </div>
    </div>
  );
}
