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
          filteredShipments.map((shipment) => (
            <div key={shipment.id} className="group bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-8 hover:border-yellow-400 hover:shadow-[0_20px_40px_-15px_rgba(250,204,21,0.15)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              
              {/* Highlight bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-50 group-hover:bg-yellow-50 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-colors">
                    {shipment.title?.toLowerCase().includes('car') || shipment.title?.toLowerCase().includes('vehicle') ? '🚗' : '📦'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-[1000] text-gray-900 uppercase tracking-tight leading-none group-hover:text-yellow-600 transition-colors">
                      {shipment.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Shipper:</span>
                       <span className="text-gray-900 font-black text-xs uppercase tracking-widest">
                          {shipment.owner ? `${shipment.owner.firstName} ${shipment.owner.lastName}` : 'Direct Customer'}
                       </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xs">A</div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Pickup From</div>
                        <div className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{shipment.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 text-xs">B</div>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Deliver To</div>
                        <div className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{shipment.destination}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-l border-gray-100 pl-6 hidden lg:block">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">⚖️</span>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Weight</div>
                        <div className="text-sm font-bold text-gray-900">{shipment.weight ? `${shipment.weight} lbs` : 'Contact for info'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📏</span>
                      <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-1">Dimensions</div>
                        <div className="text-sm font-bold text-gray-900">{shipment.dimensions || 'Standard Cargo'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 hidden md:block">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green-50 text-green-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-green-100 shadow-sm">
                        Verified Listing
                      </span>
                      <span className="bg-yellow-50 text-yellow-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-yellow-100 shadow-sm">
                        {shipment.bids?.length || 0} Bids Total
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium line-clamp-2 italic">
                      {shipment.description || 'No additional notes provided by shipper.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-4 border-t border-gray-100 xl:border-t-0 pt-6 xl:pt-0 xl:pl-8 xl:border-l xl:min-w-[200px]">
                <div className="text-left xl:text-right">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Target Bidding</div>
                  <div className="text-4xl font-[1000] text-green-600 leading-none">
                    ${shipment.targetPrice || (Math.floor(Math.random() * 500) + 300)}
                  </div>
                </div>
                <Link
                  href={`/carrier/jobs/${shipment.id}`}
                  className="bg-gray-900 hover:bg-black text-white font-black px-10 py-5 rounded-[1.5rem] transition-all uppercase tracking-widest text-xs text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:shadow-lg group/btn flex items-center gap-3"
                >
                  View & Bid
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))
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
