import React from 'react';
import Link from 'next/link';

export default function DisputesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Resolution Center</h1>
        <button className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
          <span>⚠️</span> Open New Dispute
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Case ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Shipment</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Reason</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-6">
                  <div className="font-[900] text-gray-900 text-lg mb-1">CAS-1024</div>
                  <div className="text-sm font-bold text-gray-400">Oct 12, 2026</div>
                </td>
                <td className="p-6 hidden md:table-cell">
                  <div className="text-gray-900 font-bold">Vintage Oak Dining Table</div>
                  <div className="text-purple-600 text-sm hover:underline cursor-pointer">BKG-8830</div>
                </td>
                <td className="p-6">
                  <div className="text-gray-900 font-bold">Item Damaged Delivery</div>
                </td>
                <td className="p-6">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-yellow-100 text-yellow-700">
                    Under Review
                  </span>
                </td>
                <td className="p-6 text-right">
                  <button className="bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                    View Case
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
