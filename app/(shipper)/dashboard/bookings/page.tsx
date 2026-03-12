import React from 'react';
import Link from 'next/link';

export default function BookingsPaymentsDisputesPage({ title = 'Bookings' }: { title?: string }) {
  // This is a generic table layout that can be used for Bookings, Payments, Disputes, Reviews
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">My Bookings</h1>
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
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Booking ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Shipment</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Carrier</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-6">
                    <div className="font-[900] text-gray-900 text-lg mb-1">BKG-883{i}</div>
                    <div className="text-sm font-bold text-gray-400">Oct {10 + i}, 2026</div>
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <div className="text-gray-900 font-bold">2019 Tesla Model 3</div>
                    <div className="text-purple-600 text-sm hover:underline cursor-pointer">SHP-104{i}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-gray-900 font-bold">Pro Haulers LLC</div>
                    <div className="text-yellow-500 text-sm font-bold">★ 4.8</div>
                  </td>
                  <td className="p-6">
                    <div className="font-[900] text-gray-900 text-lg">${850 + (i * 100)}</div>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-yellow-100 text-yellow-700">
                      In Progress
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <Link href={`/dashboard/bookings/BKG-883${i}`} className="inline-block bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
          <button className="hover:text-purple-600 transition-colors">← Previous</button>
          <span>Page 1 of 1</span>
          <button className="hover:text-purple-600 transition-colors text-gray-300 cursor-not-allowed">Next →</button>
        </div>
      </div>
    </div>
  );
}
