'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Rocket, 
    Timer, 
    DollarSign, 
    Star, 
    TrendingUp, 
    AlertCircle, 
    Search, 
    Bell, 
    HelpCircle,
    ChevronRight,
    ArrowUpRight,
    ShieldCheck,
    Target
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
    ScatterChart, 
    Scatter, 
    ZAxis,
    ReferenceLine,
    Legend,
    Cell
} from 'recharts';

// Mock data
const benchmarkData = [
    { name: 'Global Swift Logistics', value: 98, color: '#be123c' },
    { name: 'Blue Coast Freight', value: 82, color: '#fb7185' },
    { name: 'North Star Transport', value: 75, color: '#fca5a5' },
    { name: 'Apex Carriers', value: 91, color: '#be123c' },
];

const ratingsData = [
    { name: 'Global Swift', rating: 4.9, initials: 'GS', color: 'bg-blue-100 text-blue-600' },
    { name: 'Apex Carriers', rating: 4.7, initials: 'AC', color: 'bg-purple-100 text-purple-600' },
    { name: 'Blue Coast', rating: 4.2, initials: 'BC', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'North Star', rating: 3.8, initials: 'NS', color: 'bg-gray-100 text-gray-600' },
];

const trendData = [
    { name: 'Mon', carrierA: 40, carrierB: 60 },
    { name: 'Tue', carrierA: 35, carrierB: 70 },
    { name: 'Wed', carrierA: 55, carrierB: 50 },
    { name: 'Thu', carrierA: 50, carrierB: 65 },
    { name: 'Fri', carrierA: 70, carrierB: 55 },
    { name: 'Sat', carrierA: 85, carrierB: 60 },
    { name: 'Sun', carrierA: 75, carrierB: 50 },
];

const riskData = [
    { x: 20, y: 80, name: 'High Risk' },
    { x: 80, y: 70, name: 'Efficiency Zone' },
    { x: 40, y: 30, name: 'Emerging' },
    { x: 85, y: 20, name: 'Gold Standard' },
];

export default function CarrierPerformancePage() {
    return (
        <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
            {/* Custom Header based on Image */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-black text-[#0f172a]">Carrier Performance</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search carriers or routes..." 
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

            {/* Top Row: Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Top Performer Large Card */}
                <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
                    <Rocket className="absolute top-10 right-10 w-16 h-16 text-rose-100 group-hover:text-rose-200 transition-colors duration-700" />
                    
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Top Performer</p>
                        <h2 className="text-2xl font-black text-[#0f172a] mb-8">Global Swift Logistics</h2>
                        
                        <div className="space-y-1 mb-8">
                            <div className="text-4xl font-black text-[#be123c]">98.4%</div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Success Rate</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                <ArrowUpRight className="w-3 h-3" />
                                +2.4% vs LW
                            </div>
                            <button className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Avg Speed Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Avg Speed</p>
                            <div className="p-3 bg-rose-50 rounded-2xl">
                                <Timer className="w-5 h-5 text-[#be123c]" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-black text-[#0f172a]">14.2</span>
                            <span className="text-lg font-black text-gray-400">hrs</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Internal Processing Time</p>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-[#be123c]"
                        />
                    </div>
                </div>

                {/* Cost Efficiency Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cost Efficiency</p>
                            <div className="p-3 bg-blue-50 rounded-2xl">
                                <DollarSign className="w-5 h-5 text-blue-500" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-black text-[#0f172a]">$1.82</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Cost per kg/mile</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Target reached</span>
                    </div>
                </div>
            </div>

            {/* Middle Row: Benchmark and Ratings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Performance Benchmark */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-sm font-black text-[#0f172a] mb-1">Performance Benchmark</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Top 5 carriers by shipment volume</p>
                        </div>
                        <div className="px-4 py-1.5 bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-lg border border-gray-100 cursor-pointer">
                            Past 30 Days
                        </div>
                    </div>

                    <div className="space-y-8">
                        {benchmarkData.map((item, i) => (
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

                {/* Customer Ratings */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="text-sm font-black text-[#0f172a] mb-10">Customer Ratings (CSAT)</h3>
                    
                    <div className="space-y-6 flex-1">
                        {ratingsData.map((item, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-xs font-black`}>
                                        {item.initials}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-rose-600 transition-colors">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-black text-[#0f172a]">{item.rating}</span>
                                    <Star className="w-3 h-3 text-rose-500 fill-rose-500" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-8 w-full py-3 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                        View All Ratings
                    </button>
                </div>
            </div>

            {/* Bottom Row: Trends and Risk */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Delivery Time Trends */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black text-[#0f172a]">Delivery Time Trends</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#be123c] rounded-full"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Carrier A</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Carrier B</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
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
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length >= 2) {
                                            const val0 = payload[0].value;
                                            const val1 = payload[1].value;
                                            return (
                                                <div className="bg-white p-4 shadow-2xl rounded-2xl border border-gray-50">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{payload[0].payload.name}</p>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between gap-6">
                                                            <span className="text-xs font-bold text-gray-500">Carrier A</span>
                                                            <span className="text-xs font-black text-[#be123c]">
                                                                {typeof val0 === 'number' ? val0.toLocaleString() : val0}m
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between gap-6">
                                                            <span className="text-xs font-bold text-gray-500">Carrier B</span>
                                                            <span className="text-xs font-black text-gray-700">
                                                                {typeof val1 === 'number' ? val1.toLocaleString() : val1}m
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="carrierA" 
                                    stroke="#be123c" 
                                    strokeWidth={4} 
                                    dot={false} 
                                    activeDot={{ r: 6, fill: '#be123c', stroke: '#fff', strokeWidth: 2 }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="carrierB" 
                                    stroke="#94a3b8" 
                                    strokeWidth={3} 
                                    strokeDasharray="5 5" 
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Risk Assessment Matrix */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black text-[#0f172a]">Risk Assessment Matrix</h3>
                        <div className="px-3 py-1 bg-rose-50 text-[9px] font-black text-[#be123c] uppercase tracking-widest rounded-full border border-rose-100">
                            Damage/Loss vs Volume
                        </div>
                    </div>

                    <div className="h-[250px] w-full relative">
                        {/* Grid Labels */}
                        <div className="absolute top-0 right-0 text-[8px] font-black text-gray-300 uppercase tracking-widest">Efficiency Zone</div>
                        <div className="absolute top-0 left-0 text-[8px] font-black text-rose-300 uppercase tracking-widest">High Risk</div>
                        <div className="absolute bottom-0 left-0 text-[8px] font-black text-gray-300 uppercase tracking-widest">Emerging</div>
                        <div className="absolute bottom-0 right-0 text-[8px] font-black text-green-300 uppercase tracking-widest">Gold Standard</div>

                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid stroke="#f1f5f9" />
                                <XAxis type="number" dataKey="x" hide />
                                <YAxis type="number" dataKey="y" hide />
                                <ZAxis type="number" range={[100, 400]} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-[#0f172a] p-3 shadow-2xl rounded-xl border border-white/10">
                                                <p className="text-[10px] font-black text-white uppercase tracking-widest">{payload[0].payload.name}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <ReferenceLine x={50} stroke="#f1f5f9" strokeWidth={2} />
                                <ReferenceLine y={50} stroke="#f1f5f9" strokeWidth={2} />
                                <Scatter name="Carriers" data={riskData}>
                                    {riskData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={index === 0 ? '#ef4444' : index === 1 ? '#be123c' : index === 2 ? '#94a3b8' : '#22c55e'} 
                                        />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest vertical-text" style={{ writingMode: 'vertical-rl' }}>Error Ratio</span>
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Total Volume</span>
                    </div>

                    <button className="absolute bottom-8 right-8 w-12 h-12 rounded-2xl bg-[#be123c] text-white flex items-center justify-center shadow-xl shadow-rose-500/30 hover:scale-110 transition-transform">
                        <Target className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
