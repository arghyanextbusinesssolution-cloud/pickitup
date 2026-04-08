'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { shipmentService } from '@/services/shipment.service';
import { bidService } from '@/services/bid.service';

// ─── Accept Bid Confirmation Modal ──────────────────────────────────────────
function AcceptBidModal({
  bid,
  onConfirm,
  onCancel,
  isLoading,
}: {
  bid: any;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-10 animate-in zoom-in-95 duration-200">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-t-[2rem]" />

        {/* Icon */}
        <div className="w-20 h-20 bg-yellow-100 rounded-[1.5rem] flex items-center justify-center text-4xl mx-auto mb-6">
          🤝
        </div>

        <h2 className="text-2xl font-[900] text-gray-900 uppercase tracking-tight text-center mb-2">
          Accept This Bid?
        </h2>
        <p className="text-sm text-gray-500 text-center font-medium mb-8">
          This action is <span className="font-black text-gray-800">final</span>. All other bids will
          be rejected and your shipment will be locked.
        </p>

        {/* Bid summary */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Carrier</span>
            <span className="font-[900] text-gray-900">
              {bid?.carrier?.companyName || 'Carrier'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Bid Amount</span>
            <span className="font-[900] text-purple-600 text-xl">${Number(bid?.amount).toLocaleString()}</span>
          </div>
          {bid?.deliveryEstimate && (
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Est. Delivery</span>
              <span className="font-bold text-gray-700">
                {new Date(bid.deliveryEstimate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-4 rounded-xl transition-all uppercase tracking-wide text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-[900] px-6 py-4 rounded-xl transition-all uppercase tracking-wide text-sm shadow-lg shadow-yellow-400/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              '✓ Confirm & Book'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ShipmentDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') || '';

  const [shipment, setShipment] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Accept bid modal state
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState('');

  const fetchShipment = useCallback(async () => {
    if (!id) return;
    try {
      const data = await shipmentService.getById(id);
      setShipment(data);
      setBids(data.bids || []);
    } catch (err) {
      console.error('Failed to fetch shipment', err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchShipment();
  }, [fetchShipment]);

  const handleAcceptConfirm = async () => {
    if (!selectedBid) return;
    setIsAccepting(true);
    setAcceptError('');
    try {
      const booking = await bidService.acceptBid(selectedBid.id);
      // Redirect to the booking detail page
      router.push(`/shipper/dashboard/bookings/view?id=${booking.id}`);
    } catch (err: any) {
      setAcceptError(err?.response?.data?.error || 'Failed to accept bid. Please try again.');
      setIsAccepting(false);
    }
  };

  // ── Status badge helpers ─────────────────────────────────────────────────
  const statusColors: Record<string, string> = {
    OPEN: 'bg-yellow-100 text-yellow-700',
    ASSIGNED: 'bg-blue-100 text-blue-700',
    IN_TRANSIT: 'bg-orange-100 text-orange-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };

  const bidStatusColors: Record<string, string> = {
    PENDING: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
    ACCEPTED: 'bg-green-50 text-green-700 border border-green-200',
    REJECTED: 'bg-red-50 text-red-500 border border-red-200',
  };

  const isShipmentOpen = shipment?.status === 'OPEN';

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Loading details...</p>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-[900] text-gray-900 uppercase">Shipment not found</h2>
        <Link href="/shipper/dashboard/shipments" className="text-purple-600 font-bold mt-4 inline-block">
          ← Back to Shipments
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Accept Bid Modal */}
      {selectedBid && (
        <AcceptBidModal
          bid={selectedBid}
          onConfirm={handleAcceptConfirm}
          onCancel={() => { setSelectedBid(null); setAcceptError(''); }}
          isLoading={isAccepting}
        />
      )}

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/shipper/dashboard/shipments" className="text-gray-400 hover:text-purple-600 transition-colors font-bold">
                ← Back
              </Link>
              <span className={`font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest ${statusColors[shipment.status] || 'bg-gray-100 text-gray-700'}`}>
                {shipment.status || 'OPEN'}
              </span>
            </div>
            <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">
              {shipment.title || shipment.commodity || 'Untitled Listing'}
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Shipment ID: {shipment.id?.substring(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="flex gap-4">
            {isShipmentOpen && (
              <Link
                href={`/shipper/dashboard/shipments/edit/details?id=${id}`}
                className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm"
              >
                Edit Listing
              </Link>
            )}
            <button className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm">
              Cancel
            </button>
          </div>
        </div>

        {/* Accept error banner */}
        {acceptError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-bold text-sm animate-in zoom-in-95">
            ⚠️ {acceptError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Active Bids */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-purple-200 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-yellow-400" />
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-2xl font-[900] text-gray-900 uppercase tracking-wide">
                  Active Bids ({bids.length})
                </h2>
                {!isShipmentOpen && (
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
                    Bidding Closed
                  </span>
                )}
              </div>

              <div className="p-8 space-y-4 bg-gray-50/50">
                {bids.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 font-medium">
                    No active bids yet. Carriers usually respond within 24 hours.
                  </p>
                ) : (
                  bids.map((bid: any, i: number) => (
                    <div
                      key={bid.id || i}
                      className={`bg-white rounded-2xl border p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                        bid.status === 'ACCEPTED'
                          ? 'border-green-300 shadow-md shadow-green-100'
                          : bid.status === 'REJECTED'
                          ? 'border-gray-100 opacity-50'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      {/* Carrier info */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                          🚚
                        </div>
                        <div>
                          <h4 className="font-[900] text-gray-900 text-lg uppercase">
                            {bid.carrier?.companyName || 'Carrier'}
                          </h4>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-yellow-400 font-bold">
                              ★ {Number(bid.carrier?.rating || 5).toFixed(1)}
                            </span>
                            <span className="text-gray-400">
                              ({bid.carrier?.totalReviews || 0} reviews)
                            </span>
                            {bid.status && bid.status !== 'PENDING' && (
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${bidStatusColors[bid.status] || ''}`}>
                                {bid.status}
                              </span>
                            )}
                          </div>
                          {bid.deliveryEstimate && (
                            <div className="text-xs text-gray-400 font-bold mt-1">
                              Est. delivery: {new Date(bid.deliveryEstimate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Amount + action */}
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="text-right">
                          <div className="text-3xl font-[900] text-purple-600">
                            ${Number(bid.amount).toLocaleString()}
                          </div>
                        </div>

                        {isShipmentOpen && bid.status === 'PENDING' && (
                          <button
                            onClick={() => { setSelectedBid(bid); setAcceptError(''); }}
                            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-gray-900 font-[900] px-8 py-3 rounded-xl transition-all uppercase tracking-wide shadow-md shadow-yellow-400/30 text-sm"
                          >
                            Accept Bid
                          </button>
                        )}

                        {bid.status === 'ACCEPTED' && (
                          <span className="px-6 py-3 bg-green-100 text-green-700 font-[900] rounded-xl text-sm uppercase tracking-wide">
                            ✓ Accepted
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Route Details */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Route Details</h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-green-100" />
                  <div className="absolute left-[7px] top-6 w-0.5 h-full bg-gray-200" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup</p>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {shipment.origin?.city || shipment.originAddress || 'Origin Address'}
                  </h4>
                  <p className="text-gray-500">
                    {shipment.pickupDate ? new Date(shipment.pickupDate).toLocaleDateString() : 'Flexible Date'}
                  </p>
                </div>
                <div className="relative pl-8 md:pl-0">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-purple-100 md:hidden" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery</p>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {shipment.destination?.city || shipment.destinationAddress || 'Destination Address'}
                  </h4>
                  <p className="text-gray-500">
                    {shipment.deliveryDate ? new Date(shipment.deliveryDate).toLocaleDateString() : 'Flexible Date'}
                  </p>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 bg-gray-50">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Item Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-bold text-gray-900 truncate">{shipment.commodity || 'Goods'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="font-bold text-gray-900">{shipment.weight ? `${shipment.weight} lbs` : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Condition</p>
                    <p className="font-bold text-gray-900">{shipment.items?.[0]?.condition || 'Standard'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-bold text-gray-900">{shipment.distanceKm ? `${shipment.distanceKm} km` : 'TBD'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Budget */}
            <div className="bg-yellow-400 text-gray-900 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h3 className="text-sm font-[900] uppercase tracking-widest mb-6 border-b border-gray-900/10 pb-4">Target Budget</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Max Offer</p>
                  <div className="text-4xl font-[900] tracking-tighter">
                    ${shipment.budgetMax || shipment.targetPrice || shipment.budgetMin || 'TBD'}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Min Target</p>
                  <div className="text-xl font-[900] opacity-80">${shipment.budgetMin || 'TBD'}</div>
                </div>
              </div>
            </div>

            {/* Platform Protection */}
            <div className="bg-purple-900 text-white rounded-[2rem] p-8 shadow-xl">
              <div className="w-12 h-12 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xl mb-6">
                🛡️
              </div>
              <h3 className="text-xl font-[900] uppercase tracking-wide mb-2">pickItUp Protection</h3>
              <p className="text-purple-200 text-sm mb-6">
                When you book through the platform, your payment is held securely in escrow until
                delivery is confirmed.
              </p>
              <Link
                href="/faq"
                className="text-yellow-400 hover:text-yellow-300 font-bold uppercase tracking-widest text-sm underline transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Support */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">Having trouble with this listing or a carrier?</p>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-4 py-3 rounded-xl transition-all uppercase tracking-wide text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
