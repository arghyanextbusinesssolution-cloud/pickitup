import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-4 block">Legal Center</span>
        <h1 className="text-4xl md:text-5xl font-[1000] text-gray-900 tracking-tight uppercase mb-12">
          Terms of Service
        </h1>

        <div className="prose prose-lg prose-purple max-w-none text-gray-600">
          <p className="text-xl font-medium text-gray-900 mb-8">
            Last Updated: February 21, 2026
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            Welcome to pickItUp. These Terms of Service ("Terms") govern your use of the pickItUp website, mobile application, and related services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. The pickItUp Marketplace</h2>
          <p className="mb-6">
            pickItUp acts as a neutral venue linking individuals and businesses needing transportation services ("Shippers") with independent transportation service providers ("Carriers").
          </p>
          <div className="bg-gray-50 border-l-4 border-purple-600 p-6 rounded-r-xl my-8">
            <p className="font-bold text-gray-900 m-0">
              Important Notice: pickItUp is NOT a Motor Carrier, Freight Forwarder, Broker, or Agent. We do not take possession of, handle, or transport any cargo.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. User Obligations</h2>
          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li>You must be at least 18 years old to use the Services.</li>
            <li>You agree to provide accurate, current, and complete information during registration.</li>
            <li><strong>Carriers</strong> must maintain all required licenses, insurance, and operating authority.</li>
            <li><strong>Shippers</strong> must accurately describe their shipments, including true weight and dimensions.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Payments and Fees</h2>
          <p className="mb-6">
            When a Carrier's bid is accepted, the Shipper pays a booking fee to pickItUp and the remaining amount to the Carrier upon delivery, unless utilizing the pickItUp Secure Payment system, where funds are held in escrow until proof of delivery is submitted.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Dispute Resolution</h2>
          <p className="mb-6">
            Any disputes between Shippers and Carriers regarding damages, delays, or payment must be resolved independently between the parties, although pickItUp may offer a mediation platform to facilitate communication.
          </p>
        </div>
      </div>
    </div>
  );
}
