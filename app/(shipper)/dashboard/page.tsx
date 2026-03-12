'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '../../../services/shipment.service';

export default function ShipperDashboardOverview() {
  const [recentShipments, setRecentShipments] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { label: 'Active Shipments', value: '0', icon: '📦', color: 'bg-purple-100 text-purple-600' },
    { label: 'Pending Bids', value: '0', icon: '💬', color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Completed Bookings', value: '0', icon: '🤝', color: 'bg-green-100 text-green-600' },
    { label: 'Total Spent', value: '$0', icon: '💳', color: 'bg-blue-100 text-blue-600' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const shipments = await shipmentService.getMyShipments();

        // Ensure shipments is an array before processing
        const shipmentsArray = Array.isArray(shipments) ? shipments : (shipments?.data || []);

        // Take only top 5 recent shipments for dashboard overview
        setRecentShipments(shipmentsArray.slice(0, 5));

        // Calculate Stats
        const activeCount = shipmentsArray.filter((s: any) => ['Draft', 'Awaiting Bids', 'In Transit'].includes(s.status)).length;
        const bookedCount = shipmentsArray.filter((s: any) => s.status === 'Booked' || s.status === 'Delivered').length;

        // Summing up total spent (naive approach based on mock structure, assuming some price field)
        // You would typically get this from backend directly or an invoice service

        setStats([
          { label: 'Active Shipments', value: activeCount.toString(), icon: '📦', color: 'bg-purple-100 text-purple-600' },
          { label: 'Pending Bids', value: shipmentsArray.reduce((acc: number, s: any) => acc + (s.bids?.length || 0), 0).toString(), icon: '💬', color: 'bg-yellow-100 text-yellow-600' },
          { label: 'Completed Bookings', value: bookedCount.toString(), icon: '🤝', color: 'bg-green-100 text-green-600' },
          { label: 'Total Spent', value: '$0', icon: '💳', color: 'bg-blue-100 text-blue-600' }, // Update when payment flow is ready
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-2">Welcome back!</h2>
          <p className="text-lg text-gray-500 font-medium">Here is what's happening with your shipments today.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-4xl font-[900] text-gray-900 mb-1">{isLoading ? '...' : stat.value}</div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Active Shipments Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Recent Shipments</h3>
          <Link href="/dashboard/shipments" className="text-purple-600 font-bold hover:text-purple-700 text-sm uppercase tracking-widest">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">ID / Title</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Route</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Bids</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">Loading shipments...</td>
                </tr>
              ) : recentShipments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 font-medium">No recent shipments found.</td>
                </tr>
              ) : (
                recentShipments.map((shipment, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6">
                      <div className="font-[900] text-gray-900 text-lg mb-1">{shipment.title || shipment.commodity || 'Untitled'}</div>
                      <div className="text-sm font-bold text-gray-400">{shipment._id || shipment.id}</div>
                    </td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <span>{shipment.origin?.city || 'Origin'}</span>
                        <span className="text-gray-300">→</span>
                        <span>{shipment.destination?.city || 'Destination'}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm">
                        {shipment.bids?.length || 0}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${shipment.status === 'Booked' ? 'bg-green-100 text-green-700' :
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                        {shipment.status || 'Draft'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Link href={`/dashboard/shipments/${shipment._id || shipment.id}`} className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
