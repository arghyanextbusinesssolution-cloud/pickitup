'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Package, 
    Truck, 
    Clock, 
    AlertTriangle, 
    TrendingUp, 
    Download, 
    Activity, 
    Globe, 
    Zap, 
    ArrowUpRight, 
    ArrowDownRight,
    MapPin,
    Radio
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
    Line,
    AreaChart,
    Area
} from 'recharts';

// Mock data
const volumeData = [
    { name: 'Mon', value: 1.5 },
    { name: 'Tue', value: 2.2 },
    { name: 'Wed', value: 1.8 },
    { name: 'Thu', value: 3.5 },
    { name: 'Fri', value: 4.8 },
    { name: 'Sat', value: 1.8 },
    { name: 'Sun', value: 1.4 },
];

const statusData = [
    { name: 'Delivered', value: 38200, color: '#22c55e' }, // green
    { name: 'In Transit', value: 3804, color: '#0ea5e9' }, // blue
    { name: 'Delayed', value: 412, color: '#f59e0b' }, // orange
    { name: 'Failed', value: 84, color: '#ef4444' }, // red
];

const transitEfficiencyData = [
    { name: 'Week 1', score: 85 },
    { name: 'Week 2', score: 88 },
    { name: 'Week 3', score: 82 },
    { name: 'Week 4', score: 92 },
    { name: 'Week 5', score: 90 },
];

export default function ShipmentsAnalyticsPage() {
    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Shipments Operational Analytics</h1>
                    <p className="text-sm text-gray-500 font-medium">Real-time oversight of global fleet performance and transit health.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#475569] font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                        <Download className="w-4 h-4" />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#be123c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-xl transition-all hover:scale-[1.02]">
                        <Activity className="w-4 h-4" />
                        Live Monitoring
                    </button>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Shipments', value: '42.5k', sub: '+12.5% vs last month', icon: <Package className="w-5 h-5 text-blue-500" />, bg: 'bg-white' },
                    { label: 'Delivered', value: '38.2k', sub: '90% success rate', icon: <Truck className="w-5 h-5 text-green-500" />, bg: 'bg-white' },
                    { label: 'Delayed', value: '412', sub: '-2% from yesterday', icon: <Clock className="w-5 h-5 text-orange-500" />, bg: 'bg-white' },
                    { label: 'Failed Deliveries', value: '84', sub: 'Action required', icon: <AlertTriangle className="w-5 h-5 text-red-500" />, bg: 'bg-white', isUrgent: true },
                ].map((stat, i) => (
                    <div key={i} className={`${stat.bg} p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all`}>
                        {stat.isUrgent && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-8 -mt-8 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                        )}
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                            <div className={`p-2 rounded-xl bg-gray-50`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <div className={`text-3xl font-black ${stat.isUrgent ? 'text-red-600' : 'text-[#0f172a]'}`}>{stat.value}</div>
                            <div className="flex items-center gap-1 mt-1">
                                <span className={`text-[10px] font-bold ${stat.isUrgent ? 'text-red-500' : i === 2 ? 'text-green-500' : 'text-green-500'}`}>
                                    {stat.sub}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Shipment Volume Chart */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Shipment Volume Over Time</h3>
                        <div className="flex bg-gray-50 p-1 rounded-xl">
                            {['Daily', 'Weekly', 'Monthly'].map((tab) => (
                                <button 
                                    key={tab} 
                                    className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                                        tab === 'Daily' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={volumeData}>
                                <defs>
                                    <linearGradient id="shipmentGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fb7185" stopOpacity={0.6} />
                                        <stop offset="100%" stopColor="#fb7185" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const val = payload[0].value;
                                            return (
                                                <div className="bg-white p-4 shadow-2xl rounded-2xl border border-gray-50">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
                                                    <p className="text-xl font-black text-[#0f172a]">
                                                        {typeof val === 'number' ? val.toLocaleString() : val}k Shipments
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar 
                                    dataKey="value" 
                                    fill="url(#shipmentGradient)" 
                                    radius={[8, 8, 8, 8]} 
                                    barSize={60}
                                    stroke="#fb7185"
                                    strokeWidth={2}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Delivery Status Chart */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Delivery Status</h3>
                    
                    <div className="h-[250px] relative mb-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={95}
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-[#0f172a]">90%</span>
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Success</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {statusData.map((status, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: status.color }}></div>
                                    <span className="text-xs font-bold text-gray-600">{status.name}</span>
                                </div>
                                <span className="text-xs font-black text-[#0f172a]">{status.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Global Shipment Density */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Global Shipment Density</h3>
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-100">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest">Live Feed</span>
                        </div>
                    </div>
                    
                    <div className="relative h-[250px] bg-gray-50 rounded-3xl overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Globe className="w-32 h-32 text-gray-200 group-hover:text-blue-100 transition-colors duration-700" />
                        </div>
                        {/* Mock map pins */}
                        {[
                            { top: '20%', left: '30%', color: 'bg-blue-500' },
                            { top: '45%', left: '60%', color: 'bg-green-500' },
                            { top: '70%', left: '40%', color: 'bg-orange-500' },
                            { top: '35%', left: '80%', color: 'bg-blue-500' },
                        ].map((pin, i) => (
                            <motion.div 
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className={`absolute w-3 h-3 ${pin.color} rounded-full border-2 border-white shadow-lg`}
                                style={{ top: pin.top, left: pin.left }}
                            >
                                <div className={`absolute inset-0 ${pin.color} rounded-full animate-ping opacity-40`}></div>
                            </motion.div>
                        ))}
                        <div className="absolute bottom-6 left-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Hubs</p>
                            <p className="text-sm font-black text-[#0f172a]">128 Global Hubs</p>
                        </div>
                    </div>
                </div>

                {/* Transit Efficiency Score */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Transit Efficiency Score</h3>
                        <Zap className="w-4 h-4 text-blue-500" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative w-40 h-40">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#f1f5f9"
                                    strokeWidth="8"
                                />
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="8"
                                    strokeDasharray="282.7"
                                    initial={{ strokeDashoffset: 282.7 }}
                                    animate={{ strokeDashoffset: 282.7 * (1 - 0.92) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-[#0f172a]">92</span>
                                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Optimized</span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6 w-full">
                            {[
                                { label: 'Route Optimization', score: 94, color: 'bg-blue-500' },
                                { label: 'Fuel Efficiency', score: 88, color: 'bg-green-500' },
                                { label: 'Load Factor', score: 82, color: 'bg-orange-500' },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-gray-600">{item.label}</span>
                                        <span className="text-xs font-black text-[#0f172a]">{item.score}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.score}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
