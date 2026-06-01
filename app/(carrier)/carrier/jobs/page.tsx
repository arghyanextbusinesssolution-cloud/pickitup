'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '../../../../services/shipment.service';
import ShipmentFilter, { FilterState } from '../../../../components/shipments/ShipmentFilter';

export default function LoadBoardPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    minBids: '',
    maxDistance: '',
    minWeight: '',
    maxWeight: '',
    weightUnit: '',
    minBudget: '',
    maxBudget: '',
    category: ''
  });

  const fetchLoads = async () => {
    try {
      setIsLoading(true);
      const data = await shipmentService.getAvailable(filters);
      setShipments(Array.isArray(data) ? data : (data?.data || []));
    } catch (error) {
      console.error("Failed to fetch loads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  const handleApplyFilters = () => {
    fetchLoads();
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      startDate: '',
      minBids: '',
      maxDistance: '',
      minWeight: '',
      maxWeight: '',
      weightUnit: '',
      minBudget: '',
      maxBudget: '',
      category: ''
    };
    setFilters(clearedFilters);
    // Fetch loads with cleared filters
    const resetLoads = async () => {
      try {
        setIsLoading(true);
        const data = await shipmentService.getAvailable(clearedFilters);
        setShipments(Array.isArray(data) ? data : (data?.data || []));
      } catch (error) {
        console.error("Failed to fetch loads:", error);
      } finally {
        setIsLoading(false);
      }
    };
    resetLoads();
    setShowFilters(false);
  };

  const filteredShipments = shipments.filter((shipment: any) =>
    shipment.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.origin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto relative px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-[32px] sm:text-[42px] font-[900] text-[#13182C] uppercase tracking-tighter leading-tight mb-2 font-hanken">Available Loads</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs sm:text-sm font-hanken">Find and bid on shipments in your region.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 relative">
          <div className="relative group min-w-[320px] sm:min-w-[400px]">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#22C55E] text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search origin, destination, or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 px-14 py-5 rounded-2xl transition-all font-bold text-[#13182C] outline-none shadow-sm placeholder:text-gray-300 font-hanken"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-[#13182C] hover:bg-black text-white font-black px-10 py-5 rounded-2xl transition-all uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 active:translate-y-0 font-hanken"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span> Filters
          </button>

          {showFilters && (
            <div className="absolute top-full right-0 mt-3 z-50">
              <ShipmentFilter
                filters={filters}
                setFilters={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Scanning Active Opportunities...</p>
          </div>
        ) : filteredShipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-gray-100 text-center px-10 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-8 border border-gray-100">🌵</div>
            <h3 className="text-3xl font-[900] text-[#1a1b3a] uppercase mb-3 tracking-tight">No Loads in Sight</h3>
            <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">Relax the filters or search query to see all currently available transport shipments.</p>
            <button
              onClick={handleClearFilters}
              className="mt-10 px-8 py-3 bg-yellow-50 text-yellow-600 font-black uppercase tracking-[0.15em] text-[11px] rounded-xl hover:bg-yellow-100 transition-colors"
            >
              Reset Everything
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* Header row hidden on mobile */}
            <div className="hidden lg:grid grid-cols-12 gap-6 px-10 py-6 bg-gray-50 border-b border-gray-100">
              <div className="col-span-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Shipment</div>
              <div className="col-span-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Route (A → B)</div>
              <div className="col-span-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Specifications</div>
              <div className="col-span-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Pricing & Activity</div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredShipments.map((shipment) => (
                <div key={shipment.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 p-10 lg:items-center hover:bg-[#FBBF24]/5 transition-all group">

                  {/* Shipment & Shipper */}
                  <div className="col-span-1 lg:col-span-3 flex items-start gap-5">
                    <div className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:border-[#FBBF24] transition-colors shrink-0">
                      {shipment.category === 'Vehicles' ? '🚗' :
                        shipment.category === 'Fragile Items' ? '🧊' :
                          shipment.category === 'Heavy Equipment' ? '🚜' : '📦'}
                    </div>
                    <div>
                      <h4 className="text-[20px] font-[900] text-[#13182C] uppercase leading-tight tracking-tight mb-1 group-hover:text-[#FBBF24] transition-colors italic font-hanken">
                        {shipment.title || shipment.commodity || 'Standard Cargo'}
                      </h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] font-mono">
                        Shipper: <span className="text-gray-600 uppercase font-mono">{shipment.owner ? `${shipment.owner.firstName} ${shipment.owner.lastName}` : 'DIRECT CLIENT'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Route Visualization */}
                  <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 relative">
                    <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-4 ring-green-100 shrink-0"></div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-[900] text-[#13182C] uppercase truncate font-hanken">
                          {shipment.originCity || (shipment.originAddress && shipment.originAddress.split(',')[0]) || 'Origin'}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase truncate font-mono">
                          {shipment.originState || (shipment.originAddress && shipment.originAddress.split(',')[1]?.trim()) || 'Region'}
                        </p>
                      </div>
                    </div>

                    {/* Vertical line connecting dots */}
                    <div className="absolute left-[4.5px] top-[14px] bottom-[14px] w-[1px] border-l-2 border-dashed border-gray-200"></div>

                    {/* Total Distance Badge */}
                    <div className="absolute left-[20px] top-1/2 -translate-y-1/2 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1.5 transform hover:scale-105 transition-transform cursor-default">
                      <span className="material-symbols-outlined text-[12px] text-gray-400">straighten</span>
                      <span className="text-[10px] font-black text-[#13182C] font-mono whitespace-nowrap">
                        {(shipment.distanceMiles || 0).toLocaleString()} MILES
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] ring-4 ring-yellow-100 shrink-0"></div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-[900] text-[#13182C] uppercase truncate font-hanken">
                          {shipment.destinationCity || (shipment.destinationAddress && shipment.destinationAddress.split(',')[0]) || 'Destination'}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase truncate font-mono">
                          {shipment.destinationState || (shipment.destinationAddress && shipment.destinationAddress.split(',')[1]?.trim()) || 'Region'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="col-span-1 lg:col-span-3 flex flex-col gap-5 lg:pl-10">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-mono">Weight</p>
                      <p className="text-sm font-[900] text-[#13182C] uppercase italic font-hanken">
                        {shipment.weight ? `${shipment.weight.toLocaleString()} ${shipment.weightUnit || 'lbs'}` : 'VARIES'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-mono">Equipment</p>
                      <p className="text-sm font-[900] text-[#13182C] uppercase italic font-hanken">{shipment.subcategory || shipment.category || 'Dry Van'}</p>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="col-span-1 lg:col-span-3 lg:text-right flex flex-col lg:items-end gap-3">
                    <div className="flex flex-col lg:items-end">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="w-5 h-5 rounded-full bg-green-50 text-white flex items-center justify-center text-[10px] font-black" style={{ backgroundColor: '#22C55E' }}>💰</span>
                        <span className="text-[32px] font-[900] text-[#22C55E] tracking-tighter italic font-hanken">
                          ${(shipment.budgetMax || 2850).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Based on Market Trends</p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 w-full lg:w-auto">
                      <Link
                        href={`/carrier/jobs/view?id=${shipment.id}`}
                        className="flex-1 lg:flex-none px-6 py-3.5 bg-[#F8FAFC] border border-gray-200 text-[#13182C] font-black rounded-xl uppercase tracking-widest text-[11px] hover:bg-white transition-all text-center font-hanken"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/carrier/jobs/view?id=${shipment.id}`}
                        className="flex-[2] lg:flex-none px-10 py-3.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#13182C] font-extrabold rounded-xl uppercase tracking-widest text-[11px] transition-all shadow-[0_10px_20px_-5px_rgba(251,191,36,0.4)] text-center font-hanken"
                      >
                        Place Bid
                      </Link>
                    </div>

                    <div className="mt-2 text-[10px] font-bold text-[#13182C] uppercase tracking-widest font-mono">
                      {shipment.bids?.length > 0 ? (
                        <span className="flex items-center justify-start lg:justify-end gap-2 text-blue-600 font-mono">
                          <span className="material-symbols-outlined text-[14px]">groups</span>
                          {shipment.bids.length} BIDS ALREADY PLACED
                        </span>
                      ) : (
                        <span className="flex items-center justify-start lg:justify-end gap-2 text-[#F2994A] font-mono">
                          <span className="material-symbols-outlined text-[14px]">campaign</span>
                          NO BIDS YET — BE THE FIRST
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination Container */}
      {!isLoading && filteredShipments.length > 0 && (
        <div className="mt-16 flex justify-center pb-20">
          <button className="group bg-white border border-gray-100 hover:border-yellow-400 px-12 py-5 rounded-full transition-all shadow-sm hover:shadow-xl flex items-center gap-6">
            <span className="text-[11px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-[0.3em]">Load More Opportunities</span>
            <span className="text-yellow-500 group-hover:translate-y-1 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
