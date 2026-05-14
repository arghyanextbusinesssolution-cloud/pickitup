'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '../../../../services/admin.service';
import { 
  Users, 
  Truck, 
  Package, 
  DollarSign, 
  TrendingUp,
  Activity,
  Calendar,
  Wallet,
  ArrowUpRight,
  BarChart3
} from 'lucide-react';

// Enhanced Animated Counter with easing and precision
const AnimatedCounter = ({ value, prefix = '', suffix = '', duration = 2000 }: { value: number, prefix?: string, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Custom Animated Line Chart
const AnimatedLineChart = ({ data }: { data: any[] }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length === 0) return (
    <div className="w-full h-64 bg-white rounded-[3rem] animate-pulse flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest">
      Synchronizing...
    </div>
  );

  const maxVal = Math.max(...data.map(d => d.volume), 5);
  const width = 500;
  const height = 250;
  const padding = 50;
  
  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2) / (data.length - 1));
    const y = height - padding - (d.volume * (height - padding * 2) / maxVal);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
       <div className="flex items-center justify-between mb-10">
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Network Activity</h4>
          <p className="text-2xl font-black text-[#2D2424] tracking-tight">Monthly Volume</p>
        </div>
        <div className="flex gap-2">
            <div className="px-3 py-1 bg-green-50 rounded-full text-[9px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1">
                <ArrowUpRight size={10} /> +14.2%
            </div>
            <div className="p-3 bg-[#8B2C36]/5 rounded-2xl text-[#8B2C36]">
              <Activity size={20} />
            </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-2xl overflow-visible">
        {/* The Line */}
        <polyline
          fill="none"
          stroke="#8B2C36"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          style={{
            strokeDasharray: 1200,
            strokeDashoffset: animated ? 0 : 1200,
            transition: 'stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Gradient Area */}
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B2C36" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8B2C36" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M ${padding},${height - padding} ${points} L ${width - padding},${height - padding} Z`}
          fill="url(#lineGrad)"
          style={{
            opacity: animated ? 1 : 0,
            transition: 'opacity 3s ease-in'
          }}
        />

        {/* Labels & Vertical Lines */}
        {data.map((d, i) => {
          const x = padding + (i * (width - padding * 2) / (data.length - 1));
          return (
            <g key={i}>
              <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#F8FAFC" strokeWidth="2" strokeDasharray="4 4" />
              <text 
                x={x} 
                y={height - 15} 
                textAnchor="middle" 
                className="text-[12px] font-black fill-slate-300 uppercase tracking-tighter"
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Custom Animated Revenue Bar Chart
const AnimatedBarChart = ({ data }: { data: any[] }) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => d.revenue), 1000);
  const width = 500;
  const height = 250;
  const padding = 50;
  const barWidth = (width - padding * 2) / data.length - 25;

  return (
    <div className="w-full bg-[#1A1A1A] p-10 rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden group hover:border-[#D14343]/30 transition-all duration-500">
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Financial Flow</h4>
          <p className="text-2xl font-black text-white tracking-tight">Revenue Stream</p>
        </div>
        <div className="p-3 bg-white/5 rounded-2xl text-[#D14343]">
          <BarChart3 size={20} />
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible relative z-10">
        {data.map((d, i) => {
          const x = padding + (i * (width - padding * 2) / data.length) + 12.5;
          const barHeight = (d.revenue * (height - padding * 2) / maxVal);
          const y = height - padding - barHeight;
          
          return (
            <g key={i} className="group/bar">
              <rect
                x={x}
                y={animated ? y : height - padding}
                width={barWidth}
                height={animated ? barHeight : 0}
                rx="12"
                fill={i === data.length - 1 ? "#D14343" : "rgba(255,255,255,0.08)"}
                className="transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) hover:fill-[#D14343]"
                style={{ transitionDelay: `${i * 150}ms` }}
              />
              <text 
                x={x + barWidth / 2} 
                y={height - 15} 
                textAnchor="middle" 
                className="text-[12px] font-black fill-slate-600 uppercase tracking-tighter transition-colors group-hover/bar:fill-white"
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Background Decoration */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#D14343] opacity-[0.03] blur-[80px] rounded-full"></div>
    </div>
  );
};

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, trendData] = await Promise.all([
          adminService.getStats(),
          adminService.getChartData()
        ]);
        setStats(statsData);
        setChartData(trendData);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const netRevenue = (stats?.payoutSum || 0) * 0.15;

  return (
    <div className="min-h-screen bg-[#FFF9F9] font-sans text-[#2D2424] p-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 px-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-[#8B2C36] flex items-center justify-center text-white shadow-lg shadow-[#8B2C36]/20">
                <Activity size={20} />
             </div>
             <h1 className="text-4xl font-black text-[#2D2424] tracking-tighter italic">COMMAND CENTER</h1>
          </div>
          <p className="text-sm text-slate-400 font-bold flex items-center gap-2 tracking-tight">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            ACTIVE NETWORK SYNC • {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-6 py-3 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm text-xs font-black text-slate-600 flex items-center gap-2">
              <Calendar size={16} className="text-[#D14343]" /> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
           </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-4">
        <div className="bg-white p-9 rounded-[3.5rem] shadow-sm border border-slate-50 relative group transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">PLATFORM USERS</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-black text-[#2D2424] tracking-tighter">
                {isLoading ? '---' : <AnimatedCounter value={stats?.userCount || 0} />}
            </h3>
            <span className="text-[10px] font-black text-[#2D8A7E] bg-[#2D8A7E]/5 px-2 py-0.5 rounded-full">+4%</span>
          </div>
          <div className="absolute right-10 top-10 text-slate-50 group-hover:text-[#8B2C36]/5 transition-colors">
            <Users size={48} />
          </div>
        </div>

        <div className="bg-white p-9 rounded-[3.5rem] shadow-sm border border-slate-50 relative group transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">ACTIVE CARRIERS</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-black text-[#2D2424] tracking-tighter">
                {isLoading ? '---' : <AnimatedCounter value={stats?.carrierCount || 0} />}
            </h3>
            <span className="text-[10px] font-black text-[#2D8A7E] bg-[#2D8A7E]/5 px-2 py-0.5 rounded-full">LIVE</span>
          </div>
          <div className="absolute right-10 top-10 text-slate-50 group-hover:text-[#8B2C36]/5 transition-colors">
            <Truck size={48} />
          </div>
        </div>

        <div className="bg-white p-9 rounded-[3.5rem] shadow-sm border border-slate-50 relative group transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">SHIPMENT NODES</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-black text-[#2D2424] tracking-tighter">
                {isLoading ? '---' : <AnimatedCounter value={stats?.shipmentCount || 0} />}
            </h3>
          </div>
          <div className="absolute right-10 top-10 text-slate-50 group-hover:text-[#8B2C36]/5 transition-colors">
            <Package size={48} />
          </div>
        </div>

        <div className="bg-[#8B2C36] p-9 rounded-[3.5rem] shadow-2xl shadow-[#8B2C36]/20 relative group transition-all duration-500 hover:scale-[1.02] overflow-hidden">
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">GROSS REVENUE</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-5xl font-black text-white tracking-tighter">
                {isLoading ? '---' : <AnimatedCounter value={stats?.payoutSum || 0} prefix="$" />}
            </h3>
          </div>
          <div className="absolute right-10 top-10 text-white/5">
            <DollarSign size={64} />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 px-4">
        <AnimatedLineChart data={chartData} />
        <AnimatedBarChart data={chartData} />
      </div>

      {/* Financial Details Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-16">
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-50 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all duration-500 shadow-sm hover:shadow-md">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Avg Transaction</p>
            <h4 className="text-3xl font-black text-[#2D2424] tracking-tighter">
              {isLoading ? '---' : <AnimatedCounter value={stats?.payoutSum && stats?.bookingCount ? Math.round(stats.payoutSum / stats.bookingCount) : 0} prefix="$" />}
            </h4>
          </div>
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#2D2424] group-hover:text-white transition-all duration-500">
            <Wallet size={24} />
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-50 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all duration-500 shadow-sm hover:shadow-md">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Net Platform Fee</p>
            <h4 className="text-3xl font-black text-[#2D8A7E] tracking-tighter">
              {isLoading ? '---' : <AnimatedCounter value={Math.round(netRevenue)} prefix="$" />}
            </h4>
          </div>
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#2D8A7E] group-hover:text-white transition-all duration-500">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-50 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all duration-500 shadow-sm hover:shadow-md">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Total Payouts</p>
            <h4 className="text-3xl font-black text-[#D14343] tracking-tighter">
              {isLoading ? '---' : <AnimatedCounter value={Math.round((stats?.payoutSum || 0) * 0.85)} prefix="$" />}
            </h4>
          </div>
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#D14343] group-hover:text-white transition-all duration-500">
            <DollarSign size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
