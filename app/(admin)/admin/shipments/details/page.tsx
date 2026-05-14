'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { shipmentService } from '@/services/shipment.service';

function ShipmentDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idParam = searchParams.get('id');
  
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add Material Symbols font if it doesn't exist
    if (!document.getElementById('material-symbols-outlined')) {
      const link = document.createElement('link');
      link.id = 'material-symbols-outlined';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0,0,24';
      document.head.appendChild(link);
    }

    const fetchShipment = async () => {
      if (!idParam) {
        setLoading(false);
        return;
      }
      try {
        const response = await shipmentService.getById(idParam);
        const data = response?.data || response;
        setShipment(data);
      } catch (error) {
        console.error('Failed to fetch shipment details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [idParam]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Shipment Not Found</h2>
        <Link href="/admin/shipments" className="text-rose-600 hover:underline mt-4 inline-block font-medium">
          &larr; Back to Shipments
        </Link>
      </div>
    );
  }

  const sid = shipment.id || shipment._id;
  const shortId = typeof sid === 'string' ? sid.substring(0, 5).toUpperCase() : String(sid).toUpperCase();
  
  const status = shipment.status || 'OPEN';
  let statusBadge = { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'schedule', label: 'Pending' };
  let currentStepIndex = 0;

  if (status === 'ASSIGNED') {
    statusBadge = { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'check', label: 'Booked' };
    currentStepIndex = 1;
  } else if (status === 'IN_TRANSIT') {
    statusBadge = { bg: 'bg-rose-100', text: 'text-rose-600', icon: 'local_shipping', label: 'In Transit' };
    currentStepIndex = 2;
  } else if (status === 'DELIVERED') {
    statusBadge = { bg: 'bg-green-100', text: 'text-green-600', icon: 'check_circle', label: 'Delivered' };
    currentStepIndex = 3;
  }

  const originCode = shipment.originCity ? shipment.originCity.substring(0, 3).toUpperCase() : 'ORG';
  const destCode = shipment.destinationCity ? shipment.destinationCity.substring(0, 3).toUpperCase() : 'DST';
  const origin = shipment.originCity || shipment.originAddress || 'Origin';
  const dest = shipment.destinationCity || shipment.destinationAddress || 'Destination';

  const pickupDate = shipment.pickupDate ? new Date(shipment.pickupDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Pending';
  const deliveryDate = shipment.deliveryDate ? new Date(shipment.deliveryDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Pending';

  const budget = shipment.acceptedBid?.amount || shipment.budgetMax || shipment.budgetMin || 0;
  const baseFee = (budget * 0.7).toFixed(2);
  const fuelFee = (budget * 0.2).toFixed(2);
  const priorityFee = (budget * 0.1).toFixed(2);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin/shipments" className="text-slate-400 hover:text-rose-500 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-[36px] font-[700] tracking-tight text-slate-900 leading-none">Shipment #CP-{shortId}</h2>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className={`${statusBadge.bg} ${statusBadge.text} px-3 py-1 rounded-full text-[12px] font-[700] uppercase tracking-wider flex items-center gap-1`}>
              {status === 'IN_TRANSIT' && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>}
              {statusBadge.label}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Last updated: {shipment.updatedAt ? new Date(shipment.updatedAt).toLocaleTimeString() : 'Recently'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">edit</span>
            Edit
          </button>
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">print</span>
            Print Label
          </button>
          <button className="px-5 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">cancel</span>
            Cancel
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6 pb-12">
        {/* Route & Map Card */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <span className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 uppercase">Route Intelligence</span>
            <div className="flex gap-2">
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{originCode} &rarr; {destCode}</span>
            </div>
          </div>
          <div className="relative h-96 w-full bg-slate-100">
            <img alt="Map background" className="w-full h-full object-cover grayscale opacity-30 mix-blend-multiply" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"/>
            
            {/* Overlay SVG for the line */}
            <div className="absolute inset-0 flex items-center justify-center p-20 pointer-events-none">
              <div className="relative w-full h-full border-b-2 border-dashed border-rose-300 flex items-end justify-between px-10">
                <div className="absolute left-10 -bottom-4 bg-white border-2 border-rose-500 rounded-full p-2 shadow-lg pointer-events-auto">
                  <span className="material-symbols-outlined text-rose-500">location_on</span>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl">{origin}</div>
                </div>
                {/* Current progress dot - only show if in transit */}
                {status === 'IN_TRANSIT' && (
                  <div className="absolute left-1/2 -bottom-3 bg-rose-500 w-6 h-6 rounded-full border-4 border-white shadow-lg pointer-events-auto ring-4 ring-rose-500/20">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl font-bold">On Route</div>
                  </div>
                )}
                <div className="absolute right-10 -bottom-4 bg-white border-2 border-slate-300 rounded-full p-2 shadow-lg pointer-events-auto">
                  <span className="material-symbols-outlined text-slate-400">flag</span>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl">{dest}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50/50 flex flex-col md:flex-row justify-between gap-6 md:gap-12">
            <div className="flex-1">
              <p className="text-[10px] font-[700] text-slate-400 uppercase mb-1">Departure</p>
              <p className="text-[14px] font-[700] text-slate-900">{pickupDate}</p>
              <p className="text-xs text-slate-500 truncate">{origin}</p>
            </div>
            <div className="flex items-center flex-col justify-center">
              <span className="material-symbols-outlined text-rose-500">trending_flat</span>
              <span className="text-[10px] font-[700] text-rose-500">{shipment.distanceKm ? `${shipment.distanceKm} km total` : 'Distance Pending'}</span>
            </div>
            <div className="flex-1 md:text-right">
              <p className="text-[10px] font-[700] text-slate-400 uppercase mb-1">Estimated Arrival</p>
              <p className="text-[14px] font-[700] text-slate-900">{deliveryDate}</p>
              <p className="text-xs text-slate-500 truncate">{dest}</p>
            </div>
          </div>
        </div>

        {/* Status Timeline Card */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 uppercase mb-8">Journey Status</h3>
          <div className="space-y-8 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            
            {/* Step 1: Booked */}
            <div className="relative flex gap-4">
              <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${currentStepIndex >= 1 ? 'bg-slate-900 text-white' : (currentStepIndex === 0 ? 'bg-rose-500 text-white ring-4 ring-rose-100' : 'bg-slate-200')}`}>
                <span className="material-symbols-outlined text-[14px]">{currentStepIndex > 0 ? 'check' : 'pending_actions'}</span>
              </div>
              <div className={currentStepIndex >= 0 ? '' : 'opacity-50'}>
                <p className={`text-[14px] font-[700] leading-tight ${currentStepIndex === 0 ? 'text-rose-600' : 'text-slate-900'}`}>Order Booked</p>
                <p className="text-[12px] text-slate-500 mt-1">Confirmed by LogiFlow</p>
                <p className="text-[10px] font-[500] text-slate-400 mt-0.5">{shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Step 2: Picked Up */}
            <div className={`relative flex gap-4 ${currentStepIndex >= 1 ? '' : 'opacity-50'}`}>
              <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${currentStepIndex >= 2 ? 'bg-slate-900 text-white' : (currentStepIndex === 1 ? 'bg-rose-500 text-white ring-4 ring-rose-100' : 'bg-slate-200')}`}>
                <span className="material-symbols-outlined text-[14px]">{currentStepIndex > 1 ? 'check' : 'inventory_2'}</span>
              </div>
              <div>
                <p className={`text-[14px] font-[700] leading-tight ${currentStepIndex === 1 ? 'text-rose-600' : (currentStepIndex > 1 ? 'text-slate-900' : 'text-slate-400')}`}>Picked Up</p>
                <p className="text-[12px] text-slate-500 mt-1">{origin}</p>
                <p className="text-[10px] font-[500] text-slate-400 mt-0.5">{pickupDate}</p>
              </div>
            </div>

            {/* Step 3: In Transit */}
            <div className={`relative flex gap-4 ${currentStepIndex >= 2 ? '' : 'opacity-50'}`}>
              <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${currentStepIndex >= 3 ? 'bg-slate-900 text-white' : (currentStepIndex === 2 ? 'bg-rose-500 text-white ring-4 ring-rose-100' : 'bg-slate-200')}`}>
                <span className="material-symbols-outlined text-[14px]">local_shipping</span>
              </div>
              <div>
                <p className={`text-[14px] font-[700] leading-tight ${currentStepIndex === 2 ? 'text-rose-600' : (currentStepIndex > 2 ? 'text-slate-900' : 'text-slate-400')}`}>In Transit</p>
                <p className="text-[12px] text-slate-500 mt-1">Moving towards destination</p>
                {currentStepIndex === 2 && <p className="text-[10px] font-[500] text-slate-400 mt-0.5">Last Signal: Recently</p>}
              </div>
            </div>

            {/* Step 4: Delivered */}
            <div className={`relative flex gap-4 ${currentStepIndex >= 3 ? '' : 'opacity-50'}`}>
              <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${currentStepIndex === 3 ? 'bg-rose-500 text-white ring-4 ring-rose-100' : 'bg-slate-200'}`}>
                <span className="material-symbols-outlined text-[14px]">{currentStepIndex === 3 ? 'check_circle' : 'location_on'}</span>
              </div>
              <div>
                <p className={`text-[14px] font-[700] leading-tight ${currentStepIndex === 3 ? 'text-rose-600' : 'text-slate-400'}`}>{currentStepIndex === 3 ? 'Delivered' : 'Estimated Delivery'}</p>
                <p className="text-[12px] text-slate-400 mt-1">{dest}</p>
                <p className="text-[10px] font-[500] text-slate-400 mt-0.5">Scheduled: {deliveryDate}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Cargo Information Card */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 uppercase">Cargo Specs</h3>
            <span className="material-symbols-outlined text-rose-500">inventory_2</span>
          </div>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-[10px] font-[700] text-slate-400 uppercase mb-1">Total Weight</p>
              <p className="text-[14px] font-[700] text-slate-900">{shipment.weight ? `${shipment.weight} ${shipment.weightUnit}` : 'N/A'}</p>
            </div>
            <div>
              <p className="text-[10px] font-[700] text-slate-400 uppercase mb-1">Dimensions</p>
              <p className="text-[14px] font-[700] text-slate-900">{shipment.length ? `${shipment.length}x${shipment.width}x${shipment.height} ${shipment.dimensionUnit}` : 'N/A'}</p>
            </div>
            <div>
              <p className="text-[10px] font-[700] text-slate-400 uppercase mb-1">Cargo Type</p>
              <p className="text-[14px] font-[700] text-slate-900 truncate">{shipment.category || 'General'}</p>
            </div>
            <div>
              <p className="text-[10px] font-[700] text-slate-400 uppercase mb-1">Hazardous</p>
              <p className="text-[14px] font-[700] text-slate-900 text-green-600">No / Class A</p>
            </div>
            
            <div className="col-span-2 bg-rose-50 p-3 rounded-xl border border-rose-100 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-rose-600 text-sm">thermostat</span>
                <p className="text-[10px] font-[700] text-rose-600 uppercase">Temp Control Not Active</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-600">Requirement</p>
                  <p className="text-lg font-[900] text-slate-900">Standard</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Current Sensor</p>
                  <p className="text-lg font-[900] text-slate-400">--</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carrier & Driver Card */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 uppercase">Fleet & Personnel</h3>
            <span className="material-symbols-outlined text-rose-500">badge</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl border-2 border-slate-100 bg-slate-100 flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-3xl text-slate-400">person</span>
            </div>
            <div className="truncate">
              <p className="text-xs font-[700] text-rose-600 uppercase tracking-tight">Main Driver</p>
              <p className="text-[18px] font-[700] text-slate-900 truncate">{shipment.carrier?.name || 'Unassigned'}</p>
              <p className="text-xs text-slate-500">ID: {shipment.carrier?.id ? `#CR-${shipment.carrier.id.substring(0,4)}` : 'N/A'}</p>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[12px] text-slate-500 font-medium">Carrier</span>
              <span className="text-[12px] font-[700] text-slate-900 truncate ml-2 text-right">{shipment.carrier?.name || 'Pending Bids'}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[12px] text-slate-500 font-medium">Vehicle</span>
              <span className="text-[12px] font-[700] text-slate-900 truncate ml-2 text-right">{shipment.vehicleDetails?.make || 'N/A'}</span>
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-slate-900 text-white font-[700] text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2" disabled={!shipment.carrier}>
            <span className="material-symbols-outlined text-sm">videocam</span>
            Connect Live Dashcam
          </button>
        </div>

        {/* Financial Summary Card */}
        <div className="col-span-12 md:col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 uppercase">Billing & Insurance</h3>
            <span className="material-symbols-outlined text-rose-500">payments</span>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-slate-50 pb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Freight Quote</p>
                <p className="text-[30px] font-[900] text-slate-900">${budget}</p>
              </div>
              <div className="text-right">
                <span className={`${shipment.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} px-3 py-1 rounded-full text-[10px] font-[700] uppercase tracking-widest`}>
                  {shipment.paymentStatus || 'Awaiting'}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-500">Logistics Base Fee</span>
                <span className="font-[700] text-slate-900">${baseFee}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-500">Fuel Surcharge</span>
                <span className="font-[700] text-slate-900">${fuelFee}</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-500">Priority Handling</span>
                <span className="font-[700] text-slate-900">${priorityFee}</span>
              </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl flex items-center gap-4 mt-2">
              <div className="bg-rose-500 p-2 rounded-lg shrink-0">
                <span className="material-symbols-outlined text-white">security</span>
              </div>
              <div className="truncate">
                <p className="text-[10px] font-[700] text-rose-400 uppercase tracking-widest">Global Coverage</p>
                <p className="text-[14px] font-[700] text-white truncate">$1.2M Insurance Secured</p>
                <p className="text-[10px] text-slate-400">Policy: #AX-{(shipment.id || shipment._id || '').substring(0, 5).toUpperCase()}-B</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ShipmentDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    }>
      <ShipmentDetailsContent />
    </Suspense>
  );
}
