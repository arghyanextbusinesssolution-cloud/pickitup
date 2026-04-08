'use client';

import React, { useEffect, useState } from 'react';
import { carrierService } from '@/services/carrier.service';

interface EarningsStats {
  deliveredCount: number;
  inTransitCount: number;
  totalEarned: number;
  potentialEarnings: number;
  recentTransactions: any[];
}

export default function EarningsPage() {
  const [stats, setStats] = useState<EarningsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await carrierService.getEarningsStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching earnings stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Crunching numbers...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Financial Overview</div>
          <h1 className="text-3xl font-[1000] text-gray-900 uppercase tracking-tight">Earnings & performance</h1>
        </div>
        <button className="bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm text-xs font-black uppercase tracking-widest hover:shadow-md transition-all text-gray-600">
          Download Statement ↓
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Delivered Total */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-xl mb-6">📦</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Delivered</div>
            <div className="text-4xl font-[1000] text-gray-900 tracking-tighter">{stats?.deliveredCount || 0}</div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Completed</span>
            </div>
          </div>
        </div>

        {/* Total Earned */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl mb-6">💰</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Earned</div>
            <div className="text-4xl font-[1000] text-purple-600 tracking-tighter">${stats?.totalEarned?.toLocaleString() || '0'}</div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cleared Balance</span>
            </div>
          </div>
        </div>

        {/* In Transit Count */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-6">🚚</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">In Transit</div>
            <div className="text-4xl font-[1000] text-gray-900 tracking-tighter">{stats?.inTransitCount || 0}</div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Active Loads</span>
            </div>
          </div>
        </div>

        {/* Potential Earnings */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-xl mb-6">✨</div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Potential Pay</div>
            <div className="text-4xl font-[1000] text-yellow-600 tracking-tighter">${stats?.potentialEarnings?.toLocaleString() || '0'}</div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Incoming Funds</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-sm border border-gray-50 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Recent Activity</h2>
            <button className="text-purple-600 font-bold hover:text-purple-700 text-xs uppercase tracking-[0.2em]">Full History ↗</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Details</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats?.recentTransactions && stats.recentTransactions.length > 0 ? (
                  stats.recentTransactions.map((tx: any) => (
                    <tr key={tx.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="font-black text-gray-900 text-sm uppercase leading-none mb-1">{tx.title}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase">
                          {new Date(tx.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Order #{tx.id.slice(-6).toUpperCase()}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className={`font-black ${tx.status === 'COMPLETED' ? 'text-green-600' : 'text-purple-600'}`}>
                          +${tx.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          tx.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                      No recent activity found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Target */}
        <div className="bg-purple-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mb-32 -mr-32"></div>
          <div className="relative z-10">
            <h3 className="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em] mb-10">Next Settlement</h3>
            <div className="text-sm font-bold text-purple-100 mb-2">Estimated Payout Date</div>
            <div className="text-5xl font-[1000] tracking-tighter mb-12">April 15</div>
            
            <div className="space-y-6 mb-12">
               <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-xs font-bold text-purple-200 uppercase">Current Balance</span>
                  <span className="font-black">${stats?.totalEarned?.toLocaleString() || '0.00'}</span>
               </div>
               <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-xs font-bold text-purple-200 uppercase">Processing Fees</span>
                  <span className="font-black">-$12.50</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-white uppercase">Net Total</span>
                  <span className="text-2xl font-black text-green-400 tracking-tighter">${((stats?.totalEarned || 0) > 12.5 ? (stats?.totalEarned! - 12.5) : 0).toLocaleString()}</span>
               </div>
            </div>

            <button className="w-full bg-white text-purple-900 font-black py-5 rounded-[1.5rem] uppercase tracking-widest text-[10px] hover:bg-purple-50 transition-all shadow-xl shadow-purple-950/20 active:scale-95">
              Request Instant Payout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
