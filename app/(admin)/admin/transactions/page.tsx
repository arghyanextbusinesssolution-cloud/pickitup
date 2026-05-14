'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin.service';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Search, 
  Download, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  FileText,
  DollarSign
} from 'lucide-react';

export default function TransactionsManagementPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await adminService.getTransactions();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#FFF9F9]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B2C36]"></div>
      </div>
    );
  }

  // Real stats from the database
  const totalFlow = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const avgTransaction = transactions.length > 0 ? totalFlow / transactions.length : 0;
  const activeCount = transactions.filter(t => t.status === 'PENDING').length;
  const netRevenue = totalFlow * 0.15; // Assuming 15% platform fee for KPI visualization

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transactions.length);
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PAID':
      case 'SUCCESS':
        return 'bg-[#E6F4F1] text-[#2D8A7E]';
      case 'PENDING':
        return 'bg-[#FFF4E5] text-[#B76E00]';
      case 'FAILED':
      case 'REFUNDED':
        return 'bg-[#FEECEE] text-[#D14343]';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] p-6 lg:p-10 font-sans text-[#2D2424]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2424] mb-1">Financial Ledger</h1>
          <p className="text-sm text-slate-500">Real-time stream of all platform payments, payouts, and escrow holds.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} className="text-slate-400" /> Export Ledger
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">TOTAL GROSS FLOW</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">${totalFlow.toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-[#2D8A7E] flex items-center gap-1">
            <ArrowUpRight size={12} /> +12.5% volume
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">EST. NET REVENUE</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">${netRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</h3>
          <p className="text-[11px] font-bold text-[#2D8A7E] flex items-center gap-1">
            <span className="text-xs">⊙</span> 15% avg. commission
          </p>
          <div className="absolute right-7 top-7 text-[#2D8A7E]">
            <CreditCard size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">AVG. TRANSACTION</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">${avgTransaction.toLocaleString(undefined, {maximumFractionDigits: 0})}</h3>
          <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <span className="text-xs">♦</span> Stable trend
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">PENDING SETTLEMENTS</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{activeCount}</h3>
          <p className="text-[11px] font-bold text-[#B76E00] flex items-center gap-1">
            <Clock size={12} /> Processing...
          </p>
          <div className="absolute right-7 top-7 text-[#B76E00]">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, payer, or shipment..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#8B2C36] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={14} /> Filter Range
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">TRANSACTION / DATE</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">PAYER</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">SHIPMENT</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest text-center">STATUS</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">AMOUNT</th>
                <th className="px-8 py-6 text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest text-right">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/30 transition-all group">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-[#2D2424] uppercase tracking-tighter">
                      {tx.gatewayPaymentId?.slice(-12) || tx.id.slice(-12)}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {new Date(tx.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-[#2D2424]">{tx.payerName}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{tx.payerEmail}</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-medium text-slate-600 truncate max-w-[200px]">{tx.shipmentTitle}</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase inline-block min-w-[90px] ${getStatusStyle(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-[#2D2424]">${tx.amount.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{tx.method}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-[#8B2C36] transition-all shadow-sm">
                        <FileText size={16} />
                      </button>
                      <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-[#8B2C36] transition-all shadow-sm">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-50">
          <p className="text-xs text-slate-400 font-medium">Showing <span className="font-bold text-[#2D2424]">{startIndex + 1}-{endIndex}</span> of <span className="font-bold text-[#2D2424]">{transactions.length}</span> transactions</p>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 border border-slate-200 rounded-lg text-slate-300 hover:text-slate-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm ${currentPage === page ? 'bg-[#8B2C36] text-white' : 'hover:bg-slate-50 text-slate-400'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 border border-slate-200 rounded-lg text-slate-300 hover:text-slate-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
