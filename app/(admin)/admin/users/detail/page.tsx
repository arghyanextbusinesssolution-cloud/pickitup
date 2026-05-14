'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { 
  Mail, 
  Phone, 
  Building2, 
  TrendingUp, 
  Clock, 
  Edit3, 
  Send, 
  Download, 
  Truck, 
  Heart, 
  ChevronLeft,
  MapPin
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Link from 'next/link';

const mockChartData = [
  { name: 'JAN', value: 25 }, { name: 'FEB', value: 35 }, { name: 'MAR', value: 45 }, { name: 'APR', value: 65 },
  { name: 'MAY', value: 30 }, { name: 'JUN', value: 20 }, { name: 'JUL', value: 55 }, { name: 'AUG', value: 40 },
];

function UserDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await adminService.getUserById(id as string);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
    else setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#FFF9F9]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B2C36]"></div>
      </div>
    );
  }

  if (!user || !id) {
    return (
      <div className="p-10 text-center bg-[#FFF9F9] min-h-screen">
        <h2 className="text-2xl font-bold text-slate-800">User not found</h2>
        <Link href="/admin/users" className="text-[#8B2C36] mt-4 inline-block font-bold">Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F9] p-6 lg:p-10 font-sans text-[#2D2424]">
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => router.back()} className="p-2 bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-[#8B2C36] transition-all">
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <Link href="/admin/users" className="hover:text-slate-600 transition-colors">DIRECTORY</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#8B2C36]">SHIPPER_IDENTITY_LEDGER</span>
          </div>
          <h2 className="text-3xl font-[1000] text-[#2D2424] tracking-tight uppercase italic mt-1">
            {user.firstName} {user.lastName || 'Profile'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Identity & Verification Lifecycle */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-[#8B2C36] flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl shadow-red-50 border-4 border-white">
              {user.firstName?.[0]}{(user.lastName || user.firstName?.[1])?.[0]}
            </div>
            <h3 className="text-xl font-black text-[#2D2424] uppercase italic mb-1">{user.firstName} {user.lastName}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">UID: {user.id.slice(-12).toUpperCase()}</p>
            
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 inline-flex">
              <span className={`w-2 h-2 rounded-full ${user.isVerified ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                {user.isVerified ? 'FULLY_VERIFIED' : 'PENDING_ONBOARDING'}
              </span>
            </div>
          </div>

          {/* Onboarding Timeline - THE "THING" THE USER REQUESTED */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 italic">Verification Lifecycle</h5>
            
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
              
              {/* Step 1: Registration */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#8B2C36] border-4 border-white shadow-sm flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <p className="text-[9px] font-black text-[#8B2C36] uppercase tracking-widest mb-1 italic">Phase 01: Registration</p>
                <h4 className="text-xs font-black text-[#2D2424]">ACCOUNT_INITIALIZED</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Step 2: Email OTP */}
              <div className="relative pl-10">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${user.isVerified ? 'bg-emerald-500' : 'bg-slate-200'} border-4 border-white shadow-sm z-10`}></div>
                <p className={`text-[9px] font-black ${user.isVerified ? 'text-emerald-600' : 'text-slate-400'} uppercase tracking-widest mb-1 italic`}>Phase 02: Email Authentication</p>
                <h4 className="text-xs font-black text-[#2D2424]">OTP_VERIFIED</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{user.email}</p>
              </div>

              {/* Step 3: Phone Verify */}
              <div className="relative pl-10">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${user.phone ? 'bg-emerald-500' : 'bg-slate-200'} border-4 border-white shadow-sm z-10`}></div>
                <p className={`text-[9px] font-black ${user.phone ? 'text-emerald-600' : 'text-slate-400'} uppercase tracking-widest mb-1 italic`}>Phase 03: Telecom Binding</p>
                <h4 className="text-xs font-black text-[#2D2424]">{user.phone ? 'SMS_VERIFIED' : 'PENDING_INPUT'}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{user.phone || 'N/A'}</p>
              </div>

              {/* Step 4: Location */}
              <div className="relative pl-10">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${user.addresses?.length > 0 ? 'bg-emerald-500' : 'bg-slate-200'} border-4 border-white shadow-sm z-10`}></div>
                <p className={`text-[9px] font-black ${user.addresses?.length > 0 ? 'text-emerald-600' : 'text-slate-400'} uppercase tracking-widest mb-1 italic`}>Phase 04: Geo-Settlement</p>
                <h4 className="text-xs font-black text-[#2D2424]">{user.addresses?.length > 0 ? 'LOCATION_MAPPED' : 'PENDING_SUBMISSION'}</h4>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Contact & Metadata */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-slate-300">
                <Mail size={18} />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Communication Hub</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">PRIMARY_EMAIL</p>
                  <p className="text-sm font-black text-[#2D2424] underline decoration-[#8B2C36]/20">{user.email}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">MOBILE_TERMINAL</p>
                  <p className="text-sm font-black text-[#2D2424]">{user.phone || 'NOT_REGISTERED'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-slate-300">
                <Building2 size={18} />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Operational Tier</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">CLASSIFICATION</p>
                  <p className="text-sm font-black text-[#2D2424]">{user.tier || 'COMMERCIAL'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">MEMBER_SINCE</p>
                  <p className="text-sm font-black text-[#2D2424]">{new Date(user.createdAt).getFullYear()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Data */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-slate-300">
              <MapPin size={18} />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Physical Settlements</h3>
            </div>
            
            {user.addresses?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.addresses.map((addr: any, index: number) => (
                  <div key={index} className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[9px] font-black text-[#8B2C36] uppercase mb-3 italic">Address Record {index + 1}</p>
                    <p className="text-xs font-black text-[#2D2424] leading-relaxed">
                      {addr.addressLine1}, {addr.city}<br />
                      {addr.state}, {addr.country} {addr.postalCode}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center">
                <p className="text-xs font-bold text-slate-400 italic">No physical location data submitted by shipper.</p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button className="px-8 py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-[#8B2C36]/20 hover:text-[#8B2C36] transition-all">
              SUSPEND_CREDENTIALS
            </button>
            <button className="px-8 py-4 bg-[#8B2C36] rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-[#73242C] transition-all shadow-lg shadow-red-100">
              UPDATE_PROFILE_ASSETS
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function UserDetailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading search params...</div>}>
      <UserDetailContent />
    </Suspense>
  );
}
