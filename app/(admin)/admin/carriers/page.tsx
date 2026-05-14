'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin.service';
import { 
  Truck, 
  CheckCircle, 
  Shield, 
  AlertTriangle,
  Search,
  Download,
  Plus,
  MessageSquare,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  Star,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { UserDetailModal } from '@/components/modals/UserDetailModal';

export default function CarrierManagementPage() {
  const [carriers, setCarriers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCarrier, setSelectedCarrier] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const data = await adminService.getCarriers();
        console.log('Fetched carriers from API:', data);
        setCarriers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch carriers', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarriers();
  }, []);

  const handleViewDetails = (carrier: any) => {
    setSelectedCarrier(carrier);
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
  const totalCarriers = carriers.length;
  const activeFleets = carriers.filter(c => c.isVerified).length;
  const pendingVerifications = carriers.filter(c => !c.isVerified).length;
  const totalEarnings = carriers.reduce((sum, c) => sum + (c.totalEarnings || 0), 0);

  // Pagination logic
  const totalPages = Math.ceil(totalCarriers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCarriers);
  const currentCarriers = carriers.slice(startIndex, endIndex);

  const getStatusStyle = (isVerified: boolean) => {
    return isVerified 
      ? 'bg-[#E6F4F1] text-[#2D8A7E]' 
      : 'bg-[#FEECEE] text-[#D14343]';
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] p-6 lg:p-10 font-sans text-[#2D2424]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2424] mb-1">Carrier Directory</h1>
          <p className="text-sm text-slate-500">Monitor fleet performance, verification status, and network capacity.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} className="text-slate-400" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#8B2C36] rounded-lg text-sm font-bold text-white hover:bg-[#73242C] transition-all shadow-sm">
            <Plus size={18} /> Add Carrier
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">TOTAL CARRIERS</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{totalCarriers.toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-[#2D8A7E] flex items-center gap-1">
            <span className="text-xs">↗</span> +4% vs last month
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <Truck size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">ACTIVE FLEETS</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{activeFleets.toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-[#2D8A7E] flex items-center gap-1">
            <span className="text-xs">⊙</span> {totalCarriers > 0 ? Math.round((activeFleets/totalCarriers)*100) : 0}% verification rate
          </p>
          <div className="absolute right-7 top-7 text-[#2D8A7E]">
            <Shield size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">PENDING VERIFICATION</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">{pendingVerifications}</h3>
          <p className="text-[11px] font-bold text-[#D14343] flex items-center gap-1">
            <span className="text-xs">♦</span> Action required
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 relative">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">NETWORK EARNINGS</p>
          <h3 className="text-3xl font-bold text-[#2D2424] mb-2">${(totalEarnings / 1000).toFixed(1)}k</h3>
          <p className="text-[11px] font-bold text-[#2D8A7E] flex items-center gap-1">
            <span className="text-xs">↗</span> +18.2% growth
          </p>
          <div className="absolute right-7 top-7 text-[#D14343]">
            <Star size={20} />
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
              placeholder="Filter by company, type, or license..."
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#8B2C36] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-slate-600 focus:outline-none cursor-pointer">
                <option>Vehicle Types</option>
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
                <th className="px-8 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">CARRIER / COMPANY</th>
                <th className="px-6 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">FLEET TYPE</th>
                <th className="px-6 py-6 text-center text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">STATUS</th>
                <th className="px-6 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">TOTAL EARNINGS</th>
                <th className="px-6 py-6 text-left text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">SHIPMENTS</th>
                <th className="px-8 py-6 text-right text-[10px] font-bold text-[#7A8B94] uppercase tracking-widest">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentCarriers.map((carrier) => (
                <tr key={carrier.id} className="hover:bg-slate-50/30 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-50 overflow-hidden shrink-0 shadow-sm">
                        {carrier.companyName?.[0] || carrier.firstName?.[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#2D2424] truncate">{carrier.companyName || `${carrier.firstName} ${carrier.lastName}`}</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1">
                          <Star size={10} className="text-amber-400 fill-amber-400" /> {carrier.rating?.toFixed(1)} Rating
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm text-slate-600 font-medium">{carrier.mainVehicle}</p>
                    <p className="text-[11px] text-slate-400">{carrier.vehicleCount} vehicles</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase inline-block min-w-[80px] ${getStatusStyle(carrier.isVerified)}`}>
                      {carrier.isVerified ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-[#2D2424]">${(carrier.totalEarnings || 0).toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm text-slate-600 font-medium">{carrier.completedShipments} completed</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-4">
                      <button className="text-slate-300 hover:text-slate-600 transition-colors">
                        <MessageSquare size={18} />
                      </button>
                      <Link 
                        href={`/admin/carriers/detail?id=${carrier.id}`}
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
          <p className="text-xs text-slate-400 font-medium">Showing <span className="font-bold text-[#2D2424]">{startIndex + 1}-{endIndex}</span> of <span className="font-bold text-[#2D2424]">{totalCarriers.toLocaleString()}</span> carriers</p>
          
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
        user={selectedCarrier}
        type="CARRIER"
      />
    </div>
  );
}
