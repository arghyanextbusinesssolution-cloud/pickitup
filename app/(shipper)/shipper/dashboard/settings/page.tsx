import React from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Account Settings</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 lg:p-12 border-b border-gray-100">
          <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide mb-6">Profile Information</h2>
          <form className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">First Name</label>
                <input type="text" defaultValue="John" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Last Name</label>
                <input type="text" defaultValue="Doe" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
              <input type="email" defaultValue="john.doe@example.com" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium" disabled />
              <p className="text-sm text-gray-500 font-medium mt-1">Contact support to change your email address.</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Phone Number</label>
              <input type="tel" defaultValue="(555) 123-4567" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-purple-600 sm:text-lg transition-colors font-medium" />
            </div>
            <button type="button" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide">
              Save Changes
            </button>
          </form>
        </div>

        <div className="p-8 lg:p-12 bg-gray-50">
          <h2 className="text-xl font-[900] text-red-600 uppercase tracking-wide mb-2">Danger Zone</h2>
          <p className="text-gray-500 font-medium mb-6">Permanently delete your account and all associated data.</p>
          <button type="button" className="bg-white border-2 border-red-200 hover:bg-red-50 text-red-600 font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
