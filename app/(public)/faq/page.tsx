import React from 'react';
import FAQSection from '@/components/shared/FAQSection';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#fafaff] py-20 border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-[1000] text-[#1a1b3a] tracking-tight uppercase mb-6">
            Help & Support Center
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about shipping, acting as a carrier, payments, and our platform guarantees.
          </p>
        </div>
      </div>

      {/* Main FAQ Content from Shared Component */}
      <div className="py-8">
        <FAQSection />
      </div>

      {/* Still Need Help CTA */}
      <div className="bg-purple-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">Still have questions?</h2>
          <p className="text-purple-200 mb-10 text-lg">
            Our support team is available around the clock to help you with your shipping needs.
          </p>
          <Link href="/contact" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold px-8 py-4 rounded-full transition-colors inline-block text-lg shadow-xl shadow-yellow-400/20">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
