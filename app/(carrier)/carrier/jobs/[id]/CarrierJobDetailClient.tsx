'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { shipmentService } from '@/services/shipment.service';
import { bidService } from '@/services/bid.service';

export default function CarrierJobDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const [shipment, setShipment] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shipmentData, bidsData] = await Promise.all([
          shipmentService.getById(id as string),
          bidService.getShipmentBids(id as string)
        ]);
        
        setShipment(shipmentData);
        setBids(bidsData || []);
        if (shipmentData.targetPrice) setBidAmount(shipmentData.targetPrice.toString());
      } catch (error) {
        console.error("Failed to fetch details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await bidService.create({
        shipmentId: id as string,
        amount: parseFloat(bidAmount),
        deliveryDate: deliveryDate ? new Date(deliveryDate) : new Date()
      });
      setMessage({ type: 'success', text: 'Bid placed successfully! Shipper will be notified.' });
      
      const updatedBids = await bidService.getShipmentBids(id as string);
      setBids(updatedBids || []);
      
      setTimeout(() => router.push('/carrier/bids'), 2000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to place bid. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Scanning Load Details...</p>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-gray-900 uppercase">Shipment Not Found</h2>
        <Link href="/carrier/jobs" className="mt-4 text-yellow-600 font-bold hover:underline inline-block">Back to Load Board</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20">
      {/* Premium Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Link href="/carrier/jobs" className="bg-white border border-gray-100 p-2.5 rounded-xl shadow-sm hover:shadow-md transition-all text-gray-400 hover:text-yellow-600 group">
                <span className="block group-hover:-translate-x-1 transition-transform">←</span>
            </Link>
            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-yellow-200 shadow-sm">
                Open for Bids
            </span>
            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">ID: {id?.toString().substring(0, 8)}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-[1000] text-gray-900 uppercase tracking-tight leading-none mb-4">
            {shipment.title}
          </h1>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Verified Listing • Posted {new Date(shipment.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex gap-4">
            <button className="bg-white border-2 border-gray-100 hover:border-yellow-200 text-gray-400 hover:text-yellow-600 p-4 rounded-2xl transition-all shadow-sm">
                <span>🔥</span>
            </button>
            <button className="bg-white border-2 border-gray-100 hover:border-yellow-200 text-gray-400 hover:text-yellow-600 p-4 rounded-2xl transition-all shadow-sm">
                <span>🔔</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content - 8 Columns */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Route Journey Card */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
            
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-10 relative z-10">Route Intelligence</h2>
            
            <div className="relative pl-12 space-y-16">
                {/* Vertical Line */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-dashed bg-gradient-to-b from-green-500 via-gray-100 to-purple-500"></div>

                {/* Pickup */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center text-green-600 text-[10px] font-black">A</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Pickup Location</div>
                    <div className="text-2xl font-black text-gray-900 uppercase">{shipment.origin}</div>
                    <div className="mt-2 flex gap-3">
                        <span className="bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest">Ground Floor</span>
                        <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest">Loading Dock Available</span>
                    </div>
                </div>

                {/* Delivery */}
                <div className="relative">
                    <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-purple-100 border-4 border-white shadow-md flex items-center justify-center text-purple-600 text-[10px] font-black">B</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Delivery Destination</div>
                    <div className="text-2xl font-black text-gray-900 uppercase">{shipment.destination}</div>
                    <div className="mt-2 flex gap-3">
                        <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest">Residential Delivery</span>
                        <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest">No Lift Required</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Shipment Specifications */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Shipment Specifications</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Weight</div>
                    <div className="text-lg font-black text-gray-900">{shipment.weight ? `${shipment.weight} lbs` : 'Contact'}</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Quantity</div>
                    <div className="text-lg font-black text-gray-900">{shipment.quantity || '1 Unit'}</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Dimensions</div>
                    <div className="text-lg font-black text-gray-900 truncate">{shipment.dimensions || 'Standard'}</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Handling</div>
                    <div className="text-lg font-black text-gray-900">Fragile</div>
                </div>
            </div>

            <div className="mt-10 space-y-4">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-4">Job Description</div>
                <p className="text-gray-600 leading-relaxed font-bold text-lg">
                    {shipment.description || 'The shipper has not provided additional details for this shipment.'}
                </p>
            </div>
          </div>

          {/* Activity & Bids Section */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Market Activity</h3>
               <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-yellow-400/20">
                {bids.length} Active Bids
               </span>
             </div>

             {bids.length > 0 ? (
               <div className="space-y-6">
                 {bids.map((bid: any) => (
                   <div key={bid.id} className="relative p-6 lg:p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-yellow-400 transition-all group overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 font-[1000] text-xl border border-gray-200 shadow-sm group-hover:scale-110 transition-transform">
                            {bid.carrier?.firstName?.[0] || 'C'}
                            </div>
                            <div>
                                <div className="text-lg font-black text-gray-900 uppercase">{bid.carrier?.firstName} (Verified Carrier)</div>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-yellow-500 font-black text-xs">⭐ 4.9</span>
                                    <span className="text-gray-300 font-bold text-[10px] uppercase tracking-widest">Placed {new Date(bid.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <div className="text-3xl font-[1000] text-yellow-600 leading-none mb-1">${bid.amount}</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 py-1 bg-white inline-block border border-gray-100 rounded-lg">Est. Delivery: {new Date(bid.deliveryDate || Date.now()).toLocaleDateString()}</div>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-20 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                 <div className="text-4xl mb-4">🚀</div>
                 <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Be the first to secure this load!</p>
               </div>
             )}
          </div>
        </div>

        {/* Sidebar - 4 Columns */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Bidding Card */}
          <div className="bg-[#1a1b3a] rounded-[2.5rem] p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden sticky top-28">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400 opacity-10 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse"></div>
            
            <div className="text-center mb-10">
                <div className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-4 opacity-80">Shipper Budget</div>
                <div className="text-6xl font-[1000] text-white tracking-tighter">${shipment.targetPrice || '650'}</div>
            </div>

            <form onSubmit={handleBidSubmit} className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Secure Payout Bid ($)</label>
                <div className="relative">
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 text-3xl font-black text-yellow-400">$</span>
                  <input
                    type="number"
                    required
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/10 rounded-[1.5rem] px-16 py-6 text-3xl font-black text-white focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all placeholder:text-white/20"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Transit Commitment Date</label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-[1.5rem] px-8 py-6 text-sm font-bold text-white focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all [color-scheme:dark]"
                />
              </div>

              {message.text && (
                <div className={`p-5 rounded-2xl text-xs font-black uppercase tracking-widest text-center animate-in zoom-in-95 ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 font-[1000] px-8 py-6 rounded-2xl transition-all uppercase tracking-[0.2em] text-xs shadow-xl shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:-translate-y-1 active:translate-y-0"
              >
                {isSubmitting ? 'Locking in Bid...' : 'Submit Binding Bid'}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 space-y-6">
                <div className="flex items-center gap-4 group cursor-help">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lg transition-colors group-hover:bg-yellow-400/20">🛡️</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Secured via pickItUp Escrow Protection</div>
                </div>
                <div className="flex items-center gap-4 group cursor-help">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lg transition-colors group-hover:bg-yellow-400/20">⚡</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Instant Shipper Notification</div>
                </div>
            </div>
          </div>

          {/* Shipper Reputation Card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Shipper Intelligence</h4>
            <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl font-[1000] shadow-lg">
                {shipment.owner?.firstName?.[0] || 'U'}
                </div>
                <div>
                <h4 className="text-xl font-black text-gray-900 uppercase">
                    {shipment.owner ? `${shipment.owner.firstName} ${shipment.owner.lastName}` : 'Verified Shipper'}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                     <span className="text-purple-600 font-black text-xs uppercase tracking-widest">Premium Shipper</span>
                </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <div className="text-purple-600 text-lg font-black leading-none">4.9 ★</div>
                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-2">Reputation</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <div className="text-purple-600 text-lg font-black leading-none">12</div>
                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-2">Jobs Posted</div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
