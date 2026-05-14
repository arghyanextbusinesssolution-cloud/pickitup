'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminService } from '@/services/admin.service';
import { 
    Search, 
    Eye, 
    ChevronLeft, 
    ChevronRight,
    TrendingUp,
    FileText,
    Truck,
    Wallet,
    AlertCircle,
    Download
} from 'lucide-react';

export default function AdminClaimsPage() {
    const [claims, setClaims] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'LIVE' | 'RESOLVED'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await adminService.getClaims();
                setClaims(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter Logic
    const getFilteredClaims = () => {
        let result = [...claims];
        
        // Status Filter
        if (filter === 'LIVE') {
            result = result.filter(c => {
                const status = c.status?.toUpperCase();
                return status !== 'APPROVED' && status !== 'REJECTED' && status !== 'RESOLVED';
            });
        } else if (filter === 'RESOLVED') {
            result = result.filter(c => {
                const status = c.status?.toUpperCase();
                return status === 'APPROVED' || status === 'REJECTED' || status === 'RESOLVED';
            });
        }

        // Search Filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(c => {
                const claimId = `CLM-${c.id.slice(-6).toUpperCase()}`.toLowerCase();
                const fullId = c.id.toLowerCase();
                return claimId.includes(term) || 
                       fullId.includes(term) ||
                       c.reason?.toLowerCase().includes(term) ||
                       c.booking?.carrier?.companyName?.toLowerCase().includes(term) ||
                       c.booking?.shipment?.owner?.firstName?.toLowerCase().includes(term);
            });
        }

        return result;
    };

    const filteredClaims = getFilteredClaims();
    
    // Pagination Logic
    const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
    const paginatedClaims = filteredClaims.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalClaims = claims.length;
    const totalValue = claims.reduce((sum, c) => sum + Number(c.booking?.price || 0), 0);

    const exportToCSV = () => {
        const headers = ['Claim ID', 'Date', 'Sender', 'Carrier', 'Reason', 'Value', 'Status'];
        const rows = filteredClaims.map(c => [
            `CLM-${c.id.slice(-6).toUpperCase()}`,
            new Date(c.createdAt).toLocaleDateString(),
            `${c.booking?.shipment?.owner?.firstName} ${c.booking?.shipment?.owner?.lastName}`,
            c.booking?.carrier?.companyName || 'N/A',
            c.reason || '',
            c.booking?.price || 0,
            c.status
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `claims_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusStyles = (status: string) => {
        switch (status.toUpperCase()) {
            case 'CRITICAL': return 'bg-red-50 text-red-600 border-red-100';
            case 'APPROVED': 
            case 'RESOLVED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'PENDING': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF9F9] p-6 lg:p-10 font-sans text-[#2D2424]">
            
            {/* KPI Header Grid - SMALLER WHITE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 italic">TOTAL CLAIMS</p>
                            <h4 className="text-3xl font-[1000] text-[#2D2424] tracking-tight">{totalClaims}</h4>
                        </div>
                        <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-400">
                            <FileText size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest italic flex items-center gap-1">
                        <TrendingUp size={12} /> SYSTEM_SYNC_OK
                    </p>
                </div>

                <div className="bg-white p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 italic">AGGREGATE VALUE</p>
                            <h4 className="text-3xl font-[1000] text-[#2D2424] tracking-tight">${totalValue.toLocaleString()}</h4>
                        </div>
                        <div className="w-10 h-10 bg-slate-50 flex items-center justify-center text-slate-400">
                            <Wallet size={20} />
                        </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">INSURED_ASSET_LEDGER</p>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                <div className="relative w-full md:w-[500px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Claim ID, Carrier, or Sender..." 
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#8B2C36]/10 transition-all shadow-sm"
                    />
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button 
                        onClick={exportToCSV}
                        className="px-6 py-4 bg-white border border-slate-100 text-[10px] font-black text-slate-400 hover:text-[#8B2C36] hover:border-[#8B2C36]/20 transition-all flex items-center gap-2 uppercase tracking-widest shadow-sm"
                    >
                        <Download size={16} /> EXPORT CSV
                    </button>
                    <div className="flex bg-white border border-slate-100 p-1 shadow-sm">
                        {(['ALL', 'LIVE', 'RESOLVED'] as const).map((opt) => (
                            <button
                                key={opt}
                                onClick={() => { setFilter(opt); setCurrentPage(1); }}
                                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${filter === opt ? 'bg-[#8B2C36] text-white' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Claims Table Container */}
            <div className="bg-white border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FFF9F9]/50 border-b border-slate-50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">#</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">CLAIM ID</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">DATE</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">SENDER</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">RECEIVER</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">CARRIER</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">REASON</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">VALUE</th>
                                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">STATUS</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={10} className="px-8 py-20 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B2C36] mx-auto"></div>
                                    </td>
                                </tr>
                            ) : paginatedClaims.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-8 py-20 text-center text-slate-400 font-bold italic uppercase tracking-widest">No matching claims found</td>
                                </tr>
                            ) : (
                                paginatedClaims.map((claim, index) => (
                                    <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6 text-xs font-black text-slate-300">{((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}</td>
                                        <td className="px-6 py-6">
                                            <span className="text-xs font-black text-[#D14343] uppercase italic tracking-wider">
                                                CLM-{claim.id.slice(-6).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-xs font-bold text-slate-500 italic">
                                                {new Date(claim.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-xs font-black text-slate-700 uppercase italic tracking-tighter">
                                                {claim.booking?.shipment?.owner?.firstName} {claim.booking?.shipment?.owner?.lastName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-xs font-black text-slate-700 uppercase italic tracking-tighter">
                                                Recipient Name
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <Truck size={14} className="text-slate-300" />
                                                <span className="text-xs font-black text-[#8B2C36] uppercase italic tracking-tighter">
                                                    {claim.booking?.carrier?.companyName || 'GlobalLogix'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 max-w-[200px]">
                                            <p className="text-xs font-black text-slate-700 line-clamp-1 italic">"{claim.reason}"</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-xs font-[900] text-slate-800 tracking-tight italic">
                                                ${Number(claim.booking?.price || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyles(claim.status)}`}>
                                                {claim.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Link 
                                                href={`/admin/claims/view?id=${claim.id}`}
                                                className="inline-flex items-center justify-center w-8 h-8 bg-slate-50 text-slate-400 hover:text-[#8B2C36] hover:bg-red-50 transition-all border border-slate-100"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="px-8 py-4 bg-slate-50/30 flex items-center justify-between border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Showing {paginatedClaims.length} of {filteredClaims.length} results</p>
                    <div className="flex items-center gap-1">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="p-2 text-slate-400 hover:text-[#8B2C36] disabled:opacity-30 transition-all"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button 
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-7 h-6 text-[9px] font-black flex items-center justify-center transition-all ${currentPage === page ? 'bg-[#8B2C36] text-white' : 'text-slate-400 hover:bg-slate-100'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 text-slate-400 hover:text-[#8B2C36] disabled:opacity-30 transition-all"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Tag */}
            <div className="mt-12 flex items-center justify-center">
                <div className="px-6 py-3 bg-white border border-slate-100 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                    <AlertCircle size={14} /> LOGISTICS INTEGRITY PROTOCOL V5.0
                </div>
            </div>
        </div>
    );
}
