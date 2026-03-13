'use client';

import React, { useEffect, useState } from 'react';
import { authService } from '../../../../../services/auth.service';
import { User } from '../../../../../types/auth.types';

export default function ProfilePage() {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Public Profile</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 bg-[#2D1B69] relative">
          <div className="absolute inset-0 bg-[#3B28A0] opacity-30 mix-blend-overlay pointer-events-none"></div>
        </div>

        <div className="p-8 lg:p-12 pt-0 relative">
          <div className="w-32 h-32 bg-[#4D28A2] rounded-full border-4 border-white shadow-xl -mt-16 mb-6 flex items-center justify-center text-white text-4xl font-[900]">
            {getInitials(user.firstName, user.lastName)}
          </div>

          <div className="mb-8 border-b border-gray-100 pb-8">
            <h2 className="text-3xl font-[900] text-gray-900 uppercase">{user.firstName} {user.lastName}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">
              <span className="flex items-center gap-1.5"><span className="text-lg">📧</span> {user.email}</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🆔</span> {user.id}</span>
              <span className="flex items-center gap-1.5 text-purple-600 font-black"><span className="text-lg">🛡️</span> {user.role}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Account Metadata</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Status</span>
                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Verification</span>
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">Verified</span>
                    </div>
                </div>
            </div>
          </div>

          <form className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Public Bio</label>
              <textarea
                rows={4}
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium"
                placeholder="Tell carriers a bit about yourself and what you typically ship..."
                defaultValue="I am a dedicated shipper looking for reliable transport solutions for my cargo."
              ></textarea>
            </div>

            <button type="button" className="bg-[#4D28A2] hover:bg-[#3B28A0] text-white font-black px-12 py-4 rounded-[1.5rem] transition-all uppercase tracking-widest text-xs shadow-xl shadow-purple-900/20 active:scale-95">
              Update Shipper Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
