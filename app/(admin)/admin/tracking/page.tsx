'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin.service';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Plus,
  Minus,
  Package,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Download,
  Share2,
  Box,
  Map as MapIcon,
  Bell
} from 'lucide-react';
import { GlobalLogisticsMap } from '@/components/admin/GlobalLogisticsMap';

export default function AdminTrackingPage() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const data = await adminService.getShipments();
        setShipments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch shipments', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  const totalPages = Math.ceil(shipments.length / itemsPerPage);
  const paginatedShipments = shipments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'IN_TRANSIT': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'OPEN': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] p-8 font-sans text-[#2D2424]">
      {/* ... Header stays same ... */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2424] mb-1">Admin Tracking Center</h1>
          <p className="text-sm text-slate-400 font-medium">Real-time oversight of all global parcel transfers and active nodes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Transfers', value: '2,842', change: '+13.3%', icon: <Package className="text-blue-500" />, trend: 'up' },
          { label: 'In Transit', value: '418', change: 'Active', icon: <TrendingUp className="text-amber-500" />, trend: 'neutral' },
          { label: 'Delivery Rate', value: '98.3%', change: '99.2%', icon: <CheckCircle className="text-emerald-500" />, trend: 'up' },
          { label: 'Critical Alerts', value: '14', change: 'High Priority', icon: <AlertTriangle className="text-rose-500" />, trend: 'down' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${i === 3 ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-[#2D2424]">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Live Parcel Monitoring Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden mb-12">
        <div className="p-8 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-3">
             <h2 className="text-xl font-bold text-[#2D2424]">Live Parcel Monitoring</h2>
             <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-[#D14343] text-[9px] font-black uppercase tracking-widest rounded-full">
               <span className="w-1.5 h-1.5 rounded-full bg-[#D14343] animate-pulse"></span>
               Live Feed Updates
             </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transfer ID</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sender / Receiver</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route Info</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Node</th>
                <th className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={6} className="px-8 py-20 text-center text-slate-300 font-bold uppercase tracking-widest">Syncing active transfers...</td></tr>
              ) : (
                paginatedShipments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-4">
                      <span className="text-sm font-bold text-[#2D2424]">#LX-{item.id.slice(-5).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{item.ownerName?.[0]}</div>
                           <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">R</div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#2D2424]">{item.ownerName?.split(' ')[0]} T. <span className="text-slate-300 mx-1">→</span> Elena S.</p>
                          <p className="text-[9px] font-medium text-slate-400">Global Tech Hub • Express</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-[10px] font-black text-[#2D2424] uppercase">{item.origin?.split(',')[0].slice(0,3).toUpperCase() || 'BER'}</p>
                          <p className="text-[8px] text-slate-400 font-bold">{item.origin?.split(',')[0] || 'Berlin, DE'}</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[12px] text-rose-500">→</span>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-[#2D2424] uppercase">{item.destination?.split(',')[0].slice(0,3).toUpperCase() || 'LHR'}</p>
                          <p className="text-[8px] text-slate-400 font-bold">{item.destination?.split(',')[0] || 'London, UK'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold border ${getStatusStyle(item.status)}`}>
                        <span className={`w-1 h-1 rounded-full ${item.status === 'IN_TRANSIT' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                        {item.status?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-all">
                        <Box size={12} className="text-[#8B2C36]" /> Node-8-Alpha
                      </button>
                    </td>
                    <td className="px-8 py-4">
                      <button className="p-1 text-slate-300 hover:text-slate-600 transition-all"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-slate-50 flex items-center justify-between">
           <p className="text-xs text-slate-400 font-bold italic">Showing <span className="text-[#2D2424]">{paginatedShipments.length} of {shipments.length}</span> active transfers</p>
           <div className="flex items-center gap-2">
             <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-slate-50 rounded-lg text-slate-300 disabled:opacity-30"
             >
                <ChevronLeft size={18} />
             </button>
             {Array.from({ length: totalPages }).map((_, i) => (
               <button 
                 key={i}
                 onClick={() => setCurrentPage(i + 1)}
                 className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-[#D14343] text-white' : 'hover:bg-slate-50 text-slate-400'}`}
               >
                 {i + 1}
               </button>
             ))}
             <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-slate-50 rounded-lg text-slate-300 disabled:opacity-30"
             >
                <ChevronRight size={18} />
             </button>
           </div>
        </div>
      </div>

      {/* Bottom Grid: Load Distribution & System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Regional Load Distribution */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#2D2424]">Regional Load Distribution</h2>
            <button className="text-[10px] font-black text-[#D14343] uppercase tracking-[0.2em]">Live Operation Mode</button>
          </div>
          <div className="flex-1 bg-[#080B14] p-2">
             <GlobalLogisticsMap className="w-full h-full border-0 rounded-2xl" />
          </div>
        </div>

        {/* System Activity Sidebar */}
        <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#2D2424]">System Activity</h2>
          </div>
          
          <div className="flex-1 p-8 space-y-8">
            {[
              { title: 'High-Value Shipment Alert', desc: 'Transit delay detected at Node 4-Alpha (BER).', color: 'bg-rose-500', action: 'Re-route Package' },
              { title: 'Batch 902-X Processed', desc: '42 packages cleared customs at Station XPO-1.', color: 'bg-emerald-500' },
              { title: 'Maintenance Window', desc: 'Hub 7 entering scheduled diagnostics in 2 hours.', color: 'bg-amber-500' }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className={`w-2.5 h-2.5 rounded-full ${activity.color} shrink-0 mt-1`}></div>
                <div>
                  <h4 className="text-sm font-bold text-[#2D2424] mb-1">{activity.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{activity.desc}</p>
                  {activity.action && (
                    <button className="text-[10px] font-black text-[#D14343] uppercase tracking-widest hover:underline">{activity.action}</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-slate-50">
            <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 transition-all rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
              View Audit Log
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-[#D14343] text-white rounded-2xl shadow-2xl shadow-[#D14343]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group z-50">
        <Plus size={28} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>
    </div>
  );
}
