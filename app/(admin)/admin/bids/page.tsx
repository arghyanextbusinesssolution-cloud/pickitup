'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { bidService } from '@/services/bid.service';

export default function AdminBidsPage() {
  const [bids, setBids] = useState<any[]>([]);
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

    const fetchBids = async () => {
      try {
        const response = await bidService.getAll();
        const data = Array.isArray(response) ? response : (response?.data || []);
        setBids(data);
      } catch (error) {
        console.error('Failed to fetch bids', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const activeBidsCount = bids.filter(b => b.status !== 'REJECTED').length;
  const pendingCount = bids.filter(b => b.status === 'PENDING').length;

  return (
    <div className="w-full">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <nav className="flex gap-2 text-xs font-[700] text-slate-400 mb-2">
            <span>OPERATIONS</span>
            <span>/</span>
            <span className="text-rose-500">BIDS MANAGEMENT</span>
          </nav>
          <h2 className="text-[36px] font-[700] tracking-tight text-slate-900 leading-none">Active Procurement Bids</h2>
          <p className="text-[14px] text-slate-500 mt-2">Review and manage carrier proposals for active freight lanes.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg font-[700] text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter
          </button>
          <button className="px-6 py-2 bg-rose-600 text-white rounded-lg font-[700] text-sm hover:bg-rose-700 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            Post New Tender
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <p className="text-[12px] font-[700] tracking-[0.05em] text-slate-400 mb-2 uppercase">TOTAL ACTIVE BIDS</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-[30px] font-[900] text-slate-900 leading-none">{activeBidsCount > 0 ? activeBidsCount : 142}</h3>
            <span className="text-[10px] font-[700] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <p className="text-[12px] font-[700] tracking-[0.05em] text-slate-400 mb-2 uppercase">PENDING APPROVAL</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-[30px] font-[900] text-slate-900 leading-none">{pendingCount > 0 ? pendingCount : 28}</h3>
            <span className="text-[10px] font-[700] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Urgent</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <p className="text-[12px] font-[700] tracking-[0.05em] text-slate-400 mb-2 uppercase">AVG. BID VARIANCE</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-[30px] font-[900] text-slate-900 leading-none">-$412</h3>
            <span className="text-[10px] font-[700] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Below Budget</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <p className="text-[12px] font-[700] tracking-[0.05em] text-slate-400 mb-2 uppercase">EXPIRING TODAY</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-[30px] font-[900] text-slate-900 leading-none">09</h3>
            <span className="text-[10px] font-[700] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Action Required</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <span className="font-[700] text-sm text-slate-900">All Proposals</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-[700]">{bids.length > 0 ? bids.length : 142}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-200 rounded text-slate-400 transition-colors">
              <span className="material-symbols-outlined text-lg">file_download</span>
            </button>
            <button className="p-1.5 hover:bg-slate-200 rounded text-slate-400 transition-colors">
              <span className="material-symbols-outlined text-lg">more_vert</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 font-[700] text-slate-400 uppercase tracking-wider text-[11px]">Bid ID</th>
                <th className="px-6 py-4 font-[700] text-slate-400 uppercase tracking-wider text-[11px]">Shipment ID</th>
                <th className="px-6 py-4 font-[700] text-slate-400 uppercase tracking-wider text-[11px]">Carrier Name</th>
                <th className="px-6 py-4 font-[700] text-slate-400 uppercase tracking-wider text-[11px]">Bid Amount</th>
                <th className="px-6 py-4 font-[700] text-slate-400 uppercase tracking-wider text-[11px]">Expiry Time</th>
                <th className="px-6 py-4 font-[700] text-slate-400 uppercase tracking-wider text-[11px]">Status</th>
                <th className="px-6 py-4 font-[700] text-slate-400 uppercase tracking-wider text-[11px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {bids.map((bid) => {
                const bId = bid.id || bid._id || Math.random().toString(36).substring(2, 7);
                const shortBidId = String(bId).substring(0, 5).toUpperCase();
                
                const sId = bid.shipmentId || bid.shipment?.id || 'UNKNOWN';
                const shortShipmentId = String(sId).substring(0, 5).toUpperCase();

                const amount = typeof bid.amount === 'number' ? `$${bid.amount.toFixed(2)}` : bid.amount || 'N/A';
                
                const status = bid.status || 'PENDING';
                let statusBadge = { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' };
                if (status === 'ACCEPTED') statusBadge = { bg: 'bg-green-100', text: 'text-green-700', label: 'Active' };
                if (status === 'REJECTED') statusBadge = { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Expired' };
                
                const carrierName = bid.carrier?.name || 'Unknown Carrier';

                return (
                  <tr key={bId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-[700] text-slate-900">#BID-{shortBidId}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <Link href={`/admin/shipments/details?id=${sId}`} className="hover:text-rose-600 hover:underline">
                        SHP-{shortShipmentId}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm">local_shipping</span>
                        </div>
                        <span className="font-medium text-slate-900">{carrierName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-[900] text-slate-900">{amount}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 ${status === 'REJECTED' ? 'text-slate-400 line-through' : (status === 'PENDING' ? 'text-rose-600' : 'text-slate-500')} font-[700]`}>
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {status === 'REJECTED' ? 'Expired' : '02h 15m'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-[700] uppercase tracking-wider ${statusBadge.bg} ${statusBadge.text}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex justify-end gap-2 ${status === 'REJECTED' || status === 'ACCEPTED' ? 'opacity-50 pointer-events-none' : ''}`}>
                        <button className="px-3 py-1 bg-rose-600 text-white text-[11px] font-[700] rounded-lg hover:bg-rose-700">Accept</button>
                        <button className="px-3 py-1 border border-slate-200 text-slate-600 text-[11px] font-[700] rounded-lg hover:bg-slate-50">Counter</button>
                        <button className="px-3 py-1 text-rose-600 text-[11px] font-[700] hover:bg-rose-50 rounded-lg">Reject</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {bids.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">No active bids found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Showing {bids.length > 0 ? 1 : 0} to {bids.length} of {bids.length} entries</span>
          <div className="flex gap-1">
            <button className="p-2 hover:bg-slate-100 rounded text-slate-400 transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-rose-600 text-white text-xs font-bold rounded-lg">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-xs font-bold rounded-lg transition-colors">2</button>
            <button className="p-2 hover:bg-slate-100 rounded text-slate-400 transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-6 pb-12">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[18px] font-[600] text-slate-900">Lane Insights</h4>
            <select className="bg-slate-50 border-none rounded-lg text-xs font-[700] text-slate-500 px-3 py-1 focus:ring-1 focus:ring-rose-500/20">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            <div className="w-full bg-slate-50 rounded-t-lg relative group h-[75%]">
              <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-lg h-[65%] group-hover:bg-rose-400 transition-all"></div>
              <p className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-slate-400">CHI-NYC</p>
            </div>
            <div className="w-full bg-slate-50 rounded-t-lg relative group h-full">
              <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-lg h-[85%] group-hover:bg-rose-400 transition-all"></div>
              <p className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-slate-400">LAX-DAL</p>
            </div>
            <div className="w-full bg-slate-50 rounded-t-lg relative group h-[50%]">
              <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-lg h-[40%] group-hover:bg-rose-400 transition-all"></div>
              <p className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-slate-400">SEA-SFO</p>
            </div>
            <div className="w-full bg-slate-50 rounded-t-lg relative group h-[75%]">
              <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-lg h-[75%] group-hover:bg-rose-400 transition-all"></div>
              <p className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-slate-400">MIA-ATL</p>
            </div>
            <div className="w-full bg-slate-50 rounded-t-lg relative group h-[66%]">
              <div className="absolute bottom-0 w-full bg-rose-500 rounded-t-lg h-[55%] group-hover:bg-rose-400 transition-all"></div>
              <p className="absolute -bottom-6 w-full text-center text-[10px] font-bold text-slate-400">DEN-PHX</p>
            </div>
          </div>
        </div>
        
        <div className="col-span-12 lg:col-span-4 bg-slate-900 rounded-xl p-6 shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-[18px] font-[600] mb-2">Automated Dispatch</h4>
            <p className="text-[12px] text-slate-400 mb-6">AI-powered bidding system is currently active for 4 high-priority lanes.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-rose-400">rocket_launch</span>
                  <div>
                    <p className="text-[12px] font-[700]">Auto-Negotiation</p>
                    <p className="text-[10px] text-slate-500">Target: -$150 below market</p>
                  </div>
                </div>
                <div className="w-8 h-4 bg-rose-600 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-rose-400">verified</span>
                  <div>
                    <p className="text-[12px] font-[700]">Instant Acceptance</p>
                    <p className="text-[10px] text-slate-500">For 5-star carriers only</p>
                  </div>
                </div>
                <div className="w-8 h-4 bg-slate-700 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-slate-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-rose-500 text-white rounded-lg font-[700] text-[12px] hover:bg-rose-400 transition-all">
              Configuration Settings
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
