'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { bookingService } from '@/services/booking.service';
import { paymentService } from '@/services/payment.service';

import { PaymentFeedback } from '@/components/payment/payment-feedback';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  CONFIRMED:  { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Confirmed' },
  PICKED_UP:  { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Picked Up' },
  IN_TRANSIT: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'In Transit' },
  COMPLETED:  { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Completed' },
  CANCELLED:  { bg: 'bg-red-100',    text: 'text-red-600',    label: 'Cancelled' },
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  PENDING:  'bg-yellow-100 text-yellow-700',
  PAID:     'bg-green-100 text-green-700',
  REFUNDED: 'bg-gray-100 text-gray-600',
  FAILED:   'bg-red-100 text-red-600',
};

export default function BookingDetailPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id') || '';
  const paymentStatus = searchParams.get('payment');

  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState('');
  
  const isPaidOptimistically = booking?.paymentStatus === 'PAID' || paymentStatus === 'success';

  const fetchBooking = () => {
    if (!bookingId) return;
    setIsLoading(true);
    bookingService
      .getById(bookingId)
      .then(setBooking)
      .catch(() => setError('Booking not found or you do not have access.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  // When returning from Stripe success, confirm payment with backend then refresh
  useEffect(() => {
    if (paymentStatus === 'success' && bookingId) {
      paymentService.confirmPayment(bookingId)
        .then((result) => {
          console.log('Payment confirmation result:', result);
          fetchBooking(); // Re-fetch to get updated paymentStatus from DB
        })
        .catch((err) => {
          console.error('Payment confirmation failed:', err);
          fetchBooking(); // Still refresh to show latest state
        });
    }
  }, [paymentStatus]);


  const handlePayment = async () => {
    if (!bookingId) return;
    setIsPaying(true);
    try {
      const { url } = await paymentService.createCheckoutSession(bookingId);
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No payment URL returned");
      }
    } catch (err: any) {
      console.error("Payment failed", err);
      alert(err.response?.data?.error || "Failed to initiate payment. Please try again.");
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Loading booking...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-2xl font-[900] text-gray-900 uppercase mb-4">{error || 'Not found'}</h2>
        <Link href="/shipper/dashboard/bookings" className="text-purple-600 font-bold hover:underline">
          ← Back to Bookings
        </Link>
      </div>
    );
  }

  const status = STATUS_COLORS[booking.status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: booking.status };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <PaymentFeedback />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <Link href="/shipper/dashboard/bookings" className="text-gray-400 hover:text-purple-600 transition-colors font-bold">
              ← Back
            </Link>
            <span className={`font-black px-3 py-1 rounded-full text-xs uppercase tracking-widest ${status.bg} ${status.text}`}>
              {status.label}
            </span>
            <span className={`font-black px-3 py-1 rounded-full text-xs uppercase tracking-widest ${isPaidOptimistically ? PAYMENT_STATUS_COLORS.PAID : (PAYMENT_STATUS_COLORS[booking.paymentStatus] || 'bg-gray-100 text-gray-600')}`}>
              Payment: {isPaidOptimistically ? 'PAID' : booking.paymentStatus}
            </span>
          </div>
          <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">
            Booking #{bookingId.substring(0, 8).toUpperCase()}
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Created{' '}
            {new Date(booking.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">

          {/* Shipment info */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Shipment Details</h2>
              {booking.shipment?.id && (
                <Link
                  href={`/shipper/dashboard/shipments/view?id=${booking.shipment.id}`}
                  className="text-purple-600 hover:text-purple-700 font-black text-sm uppercase tracking-widest"
                >
                  View Listing →
                </Link>
              )}
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-green-100" />
                <div className="absolute left-[7px] top-6 w-0.5 h-full bg-gray-200" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup</p>
                <h4 className="font-bold text-gray-900 text-lg">
                  {booking.shipment?.originAddress || 'Origin'}
                </h4>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery</p>
                <h4 className="font-bold text-gray-900 text-lg">
                  {booking.shipment?.destinationAddress || 'Destination'}
                </h4>
              </div>
            </div>
            <div className="p-8 border-t border-gray-100 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Type</p>
                  <p className="font-[900] text-gray-900">{booking.shipment?.commodity || 'Standard Cargo'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Weight</p>
                  <p className="font-[900] text-gray-900">
                    {booking.shipment?.weight ? `${booking.shipment.weight} lbs` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Shipment ID</p>
                  <p className="font-[900] text-gray-900 font-mono text-sm">
                    {booking.shipment?.id?.substring(0, 8).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup OTP Card */}
          {booking.otp && booking.shipment?.status === 'ASSIGNED' && (
            <div className="bg-[#1a1b3a] rounded-[2rem] p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden mb-8 border-4 border-yellow-400">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 uppercase tracking-widest text-sm">
                    <div className="text-center md:text-left">
                        <h3 className="text-yellow-400 font-black mb-2 flex items-center justify-center md:justify-start gap-2">
                           <span className="text-xl">🔐</span> Pickup Verification Code
                        </h3>
                        <p className="text-gray-400 font-bold text-xs">Share this 6-digit code with the carrier ONLY when they arrive and receive the shipment.</p>
                    </div>
                    
                    <div className="bg-white/10 border-2 border-white/20 px-8 py-4 rounded-2xl flex items-center justify-center gap-4 group">
                        {booking.otp.split('').map((digit: string, i: number) => (
                            <span key={i} className="text-4xl font-black text-white">{digit}</span>
                        ))}
                    </div>
                </div>
            </div>
          )}

          {/* Delivery OTP Card */}
          {booking.deliveryOtp && (booking.shipment?.status === 'IN_TRANSIT' || booking.shipment?.status === 'PICKED_UP') && (
            <div className="bg-[#1a1b3a] rounded-[2rem] p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden mb-8 border-4 border-green-400">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 uppercase tracking-widest text-sm">
                    <div className="text-center md:text-left">
                        <h3 className="text-green-400 font-black mb-2 flex items-center justify-center md:justify-start gap-2">
                           <span className="text-xl">🏁</span> Delivery Verification Code
                        </h3>
                        <p className="text-gray-400 font-bold text-xs">Share this 6-digit code with the receiver to authorize the final drop-off.</p>
                    </div>
                    
                    <div className="bg-white/10 border-2 border-white/20 px-8 py-4 rounded-2xl flex items-center justify-center gap-4 group">
                        {booking.deliveryOtp.split('').map((digit: string, i: number) => (
                            <span key={i} className="text-4xl font-black text-white">{digit}</span>
                        ))}
                    </div>
                </div>
            </div>
          )}

          {/* Price breakdown */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide mb-6">Price Breakdown</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Accepted Bid Amount</span>
                <span className="font-[900] text-gray-900 text-xl">${Number(booking.price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Platform Fee (3%)</span>
                <span className="font-bold text-gray-500">
                  ${(Number(booking.price) * 0.03).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="font-[900] text-gray-900 uppercase tracking-wide text-lg">Total Due</span>
                <span className="font-[900] text-purple-600 text-2xl">
                  ${(Number(booking.price) * 1.03).toFixed(2)}
                </span>
              </div>
            </div>

            {(!isPaidOptimistically && booking.paymentStatus === 'PENDING') && (
              <button 
                onClick={handlePayment}
                disabled={isPaying}
                className="mt-8 w-full bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98] text-gray-900 font-[900] px-8 py-5 rounded-2xl transition-all uppercase tracking-wide text-sm shadow-lg shadow-yellow-400/30 hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPaying ? (
                  <>
                    <div className="w-5 h-5 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Redirecting to Secure Payment...
                  </>
                ) : (
                  <>💳 Proceed to Payment</>
                )}
              </button>
            )}

            {isPaidOptimistically && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 font-bold text-center uppercase tracking-widest text-sm shadow-inner transition-all animate-in zoom-in-95 duration-500">
                ✓ Payment Received — Held in Escrow
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Carrier card */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Your Carrier</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white text-2xl font-[900] shadow-lg">
                {booking.carrier?.companyName?.[0] || '🚚'}
              </div>
              <div>
                <h4 className="text-xl font-[900] text-gray-900 uppercase leading-tight">
                  {booking.carrier?.companyName || 'Carrier'}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-500 font-bold text-sm">
                    ★ {Number(booking.carrier?.rating || 5).toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-xs font-bold">
                    ({booking.carrier?.totalReviews || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            {booking.carrier?.user && (
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-sm">
                <div className="font-bold text-gray-900">
                  {booking.carrier.user.firstName} {booking.carrier.user.lastName}
                </div>
                <div className="text-gray-500">{booking.carrier.user.email}</div>
              </div>
            )}
          </div>

          {/* Escrow notice */}
          <div className="bg-purple-900 text-white rounded-[2rem] p-8">
            <div className="w-10 h-10 bg-yellow-400 text-gray-900 rounded-xl flex items-center justify-center text-xl mb-4">
              🔒
            </div>
            <h3 className="font-[900] uppercase tracking-wide mb-2">Escrow Protection</h3>
            <p className="text-purple-200 text-sm">
              Your payment is held securely and only released to the carrier once you confirm delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
