'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin.service';
import { 
  Users, 
  CheckCircle, 
  CreditCard, 
  AlertTriangle,
  Search,
  Download,
  Plus,
  MessageSquare,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { UserDetailModal } from '@/components/modals/UserDetailModal';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 12; // Increased for better directory feel

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getUsers();
        // Ensure we only show shippers on the customers page
        const shippers = (Array.isArray(data) ? data : []).filter(u => u.role === 'SHIPPER' || !u.role);
        setUsers(shippers);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#FFF9F9]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B2C36]"></div>
      </div>
    );
  }

  // Real stats from the database
  const totalCustomers = users.length;
  const activeAccounts = users.filter(u => u.isVerified).length;
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const newThisWeek = users.filter(u => new Date(u.createdAt) > lastWeek).length;
  const churnRisk = users.filter(u => u.totalOrders === 0).length; // Just a placeholder logic

  // Pagination logic
  const totalPages = Math.ceil(totalCustomers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCustomers);
  const currentUsers = users.slice(startIndex, endIndex);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-[#E6F4F1] text-[#2D8A7E]';
      case 'AT RISK': return 'bg-[#FEECEE] text-[#D14343]';
      case 'NEW': return 'bg-[#FFF0F3] text-[#E91E63]';
      case 'INACTIVE': return 'bg-[#F1F3F5] text-[#868E96]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] p-6 lg:p-10 font-sans text-[#2D2424]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2424] mb-1">Customer Directory</h1>
          <p className="text-sm text-slate-500">Manage and monitor global logistics partnerships and account health.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} className="text-slate-400" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#8B2C36] rounded-lg text-sm font-bold text-white hover:bg-[#73242C] transition-all shadow-sm">
            <Plus size={18} /> Add Customer
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">TOTAL CUSTOMERS</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{totalCustomers.toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-[#2D8A7E] flex items-center gap-1">
            <span className="text-xs">↗</span> +12% vs last month
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">ACTIVE ACCOUNTS</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{activeAccounts.toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-[#2D8A7E] flex items-center gap-1">
            <span className="text-xs">⊙</span> {totalCustomers > 0 ? Math.round((activeAccounts/totalCustomers)*100) : 0}% activity rate
          </p>
          <div className="absolute right-7 top-7 text-[#2D8A7E]">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">NEW THIS WEEK</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{newThisWeek}</h3>
          <p className="text-[11px] font-bold text-[#D14343] flex items-center gap-1">
            <span className="text-xs">♦</span> Accelerated growth
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <CreditCard size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">CHURN RISK</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{churnRisk}</h3>
          <p className="text-[11px] font-bold text-[#D14343] flex items-center gap-1">
            <span className="text-xs">↘</span> -2% improvement
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <AlertTriangle size={20} />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Filter by name, industry, or ID..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#8B2C36] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-slate-600 focus:outline-none cursor-pointer">
                <option>All Industries</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronLeft size={14} className="-rotate-90" />
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-slate-600 focus:outline-none cursor-pointer">
                <option>Joined: Any Time</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronLeft size={14} className="-rotate-90" />
              </div>
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">CUSTOMER</th>
                <th className="px-6 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">INDUSTRY / SECTOR</th>
                <th className="px-6 py-6 text-center text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">STATUS</th>
                <th className="px-6 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">LIFETIME VALUE</th>
                <th className="px-6 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">MONTHLY VOLUME</th>
                <th className="px-8 py-6 text-right text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/30 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-50 overflow-hidden shrink-0 shadow-sm">
                        {user.firstName?.[0]}{user.lastName?.[0] || 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#2D2424] truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate">{user.industry || 'Account Holder'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm text-slate-600 font-medium">{user.industry || 'Logistics'}</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase inline-block min-w-[70px] ${getStatusStyle(user.status || (user.isVerified ? 'ACTIVE' : 'NEW'))}`}>
                      {user.status || (user.isVerified ? 'ACTIVE' : 'NEW')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-[#2D2424]">${(user.ltv || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm text-slate-600 font-medium">{(user.monthlyVolume || 0).toLocaleString()} units</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-4">
                      <button className="text-slate-300 hover:text-slate-600 transition-colors">
                        <MessageSquare size={18} />
                      </button>
                      <Link 
                        href={`/admin/users/detail?id=${user.id}`}
                        className="text-[#D14343] hover:text-[#8B2C36] transition-all"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">Showing <span className="font-bold text-[#2D2424]">{startIndex + 1}-{endIndex}</span> of <span className="font-bold text-[#2D2424]">{totalCustomers.toLocaleString()}</span> customers</p>
          
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

      <UserDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
        type="SHIPPER"
      />
    </div>
  );
}

