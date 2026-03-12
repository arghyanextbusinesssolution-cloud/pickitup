import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#fafaff] py-24 border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-4 block">Simple & Secure</span>
          <h1 className="text-4xl md:text-6xl font-[1000] text-[#1a1b3a] tracking-tight uppercase mb-6">
            How pickItUp Works
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Whether you need to ship a single armchair or a fleet of vehicles, our marketplace connects you directly with trusted transport professionals.
          </p>
        </div>
      </div>

      {/* Steps Container */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="space-y-24">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">1</div>
              <h2 className="text-3xl font-[900] text-gray-900 mb-4 uppercase">Create a Free Listing</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tell us what you need to move, where it's going, and when you need it there. The more details and photos you provide, the better quotes you'll receive.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 font-medium"><span className="text-green-500">✓</span> Free to list</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><span className="text-green-500">✓</span> Takes under 2 minutes</li>
              </ul>
            </div>
            <div className="md:w-1/2 p-10 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
              <span className="text-6xl">📝</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">2</div>
              <h2 className="text-3xl font-[900] text-gray-900 mb-4 uppercase">Review Bids & Book</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Transport companies already making similar trips will compete for your business. Review their profiles, read past customer reviews, and select the carrier that fits your budget.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 font-medium"><span className="text-green-500">✓</span> Transparent pricing</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><span className="text-green-500">✓</span> Verified carrier profiles</li>
              </ul>
            </div>
            <div className="md:w-1/2 p-10 bg-purple-50 rounded-[2rem] border-2 border-dashed border-purple-200 text-center">
              <span className="text-6xl">🤝</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">3</div>
              <h2 className="text-3xl font-[900] text-gray-900 mb-4 uppercase">Secure Payments & Delivery</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Pay securely through the platform. We hold the funds safely until your item is delivered in the condition expected.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 font-medium"><span className="text-green-500">✓</span> Bank-level encryption</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><span className="text-green-500">✓</span> Escrow protection</li>
              </ul>
            </div>
            <div className="md:w-1/2 p-10 bg-blue-50 rounded-[2rem] border-2 border-dashed border-blue-200 text-center">
              <span className="text-6xl">📦</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-900 py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-[900] text-white mb-6 uppercase">Ready to Move?</h2>
          <p className="text-xl text-purple-200 mb-10">
            Join thousands of satisfied shippers and start saving on transportation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-full transition-all text-lg shadow-xl shadow-yellow-400/20">
              Create a Listing
            </Link>
            <Link href="/register?type=carrier" className="bg-purple-800 border-2 border-purple-700 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-full transition-all text-lg">
              Become a Carrier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
