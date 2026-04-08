'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { shipmentService } from '@/services/shipment.service';

const STATUS_STEPS = [
    { key: 'ASSIGNED', label: 'Assigned', icon: '📋' },
    { key: 'PICKED_UP', label: 'Picked Up', icon: '📦' },
    { key: 'IN_TRANSIT', label: 'In Transit', icon: '🚚' },
    { key: 'DELIVERED', label: 'Delivered', icon: '✅' }
];

export default function CarrierShipmentDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [shipment, setShipment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState<'pickup' | 'delivery' | null>(null);
  const [otpValue, setOtpValue] = useState('');

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

  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.length < 4) {
        setMessage({ type: 'error', text: 'Please enter a valid OTP code.' });
        return;
    }

    setIsUpdating(true);
    try {
        const bookingId = shipment.booking?.id;
        if (!bookingId) throw new Error("No active booking found for this shipment.");

        const endpoint = showOtpModal === 'pickup' ? 'verify-pickup' : 'verify-delivery';
        
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/${endpoint}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ otp: otpValue })
        });
        
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Verification failed');

        const newStatus = showOtpModal === 'pickup' ? 'PICKED_UP' : 'DELIVERED';
        setShipment({ ...shipment, status: newStatus });
        
        const successText = showOtpModal === 'pickup' 
            ? 'Pickup verified successfully! Shipment is now PICKED UP.' 
            : 'Delivery verified successfully! Shipment is now DELIVERED.';
            
        setShowOtpModal(null);
        setMessage({ type: 'success', text: successText });
        setOtpValue(''); // Reset OTP value
    } catch (error: any) {
        setMessage({ type: 'error', text: error.message });
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

  const currentStepIndex = STATUS_STEPS.findIndex(step => step.key === shipment.status);
  const isPaid = shipment.booking?.paymentStatus === 'PAID';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20 px-4 md:px-0">
      {/* Payment Waiting Alert */}
      {shipment.status === 'ASSIGNED' && !isPaid && (
          <div className="mb-8 bg-orange-50 border-2 border-orange-200 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 text-orange-800 animate-in slide-in-from-top-4">
              <div className="text-4xl">🕒</div>
              <div className="flex-1 text-center md:text-left">
                  <h4 className="font-black uppercase tracking-tight text-lg mb-1">Waiting for Shipper Payment</h4>
                  <p className="font-bold text-xs opacity-80 uppercase tracking-widest">Secure Escrow payment from the shipper is required before you can verify pickup.</p>
              </div>
          </div>
      )}

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
            {isPaid && (
                <span className="bg-green-100 text-green-700 text-[10px] font-black px-4 py-1.5 rounded-full border border-green-200 uppercase tracking-widest">
                    ✓ Paid
                </span>
            )}
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
        {/* Progress Tracker */}
        <div className="lg:col-span-12 bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-sm border border-gray-100 mb-10 overflow-x-auto">
            <div className="flex justify-between items-start min-w-[600px] relative">
                <div className="absolute top-7 left-10 right-10 h-1 bg-gray-100 hidden md:block">
                     <div 
                        className="h-full bg-yellow-400 transition-all duration-1000" 
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

        {/* Status Actions */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 text-center md:text-left">Service Actions</h2>
            
            {/* Pickup Not Started Info — Show when ASSIGNED and NOT paid */}
            {shipment.status === 'ASSIGNED' && !isPaid && (
              <div className="mb-8 bg-gradient-to-br from-gray-50 to-orange-50 rounded-[2rem] border-2 border-dashed border-orange-200 p-8 lg:p-10 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-orange-100 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6">
                  🔒
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">
                  Pickup Not Started
                </h3>
                <p className="text-gray-500 font-bold text-sm max-w-md mx-auto mb-6">
                  The shipper has not completed escrow payment yet. Once they pay, you'll be able to verify the pickup with their OTP code.
                </p>
                <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-300 animate-pulse" />
                    Awaiting Payment
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    OTP Verify
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    Pickup
                  </div>
                </div>
              </div>
            )}

            {/* Pickup Ready Info — Show when ASSIGNED and PAID */}
            {shipment.status === 'ASSIGNED' && isPaid && (
              <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-[2rem] border-2 border-green-200 p-8 lg:p-10 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">
                  🔓
                </div>
                <h3 className="text-xl font-black text-green-800 uppercase tracking-tight mb-3">
                  Ready for Pickup!
                </h3>
                <p className="text-green-700 font-bold text-sm max-w-md mx-auto mb-6">
                  Payment has been received. Contact the shipper, collect the shipment, and enter their 6-digit OTP code to confirm pickup.
                </p>
                <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-green-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    Payment Received
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                    Enter OTP
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    Pickup
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => setShowOtpModal('pickup')}
                  disabled={shipment.status !== 'ASSIGNED' || !isPaid || isUpdating}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group ${
                    shipment.status === 'PICKED_UP' || currentStepIndex >= 1 ? 'bg-green-50 border-green-100 text-green-700' : 
                    (shipment.status === 'ASSIGNED' && isPaid) ? 'bg-yellow-50 border-yellow-400 text-gray-900 hover:-translate-y-2 hover:shadow-xl shadow-yellow-200/50' : 
                    'bg-gray-50 border-gray-50 text-gray-300 opacity-50 cursor-not-allowed'
                  }`}
                >
                    <span className="text-4xl">{currentStepIndex >= 1 ? '✅' : isPaid ? '📦' : '🔒'}</span>
                    <span className="font-black uppercase tracking-widest text-[10px] text-center">
                        {currentStepIndex >= 1 ? 'Picked Up' : !isPaid && shipment.status === 'ASSIGNED' ? 'Awaiting Payment' : isUpdating ? 'Processing...' : 'Verify Pickup OTP'}
                    </span>
                </button>

                <button 
                  onClick={() => handleStatusUpdate('IN_TRANSIT')}
                  disabled={shipment.status !== 'PICKED_UP' || isUpdating}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group ${
                    shipment.status === 'IN_TRANSIT' || currentStepIndex >= 2 ? 'bg-green-50 border-green-100 text-green-700' : 
                    shipment.status === 'PICKED_UP' ? 'bg-yellow-50 border-yellow-400 text-gray-900 hover:-translate-y-2 hover:shadow-xl shadow-yellow-200/50' : 
                    'bg-gray-50 border-gray-50 text-gray-300 opacity-50 cursor-not-allowed'
                  }`}
                >
                    <span className="text-4xl">{currentStepIndex >= 2 ? '✅' : '🚚'}</span>
                    <span className="font-black uppercase tracking-widest text-[10px] text-center">
                        {currentStepIndex >= 2 ? 'In Transit' : isUpdating ? 'Updating loader...' : 'Mark as In Transit'}
                    </span>
                </button>

                <button 
                  onClick={() => setShowOtpModal('delivery')}
                  disabled={shipment.status !== 'IN_TRANSIT' || isUpdating}
                  className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group ${
                    shipment.status === 'DELIVERED' || currentStepIndex >= 3 ? 'bg-green-50 border-green-100 text-green-700' : 
                    shipment.status === 'IN_TRANSIT' ? 'bg-yellow-50 border-yellow-400 text-gray-900 hover:-translate-y-2 hover:shadow-xl shadow-yellow-200/50' : 
                    'bg-gray-50 border-gray-50 text-gray-300 opacity-50 cursor-not-allowed'
                  }`}
                >
                    <span className="text-4xl">{currentStepIndex >= 3 ? '✅' : '🏁'}</span>
                    <span className="font-black uppercase tracking-widest text-[10px] text-center">
                        {currentStepIndex >= 3 ? 'Delivered' : isUpdating ? 'Processing...' : 'Verify Delivery OTP'}
                    </span>
                </button>
            </div>

            {message.text && (
                 <div className={`mt-8 p-6 rounded-2xl text-xs font-black uppercase tracking-widest text-center animate-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                 </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Shipper Details</h3>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                        {shipment.owner?.firstName?.[0] || 'U'}
                    </div>
                    <div>
                        <div className="text-lg font-black text-gray-900 uppercase">{shipment.owner?.firstName} {shipment.owner?.lastName}</div>
                        <div className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Verified Shipper</div>
                    </div>
                </div>
                <div className="space-y-4">
                    <button className="w-full bg-gray-50 font-black py-4 rounded-xl border border-gray-100 uppercase tracking-widest text-[10px]">📞 Call Shipper</button>
                </div>
           </div>

           <div className="bg-[#1a1b3a] rounded-[2.5rem] p-8 lg:p-10 text-white">
                <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-6">Payment Info</h3>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Net Earnings</div>
                    <div className="text-4xl font-black text-green-400">${shipment.booking?.price || shipment.price || '0'}</div>
                </div>
           </div>
        </div>
      </div>

      {/* OTP MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowOtpModal(null)}></div>
            <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-yellow-100 rounded-[2rem] flex items-center justify-center text-4xl mb-6 mx-auto">
                        {showOtpModal === 'pickup' ? '🔐' : '🏁'}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
                        {showOtpModal === 'pickup' ? 'Verify Pickup' : 'Verify Delivery'}
                    </h3>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                        Enter the 6-digit code provided by the {showOtpModal === 'pickup' ? 'shipper' : 'receiver'}
                    </p>
                </div>

                <input 
                    type="text" 
                    maxLength={6}
                    placeholder="000000"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-center text-4xl font-black tracking-[0.5em] focus:border-yellow-400 transition-all outline-none mb-8"
                />

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={handleVerifyOtp}
                        disabled={isUpdating}
                        className="w-full bg-[#1a1b3a] text-white font-black py-6 rounded-2xl uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50"
                    >
                        {isUpdating ? 'Verifying...' : `Confirm ${showOtpModal === 'pickup' ? 'Pickup' : 'Delivery'}`}
                    </button>
                    <button 
                        onClick={() => setShowOtpModal(null)}
                        className="w-full bg-white text-gray-400 font-black py-4 rounded-xl uppercase tracking-widest text-[10px]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
