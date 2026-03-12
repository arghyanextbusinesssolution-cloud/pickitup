'use client';

import React, { useEffect, useState } from 'react';
import { authService } from '../../../../services/auth.service';
import { User } from '../../../../types/auth.types';

export default function AdminProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const getInitials = (firstName: string = '', lastName: string = '') => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '??';
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">System Admin Profile</h1>
        <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Full Access
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-overlay pointer-events-none z-0"></div>
        </div>

        <div className="p-8 lg:p-12 pt-0 relative">
          <div className="w-32 h-32 bg-gray-900 rounded-full border-4 border-white shadow-2xl -mt-16 mb-6 flex items-center justify-center text-red-500 text-4xl font-[900] relative z-20">
            {getInitials(user.firstName, user.lastName)}
          </div>

          <div className="mb-8 border-b border-gray-100 pb-8">
            <h2 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">{user.firstName} {user.lastName}</h2>
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-widest mt-3">
              <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <span className="text-lg">📧</span> {user.email}
              </span>
              <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <span className="text-lg">🆔</span> {user.id}
              </span>
              <span className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-100 font-black">
                <span className="text-lg">🛡️</span> {user.role}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Security Level', value: 'Level 5 (Owner)', color: 'text-red-600' },
              { label: 'Login sessions', value: '4 Active', color: 'text-gray-900' },
              { label: 'Last Activity', value: 'Just Now', color: 'text-gray-900' }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-sm font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <form className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <span className="text-xl">🔒</span> Admin Settings
              </h3>
              <div className="grid gap-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-red-100 transition-all cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors">Emergency Protocol Enabled</p>
                    <p className="text-[10px] text-gray-500 font-medium">Bypass system restrictions in case of critical failure</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-red-100 transition-all cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors">Two-Factor Authentication</p>
                    <p className="text-[10px] text-gray-500 font-medium">Mandatory for all administrator accounts</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
                <button type="button" className="bg-gray-900 hover:bg-black text-white font-black px-8 py-4 rounded-2xl transition-all uppercase tracking-widest shadow-xl active:scale-95 flex-1">
                Save System Config
                </button>
                <button type="button" className="bg-white hover:bg-red-50 border-2 border-red-100 text-red-600 font-black px-8 py-4 rounded-2xl transition-all uppercase tracking-widest active:scale-95">
                Revoke Access
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
