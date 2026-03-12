import React from 'react';

export default function CarrierSettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">Carrier Settings</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 lg:p-12 border-b border-gray-100">
          <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide mb-6">Contact Information</h2>
          <form className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Primary Email</label>
              <input type="email" defaultValue="dispatch@coopermotors.com" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-yellow-500 sm:text-lg transition-colors font-medium" disabled />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Dispatch Phone</label>
              <input type="tel" defaultValue="(800) 555-0192" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-yellow-500 sm:text-lg transition-colors font-medium" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Business Address</label>
              <input type="text" defaultValue="124 Logistics Blvd, Austin, TX 78744" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-yellow-500 sm:text-lg transition-colors font-medium" />
            </div>
            <button type="button" className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide">
              Save Settings
            </button>
          </form>
        </div>

        <div className="p-8 lg:p-12 bg-purple-50">
          <h2 className="text-xl font-[900] text-purple-900 uppercase tracking-wide mb-2">Insurance Compliance</h2>
          <p className="text-purple-700 font-medium mb-6">Your Certificate of Insurance (COI) expires in 45 days. Please upload a renewed document to avoid account suspension.</p>
          <button type="button" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide">
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
}
