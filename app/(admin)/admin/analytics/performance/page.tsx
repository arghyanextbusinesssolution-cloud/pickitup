'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Activity, 
    Zap, 
    Shield, 
    Cpu, 
    Server, 
    Network, 
    TrendingUp, 
    Clock, 
    CheckCircle, 
    AlertCircle,
    Search,
    Bell,
    HelpCircle,
    ChevronRight,
    ArrowUpRight,
    BarChart3
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    LineChart, 
    Line, 
    AreaChart, 
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Mock data
const nodePerformanceData = [
    { name: 'North Hub', value: 94, color: '#be123c' },
    { name: 'South Hub', value: 88, color: '#fb7185' },
    { name: 'West Hub', value: 92, color: '#fca5a5' },
    { name: 'East Hub', value: 96, color: '#be123c' },
];

const healthMetrics = [
    { name: 'API Latency', value: '124ms', status: 'Optimal', color: 'bg-green-100 text-green-600' },
    { name: 'Server Uptime', value: '99.99%', status: 'Stable', color: 'bg-blue-100 text-blue-600' },
    { name: 'Database Load', value: '42%', status: 'Normal', color: 'bg-purple-100 text-purple-600' },
    { name: 'Bandwidth', value: '2.4 Gb/s', status: 'Peak', color: 'bg-orange-100 text-orange-600' },
];

const systemLoadTrend = [
    { name: '00:00', load: 30, traffic: 20 },
    { name: '04:00', load: 25, traffic: 15 },
    { name: '08:00', load: 60, traffic: 45 },
    { name: '12:00', load: 85, traffic: 90 },
    { name: '16:00', load: 75, traffic: 80 },
    { name: '20:00', load: 50, traffic: 60 },
    { name: '23:59', load: 40, traffic: 30 },
];

export default function PerformanceAnalyticsPage() {
    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-black text-[#0f172a]">Fleet & System Performance</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search nodes or metrics..." 
                            className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-xs font-medium w-64 focus:ring-2 focus:ring-rose-500 transition-all"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-gray-400">
                        <Bell className="w-5 h-5 cursor-pointer hover:text-[#0f172a] transition-colors" />
                        <HelpCircle className="w-5 h-5 cursor-pointer hover:text-[#0f172a] transition-colors" />
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs font-black text-[#0f172a]">Alice Sterling</p>
                            <p className="text-[10px] font-bold text-gray-400">Logistics Director</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 border-2 border-white shadow-sm overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Alice+Sterling&background=random" alt="User" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Row: Core Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Main Score Card */}
                <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
                    <Zap className="absolute top-10 right-10 w-16 h-16 text-rose-100 group-hover:text-rose-200 transition-colors duration-700" />
                    
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Overall Health Score</p>
                        <h2 className="text-2xl font-black text-[#0f172a] mb-8">System Efficiency</h2>
                        
                        <div className="space-y-1 mb-8">
                            <div className="text-4xl font-black text-[#be123c]">96.8%</div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Optimized Status</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                <ArrowUpRight className="w-3 h-3" />
                                +1.2% vs LW
                            </div>
                            <button className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Avg Latency Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Avg Latency</p>
                            <div className="p-3 bg-rose-50 rounded-2xl">
                                <Clock className="w-5 h-5 text-[#be123c]" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-black text-[#0f172a]">124</span>
                            <span className="text-lg font-black text-gray-400">ms</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Global Processing Speed</p>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-[#be123c]"
                        />
                    </div>
                </div>

                {/* Network Stability Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Stability</p>
                            <div className="p-3 bg-blue-50 rounded-2xl">
                                <Shield className="w-5 h-5 text-blue-500" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-black text-[#0f172a]">99.9%</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Fleet Connectivity</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">All nodes online</span>
                    </div>
                </div>
            </div>

            {/* Middle Row: Benchmark and Health */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Node Performance Benchmark */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-sm font-black text-[#0f172a] mb-1">Hub Performance Benchmark</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Regional processing efficiency</p>
                        </div>
                        <div className="px-4 py-1.5 bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-lg border border-gray-100">
                            Real-time
                        </div>
                    </div>

                    <div className="space-y-8">
                        {nodePerformanceData.map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-gray-700">{item.name}</span>
                                    <span className="text-xs font-black text-[#0f172a]">{item.value}%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-sm font-black text-[#0f172a] mb-10">System Health (CSAT)</h3>
                    
                    <div className="space-y-6 flex-1">
                        {healthMetrics.map((item, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-[10px] font-black`}>
                                        {item.name.substring(0, 3).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-700 group-hover:text-rose-600 transition-colors">{item.name}</p>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-[#0f172a]">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-8 w-full py-3 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        Refresh Diagnostics
                    </button>
                </div>
            </div>

            {/* Bottom Row: Load Trends */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-sm font-black text-[#0f172a]">System Load vs Network Traffic</h3>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#be123c] rounded-full"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">CPU Load</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Network Traffic</span>
                        </div>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={systemLoadTrend}>
                            <defs>
                                <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#be123c" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#be123c" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                                    if (active && payload && payload.length >= 2) {
                                        const val0 = payload[0].value;
                                        const val1 = payload[1].value;
                                        return (
                                            <div className="bg-white p-4 shadow-2xl rounded-2xl border border-gray-50">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{payload[0].payload.name}</p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between gap-6">
                                                        <span className="text-xs font-bold text-gray-500">CPU Load</span>
                                                        <span className="text-xs font-black text-[#be123c]">
                                                            {typeof val0 === 'number' ? val0.toLocaleString() : val0}%
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between gap-6">
                                                        <span className="text-xs font-bold text-gray-500">Traffic</span>
                                                        <span className="text-xs font-black text-blue-500">
                                                            {typeof val1 === 'number' ? val1.toLocaleString() : val1}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Area type="monotone" dataKey="load" stroke="#be123c" fillOpacity={1} fill="url(#loadGradient)" strokeWidth={3} />
                            <Area type="monotone" dataKey="traffic" stroke="#3b82f6" fillOpacity={1} fill="url(#trafficGradient)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
