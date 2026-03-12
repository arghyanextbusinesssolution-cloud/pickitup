import React from 'react';
import Link from 'next/link';

export default function PayoutMethodsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Payout Methods</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Linked Accounts</h2>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-xl transition-all uppercase tracking-wide text-sm flex items-center gap-2">
            <span>➕</span> Add Bank
          </button>
        </div>

        <div className="p-8">
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center text-2xl">🏦</div>
              <div>
                <h4 className="font-[900] text-gray-900 uppercase">Chase Business Checking</h4>
                <p className="text-purple-600 font-bold text-sm">**** **** **** 4921</p>
              </div>
            </div>
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Primary
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Payout Schedule</h2>
        </div>
        <div className="p-8">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Transfer Frequency</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="cursor-pointer">
              <input type="radio" name="schedule" className="peer sr-only" />
              <div className="border-2 border-gray-200 peer-checked:border-purple-600 peer-checked:bg-purple-50 rounded-xl p-4 text-center transition-all">
                <div className="font-[900] text-gray-900 uppercase">Daily</div>
                <div className="text-sm font-bold text-gray-400">1% Fee</div>
              </div>
            </label>
            <label className="cursor-pointer">
              <input type="radio" name="schedule" className="peer sr-only" defaultChecked />
              <div className="border-2 border-gray-200 peer-checked:border-purple-600 peer-checked:bg-purple-50 rounded-xl p-4 text-center transition-all">
                <div className="font-[900] text-gray-900 uppercase">Weekly</div>
                <div className="text-sm font-bold text-green-500">Free</div>
              </div>
            </label>
            <label className="cursor-pointer">
              <input type="radio" name="schedule" className="peer sr-only" />
              <div className="border-2 border-gray-200 peer-checked:border-purple-600 peer-checked:bg-purple-50 rounded-xl p-4 text-center transition-all">
                <div className="font-[900] text-gray-900 uppercase">Manual</div>
                <div className="text-sm font-bold text-green-500">Free</div>
              </div>
            </label>
          </div>

          <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide w-full md:w-auto">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
