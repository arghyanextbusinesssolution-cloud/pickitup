import React from 'react';
import PricingCards from '@/components/shared/PricingCards';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#fafaff] py-20 border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-4 block">Transparent Costs</span>
          <h1 className="text-4xl md:text-6xl font-[1000] text-[#1a1b3a] tracking-tight uppercase mb-6">
            Pricing & Estimates
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Because pickItUp carriers are already driving your route, you can save up to 60% compared to traditional shipping. Explore our category estimates below.
          </p>
        </div>
      </div>

      {/* Main Pricing Content from Shared Component */}
      <PricingCards />

      {/* CTA */}
      <div className="bg-gray-50 border-t border-gray-100 py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to get an exact quote?</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Create a free listing in minutes and start receiving competitive bids from verified carriers instantly.
          </p>
          <Link href="/register" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-full transition-all inline-block text-lg shadow-lg hover:shadow-purple-600/30 hover:-translate-y-1">
            Create a Free Listing
          </Link>
        </div>
      </div>
    </div>
  );
}
