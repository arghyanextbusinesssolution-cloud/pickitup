'use client';

import React from 'react';
import { ShipmentForm } from '@/components/forms/ShipmentForm';
import Link from 'next/link';

export default function CreateShipmentPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/shipments" className="text-gray-400 hover:text-purple-600 font-bold uppercase tracking-widest text-sm flex items-center gap-2 mb-4 transition-colors">
          ← Back to Shipments
        </Link>
        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Create a Listing</h1>
        <p className="text-lg text-gray-500 font-medium mt-2">
          Enter the details of what you need shipped to start receiving competitive carrier quotes.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-purple-50 p-6 border-b border-purple-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-xl shrink-0">
            💡
          </div>
          <div>
            <h4 className="font-bold text-purple-900 uppercase tracking-wide">Pro Tip for the Best Rates</h4>
            <p className="text-purple-700 text-sm mt-1">Carriers love details! Providing accurate dimensions and multiple high-quality photos can lower your shipping costs by up to 30% by eliminating guesswork.</p>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <ShipmentForm />
        </div>
      </div>
    </div>
  );
}
