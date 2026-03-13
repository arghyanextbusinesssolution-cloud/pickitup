'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '../../../../../services/shipment.service';

export default function ViewShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await shipmentService.getMyShipments();
        const shipmentsArray = Array.isArray(response) ? response : (response?.data || []);
        setShipments(shipmentsArray);
      } catch (error) {
        console.error("Failed to fetch shipments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShipments();
  }, []);

  const filteredShipments = shipments.filter(shipment => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Drafts') return shipment.status === 'Draft';
    if (activeTab === 'Awaiting Bids') return shipment.status === 'Awaiting Bids' || shipment.status === 'Published';
    return shipment.status === activeTab;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">My Shipments</h1>
        <Link
          href="/shipper/dashboard/shipments/create"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide shadow-lg hover:shadow-purple-600/30"
        >
          <span>➕</span> Create New
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {['All', 'Drafts', 'Awaiting Bids', 'Booked', 'In Transit', 'Delivered'].map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 font-medium">Loading shipments...</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && filteredShipments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShipments.map((shipment, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${shipment.status === 'Booked' ? 'bg-green-100 text-green-700' :
                  shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                  {shipment.status || 'Draft'}
                </span>
                <span className="text-xs font-bold text-gray-400">ID: {shipment._id ? shipment._id.substring(0, 8) : shipment.id}</span>
              </div>

              <h3 className="text-xl font-[900] text-gray-900 mb-2">{shipment.title || shipment.commodity || 'Untitled Shipment'}</h3>

              <div className="flex flex-col gap-2 mb-6 flex-grow">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">📍</span>
                  <span>{shipment.origin?.city || 'Origin'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">🏁</span>
                  <span>{shipment.destination?.city || 'Destination'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="text-sm font-bold text-gray-500">
                  Bids: <span className="text-gray-900">{shipment.bids?.length || 0}</span>
                </div>
                <Link href={`/shipper/shipper/dashboard/shipments/${shipment._id || shipment.id}`} className="text-purple-600 hover:text-purple-700 font-bold text-sm uppercase tracking-widest transition-colors">
                  Manage →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredShipments.length === 0 && (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            📦
          </div>
          <h3 className="text-2xl font-[900] text-gray-900 uppercase mb-4">No shipments found</h3>
          <p className="text-gray-500 font-medium max-w-md mx-auto mb-8">
            You haven't created any shipments in this category yet. Create a new listing to start receiving bids from carriers.
          </p>
          <Link
            href="/shipper/dashboard/shipments/create"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-xl transition-all uppercase tracking-widest shadow-xl shadow-yellow-400/20"
          >
            Create First Listing
          </Link>
        </div>
      )}
    </div>
  );
}
