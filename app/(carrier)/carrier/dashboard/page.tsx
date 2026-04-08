'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '../../../../services/shipment.service';
import { bidService } from '../../../../services/bid.service';

export default function CarrierDashboardOverview() {
  const [stats, setStats] = useState([
    { label: 'This Month\'s Earnings', value: '$0', icon: '💰', color: 'bg-green-100 text-green-600' },
    { label: 'Active Shipments', value: '0', icon: '🚚', color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Pending Bids', value: '0', icon: '💬', color: 'bg-blue-100 text-blue-600' },
    { label: 'Profile Rating', value: '5.0 ★', icon: '⭐', color: 'bg-orange-100 text-orange-600' },
  ]);
  const [jobsInTransit, setJobsInTransit] = useState<any[]>([]);
  const [recommendedLoads, setRecommendedLoads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarrierData = async () => {
      try {
        const [myBids, activeJobsRes, availableLoadsRes] = await Promise.all([
          bidService.getMyBids(),
          shipmentService.getCarrierJobs(),
          shipmentService.getAvailable()
        ]);

        const bidsArray = Array.isArray(myBids) ? myBids : (myBids?.data || []);
        const activeJobs = Array.isArray(activeJobsRes) ? activeJobsRes : (activeJobsRes?.data || []);
        const availableLoads = Array.isArray(availableLoadsRes) ? availableLoadsRes : (availableLoadsRes?.data || []);

        setJobsInTransit(activeJobs.slice(0, 3));
        setRecommendedLoads(availableLoads.slice(0, 3));

        setStats([
          { label: 'This Month\'s Earnings', value: '$0', icon: '💰', color: 'bg-green-100 text-green-600' },
          { label: 'Active Shipments', value: activeJobs.length.toString(), icon: '🚚', color: 'bg-yellow-100 text-yellow-600' },
          { label: 'Pending Bids', value: bidsArray.length.toString(), icon: '💬', color: 'bg-blue-100 text-blue-600' },
          { label: 'Profile Rating', value: '5.0 ★', icon: '⭐', color: 'bg-orange-100 text-orange-600' },
        ]);
      } catch (error) {
        console.error("Failed to fetch carrier dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarrierData();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-2">Carrier Overview</h2>
          <p className="text-lg text-gray-500 font-medium">Here's a snapshot of your revenue and active fleet status.</p>
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Jobs */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Jobs in Transit</h3>
            <Link href="/carrier/shipments" className="text-yellow-600 font-black hover:text-yellow-700 text-sm uppercase tracking-[0.2em]">
              View All →
            </Link>
          </div>
          <div className="p-0">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td className="p-6 text-center text-gray-500 font-medium">Loading jobs...</td></tr>
                ) : jobsInTransit.length === 0 ? (
                  <tr><td className="p-6 text-center text-gray-500 font-medium">No active jobs in transit.</td></tr>
                ) : (
                  jobsInTransit.map((job, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-6">
                        <Link href={`/carrier/shipments/view?id=${job._id || job.id}`} className="block">
                          <div className="font-[900] text-gray-900 text-lg mb-1 group-hover:text-yellow-600 transition-colors">{job.title || job.commodity || 'Shipment'}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <span>{job.origin?.city || 'Origin'}</span>
                            <span className="text-gray-300">→</span>
                            <span>{job.destination?.city || 'Destination'}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="p-6 text-right">
                        <div className="text-xl font-[900] text-green-600">${job.price || '0'}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payout on Delivery</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Loads */}
        <div className="bg-[#1a1b3a] rounded-[2.5rem] shadow-2xl p-8 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-[1000] uppercase tracking-tighter mb-8 text-yellow-400">Hot Loads Near You</h3>

            <div className="space-y-4">
              {isLoading ? (
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">Searching for loads...</p>
              ) : recommendedLoads.length === 0 ? (
                <p className="text-gray-400 font-medium">No recommended loads found.</p>
              ) : (
                recommendedLoads.map((load, i) => (
                  <Link key={i} href={`/carrier/jobs/view?id=${load.id}`} className="block bg-white/5 hover:bg-white/10 p-5 rounded-2xl transition-all border border-white/5 hover:border-yellow-400/30 group/item">
                    <div className="text-lg font-black mb-1 group-hover/item:text-yellow-400 transition-colors uppercase tracking-tight">{load.title}</div>
                    <div className="text-sm text-gray-400 font-bold mb-3 uppercase tracking-widest text-[10px]">{load.origin} → {load.destination}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg shadow-yellow-400/20">
                        {load.status === 'PENDING' ? 'New' : 'Rush'}
                      </span>
                      <span className="font-black text-xl text-green-400">${load.targetPrice || (Math.floor(Math.random() * 500) + 300)}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
