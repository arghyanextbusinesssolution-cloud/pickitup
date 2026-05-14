'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '@/services/shipment.service';

export default function GlobalShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add Material Symbols font if it doesn't exist to support the requested design
    if (!document.getElementById('material-symbols-outlined')) {
      const link = document.createElement('link');
      link.id = 'material-symbols-outlined';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0,0,24';
      document.head.appendChild(link);
    }

    const fetchShipments = async () => {
      try {
        const response = await shipmentService.getAll();
        const data = Array.isArray(response) ? response : (response?.data || []);
        setShipments(data);
      } catch (error) {
        console.error('Failed to fetch shipments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Dashboard Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-[700] text-slate-900 mb-1" style={{ letterSpacing: '-0.02em' }}>Shipments</h1>
          <p className="text-[14px] text-slate-500">Manage and track your global logistics fleet in real-time.</p>
        </div>
        <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-rose-500/20 hover:bg-rose-700 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined text-xl">add</span>
          Create Shipment
        </button>
      </div>

      {/* Filters Bento Grid */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 lg:col-span-12 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[240px]">
              <label className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 mb-2 block uppercase">Advanced Search</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 focus:ring-2 ring-rose-500/10 focus:border-rose-500 outline-none transition-all text-sm" placeholder="Search ID, Carrier, or Location..." type="text"/>
              </div>
            </div>
            <div className="w-48">
              <label className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 mb-2 block uppercase">Shipment Status</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:ring-2 ring-rose-500/10 focus:border-rose-500 outline-none appearance-none transition-all text-sm">
                <option>All Statuses</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="w-48">
              <label className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 mb-2 block uppercase">Date Range</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">calendar_today</span>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-3 focus:ring-2 ring-rose-500/10 focus:border-rose-500 outline-none transition-all text-sm" type="text" defaultValue="Last 30 Days"/>
              </div>
            </div>
            <div className="w-48">
              <label className="text-[12px] font-[700] tracking-[0.05em] text-slate-500 mb-2 block uppercase">Location</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:ring-2 ring-rose-500/10 focus:border-rose-500 outline-none appearance-none transition-all text-sm">
                <option>Global View</option>
                <option>North America</option>
                <option>Europe</option>
                <option>Asia Pacific</option>
              </select>
            </div>
            <div className="flex items-end h-full mt-6">
              <button className="bg-slate-900 text-white p-2.5 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shipments Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-[18px] font-semibold text-slate-900">Active Shipments Fleet</h3>
          <div className="flex gap-2">
            <button className="text-slate-500 hover:text-rose-500 p-1 transition-colors">
              <span className="material-symbols-outlined text-xl">download</span>
            </button>
            <button className="text-slate-500 hover:text-rose-500 p-1 transition-colors">
              <span className="material-symbols-outlined text-xl">print</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse" style={{ lineHeight: 1.4, letterSpacing: '0.01em' }}>
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase">Shipment ID</th>
                <th className="px-6 py-4 text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase">Pickup & Dropoff</th>
                <th className="px-6 py-4 text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase">Carrier Info</th>
                <th className="px-6 py-4 text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase">Current Status</th>
                <th className="px-6 py-4 text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase">Payment</th>
                <th className="px-6 py-4 text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {shipments.map((shipment) => {
                const id = shipment.id || shipment._id || Math.random().toString(36).substring(2, 10);
                const shortId = typeof id === 'string' ? id.substring(0, 5).toUpperCase() : String(id).toUpperCase();
                
                // Status mapping to match UI
                const status = shipment.status || 'OPEN';
                let statusBadge = { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Pending' };
                if (status === 'IN_TRANSIT') statusBadge = { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Transit' };
                if (status === 'DELIVERED') statusBadge = { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' };
                if (status === 'OPEN') statusBadge = { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Open' };
                if (status === 'CANCELLED') statusBadge = { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' };

                // Payment Status mapping
                let paymentBadge = { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Awaiting' };
                if (shipment.paymentStatus === 'PAID') paymentBadge = { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid' };
                if (shipment.paymentStatus === 'OVERDUE') paymentBadge = { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Overdue' };

                const origin = shipment.originCity ? `${shipment.originCity}, ${shipment.originState || ''}` : (shipment.originAddress || 'Unknown');
                const destination = shipment.destinationCity ? `${shipment.destinationCity}, ${shipment.destinationState || ''}` : (shipment.destinationAddress || 'Unknown');
                
                // Carrier
                const carrierName = shipment.carrier?.name || 'Unassigned';
                const carrierInitials = carrierName === 'Unassigned' ? '--' : carrierName.substring(0, 2).toUpperCase();
                
                const createdDate = shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : 'Recently';

                return (
                  <tr key={id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">#CMD-{shortId}</span>
                        <span className="text-xs text-slate-400">Created {createdDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          <span className="text-slate-700">{origin}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          <span className="text-slate-700 font-medium">{destination}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-slate-500">{carrierInitials}</div>
                        <div className="flex flex-col">
                          <span className="text-slate-900">{carrierName}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Vehicle: {shipment.vehicleDetails?.make || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusBadge.bg} ${statusBadge.text}`}>{statusBadge.label}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${paymentBadge.bg} ${paymentBadge.text}`}>{paymentBadge.label}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/shipments/details?id=${id}`} className="text-slate-400 hover:text-rose-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </Link>
                        <button className="text-slate-400 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                        <button className="text-slate-400 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {shipments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No shipments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Table Footer/Pagination */}
        <div className="px-6 py-4 flex items-center justify-between bg-slate-50/50 border-t border-slate-100">
          <span className="text-slate-500 text-sm">Showing {shipments.length > 0 ? 1 : 0} to {shipments.length} of {shipments.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-slate-200 text-slate-400 hover:bg-white transition-colors"><span className="material-symbols-outlined text-base leading-none">chevron_left</span></button>
            <button className="px-3 py-1 rounded bg-rose-500 text-white font-bold text-xs">1</button>
            <button className="px-3 py-1 rounded border border-slate-200 text-slate-400 hover:bg-white transition-colors"><span className="material-symbols-outlined text-base leading-none">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Real-time Insights (Small Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">trending_up</span>
          </div>
          <div>
            <h4 className="text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase mb-1">Fleet Utilization</h4>
            <p className="text-[24px] font-[600] text-slate-900 leading-tight">92.4%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
          <div>
            <h4 className="text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase mb-1">Avg. Transit Time</h4>
            <p className="text-[24px] font-[600] text-slate-900 leading-tight">3.2 Days</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div>
            <h4 className="text-[12px] font-[700] tracking-[0.05em] text-slate-400 uppercase mb-1">On-Time Delivery</h4>
            <p className="text-[24px] font-[600] text-slate-900 leading-tight">98.1%</p>
          </div>
        </div>
      </div>

    </div>
  );
}
