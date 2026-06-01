'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '@/services/shipment.service';

export default function ShipmentDetailsClient({ id }: { id: string }) {
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchShipment = async () => {
      try {
        const response = await shipmentService.getById(id);
        const data = response?.data || response;
        setShipment(data);
      } catch (error) {
        console.error('Failed to fetch shipment details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-[900] text-gray-900">Shipment Not Found</h2>
        <Link href="/admin/shipments" className="text-blue-600 hover:underline mt-4 inline-block font-bold">
          &larr; Back to Shipments
        </Link>
      </div>
    );
  }

  const shortId = id.substring(0, 8).toUpperCase();
  const status = shipment.status || 'OPEN';
  const isActive = status === 'IN_TRANSIT' || status === 'ASSIGNED';
  const statusLabel = status.replace('_', ' ');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/shipments" className="text-sm font-bold text-gray-500 hover:text-gray-900 mb-2 inline-flex items-center gap-1 uppercase tracking-widest transition-colors">
            <span>&larr;</span> Back to list
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">SHP-{shortId}</h1>
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm ${isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
              {statusLabel}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm shadow-sm">
            Edit Shipment
          </button>
          <button className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm shadow-sm">
            Assign Carrier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Route Info */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-tight mb-6">Route Details</h2>
            <div className="flex flex-col md:flex-row gap-6 relative">
              <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 relative z-10">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-4">A</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup Location</div>
                <div className="font-[900] text-gray-900 text-lg mb-1">{shipment.originCity || 'Unknown'}, {shipment.originState || ''}</div>
                <div className="text-sm text-gray-500">{shipment.originAddress || 'No address provided'}</div>
                {shipment.pickupDate && <div className="mt-4 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">Expected: {new Date(shipment.pickupDate).toLocaleDateString()}</div>}
              </div>

              <div className="hidden md:flex flex-col items-center justify-center relative z-0 w-8">
                <div className="w-full border-t-2 border-dashed border-gray-300 absolute top-1/2 -translate-y-1/2"></div>
                <div className="bg-white border-2 border-gray-100 px-3 py-1.5 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest z-10 shadow-sm relative whitespace-nowrap">
                  {shipment.distanceMiles ? `${shipment.distanceMiles} miles` : '---'}
                </div>
              </div>

              <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 relative z-10">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs mb-4">B</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery Location</div>
                <div className="font-[900] text-gray-900 text-lg mb-1">{shipment.destinationCity || 'Unknown'}, {shipment.destinationState || ''}</div>
                <div className="text-sm text-gray-500">{shipment.destinationAddress || 'No address provided'}</div>
                {shipment.deliveryDate && <div className="mt-4 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg inline-block">Expected: {new Date(shipment.deliveryDate).toLocaleDateString()}</div>}
              </div>
            </div>
          </div>

          {/* Shipment Items */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-tight mb-6">Cargo Details</h2>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">📦</div>
                <div>
                  <div className="font-[900] text-gray-900 text-xl">{shipment.title || shipment.category || 'General Cargo'}</div>
                  <div className="text-sm font-bold text-gray-500">{shipment.subcategory || 'Miscellaneous'}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weight</div>
                  <div className="font-[900] text-gray-900">{shipment.weight ? `${shipment.weight} ${shipment.weightUnit || 'kg'}` : 'N/A'}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dimensions</div>
                  <div className="font-[900] text-gray-900">{shipment.length ? `${shipment.length}x${shipment.width}x${shipment.height} ${shipment.dimensionUnit || 'cm'}` : 'N/A'}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Category</div>
                  <div className="font-[900] text-gray-900">{shipment.category || 'Standard'}</div>
                </div>
              </div>
              {shipment.description && (
                <div className="mt-6">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description / Notes</div>
                  <p className="text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">{shipment.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">

          {/* Shipper Info */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-tight mb-6">Shipper</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                {shipment.shipper?.name ? shipment.shipper.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div className="font-[900] text-gray-900 text-lg">{shipment.shipper?.name || 'Unknown User'}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Customer</div>
              </div>
            </div>
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-3 rounded-xl transition-all text-sm uppercase tracking-wide">
              View Profile
            </button>
          </div>

          {/* Carrier Info */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-tight mb-6">Carrier</h2>
            {shipment.carrier ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                    🚚
                  </div>
                  <div>
                    <div className="font-[900] text-gray-900 text-lg">{shipment.carrier.name || 'Carrier'}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Assigned Driver</div>
                  </div>
                </div>
                <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-4 py-3 rounded-xl transition-all text-sm uppercase tracking-wide">
                  Contact Carrier
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center font-bold text-xl mb-3 text-gray-400">
                  ⏳
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Unassigned</div>
                <div className="text-xs text-gray-400 mb-4">{shipment._count?.bids || 0} active bids pending review</div>
                <button className="w-full bg-gray-900 hover:bg-black text-white font-bold px-4 py-3 rounded-xl transition-all text-sm uppercase tracking-wide">
                  View Bids
                </button>
              </div>
            )}
          </div>

          {/* Financials / Budget */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2rem] shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <span className="text-8xl">💰</span>
            </div>
            <h2 className="text-xl font-[900] uppercase tracking-tight mb-6 text-gray-100 relative z-10">Financials</h2>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Target Budget</span>
                <span className="font-[900] text-lg">${shipment.budgetMax || shipment.budgetMin || '0.00'}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Offer</span>
                <span className="font-[900] text-green-400 text-xl">{shipment.acceptedBid?.amount ? `$${shipment.acceptedBid.amount}` : 'Pending'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
