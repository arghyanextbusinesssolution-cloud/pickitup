'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Lock, 
    Unlock, 
    ShieldCheck, 
    AlertTriangle, 
    Clock, 
    ArrowRight, 
    Search, 
    Bell, 
    HelpCircle,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Box,
    Truck,
    User,
    CheckCircle2,
    RotateCcw,
    DollarSign,
    Info
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell,
    LineChart,
    Line
} from 'recharts';

// Mock data
const escrowTrendData = [
    { name: 'May 01', volume: 2.4 },
    { name: 'May 05', volume: 3.1 },
    { name: 'May 10', volume: 2.8 },
    { name: 'May 15', volume: 4.2 },
    { name: 'May 20', volume: 3.9 },
    { name: 'May 25', volume: 4.8 },
];

const escrowStatusData = [
    { name: 'Securely Held', value: 70, color: '#be123c' },
    { name: 'Releasing Soon', value: 15, color: '#fb7185' },
    { name: 'Disputed/Locked', value: 10, color: '#0ea5e9' },
    { name: 'Pending Initial', value: 5, color: '#e2e8f0' },
];

const escrowList = [
    { 
        id: '#SHP-2884', 
        shipper: 'Acme Corp', 
        carrier: 'Rapid Freight', 
        amount: '$8,450.00', 
        releaseDate: 'May 26, 2026',
        status: 'Securely Held',
        risk: 'Low'
    },
    { 
        id: '#SHP-2885', 
        shipper: 'Global Tech', 
        carrier: 'Swift Logistics', 
        amount: '$12,200.00', 
        releaseDate: 'Releasing Today',
        status: 'Releasing',
        risk: 'Low'
    },
    { 
        id: '#SHP-2886', 
        shipper: 'Mark Evans', 
        carrier: 'Independent Trans', 
        amount: '$4,500.00', 
        releaseDate: 'Locked',
        status: 'Disputed',
        risk: 'High'
    },
];

export default function EscrowPage() {
    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Escrow & Safe-Hold</h1>
                    <p className="text-sm text-gray-500 font-medium">Monitoring $4.8M in secure transaction funds across active global shipments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 mr-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                                <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" />
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 shadow-sm">
                            +12
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#be123c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-xl transition-all hover:scale-[1.02]">
                        <ShieldCheck className="w-4 h-4" />
                        Audit Assets
                    </button>
                </div>
            </div>

            {/* Top Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total in Escrow', value: '$4.8M', sub: 'Securely Held', icon: <Lock className="w-5 h-5 text-rose-500" />, color: 'text-rose-600' },
                    { label: 'Releasing (24h)', value: '$1.2M', sub: 'Auto-processing', icon: <Unlock className="w-5 h-5 text-green-500" />, color: 'text-green-600' },
                    { label: 'Locked/Disputed', value: '$420k', sub: 'Requires Review', icon: <AlertTriangle className="w-5 h-5 text-orange-500" />, color: 'text-orange-600' },
                    { label: 'Avg Hold Time', value: '4.5d', sub: 'Target: < 5 days', icon: <Clock className="w-5 h-5 text-blue-500" />, color: 'text-blue-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-white group-hover:shadow-sm transition-all duration-500">
                                {stat.icon}
                            </div>
                            <div className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                                <Info className="w-4 h-4 text-gray-300" />
                            </div>
                        </div>
                        <div className="space-y-1 relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                            <p className="text-[10px] font-bold text-gray-400 mt-1">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Escrow Growth Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full -mr-32 -mt-32 opacity-20 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <div>
                            <h3 className="text-sm font-black text-[#0f172a] mb-1">Escrow Volume Trend</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Growth over last 30 days</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:text-[#0f172a] transition-all"><RotateCcw className="w-4 h-4" /></button>
                            <button className="px-4 py-2 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-black/10">Full Report</button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={escrowTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                />
                                <YAxis hide />
                                <Tooltip 
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const val = payload[0].value;
                                            return (
                                                <div className="bg-[#0f172a] p-4 shadow-2xl rounded-2xl border border-white/10">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{payload[0].payload.name}</p>
                                                    <p className="text-lg font-black text-white">
                                                        ${typeof val === 'number' ? val.toLocaleString() : val}M
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="volume" 
                                    stroke="#be123c" 
                                    strokeWidth={4} 
                                    dot={{ r: 6, fill: '#be123c', strokeWidth: 3, stroke: '#fff' }} 
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Funds Status Pie */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-sm font-black text-[#0f172a] mb-10">Asset Allocation</h3>
                    
                    <div className="relative h-[220px] mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={escrowStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={95}
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {escrowStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-[#0f172a]">100%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Protected</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1">
                        {escrowStatusData.map((item, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs font-bold text-gray-600">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-[#0f172a]">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Escrow Ledger Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h3 className="text-sm font-black text-[#0f172a]">Active Escrow Ledger</h3>
                        <div className="px-3 py-1 bg-blue-50 text-[9px] font-black text-blue-600 uppercase tracking-widest rounded-full border border-blue-100">842 Active Holds</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search Shipment ID..." 
                                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-medium w-64 focus:ring-2 focus:ring-rose-500 transition-all"
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-left bg-gray-50/30">
                                <th className="px-8 py-4">Shipment & Parties</th>
                                <th className="px-8 py-4">Held Amount</th>
                                <th className="px-8 py-4">Est. Release</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Risk Profile</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {escrowList.map((item, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[#0f172a] mb-1">{item.id}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-gray-400">{item.shipper}</span>
                                                <ArrowRight className="w-2.5 h-2.5 text-gray-300" />
                                                <span className="text-[10px] font-bold text-gray-400">{item.carrier}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-[#0f172a]">{item.amount}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-xs font-bold text-gray-600">{item.releaseDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest inline-block ${
                                            item.status === 'Securely Held' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                            item.status === 'Releasing' ? 'bg-green-50 text-green-600 border border-green-100' :
                                            'bg-orange-50 text-orange-600 border border-orange-100'
                                        }`}>
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.risk === 'Low' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                                            <span className={`text-xs font-bold ${item.risk === 'Low' ? 'text-green-600' : 'text-red-600'}`}>{item.risk} Risk</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 text-[#0f172a] transition-all"><ShieldCheck className="w-4 h-4" /></button>
                                            <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Alert Section */}
            <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                        <AlertTriangle className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-orange-900 leading-tight">Attention: High-Value Dispute Locked</h4>
                        <p className="text-xs text-orange-700 font-medium">Shipment #SHP-2886 has been flagged with a damage claim. <span className="font-bold underline cursor-pointer">Review 12 attached files</span> to determine liability.</p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20">
                    Investigate Now
                </button>
            </div>
        </div>
    );
}
