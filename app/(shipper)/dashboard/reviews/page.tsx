import React from 'react';
import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-8">My Reviews</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
          ⭐
        </div>
        <h3 className="text-2xl font-[900] text-gray-900 uppercase mb-4">No reviews yet</h3>
        <p className="text-gray-500 font-medium max-w-md mx-auto mb-8">
          Complete a shipment and rate your carrier to see your reviews history here. Your feedback helps keep the marketplace safe and reliable.
        </p>
        <Link
          href="/dashboard/shipments"
          className="inline-block bg-white border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 border-2 font-bold px-10 py-4 rounded-xl transition-all uppercase tracking-widest"
        >
          View Active Shipments
        </Link>
      </div>
    </div>
  );
}
