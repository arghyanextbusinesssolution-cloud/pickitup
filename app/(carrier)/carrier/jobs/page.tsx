'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '../../../../services/shipment.service';

export default function LoadBoardPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const data = await shipmentService.getAvailable();
        setShipments(Array.isArray(data) ? data : (data?.data || []));
      } catch (error) {
        console.error("Failed to fetch loads:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoads();
  }, []);

  const filteredShipments = shipments.filter(shipment => 
    shipment.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.origin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-[900] text-[#1a1b3a] uppercase tracking-tight mb-2">Load Board</h1>
          <p className="text-gray-500 font-medium">Find available shipments and grow your transport business.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">🔍</span>
            <input
              type="text"
              placeholder="Search origin, destination, or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border-2 border-gray-100 hover:border-gray-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 px-12 py-4 rounded-2xl transition-all font-bold text-gray-900 min-w-[320px] outline-none shadow-sm"
            />
          </div>
          <button className="bg-[#1a1b3a] hover:bg-[#2D1B69] text-white font-bold px-8 py-4 rounded-2xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            <span>⚙️</span> Filters
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Scanning for premium loads...</p>
          </div>
        ) : filteredShipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 text-center px-6">
            <div className="text-6xl mb-6">🏜️</div>
            <h3 className="text-2xl font-black text-gray-900 uppercase mb-2">No shipments found</h3>
            <p className="text-gray-500 font-medium max-w-md mx-auto">Try adjusting your search query or filters to find more available transport opportunities.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 text-yellow-600 font-black uppercase tracking-widest text-sm hover:text-yellow-700 underline underline-offset-8"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Shipment</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap hidden md:table-cell">Route (A → B)</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap hidden lg:table-cell">Specifications</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Pricing & Activity</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap text-right text-transparent">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-yellow-50/50 transition-colors group">
                      <td className="p-6 align-top">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl border border-gray-200 shadow-sm shrink-0">
                            {shipment.title?.toLowerCase().includes('car') || shipment.title?.toLowerCase().includes('vehicle') ? '🚗' : '📦'}
                          </div>
                          <div>
                            <div className="font-[900] text-gray-900 text-lg group-hover:text-yellow-600 transition-colors uppercase leading-tight mb-1">{shipment.title || shipment.commodity || 'Standard Shipment'}</div>
                            <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Shipper: {shipment.owner ? `${shipment.owner.firstName} ${shipment.owner.lastName}` : 'Direct Customer'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 align-top hidden md:table-cell">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-black shrink-0">A</span>
                           <span className="text-sm font-bold text-gray-900 truncate max-w-[200px] uppercase">{shipment.origin?.city || shipment.originAddress || shipment.origin}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-black shrink-0">B</span>
                           <span className="text-sm font-bold text-gray-900 truncate max-w-[200px] uppercase">{shipment.destination?.city || shipment.destinationAddress || shipment.destination}</span>
                        </div>
                      </td>
                      <td className="p-6 align-top hidden lg:table-cell">
                        <div className="text-sm font-bold text-gray-900 uppercase">Weight: {shipment.weight ? `${shipment.weight} lbs` : 'Contact'}</div>
                        <div className="text-xs font-black text-gray-400 mt-2 uppercase">Type: {shipment.commodity || 'Standard Cargo'}</div>
                      </td>
                      <td className="p-6 align-top">
                        <div className="text-2xl font-[900] text-green-600 tracking-tight leading-none mb-1">
                          💰 ${shipment.budgetMax || shipment.targetPrice || shipment.budgetMin || 687}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">Based on similar shipments</div>
                        <div className={`text-xs font-black uppercase tracking-widest ${shipment.bids?.length ? 'text-blue-600' : 'text-yellow-600'}`}>
                          {shipment.bids?.length ? `🚀 ${shipment.bids.length} Active Bids` : '🚀 No bids yet — be the first'}
                        </div>
                      </td>
                      <td className="p-6 relative text-right align-middle">
                        <Link
                          href={`/carrier/jobs/view?id=${shipment.id}`}
                          className="inline-flex items-center justify-center bg-gray-900 hover:bg-yellow-500 text-white hover:text-gray-900 font-black px-6 py-4 rounded-xl transition-all uppercase tracking-widest text-[10px] whitespace-nowrap shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Place Bid →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && filteredShipments.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button className="group bg-white border-2 border-gray-100 hover:border-yellow-400 text-gray-400 hover:text-gray-900 font-black px-12 py-5 rounded-[2rem] transition-all uppercase tracking-[0.2em] text-[10px] shadow-sm hover:shadow-xl flex items-center gap-4">
            Load More Opportunities
            <span className="text-yellow-500 group-hover:translate-y-1 transition-transform">↓</span>
          </button>
        </div>
      )}
    </div>
  );
}
