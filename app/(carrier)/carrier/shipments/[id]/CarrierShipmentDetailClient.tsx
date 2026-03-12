'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { shipmentService } from '@/services/shipment.service';

const STATUS_STEPS = [
    { key: 'PENDING', label: 'Assigned', icon: '📋' },
    { key: 'PICKED_UP', label: 'Picked Up', icon: '📦' },
    { key: 'IN_TRANSIT', label: 'In Transit', icon: '🚚' },
    { key: 'DELIVERED', label: 'Delivered', icon: '✅' }
];

export default function CarrierShipmentDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const [shipment, setShipment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const data = await shipmentService.getById(id as string);
        setShipment(data);
      } catch (error) {
        console.error("Failed to fetch shipment details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchShipment();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    setMessage({ type: '', text: '' });
    try {
      await shipmentService.update(id as string, { status: newStatus });
      setShipment({ ...shipment, status: newStatus });
      setMessage({ type: 'success', text: `Status updated to ${newStatus.replace('_', ' ')}` });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to update status.' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Syncing Fleet Status...</p>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-gray-900 uppercase">Shipment Not Found</h2>
        <Link href="/carrier/shipments" className="mt-4 text-yellow-600 font-bold hover:underline inline-block">Back to My Jobs</Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(step => step.key === shipment.status) || 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Link href="/carrier/shipments" className="bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-400 hover:text-yellow-600 group">
                <span className="block group-hover:-translate-x-1 transition-transform">←</span>
            </Link>
            <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border shadow-sm ${
                shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'
            }`}>
                {shipment.status?.replace('_', ' ')}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-[1000] text-gray-900 uppercase tracking-tight leading-none mb-4">
            {shipment.title}
          </h1>
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Active Booking ID: {id?.toString().substring(0, 8).toUpperCase()}</p>
        </div>

        <div className="flex gap-4">
            <button className="bg-[#1a1b3a] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-900/10 hover:-translate-y-1 transition-all">
                Download BOL
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Progress Tracker - 12 Columns */}
        <div className="lg:col-span-12 bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-sm border border-gray-100 mb-10 overflow-x-auto">
            <div className="flex justify-between items-start min-w-[600px] relative">
                {/* Background Progress Bar */}
                <div className="absolute top-7 left-10 right-10 h-1 bg-gray-100 hidden md:block">
                     <div 
                        className="h-full bg-yellow-400 transition-all duration-1000 shadow-[0_0_20px_rgba(250,204,21,0.5)]" 
                        style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                     ></div>
                </div>

                {STATUS_STEPS.map((step, index) => (
                    <div key={step.key} className="relative z-10 flex flex-col items-center text-center">
                        <div className={`w-14 h-14 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-2xl transition-all duration-500 ${
                            index <= currentStepIndex ? 'bg-yellow-400 scale-110' : 'bg-gray-100 text-gray-400'
                        }`}>
                            {step.icon}
                        </div>
                        <div className={`mt-6 text-[10px] font-black uppercase tracking-[0.2em] ${index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content (Status Actions) - 8 Columns */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Status Control Card */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Service Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => handleStatusUpdate('PICKED_UP')}
                  disabled={shipment.status !== 'PENDING' || isUpdating}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group ${
                    shipment.status === 'PICKED_UP' || currentStepIndex > 1 ? 'bg-green-50 border-green-200 text-green-700' : 
                    shipment.status === 'PENDING' ? 'bg-yellow-50 border-yellow-400 text-gray-900 hover:-translate-y-2' : 
                    'bg-gray-50 border-gray-100 text-gray-300 opacity-50 cursor-not-allowed'
                  }`}
                >
                    <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">📦</span>
                    <span className="font-black uppercase tracking-widest text-[10px]">Mark as Picked Up</span>
                </button>

                <button 
                  onClick={() => handleStatusUpdate('IN_TRANSIT')}
                  disabled={shipment.status !== 'PICKED_UP' || isUpdating}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group ${
                    shipment.status === 'IN_TRANSIT' || currentStepIndex > 2 ? 'bg-green-50 border-green-200 text-green-700' : 
                    shipment.status === 'PICKED_UP' ? 'bg-yellow-50 border-yellow-400 text-gray-900 hover:-translate-y-2' : 
                    'bg-gray-50 border-gray-100 text-gray-300 opacity-50 cursor-not-allowed'
                  }`}
                >
                    <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">🚚</span>
                    <span className="font-black uppercase tracking-widest text-[10px]">Mark as In Transit</span>
                </button>

                <button 
                  onClick={() => handleStatusUpdate('DELIVERED')}
                  disabled={shipment.status !== 'IN_TRANSIT' || isUpdating}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group ${
                    shipment.status === 'DELIVERED' ? 'bg-green-50 border-green-200 text-green-700' : 
                    shipment.status === 'IN_TRANSIT' ? 'bg-yellow-50 border-yellow-400 text-gray-900 hover:-translate-y-2' : 
                    'bg-gray-50 border-gray-100 text-gray-300 opacity-50 cursor-not-allowed'
                  }`}
                >
                    <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">✅</span>
                    <span className="font-black uppercase tracking-widest text-[10px]">Mark as Delivered</span>
                </button>
            </div>

            {message.text && (
                 <div className={`mt-8 p-6 rounded-2xl text-xs font-black uppercase tracking-widest text-center animate-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                    {message.text}
                 </div>
            )}
          </div>

          {/* Route Info */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin PUD</div>
                    <div className="text-xl font-black text-gray-900 uppercase">{shipment.origin}</div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-gray-500 font-bold text-sm leading-relaxed">
                            Be sure to take photos of all 4 sides of the vehicle/cargo before loading to protect your carrier rating.
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</div>
                    <div className="text-xl font-black text-gray-900 uppercase">{shipment.destination}</div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-gray-500 font-bold text-sm leading-relaxed">
                            Secure delivery confirmation signature from the receiver to release funds from escrow.
                        </p>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar - 4 Columns */}
        <div className="lg:col-span-4 space-y-8">
           {/* Shipper Contact Card */}
           <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Shipper Contact Information</h3>
                
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                        {shipment.owner?.firstName?.[0] || 'U'}
                    </div>
                    <div>
                        <div className="text-lg font-black text-gray-900 uppercase">{shipment.owner?.firstName} {shipment.owner?.lastName}</div>
                        <div className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Verified Premium Shipper</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <button className="w-full bg-gray-50 hover:bg-yellow-400 hover:text-gray-900 text-gray-900 font-black py-4 rounded-xl border border-gray-100 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">
                        <span>📞</span> Call Shipper
                    </button>
                    <button className="w-full bg-gray-50 hover:bg-yellow-400 hover:text-gray-900 text-gray-900 font-black py-4 rounded-xl border border-gray-100 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">
                        <span>💬</span> Chat with Customer
                    </button>
                </div>
           </div>

           {/* Shipment Breakdown Card */}
           <div className="bg-[#1a1b3a] rounded-[2.5rem] p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Job Payout Summary</h3>
                    
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Payout</div>
                        <div className="text-xl font-black text-white">${shipment.booking?.price || shipment.price || '0'}</div>
                    </div>

                    <div className="flex justify-between items-center mb-10">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Est. Commission</div>
                        <div className="text-sm font-black text-gray-500">-$0.00</div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Net Earnings</div>
                        <div className="text-4xl font-[1000] text-green-400">${shipment.booking?.price || shipment.price || '0'}</div>
                    </div>

                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                        Funds are held in pickItUp Escrow and will be released to your earnings 24h after delivery confirmation.
                    </div>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
}
