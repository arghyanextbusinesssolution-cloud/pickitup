'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { bidService } from '@/services/bid.service';

export default function GenericCarrierTablePage({ title = 'Active Bids' }: { title?: string }) {
  const [bids, setBids] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await bidService.getMyBids();
        const bidsArray = Array.isArray(response) ? response : (response?.data || []);
        setBids(bidsArray);
      } catch (error) {
        console.error("Failed to fetch bids:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBids();
  }, []);

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
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">ID / Placed On</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Shipment Details</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">My Bid</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">Loading your bids...</td>
                </tr>
              ) : bids.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">No active bids found. Head to the load board to find jobs!</td>
                </tr>
              ) : (
                bids.map((bid, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6">
                      <div className="font-[900] text-gray-900 text-lg mb-1">{bid.id ? bid.id.substring(0, 8).toUpperCase() : `BID-${i}`}</div>
                      <div className="text-sm font-bold text-gray-400">{new Date(bid.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="text-gray-900 font-bold max-w-[200px] truncate">{bid.shipment?.title || bid.shipment?.commodity || 'Untitled Shipment'}</div>
                      <div className="text-gray-500 font-medium text-sm flex gap-1">
                        <span className="truncate max-w-[100px]">{bid.shipment?.origin?.city || 'Origin'}</span>
                        <span>→</span>
                        <span className="truncate max-w-[100px]">{bid.shipment?.destination?.city || 'Destination'}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-[900] text-green-600 text-lg">${bid.amount}</div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${bid.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 
                        bid.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {bid.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Link href={`/carrier/bids/view?id=${bid.id}`} className="inline-block bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
