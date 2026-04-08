'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipmentService } from '../../../../services/shipment.service';

export default function CarrierShipmentsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await shipmentService.getCarrierJobs();
        const jobsArray = Array.isArray(response) ? response : (response?.data || []);
        setJobs(jobsArray);
      } catch (error) {
        console.error("Failed to fetch carrier jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">My Active Jobs</h1>
        <div className="flex gap-2">
          <Link href="/carrier/jobs" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2 shadow-sm">
            <span>🔍</span> Find More
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Booking ID</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Shipment & Route</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Payout</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="p-6 text-center text-gray-500 font-medium">Loading jobs...</td></tr>
              ) : jobs.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center text-gray-500 font-medium">No active jobs found.</td></tr>
              ) : (
                jobs.map((job, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6">
                      <div className="font-[900] text-gray-900 text-lg mb-1">{job.booking?.id?.substring(0, 8).toUpperCase() || 'BKG-REF'}</div>
                      <div className="text-sm font-bold text-gray-400">{new Date(job.updatedAt).toLocaleDateString()}</div>
                    </td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="text-gray-900 font-bold">{job.title || job.commodity || 'Shipment'}</div>
                      <div className="text-gray-500 font-medium text-sm">{job.origin?.city || 'Origin'} → {job.destination?.city || 'Destination'}</div>
                    </td>
                    <td className="p-6">
                      <div className="font-[900] text-green-600 text-lg">${job.booking?.price || job.price || '0'}</div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          job.status === 'DELIVERED' ? 'bg-green-100 text-green-700 border-green-200' :
                          job.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          job.status === 'PICKED_UP' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-purple-100 text-purple-700 border-purple-200'
                        }`}>
                        {job.status?.replace('_', ' ') || 'Assigned'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Link href={`/carrier/shipments/view?id=${job._id || job.id}`} className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide">
                        Update Status
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
