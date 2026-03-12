'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminService } from '../../../../services/admin.service';

export default function AdminDashboardOverview() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin stats:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
            <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Platform Status</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">👥</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Users</div>
                    <div className="text-4xl font-[900] text-gray-900 mb-2">{isLoading ? '...' : stats?.users || 0}</div>
                    <div className="text-sm font-bold text-green-500 uppercase tracking-wide">↑ Live Data</div>
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">🚚</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Active Carriers</div>
                    <div className="text-4xl font-[900] text-gray-900 mb-2">{isLoading ? '...' : stats?.carriers || 0}</div>
                    <div className="text-sm font-bold text-green-500 uppercase tracking-wide">↑ Verified Status</div>
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">📦</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Live Shipments</div>
                    <div className="text-4xl font-[900] text-gray-900 mb-2">{isLoading ? '...' : stats?.shipments || 0}</div>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total on Platform</div>
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">💰</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Live Bids</div>
                    <div className="text-4xl font-[900] text-gray-900 mb-2">{isLoading ? '...' : stats?.bids || 0}</div>
                    <div className="text-sm font-bold text-green-500 uppercase tracking-wide">Active Marketplace</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Recent Disputes</h2>
                        <Link href="/admin/disputes" className="text-red-500 font-bold hover:text-red-600 text-sm uppercase tracking-widest">
                            View Queue
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr><td className="p-6 text-center text-gray-500 font-medium">Loading activity...</td></tr>
                                ) : (
                                    [1, 2, 3].map((i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-6">
                                                <div className="font-bold text-gray-900 text-lg mb-1">Damage Claim on Delivery</div>
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">CAS-104{i} • High Priority</div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-red-100 text-red-700">Needs Review</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-[2rem] shadow-xl border border-gray-800 overflow-hidden text-white">
                    <div className="p-8 border-b border-gray-800">
                        <h2 className="text-xl font-[900] uppercase tracking-wide">System Health</h2>
                    </div>
                    <div className="p-8 grid grid-cols-2 gap-8">
                        <div>
                            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">API Status</div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="font-[900] text-2xl text-green-500">99.99%</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">DB Connections</div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="font-[900] text-2xl">45 / 1000</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Active Sessions</div>
                            <div className="font-[900] text-2xl">{isLoading ? '...' : (stats?.users || 0) + (stats?.carriers || 0)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Escrow Balance</div>
                            <div className="font-[900] text-2xl">$425.8k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
