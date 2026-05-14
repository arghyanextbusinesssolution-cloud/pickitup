'use client';

import React from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ShieldCheck,
  MoreVertical,
  Edit3,
  Send,
  Download,
  LayoutDashboard,
  Truck,
  Heart,
  MessageSquare
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

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  type: 'SHIPPER' | 'CARRIER';
}

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

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ isOpen, onClose, user, type }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content - High Fidelity Bento Grid */}
      <div className="relative bg-[#FFF9F9] rounded-[2.5rem] shadow-2xl w-full max-w-6xl h-full max-h-[90vh] overflow-hidden flex flex-col border border-white/50">
        
        {/* Top Header/Navigation */}
        <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span>{type === 'SHIPPER' ? 'CUSTOMERS' : 'CARRIERS'}</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#8B2C36]">{user.firstName} {user.lastName}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* Profile Header Area */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-[#8B2C36] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-red-100 border-4 border-white">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-[1000] text-[#2D2424] tracking-tight mb-1 uppercase italic">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2D8A7E] animate-pulse"></span>
                  {user.companyName || user.industry || 'Key Account'} • {user.tier || 'Strategic Partner'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-6 py-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                <Edit3 size={16} /> Edit Profile
              </button>
              <button className="px-6 py-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                <Send size={16} /> Send Message
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
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">LIFETIME VALUE</p>
              <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">${(user.ltv || 0).toLocaleString()}</h4>
              <p className="text-[11px] font-bold text-[#2D8A7E]">↗ +12.4% VS LY</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Truck size={48} className="text-[#8B2C36]" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">ACTIVE SHIPMENTS</p>
              <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">{user.totalOrders || 0}</h4>
              <p className="text-[11px] font-bold text-[#D14343]">⊙ 2 IN CRITICAL PATH</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Clock size={48} className="text-[#8B2C36]" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">AVG. DELIVERY TIME</p>
              <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">2.4 days</h4>
              <p className="text-[11px] font-bold text-[#2D8A7E]">↘ -0.4 DAYS IMPROVEMENT</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <Heart size={48} className="text-[#8B2C36]" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 italic">HEALTH SCORE</p>
              <h4 className="text-3xl font-[1000] text-[#2D2424] mb-1">94%</h4>
              <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-[#2D8A7E] rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>

          {/* Main Content Grid (Two Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Sidebar Info */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Company Profile */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h5 className="text-sm font-[900] uppercase tracking-widest text-[#2D2424] italic">Company Profile</h5>
                  <Building2 size={18} className="text-slate-300" />
                </div>
                
                <div className="grid grid-cols-2 gap-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">INDUSTRY</p>
                    <p className="text-sm font-bold text-slate-700">{user.industry || 'IT & Software'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SIZE</p>
                    <p className="text-sm font-bold text-slate-700">500+ Employees</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">HEADQUARTERS</p>
                    <p className="text-sm font-bold text-slate-700">San Francisco, CA</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ESTABLISHED</p>
                    <p className="text-sm font-bold text-slate-700">Oct 2018</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">CONTACT INFORMATION</p>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail size={16} className="text-slate-300" />
                    <span className="text-sm font-bold underline decoration-[#8B2C36]/30">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone size={16} className="text-slate-300" />
                    <span className="text-sm font-bold">{user.phone || '+1 (415) 555-0192'}</span>
                  </div>
                </div>
              </div>

              {/* Account Manager */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">Account Manager</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                      alt="Manager" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-[900] text-[#2D2424] uppercase italic">Marcus Thorne</p>
                    <p className="text-[10px] font-black text-[#8B2C36] uppercase tracking-widest">Senior Logistics Advisor</p>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative group">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Internal Notes</h5>
                  <button className="text-[10px] font-black text-[#8B2C36] uppercase tracking-widest hover:underline transition-all">Add New</button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[#FFF9F9] p-5 rounded-2xl border border-red-50/50">
                    <p className="text-xs text-slate-600 font-bold italic mb-3 leading-relaxed">
                      "Prefers temperature-controlled freight for all Level 1 shipments. High sensitivity to transit time delays during Q4 peaks."
                    </p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Updated 2 days ago by M. Thorne</p>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-slate-400 font-bold italic leading-relaxed">
                      "Discussing expansion into EMEA routes for next fiscal year. Sarah requested a quote by Friday."
                    </p>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-3">Updated 1 week ago by M. Thorne</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Charts & Table */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Volume Trends Chart */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                  <h5 className="text-sm font-[900] uppercase tracking-widest text-[#2D2424] italic">Volume Trends</h5>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B2C36]"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Shipments</span>
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#ADB5BD', fontSize: 10, fontWeight: 900 }} 
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-black text-white px-3 py-1 rounded text-[10px] font-black uppercase">
                                Peak: {payload[0].value}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                        {mockChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.name === 'APR' ? '#8B2C36' : '#F8E7E9'} 
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Shipments Table */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h5 className="text-sm font-[900] uppercase tracking-widest text-[#2D2424] italic">Recent Shipments</h5>
                  <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#8B2C36] transition-all">
                    View All <span>→</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-left border-b border-slate-50">
                        <th className="pb-4">TRACKING ID</th>
                        <th className="pb-4">ROUTE</th>
                        <th className="pb-4">STATUS</th>
                        <th className="pb-4">EST. DELIVERY</th>
                        <th className="pb-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { id: '#LT-882910', route: 'SFO → LHR', status: 'In Transit', date: 'Oct 24, 2023', color: 'text-blue-500' },
                        { id: '#LT-882745', route: 'HKG → SFO', status: 'Delivered', date: 'Oct 20, 2023', color: 'text-[#2D8A7E]' },
                        { id: '#LT-882559', route: 'SFO → FRA', status: 'Delayed', date: 'Oct 21, 2023', color: 'text-[#D14343]' },
                        { id: '#LT-882412', route: 'NRT → LAX', status: 'Delivered', date: 'Oct 18, 2023', color: 'text-[#2D8A7E]' },
                      ].map((ship, i) => (
                        <tr key={i} className="group">
                          <td className="py-4 text-xs font-black text-[#2D2424]">{ship.id}</td>
                          <td className="py-4 text-xs font-bold text-slate-500 italic">{ship.route}</td>
                          <td className="py-4">
                            <span className={`text-[10px] font-black uppercase italic ${ship.color}`}>{ship.status}</span>
                          </td>
                          <td className="py-4 text-xs font-bold text-slate-600">{ship.date}</td>
                          <td className="py-4 text-right">
                            <button className="text-[10px] font-black text-[#8B2C36] uppercase tracking-widest hover:underline italic transition-all">
                              {ship.status === 'In Transit' ? 'Track' : ship.status === 'Delayed' ? 'Resolve' : 'Details'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        {/* Footer/System Status */}
        <div className="px-8 py-3 bg-[#111827] text-[9px] font-black text-white flex items-center justify-between uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              SYSTEM OPERATIONAL
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Globe size={10} />
              GLOBAL NODE LATENCY: 14MS
            </div>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>LAST UPDATED: 14:22:01 UTC</span>
            <span className="text-white">V2.4.0-STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
