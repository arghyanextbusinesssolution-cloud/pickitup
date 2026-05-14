'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { shipperService } from '@/services/shipper.service';
import { AlertCircle, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ClaimsPage() {
    const [claims, setClaims] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const data = await shipperService.getClaims();
                setClaims(data);
            } catch (error) {
                console.error("Failed to fetch claims:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClaims();
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Claim Center</h1>
                    <p className="text-gray-500 font-medium">Track your insurance claims and resolution status.</p>
                </div>
                <Link href="/shipper/dashboard/claims/new">
                    <button className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-gray-900/10 flex items-center gap-3 text-sm uppercase tracking-widest group">
                        <ShieldCheck size={20} className="text-red-500" />
                        File New Claim
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Claim ID</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Shipment</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Details</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr><td colSpan={5} className="p-12 text-center text-gray-500 font-bold">Loading your claims...</td></tr>
                            ) : claims.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🛡️</div>
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No active claims found.</p>
                                        <p className="text-xs text-gray-400 mt-1">Claims can be filed after a booking is completed.</p>
                                    </td>
                                </tr>
                            ) : (
                                claims.map((claim) => (
                                    <tr key={claim.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-6">
                                            <div className="font-[900] text-gray-900 text-lg mb-1">
                                                #{claim.id.substring(0, 8).toUpperCase()}
                                            </div>
                                            <div className="text-sm font-bold text-gray-400">
                                                {new Date(claim.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-6 hidden md:table-cell">
                                            <div className="text-gray-900 font-bold">
                                                {claim.booking?.shipment?.title || claim.booking?.shipment?.commodity || 'Untitled Shipment'}
                                            </div>
                                            <div className="text-purple-600 font-black text-[10px] uppercase tracking-widest mt-1">
                                                BKG-{claim.bookingId?.substring(0, 8).toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="text-gray-900 font-bold max-w-xs truncate">{claim.reason}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                {claim.attachments?.length > 0 && (
                                                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                        {claim.attachments.length} Photos
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                                                claim.status === 'OPEN' ? 'bg-yellow-100 text-yellow-700' : 
                                                claim.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {claim.status === 'OPEN' ? <Clock size={12} /> : claim.status === 'RESOLVED' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                                {claim.status}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button className="bg-white border-2 border-gray-100 group-hover:border-gray-900 text-gray-700 group-hover:text-gray-900 font-bold px-6 py-2.5 rounded-xl transition-all text-sm uppercase tracking-wide flex items-center gap-2 ml-auto">
                                                Details <ArrowRight size={16} />
                                            </button>
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
