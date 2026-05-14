'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    DollarSign, 
    Clock, 
    CheckCircle2, 
    AlertCircle, 
    Download, 
    Search, 
    Bell, 
    HelpCircle,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Landmark,
    CreditCard,
    ArrowRightLeft,
    Calendar,
    ChevronRight,
    Filter,
    ShieldCheck
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    AreaChart, 
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Mock data
const payoutTrendData = [
    { name: 'Mon', value: 45000 },
    { name: 'Tue', value: 52000 },
    { name: 'Wed', value: 38000 },
    { name: 'Thu', value: 65000 },
    { name: 'Fri', value: 48000 },
    { name: 'Sat', value: 25000 },
    { name: 'Sun', value: 32000 },
];

const distributionData = [
    { name: 'Bank Transfer', value: 65, color: '#be123c' },
    { name: 'Stripe Connect', value: 25, color: '#fb7185' },
    { name: 'PayPal', value: 10, color: '#0ea5e9' },
];

const recentPayouts = [
    { 
        id: '#PAY-9923', 
        recipient: 'Swift Logistics LLC', 
        amount: '$12,450.00', 
        date: 'May 25, 2026', 
        method: 'Bank Transfer',
        status: 'Completed',
        initials: 'SL',
        color: 'bg-green-50 text-green-600'
    },
    { 
        id: '#PAY-9922', 
        recipient: 'Elena Transport', 
        amount: '$4,200.00', 
        date: 'May 25, 2026', 
        method: 'Stripe Connect',
        status: 'Processing',
        initials: 'ET',
        color: 'bg-blue-50 text-blue-600'
    },
    { 
        id: '#PAY-9921', 
        recipient: 'Global Freight Systems', 
        amount: '$28,900.15', 
        date: 'May 24, 2026', 
        method: 'Bank Transfer',
        status: 'Scheduled',
        initials: 'GF',
        color: 'bg-orange-50 text-orange-600'
    },
    { 
        id: '#PAY-9920', 
        recipient: 'Mark Wilson', 
        amount: '$850.00', 
        date: 'May 24, 2026', 
        method: 'PayPal',
        status: 'Failed',
        initials: 'MW',
        color: 'bg-red-50 text-red-600'
    },
];

export default function PayoutsPage() {
    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Payouts Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Manage disbursements, verify carrier bank accounts, and monitor payment cycles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-600 font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#be123c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-xl transition-all hover:scale-[1.02]">
                        <Calendar className="w-4 h-4" />
                        Payout Schedule
                    </button>
                </div>
            </div>

            {/* Top Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Payouts', value: '$2.4M', sub: '+8.2% vs LM', icon: <Wallet className="w-5 h-5 text-rose-500" />, trend: 'up' },
                    { label: 'Pending Approval', value: '18', sub: '$142k Volume', icon: <Clock className="w-5 h-5 text-orange-500" />, trend: 'neutral' },
                    { label: 'Avg Processing', value: '1.2 Days', sub: '-0.4d vs LM', icon: <ArrowRightLeft className="w-5 h-5 text-blue-500" />, trend: 'up' },
                    { label: 'Success Rate', value: '99.8%', sub: 'Target: 99.5%', icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, trend: 'up' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
                            }`}>
                                {stat.trend === 'up' && <ArrowUpRight className="w-2.5 h-2.5" />}
                                {stat.sub}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                            <div className="text-2xl font-black text-[#0f172a]">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Payout Trend */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <h3 className="text-sm font-black text-[#0f172a]">Payout Volume Trend</h3>
                        <div className="px-4 py-1.5 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-lg border border-gray-100">
                            Daily Volume
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={payoutTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="payoutGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#be123c" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#be123c" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
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
                                                <div className="bg-white p-4 shadow-2xl rounded-2xl border border-gray-50">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{payload[0].payload.name}</p>
                                                    <p className="text-lg font-black text-[#be123c]">
                                                        ${typeof val === 'number' ? val.toLocaleString() : val}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#be123c" fillOpacity={1} fill="url(#payoutGradient)" strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Method Distribution */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-sm font-black text-[#0f172a] mb-8">Payout Methods</h3>
                    
                    <div className="relative h-[220px] mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-[#0f172a]">100%</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Distributed</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1">
                        {distributionData.map((item, i) => (
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

            {/* Recent Payouts Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-sm font-black text-[#0f172a]">Recent Payout Activity</h3>
                    <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search recipients..." className="bg-transparent border-none text-xs font-medium text-gray-500 focus:ring-0 w-48" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-left bg-gray-50/30">
                                <th className="px-8 py-4">Payout ID</th>
                                <th className="px-8 py-4">Recipient</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Method</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentPayouts.map((pay, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-[#0f172a]">{pay.id}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{pay.date}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${pay.color} flex items-center justify-center text-xs font-black border border-gray-100`}>
                                                {pay.initials}
                                            </div>
                                            <span className="text-sm font-bold text-[#0f172a]">{pay.recipient}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-[#0f172a]">{pay.amount}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {pay.method === 'Bank Transfer' ? <Landmark className="w-3.5 h-3.5 text-gray-400" /> : 
                                             pay.method === 'Stripe Connect' ? <CreditCard className="w-3.5 h-3.5 text-gray-400" /> : 
                                             <DollarSign className="w-3.5 h-3.5 text-gray-400" />}
                                            <span className="text-xs font-bold text-gray-600">{pay.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                pay.status === 'Completed' ? 'bg-green-500' : 
                                                pay.status === 'Processing' ? 'bg-blue-500' : 
                                                pay.status === 'Scheduled' ? 'bg-orange-500' : 'bg-red-500'
                                            }`}></div>
                                            <span className={`text-xs font-bold ${
                                                pay.status === 'Completed' ? 'text-green-600' : 
                                                pay.status === 'Processing' ? 'text-blue-600' : 
                                                pay.status === 'Scheduled' ? 'text-orange-600' : 'text-red-600'
                                            }`}>{pay.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Row: Verification Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldCheck className="w-6 h-6 text-rose-500" />
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Bank Verification Queue</h3>
                        </div>
                        <p className="text-xs text-gray-400 font-medium mb-8 max-w-sm">There are <span className="text-white font-bold">12 new carriers</span> awaiting bank account verification to receive payouts.</p>
                        <button className="px-8 py-3 bg-rose-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20">
                            Start Verification
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-rose-200 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-rose-50 rounded-3xl flex items-center justify-center text-[#be123c] group-hover:bg-[#be123c] group-hover:text-white transition-all duration-500">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-[#0f172a]">Monthly Audit Report</h3>
                            <p className="text-xs text-gray-500 font-medium">Generate compliance documentation for May 2026.</p>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-all">
                        <Download className="w-5 h-5 text-gray-400 group-hover:text-[#0f172a]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
