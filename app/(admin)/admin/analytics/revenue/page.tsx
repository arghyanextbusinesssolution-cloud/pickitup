'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    DollarSign, 
    Ship, 
    CheckCircle, 
    ArrowUpRight, 
    MoreHorizontal, 
    Download, 
    Plus,
    Activity,
    CreditCard,
    Zap,
    Users,
    ChevronDown
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
    Legend,
    AreaChart,
    Area
} from 'recharts';

// Mock data for the charts
const revenueTrendData = [
    { name: 'Mon', value: 1.2 },
    { name: 'Tue', value: 1.8 },
    { name: 'Wed', value: 2.4 },
    { name: 'Thu', value: 1.6 },
    { name: 'Fri', value: 3.4 },
    { name: 'Sat', value: 1.4 },
    { name: 'Sun', value: 2.8 },
];

const revenueSourcesData = [
    { name: 'Direct Sales', value: 55, color: '#ef4444' }, // red
    { name: 'Subscriptions', value: 30, color: '#3b82f6' }, // blue
    { name: 'Marketplace', value: 15, color: '#93c5fd' }, // light blue
];

const topCustomers = [
    { name: 'Global Express Logistics', spent: '$1,420,000', growth: '+24.2%', status: 'ACTIVE', initials: 'GL' },
    { name: 'Nexus Industries', spent: '$995,400', growth: '+12.8%', status: 'ACTIVE', initials: 'NI' },
    { name: 'Blue Sky Freight', spent: '$760,200', growth: '-2.1%', status: 'ON HOLD', initials: 'BS' },
    { name: 'Vanguard Prime', spent: '$540,900', growth: '+8.3%', status: 'ACTIVE', initials: 'VP' },
];

const subscriptionRevenue = [
    { tier: 'Enterprise Tier', amount: '$1.2M', subscribers: 84, color: 'bg-red-500', progress: 85 },
    { tier: 'Pro Tier', amount: '$840K', subscribers: 312, color: 'bg-blue-500', progress: 65 },
    { tier: 'Standard Tier', amount: '$420K', subscribers: 850, color: 'bg-orange-400', progress: 45 },
];

const comparisonData = [
    { month: 'Jan', revenue: 400, profit: 240 },
    { month: 'Feb', revenue: 500, profit: 300 },
    { month: 'Mar', revenue: 350, profit: 200 },
    { month: 'Apr', revenue: 600, profit: 400 },
    { month: 'May', revenue: 450, profit: 250 },
    { month: 'Jun', revenue: 300, profit: 150 },
    { month: 'Jul', revenue: 400, profit: 200 },
    { month: 'Aug', revenue: 420, profit: 220 },
    { month: 'Sep', revenue: 440, profit: 240 },
    { month: 'Oct', revenue: 460, profit: 260 },
    { month: 'Nov', revenue: 480, profit: 280 },
    { month: 'Dec', revenue: 500, profit: 300 },
];

export default function RevenueAnalyticsPage() {
    return (
        <div className="p-8 bg-gray-50/50 min-h-screen font-sans">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f172a]">Revenue Analytics</h1>
                    <p className="text-sm text-gray-500 font-medium">Comprehensive financial oversight and revenue forecasting.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#f1f5f9] text-[#475569] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-all">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-500/20 hover:shadow-xl transition-all hover:scale-[1.02]">
                        Generate Invoice
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Earnings', value: '$4.2M', sub: '+12.5% vs LW', icon: <DollarSign className="w-5 h-5 text-red-500" />, iconBg: 'bg-red-50' },
                    { label: 'Revenue Growth', value: '+12.5%', sub: 'Stable Trend', icon: <TrendingUp className="w-5 h-5 text-blue-500" />, iconBg: 'bg-blue-50' },
                    { label: 'Avg Shipment Value', value: '$850', sub: 'Consistent', icon: <Ship className="w-5 h-5 text-orange-500" />, iconBg: 'bg-orange-50' },
                    { label: 'Payment Success', value: '99.2%', sub: 'Highest Record', icon: <CheckCircle className="w-5 h-5 text-green-500" />, iconBg: 'bg-green-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                            <div className={`${stat.iconBg} p-2 rounded-xl`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-black text-[#0f172a]">{stat.value}</div>
                            <div className="flex items-center gap-1">
                                {i === 0 || i === 3 ? (
                                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                                ) : null}
                                <span className={`text-[10px] font-bold ${i === 0 || i === 3 ? 'text-green-500' : 'text-gray-400'}`}>
                                    {stat.sub}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Revenue Trend */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-[#0f172a]">Revenue Trend</h3>
                        </div>
                        <div className="flex bg-gray-50 p-1 rounded-xl">
                            {['Daily', 'Weekly', 'Monthly'].map((tab) => (
                                <button 
                                    key={tab} 
                                    className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                                        tab === 'Daily' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#fca5a5" stopOpacity={0.8} />
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
                                    cursor={{ fill: '#f1f5f9' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const val = payload[0].value;
                                            return (
                                                <div className="bg-white p-3 shadow-xl rounded-xl border border-gray-50">
                                                    <p className="text-[10px] font-black text-[#0f172a] uppercase tracking-widest mb-1">{payload[0].payload.name}</p>
                                                    <p className="text-lg font-black text-red-500">
                                                        ${typeof val === 'number' ? val.toLocaleString() : val}M
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar 
                                    dataKey="value" 
                                    fill="url(#barGradient)" 
                                    radius={[10, 10, 10, 10]} 
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Sources */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#0f172a]">Revenue Sources</h3>
                    </div>
                    
                    <div className="h-[250px] relative mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueSourcesData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {revenueSourcesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white p-3 shadow-xl rounded-xl border border-gray-50">
                                                    <p className="text-[10px] font-black text-[#0f172a] uppercase tracking-widest mb-1">{payload[0].name}</p>
                                                    <p className="text-lg font-black" style={{ color: payload[0].payload.color }}>{payload[0].value}%</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-[#0f172a]">$4.2M</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {revenueSourcesData.map((source, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }}></div>
                                    <span className="text-xs font-bold text-gray-600">{source.name}</span>
                                </div>
                                <span className="text-xs font-black text-[#0f172a]">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row: Customers and Subscriptions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Top Customers */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-[#0f172a]">Top Customers by Spending</h3>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    <th className="text-left pb-4">Customer Name</th>
                                    <th className="text-right pb-4">Total Spent</th>
                                    <th className="text-right pb-4">Growth</th>
                                    <th className="text-right pb-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {topCustomers.map((customer, i) => (
                                    <tr key={i} className="group">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black text-gray-500 border border-gray-100">
                                                    {customer.initials}
                                                </div>
                                                <span className="text-sm font-bold text-[#0f172a] group-hover:text-red-500 transition-colors cursor-pointer">{customer.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <span className="text-sm font-black text-[#0f172a]">{customer.spent}</span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <span className={`text-xs font-bold ${customer.growth.startsWith('+') ? 'text-green-500' : 'text-orange-400'}`}>
                                                {customer.growth}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                                                customer.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Subscription Revenue */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#0f172a]">Subscription Revenue</h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        {subscriptionRevenue.map((sub, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl ${sub.color.replace('bg-', 'bg-')}/10 flex items-center justify-center border border-gray-50`}>
                                            {i === 0 ? <Users className="w-5 h-5 text-red-500" /> : 
                                             i === 1 ? <Zap className="w-5 h-5 text-blue-500" /> : 
                                             <CreditCard className="w-5 h-5 text-orange-500" />}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#0f172a] group-hover:text-red-500 transition-colors">{sub.tier}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sub.subscribers} Active Subscribers</p>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm font-black text-[#0f172a]">{sub.amount}</div>
                                </div>
                                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${sub.progress}%` }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                        className={`h-full ${sub.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Recurring Revenue (MRR)</p>
                            <div className="text-2xl font-black text-[#0f172a]">$2.46M</div>
                        </div>
                        <div className="bg-green-50 p-2 rounded-xl">
                            <Activity className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Profit vs Revenue Comparison Chart (Dark background) */}
            <div className="bg-[#0f172a] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                {/* Decorative particles */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Profit vs Revenue Comparison</h3>
                        </div>
                        <p className="text-xs text-gray-400 font-medium">Operational margin analysis across all regional hubs.</p>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#334155] rounded-sm"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Profit</span>
                        </div>
                    </div>
                </div>

                <div className="h-[250px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                                dy={10}
                            />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-[#1e293b] p-4 shadow-2xl rounded-2xl border border-white/5">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{payload[0].payload.month}</p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center gap-8">
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Revenue</span>
                                                        <span className="text-sm font-black text-white">${payload[0].value}K</span>
                                                    </div>
                                                    <div className="flex justify-between items-center gap-8">
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Profit</span>
                                                        <span className="text-sm font-black text-red-500">${payload[1].value}K</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar 
                                dataKey="revenue" 
                                fill="#ef4444" 
                                radius={[4, 4, 0, 0]} 
                                barSize={40}
                                opacity={0.8}
                            />
                            <Bar 
                                dataKey="profit" 
                                fill="#334155" 
                                radius={[4, 4, 0, 0]} 
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
