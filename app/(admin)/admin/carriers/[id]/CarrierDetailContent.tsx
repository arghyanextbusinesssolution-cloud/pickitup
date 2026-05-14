'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  TrendingUp, 
  ShieldCheck,
  Edit3,
  Send,
  Download,
  Truck,
  Heart,
  ChevronLeft,
  Star,
  Package,
  Award
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Link from 'next/link';

const mockChartData = [
  { name: 'JAN', value: 25 },
  { name: 'FEB', value: 35 },
  { name: 'MAR', value: 45 },
  { name: 'APR', value: 65 },
  { name: 'MAY', value: 30 },
  { name: 'JUN', value: 20 },
  { name: 'JUL', value: 55 },
  { name: 'AUG', value: 40 },
];

export default function CarrierDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const [carrier, setCarrier] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarrier = async () => {
      try {
        const data = await adminService.getCarrierById(id);
        setCarrier(data);
      } catch (error) {
        console.error('Failed to fetch carrier details', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCarrier();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#FFF9F9]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B2C36]"></div>
      </div>
    );
  }

  if (!carrier) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Carrier not found</h2>
        <Link href="/admin/carriers" className="text-[#8B2C36] mt-4 inline-block font-bold">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F9] p-6 lg:p-10 font-sans text-[#2D2424]">
      
      {/* Breadcrumbs / Back */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-[#8B2C36] transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <Link href="/admin/carriers" className="hover:text-slate-600 transition-colors">CARRIERS</Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#8B2C36]">{carrier.companyName || `${carrier.firstName} ${carrier.lastName}`}</span>
        </div>
      </div>

      {/* Profile Header Area */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-[#8B2C36] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-red-100 border-4 border-white">
            {carrier.companyName?.[0] || carrier.firstName?.[0]}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-[1000] text-[#2D2424] tracking-tight mb-1 uppercase italic">
              {carrier.companyName || `${carrier.firstName} ${carrier.lastName}`}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <p className="text-slate-500 font-bold flex items-center gap-2">
                <ShieldCheck size={16} className={carrier.isVerified ? "text-[#2D8A7E]" : "text-slate-300"} />
                {carrier.isVerified ? 'Verified Carrier' : 'Verification Pending'}
              </p>
              <span className="text-slate-200">•</span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-black text-slate-700">{carrier.rating?.toFixed(1)} Rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Edit3 size={16} /> Edit Profile
          </button>
          <button className="px-6 py-3 rounded-xl bg-[#8B2C36] font-black text-white text-sm flex items-center gap-2 hover:bg-[#73242C] transition-all shadow-lg shadow-red-100 uppercase tracking-widest">
            <Download size={16} /> Export Data
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp size={48} className="text-[#8B2C36]" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">TOTAL EARNINGS</p>
          <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">${(carrier.totalEarnings || 0).toLocaleString()}</h4>
          <p className="text-[11px] font-bold text-[#2D8A7E]">↗ +18.2% VS LY</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <Package size={48} className="text-[#8B2C36]" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">COMPLETED JOBS</p>
          <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">{carrier.completedShipments || 0}</h4>
          <p className="text-[11px] font-bold text-[#D14343]">⊙ {carrier.recentShipments?.filter((s:any) => s.status !== 'COMPLETED').length || 0} IN PROGRESS</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <Truck size={48} className="text-[#8B2C36]" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">FLEET CAPACITY</p>
          <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">{carrier.vehicleCount || 0} Units</h4>
          <p className="text-[11px] font-bold text-[#2D8A7E]">Active Vehicles: {carrier.vehicleCount}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <Award size={48} className="text-[#8B2C36]" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">RELIABILITY</p>
          <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">98.4%</h4>
          <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-[#2D8A7E] rounded-full" style={{ width: '98.4%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h5 className="text-sm font-[900] uppercase tracking-widest text-[#2D2424] italic">Fleet Profile</h5>
              <Truck size={18} className="text-slate-300" />
            </div>
            <div className="space-y-6">
              {carrier.vehicles?.length > 0 ? carrier.vehicles.map((v:any, i:number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#FFF9F9] rounded-2xl border border-red-50/50">
                  <div>
                    <p className="text-xs font-black text-[#2D2424] uppercase tracking-widest">{v.vehicleType}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{v.licensePlate}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm font-bold text-slate-400 italic">No vehicles registered</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h5 className="text-sm font-[900] uppercase tracking-widest text-[#2D2424] italic">Earnings Performance</h5>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B2C36]"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Revenue</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#ADB5BD', fontSize: 10, fontWeight: 900 }} dy={10} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'transparent' }} content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return <div className="bg-black text-white px-3 py-1 rounded text-[10px] font-black uppercase">Peak Rev: ${payload[0].value}k</div>;
                    }
                    return null;
                  }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                    {mockChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.name === 'APR' ? '#8B2C36' : '#F8E7E9'} className="transition-all duration-300 hover:opacity-80" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h5 className="text-sm font-[900] uppercase tracking-widest text-[#2D2424] italic">Recent Deliveries</h5>
              <Link href="/admin/shipments" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#8B2C36] transition-all">
                View All <span>→</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-left border-b border-slate-50">
                    <th className="pb-4">SHIPMENT ID</th>
                    <th className="pb-4">ROUTE</th>
                    <th className="pb-4">STATUS</th>
                    <th className="pb-4">COMPLETED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {carrier.recentShipments?.length > 0 ? carrier.recentShipments.map((ship:any, i:number) => (
                    <tr key={i} className="group">
                      <td className="py-4 text-xs font-black text-[#2D2424]">#{ship.id.slice(-8).toUpperCase()}</td>
                      <td className="py-4 text-xs font-bold text-slate-500 italic">{ship.origin} → {ship.destination}</td>
                      <td className="py-4">
                        <span className={`text-[10px] font-black uppercase italic ${ship.status === 'COMPLETED' ? 'text-[#2D8A7E]' : 'text-blue-500'}`}>{ship.status.replace('_', ' ')}</span>
                      </td>
                      <td className="py-4 text-xs font-bold text-slate-600">{new Date(ship.date).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="py-8 text-center text-xs text-slate-400 font-bold italic">No delivery history found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
