'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { bookingService } from '@/services/booking.service';

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED:  'bg-blue-100 text-blue-700',
  IN_TRANSIT: 'bg-orange-100 text-orange-700',
  COMPLETED:  'bg-green-100 text-green-700',
  CANCELLED:  'bg-red-100 text-red-600',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookingService
      .getMyBookings()
      .then((data) => setBookings(Array.isArray(data) ? data : data?.data || []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">My Bookings</h1>
          <p className="text-gray-500 font-medium mt-1">All confirmed shipment arrangements</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>⬇️</span> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Booking ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Shipment</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Carrier</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading bookings...</p>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="text-5xl mb-4">📋</div>
                    <h3 className="text-xl font-[900] text-gray-900 uppercase mb-2">No Bookings Yet</h3>
                    <p className="text-gray-500 font-medium mb-6">Accept a bid on one of your shipments to create a booking.</p>
                    <Link
                      href="/shipper/dashboard/shipments"
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide text-sm"
                    >
                      View My Shipments
                    </Link>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6">
                      <div className="font-[900] text-gray-900 text-lg mb-1">
                        {booking.id.substring(0, 8).toUpperCase()}
                      </div>
                      <div className="text-sm font-bold text-gray-400">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="text-gray-900 font-bold line-clamp-1">
                        {booking.shipment?.title || booking.shipment?.commodity || 'Shipment'}
                      </div>
                      <div className="text-purple-600 text-sm font-bold">
                        {booking.shipment?.id.substring(0, 8).toUpperCase()}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-gray-900 font-bold">
                        {booking.carrier?.companyName || 'Carrier'}
                      </div>
                      <div className="text-yellow-500 text-sm font-bold">
                        ★ {Number(booking.carrier?.rating || 5).toFixed(1)}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-[900] text-gray-900 text-lg">
                        ${Number(booking.price).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${STATUS_COLORS[booking.status] || 'bg-gray-100 text-gray-700'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Link
                        href={`/shipper/dashboard/bookings/view?id=${booking.id}`}
                        className="inline-block bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && bookings.length > 0 && (
          <div className="p-6 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-500 uppercase tracking-widest">
            <span>{bookings.length} booking{bookings.length !== 1 ? 's' : ''} total</span>
          </div>
        )}
      </div>
    </div>
  );
}
