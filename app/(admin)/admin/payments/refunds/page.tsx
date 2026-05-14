'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    RotateCcw, 
    Clock, 
    CheckCircle2, 
    Timer, 
    Download, 
    Search, 
    Bell, 
    HelpCircle,
    MoreHorizontal,
    ArrowUpRight,
    AlertTriangle,
    ShieldAlert,
    ChevronRight,
    User,
    Check,
    X,
    FileText
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
    Legend
} from 'recharts';

// Mock data
const refundTrendData = [
    { name: 'May 01', thisMonth: 1200, prevMonth: 1000 },
    { name: 'May 05', thisMonth: 1800, prevMonth: 1200 },
    { name: 'May 10', thisMonth: 3200, prevMonth: 2800 },
    { name: 'May 15', thisMonth: 2400, prevMonth: 3200 },
    { name: 'May 20', thisMonth: 4200, prevMonth: 3600 },
    { name: 'May 25', thisMonth: 5800, prevMonth: 4200 },
    { name: 'May 30', thisMonth: 3600, prevMonth: 3800 },
];

const refundReasonsData = [
    { name: 'Shipment Delay', value: 48, color: '#be123c' },
    { name: 'Damaged Goods', value: 22, color: '#fb7185' },
    { name: 'Service Issue', value: 15, color: '#0ea5e9' },
    { name: 'Other', value: 15, color: '#e2e8f0' },
];

const refundRequests = [
    { 
        id: '#REF-0042-19', 
        date: 'May 24, 14:22 PM', 
        customer: 'Johnathan Doe', 
        amount: '$1,240.50', 
        reason: 'DAMAGED GOODS', 
        status: 'Pending Review',
        initials: 'JD',
        color: 'bg-rose-50 text-rose-600'
    },
    { 
        id: '#REF-0039-44', 
        date: 'May 24, 09:15 AM', 
        customer: 'Elena Martinez', 
        amount: '$450.00', 
        reason: 'SHIPMENT DELAY', 
        status: 'Processed',
        initials: 'EM',
        color: 'bg-blue-50 text-blue-600'
    },
    { 
        id: '#REF-0012-01', 
        date: 'May 23, 16:45 PM', 
        customer: 'Bradley Wilson', 
        amount: '$2,890.15', 
        reason: 'SERVICE ISSUE', 
        status: 'Disputed',
        initials: 'BW',
        color: 'bg-gray-50 text-gray-600'
    },
];

const lifecycleSteps = [
    { title: 'Initiated', desc: 'Customer request received and verified', time: 'May 24, 14:22 PM', status: 'completed' },
    { title: 'Processing', desc: 'Automated checks & credit score validation', time: 'May 24, 15:10 PM', status: 'completed' },
    { title: 'Gateway Transmission', desc: 'Awaiting bank settlement confirmation', time: 'In Progress', status: 'current' },
    { title: 'Settled', desc: 'Funds available in customer account', time: 'Pending', status: 'pending' },
];

export default function RefundsPage() {
    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Refunds & Recoveries</h1>
                        <p className="text-sm text-gray-500 font-medium">Monitor financial returns, dispute chargebacks, and manage automated approval workflows.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#0f172a] font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                        <FileText className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Top Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Refunds', value: '$142,580.00', sub: '+12.5%', subColor: 'text-green-500', subBg: 'bg-green-50', icon: <RotateCcw className="w-5 h-5 text-rose-500" /> },
                    { label: 'Pending Refunds', value: '42', sub: 'Critical', subColor: 'text-orange-600', subBg: 'bg-orange-50', icon: <Clock className="w-5 h-5 text-orange-500" /> },
                    { label: 'Approval Rate', value: '94.2%', sub: 'High', subColor: 'text-green-500', subBg: 'bg-green-50', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                    { label: 'Avg Processing', value: '18.5h', sub: 'on', subColor: 'text-blue-500', subBg: 'bg-blue-50', icon: <Timer className="w-5 h-5 text-blue-500" /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                {stat.icon}
                            </div>
                            <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${stat.subBg} ${stat.subColor}`}>
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

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Volume Trend */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-sm font-black text-[#0f172a]">Refund Volume Trend</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#be123c] rounded-full"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">This Month</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Prev Month</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={refundTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                />
                                <YAxis hide />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length >= 2) {
                                            const val0 = payload[0].value;
                                            const val1 = payload[1].value;
                                            return (
                                                <div className="bg-white p-4 shadow-2xl rounded-2xl border border-gray-50">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{payload[0].payload.name}</p>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between gap-8">
                                                            <span className="text-xs font-bold text-gray-500">This Month</span>
                                                            <span className="text-xs font-black text-[#be123c]">
                                                                ${typeof val0 === 'number' ? val0.toLocaleString() : val0}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between gap-8">
                                                            <span className="text-xs font-bold text-gray-500">Prev Month</span>
                                                            <span className="text-xs font-black text-gray-400">
                                                                ${typeof val1 === 'number' ? val1.toLocaleString() : val1}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="thisMonth" fill="#be123c" radius={[4, 4, 0, 0]} barSize={40} />
                                <Bar dataKey="prevMonth" fill="#f1f5f9" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Refund Reasons */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-sm font-black text-[#0f172a] mb-8">Refund Reasons</h3>
                    
                    <div className="relative h-[220px] mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={refundReasonsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {refundReasonsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-[#0f172a]">1,204</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Requests</span>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1">
                        {refundReasonsData.map((item, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-all">
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

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-sm font-black text-[#0f172a]">Recent Refund Requests</h3>
                    <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">All Statuses</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-left bg-gray-50/30">
                                <th className="px-8 py-4">ID & Date</th>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Reason</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {refundRequests.map((req, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-[#0f172a] mb-0.5">{req.id}</p>
                                        <p className="text-[10px] font-bold text-gray-400">{req.date}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full ${req.color} flex items-center justify-center text-xs font-black border border-gray-100`}>
                                                {req.initials}
                                            </div>
                                            <span className="text-sm font-bold text-[#0f172a]">{req.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-[#0f172a]">{req.amount}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${
                                            req.reason === 'DAMAGED GOODS' ? 'text-rose-500' : 
                                            req.reason === 'SHIPMENT DELAY' ? 'text-blue-500' : 'text-gray-500'
                                        }`}>
                                            {req.reason}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                req.status === 'Pending Review' ? 'bg-orange-500' : 
                                                req.status === 'Processed' ? 'bg-green-500' : 'bg-red-500'
                                            }`}></div>
                                            <span className={`text-xs font-bold ${
                                                req.status === 'Pending Review' ? 'text-orange-600' : 
                                                req.status === 'Processed' ? 'text-green-600' : 'text-red-600'
                                            }`}>{req.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {req.status === 'Pending Review' ? (
                                                <>
                                                    <button className="px-4 py-1.5 bg-[#be123c] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-rose-700 transition-colors">Approve</button>
                                                    <button className="px-4 py-1.5 border border-gray-200 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-colors">Deny</button>
                                                </>
                                            ) : req.status === 'Disputed' ? (
                                                <button className="px-4 py-1.5 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-black transition-colors">Manage Dispute</button>
                                            ) : (
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><MoreHorizontal className="w-5 h-5 text-gray-400" /></button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Row: Chargeback and Lifecycle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chargeback Monitoring */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2 text-rose-500">
                            <ShieldAlert className="w-5 h-5" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Chargeback Monitoring</h3>
                        </div>
                        <div className="px-3 py-1 bg-rose-50 text-[9px] font-black text-rose-600 uppercase tracking-widest rounded-full">2 High Risk</div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { id: 'TXN_89323488 — AMEX Platinum', amount: '$3,400.00', desc: 'Claimed: Item not received. Proof of delivery available.' },
                            { id: 'TXN_49305582 — Visa Signature', amount: '$124.99', desc: 'Claimed: Fraudulent transaction. Awaiting bank response.' },
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-blue-50/50 rounded-[1.5rem] border border-blue-100 group hover:border-blue-300 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.id}</span>
                                    <span className="text-sm font-black text-[#be123c]">{item.amount}</span>
                                </div>
                                <p className="text-xs text-gray-600 font-medium mb-4">{item.desc}</p>
                                <div className="flex items-center gap-4">
                                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline underline-offset-4">Submit Evidence</button>
                                    <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Accept Loss</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Refund Lifecycle Status */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-sm font-black text-[#0f172a] mb-10">Refund Lifecycle Status</h3>
                    
                    <div className="space-y-10 flex-1 relative">
                        {/* Timeline line */}
                        <div className="absolute left-[19px] top-2 bottom-10 w-0.5 bg-gray-100"></div>
                        
                        {lifecycleSteps.map((step, i) => (
                            <div key={i} className="relative pl-12">
                                <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 ${
                                    step.status === 'completed' ? 'bg-green-500 text-white' : 
                                    step.status === 'current' ? 'bg-orange-400 text-white animate-pulse' : 'bg-gray-100 text-gray-300'
                                }`}>
                                    {step.status === 'completed' ? <Check className="w-5 h-5" /> : 
                                     step.status === 'current' ? <Clock className="w-5 h-5" /> : null}
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className={`text-sm font-black ${step.status === 'pending' ? 'text-gray-400' : 'text-[#0f172a]'}`}>{step.title}</h4>
                                        <p className="text-[11px] font-medium text-gray-400 mt-0.5">{step.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'current' ? 'text-orange-500' : 'text-gray-400'}`}>{step.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
