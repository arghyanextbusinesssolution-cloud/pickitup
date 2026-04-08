'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { bidService } from '@/services/bid.service';

export default function CarrierBidStatusClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [bid, setBid] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBidStatus = async () => {
      try {
        const data = await bidService.getById(id as string);
        setBid(data);
      } catch (err) {
        console.error("Failed to fetch bid status:", err);
        setError("Could not load bid details. It may have been removed.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchBidStatus();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Retrieving Status...</p>
      </div>
    );
  }

  if (error || !bid) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="text-4xl mb-6">⚠️</div>
        <h2 className="text-2xl font-black text-gray-900 uppercase mb-4">Bid Not Found</h2>
        <p className="text-gray-500 font-medium mb-8">{error || "The requested bid information is unavailable."}</p>
        <Link href="/carrier/bids" className="inline-block bg-purple-600 text-white font-black px-8 py-4 rounded-2xl uppercase tracking-widest text-xs hover:bg-purple-700 transition-all shadow-lg shadow-purple-200">
          Back to My Bids
        </Link>
      </div>
    );
  }

  const { shipment, booking, status: bidStatus } = bid;
  const isAccepted = bidStatus === 'ACCEPTED';
  const isPaid = booking?.paymentStatus === 'PAID';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/carrier/bids" className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md transition-all text-gray-400 hover:text-purple-600 group">
          <span className="block group-hover:-translate-x-1 transition-transform text-xl">←</span>
        </Link>
        <div>
           <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Bid Management</div>
           <h1 className="text-2xl font-black text-gray-900 uppercase">Live Bid Tracking</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-12 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-sm border border-gray-50 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-10 -mr-40 -mt-40 ${isAccepted ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                <div>
                  <h2 className="text-4xl font-[1000] text-gray-900 uppercase tracking-tight leading-none mb-4">
                    {shipment.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Reference: {id?.toString().substring(0, 8).toUpperCase()}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-lg">{shipment.weight} LBS</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">My Locked Bid</div>
                  <div className="text-5xl font-[1000] text-purple-600 tracking-tighter">${bid.amount}</div>
                </div>
              </div>

              <div className="relative py-10">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                   <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-green-500 transition-all duration-1000 ease-out" 
                    style={{ width: isPaid ? '100%' : isAccepted ? '66%' : '33%' }}
                   ></div>
                </div>
                <div className="relative flex justify-between">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl shadow-lg shadow-purple-200 z-20 border-4 border-white mb-4">✓</div>
                    <div className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Bid Submitted</div>
                    <div className="text-[9px] font-bold text-gray-400 mt-1">{new Date(bid.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-20 border-4 border-white mb-4 transition-all duration-500 ${isAccepted ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-gray-100 text-gray-300'}`}>
                      {isAccepted ? '✓' : '2'}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${isAccepted ? 'text-gray-900' : 'text-gray-300'}`}>Shipment Awarded</div>
                    <div className="text-[9px] font-bold text-gray-400 mt-1">{isAccepted ? 'Congratulations!' : 'Waiting...'}</div>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl z-20 border-4 border-white mb-4 transition-all duration-500 ${isPaid ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-300'}`}>
                      {isPaid ? '✓' : '3'}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${isPaid ? 'text-gray-900' : 'text-gray-300'}`}>Funds Secured</div>
                    <div className="text-[9px] font-bold text-gray-400 mt-1">{isPaid ? 'Ready to Pickup' : 'Escrow Pending'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl flex items-center justify-center text-2xl ${isPaid ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>
                    {isPaid ? '🚚' : isAccepted ? '💳' : '⏳'}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase text-lg leading-tight">
                      {isPaid ? 'Job Ready for Pickup' : isAccepted ? 'Waiting for Secure Payment' : 'Bid is currently under review'}
                    </h4>
                    <p className="text-gray-500 font-medium text-sm">
                      {isPaid ? 'Payment has been secured in escrow. You can now proceed to the pickup location.' : 
                       isAccepted ? 'The shipper has accepted your bid! Once they complete the secure payment, you will get the pickup details.' : 
                       'The shipper is reviewing multiple bids. You will be notified instantly if your bid is selected.'}
                    </p>
                  </div>
                </div>
                {isPaid ? (
                  <Link href="/carrier/shipments" className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-[1000] px-10 py-5 rounded-[1.5rem] uppercase tracking-widest text-xs shadow-xl shadow-green-200 transition-all hover:scale-105 active:scale-95 text-center">
                    Go to My Shipments →
                  </Link>
                ) : isAccepted ? (
                  <div className="bg-yellow-50 border border-yellow-100 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <span className="animate-pulse">🔔</span>
                    <span className="text-yellow-700 font-bold text-xs uppercase tracking-widest">Awaiting Shipper Escrow</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Route Details</h3>
                <div className="space-y-10 relative">
                  <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 border-l-2 border-dashed border-gray-100"></div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Pickup</div>
                    <div className="font-black text-gray-900 uppercase text-sm">{shipment.origin}</div>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-purple-500 border-4 border-white shadow-sm"></div>
                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Destination</div>
                    <div className="font-black text-gray-900 uppercase text-sm">{shipment.destination}</div>
                  </div>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Job Specifications</h3>
                <div className="grid grid-cols-2 gap-6">
                   <div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Commodity</div>
                      <div className="font-black text-gray-900 text-xs uppercase">{shipment.commodity || 'Standard Freight'}</div>
                   </div>
                   <div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Transit Time</div>
                      <div className="font-black text-gray-900 text-xs uppercase">{bid.deliveryEstimate ? new Date(bid.deliveryEstimate).toLocaleDateString() : 'To be Finalized'}</div>
                   </div>
                   <div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</div>
                      <div className="font-black text-purple-600 text-xs uppercase font-black">Escrow Secured</div>
                   </div>
                   <div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Insurance</div>
                      <div className="font-black text-green-600 text-xs uppercase font-black">Verified Coverage</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
