'use client';

import React, { useEffect, useState } from 'react';
import { authService } from '../../../../services/auth.service';
import { User } from '../../../../types/auth.types';

export default function CarrierProfilePage() {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Carrier Profile</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 bg-yellow-400 relative">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        <div className="p-8 lg:p-12 pt-0 relative">
          <div className="w-32 h-32 bg-[#1a1b3a] rounded-full border-4 border-white shadow-xl -mt-16 mb-6 flex items-center justify-center text-white text-4xl font-[900]">
            {getInitials(user.firstName, user.lastName)}
          </div>

          <div className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-[900] text-gray-900 uppercase">{user.firstName} {user.lastName}</h2>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Verified 🛡️</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest mt-2 mb-2">
              <span className="flex items-center gap-1.5"><span className="text-lg">📧</span> {user.email}</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🆔</span> {user.id}</span>
              <span className="flex items-center gap-1.5 text-yellow-600 font-black"><span className="text-lg">🚚</span> {user.role}</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest mt-4">
              <span>US DOT #2984102</span>
              <span>MC #923412</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Carrier Stats</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Total Loads</span>
                        <span className="text-gray-900 font-black text-sm">48</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Rating</span>
                        <span className="text-yellow-600 font-black text-sm text-lg">★ 4.9</span>
                    </div>
                </div>
            </div>
          </div>

          <form className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Company Description</label>
              <textarea
                rows={5}
                defaultValue="Professional logistics provider offering specialized transport services. Committed to safety and reliability for every shipment."
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-yellow-500 sm:text-lg transition-colors font-medium"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Equipment Types</label>
              <input
                type="text"
                defaultValue="Enclosed Trailer, Flatbed, Box Truck"
                className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-yellow-500 sm:text-lg transition-colors font-medium"
              />
            </div>

            <button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black px-12 py-4 rounded-[1.5rem] transition-all uppercase tracking-widest text-xs shadow-xl shadow-yellow-400/20 active:scale-95">
              Save Carrier Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
