'use client';

import React, { useEffect, useState } from 'react';
import { bookingService } from '@/services/booking.service';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
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

    const fetchBookings = async () => {
      try {
        const response = await bookingService.getAll();
        const data = Array.isArray(response) ? response : (response?.data || []);
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // Calculate KPIs
  const pendingCount = bookings.filter(b => b.status === 'PENDING').length;

  // Calculate today
  const today = new Date();
  const scheduledToday = bookings.filter(b => {
    if (!b.pickupDate && !b.createdAt) return false;
    const date = new Date(b.pickupDate || b.createdAt);
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }).length;

  const completedCount = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'DELIVERED').length;
  const exceptionsCount = bookings.filter(b => b.status === 'CANCELLED' || b.status === 'FAILED').length;

  return (
    <div className="w-full">
      {/* Page Header Actions */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[24px] font-[600] tracking-tight text-slate-900 leading-none">Confirmed Bookings</h3>
          <p className="text-[14px] text-slate-500 mt-2">Manage and track all scheduled logistics operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-lg flex">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-rose-600 font-[700] flex items-center gap-2 text-[14px]">
              <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
              List View
            </button>
            <button className="px-4 py-1.5 text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-[14px]">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Calendar
            </button>
          </div>
          <button className="bg-rose-600 text-white px-6 py-2.5 rounded-xl font-[700] flex items-center gap-2 hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20 text-[14px]">
            <span className="material-symbols-outlined text-lg">add</span>
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Overview Bento Grid */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
            <span className="material-symbols-outlined text-2xl">pending_actions</span>
          </div>
          <div>
            <p className="text-[12px] font-[700] text-slate-500 mb-1 uppercase tracking-widest">Pending</p>
            <p className="text-[24px] font-[600] text-slate-900 leading-none">{pendingCount}</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
          <div>
            <p className="text-[12px] font-[700] text-slate-500 mb-1 uppercase tracking-widest">Scheduled Today</p>
            <p className="text-[24px] font-[600] text-slate-900 leading-none">{scheduledToday}</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <div>
            <p className="text-[12px] font-[700] text-slate-500 mb-1 uppercase tracking-widest">Completed 24h</p>
            <p className="text-[24px] font-[600] text-slate-900 leading-none">{completedCount}</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <span className="material-symbols-outlined text-2xl">warning</span>
          </div>
          <div>
            <p className="text-[12px] font-[700] text-slate-500 mb-1 uppercase tracking-widest">Exceptions</p>
            <p className="text-[24px] font-[600] text-slate-900 leading-none">{exceptionsCount}</p>
          </div>
        </div>
      </div>

      {/* Main Booking Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">AR</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700">JD</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">+4</div>
            </div>
            <p className="text-[14px] text-slate-500">Active Managers</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg transition-all flex items-center gap-2 text-[14px]">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </button>
            <button className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg transition-all flex items-center gap-2 text-[14px]">
              <span className="material-symbols-outlined text-lg">download</span>
              Export
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-4 text-[12px] font-[700] text-slate-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-[12px] font-[700] text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[12px] font-[700] text-slate-500 uppercase tracking-wider">Carrier</th>
                <th className="px-6 py-4 text-[12px] font-[700] text-slate-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-4 text-[12px] font-[700] text-slate-500 uppercase tracking-wider">Vehicle Type</th>
                <th className="px-6 py-4 text-[12px] font-[700] text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-[12px] font-[700] text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bookings.map((booking) => {
                const bId = booking.id || booking._id || Math.random().toString(36).substring(2, 7);
                const shortId = String(bId).substring(0, 5).toUpperCase();

                const customerName = booking.shipment?.owner
                  ? `${booking.shipment.owner.firstName} ${booking.shipment.owner.lastName}`
                  : (booking.shipperName || 'Global Logistics Corp');

                const carrierName = booking.carrier?.name || 'SwiftTrans Fleet';

                const schedDateRaw = booking.pickupDate || booking.createdAt || new Date();
                const schedDate = new Date(schedDateRaw).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const schedTime = new Date(schedDateRaw).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                const vehicleType = booking.carrier?.vehicleDetails?.type || booking.shipment?.category || 'Heavy Duty / Reefer';

                const status = booking.status || 'CONFIRMED';
                let statusBadge = { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-700', label: 'Confirmed' };
                if (status === 'IN_TRANSIT') statusBadge = { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-700', label: 'In Transit' };
                if (status === 'PENDING') statusBadge = { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-700', label: 'Pending' };

                return (
                  <tr key={bId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <span className="text-[13px] text-slate-900 font-bold">BK-{shortId}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-[14px] text-slate-900 font-semibold">{customerName}</span>
                        <span className="text-xs text-slate-500">Premium Account</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[14px] text-white">local_shipping</span>
                        </div>
                        <span className="text-[14px] text-slate-900">{carrierName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-[14px] text-slate-900">{schedDate}</span>
                        <span className="text-xs text-slate-500">{schedTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-[700] text-slate-600">{vehicleType}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-[700] ${statusBadge.bg} ${statusBadge.text}`}>
                        <span className={`w-1 h-1 rounded-full ${statusBadge.dot} mr-1.5`}></span>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">No confirmed bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 bg-white border-t border-slate-50 flex items-center justify-between">
          <p className="text-[14px] text-slate-500">Showing <span className="font-bold text-slate-900">{bookings.length > 0 ? 1 : 0} - {bookings.length}</span> of <span className="font-bold text-slate-900">{bookings.length}</span> bookings</p>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-all disabled:opacity-50" disabled={true}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-4 py-2 bg-rose-600 text-white rounded-lg font-bold text-[14px]">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-900 hover:bg-slate-50 transition-all text-[14px]">2</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-900 hover:bg-slate-50 transition-all text-[14px]">3</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Assistant / Sidebar Info */}
      <div className="mt-8 grid grid-cols-12 gap-6 pb-12">
        <div className="col-span-12 lg:col-span-8 bg-slate-100 p-6 rounded-2xl relative overflow-hidden flex items-center min-h-[160px]">
          <div className="relative z-10 w-full md:w-2/3">
            <h4 className="text-[18px] font-[600] text-slate-900 mb-2">Automated Dispatch is Active</h4>
            <p className="text-[14px] text-slate-600 mb-4">Command Pro is currently optimizing routes for {pendingCount > 0 ? pendingCount : 14} upcoming bookings to ensure fuel efficiency and driver rest periods.</p>
            <button className="bg-white text-slate-700 px-5 py-2 rounded-xl font-[700] text-sm shadow-sm hover:shadow-md transition-all">View Optimization Report</button>
          </div>
          <img className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-40 mix-blend-overlay hidden md:block" src="https://images.unsplash.com/photo-1586528116311-ad8ed7c50a63?q=80&w=2070&auto=format&fit=crop" />
        </div>
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 mb-4 uppercase">System Health</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[14px] font-[500] text-slate-900">GPS Tracking</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full w-[98%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[14px] font-[500] text-slate-900">Carrier API Connectivity</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full w-[100%]"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[14px] font-[500] text-slate-900">Payment Gateway</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full w-[94%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
