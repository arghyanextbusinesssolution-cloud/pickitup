'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipperService } from '@/services/shipper.service';

interface ShipperStats {
  totalSpent: number;
  inEscrow: number;
  totalShipments: number;
  completedShipments: number;
  recentPayments: any[];
}

export default function PaymentsPage() {
  const [stats, setStats] = useState<ShipperStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await shipperService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching shipper stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading financial data...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Payment History</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your transactions and escrow funds</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>⬇️</span> Download CSV
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl">💳</div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Spent</div>
            <div className="text-2xl font-[900] text-gray-900">${stats?.totalSpent?.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl">🔒</div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">In Escrow</div>
            <div className="text-2xl font-[900] text-gray-900">${stats?.inEscrow?.toLocaleString()}</div>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">📦</div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Done Jobs</div>
            <div className="text-2xl font-[900] text-gray-900">{stats?.completedShipments}</div>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">📊</div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Listed</div>
            <div className="text-2xl font-[900] text-gray-900">{stats?.totalShipments}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Details</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Shipment</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats?.recentPayments && stats.recentPayments.length > 0 ? (
                stats.recentPayments.map((p: any) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-6">
                      <div className="font-[900] text-gray-900 text-lg mb-1 uppercase tracking-tight">TXN-{p.id.slice(-6).toUpperCase()}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-gray-900 font-bold text-sm uppercase">{p.shipmentTitle}</div>
                      <Link href={`/shipper/dashboard/bookings?id=${p.id}`} className="text-purple-600 text-[10px] font-black tracking-widest hover:underline uppercase">
                        View Booking
                      </Link>
                    </td>
                    <td className="p-6">
                      <div className="font-[900] text-gray-900 text-lg">${p.amount.toLocaleString()}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Digital Payment</div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        p.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {p.status === 'COMPLETED' ? 'Released to Carrier' : 'Held in Escrow'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button className="bg-white border-2 border-gray-100 group-hover:border-purple-600 text-gray-400 group-hover:text-purple-600 font-black px-6 py-2.5 rounded-xl transition-all text-[10px] uppercase tracking-widest">
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-400 font-black uppercase tracking-[0.2em] text-xs">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
