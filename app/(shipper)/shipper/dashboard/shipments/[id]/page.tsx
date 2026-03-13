export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '1' }];
}

import React from 'react';
import Link from 'next/link';

export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
  // Mock Bids
  const bids = [
    { id: 'BID-1001', carrier: 'Pro Haulers LLC', rating: 4.8, reviews: 142, price: 850, timeframe: '3-5 Days', type: 'Enclosed', expires: '2 hours' },
    { id: 'BID-1002', carrier: 'Swift Movers', rating: 4.9, reviews: 315, price: 920, timeframe: '2-4 Days', type: 'Open Transport', expires: '5 hours' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link href="/shipper/shipper/dashboard/shipments" className="text-gray-400 hover:text-purple-600 transition-colors">
              ← Back
            </Link>
            <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">
              Awaiting Bids
            </span>
          </div>
          <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">2019 Tesla Model 3</h1>
          <p className="text-gray-500 font-medium">Shipment ID: {params.id}</p>
        </div>

        <div className="flex gap-4">
          <Link href={`/shipper/shipper/dashboard/shipments/edit/${params.id}`} className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm">
            Edit Listing
          </Link>
          <button className="bg-red-50 text-red-600 hover:bg-red-100 font-bold px-6 py-3 rounded-xl transition-all uppercase tracking-wide text-sm">
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Bids Section */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-purple-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-yellow-400"></div>
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-[900] text-gray-900 uppercase tracking-wide">Active Bids (2)</h2>
            </div>

            <div className="p-8 space-y-4 bg-gray-50/50">
              {bids.map((bid, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                      🚚
                    </div>
                    <div>
                      <h4 className="font-[900] text-gray-900 text-lg uppercase">{bid.carrier}</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-400 font-bold">★ {bid.rating}</span>
                        <span className="text-gray-400">({bid.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-right">
                      <div className="text-3xl font-[900] text-purple-600">${bid.price}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{bid.timeframe} • {bid.type}</div>
                    </div>
                    <button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all uppercase tracking-wide shadow-md">
                      Accept Bid
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment Details */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-xl font-[900] text-gray-900 uppercase tracking-wide">Route Details</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-green-100"></div>
                <div className="absolute left-[7px] top-6 w-0.5 h-full bg-gray-200"></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup</p>
                <h4 className="font-bold text-gray-900 text-lg">Austin, TX</h4>
                <p className="text-gray-500">78701 • Flexible Date</p>
              </div>

              <div className="relative pl-8 md:pl-0">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-purple-600 border-4 border-purple-100 md:hidden"></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery</p>
                <h4 className="font-bold text-gray-900 text-lg">Miami, FL</h4>
                <p className="text-gray-500">33101 • Within 14 days</p>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 bg-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Item Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-bold text-gray-900">Vehicle (Sedan)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Weight</p>
                  <p className="font-bold text-gray-900">3,800 lbs</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Condition</p>
                  <p className="font-bold text-gray-900">Runs & Drives</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Service</p>
                  <p className="font-bold text-gray-900">Open Transport</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-purple-900 text-white rounded-[2rem] p-8 shadow-xl">
            <div className="w-12 h-12 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xl mb-6">
              🛡️
            </div>
            <h3 className="text-xl font-[900] uppercase tracking-wide mb-2">pickItUp Protection</h3>
            <p className="text-purple-200 text-sm mb-6">
              When you book through the platform, your payment is held securely in escrow until delivery is confirmed.
            </p>
            <Link href="/faq" className="text-yellow-400 hover:text-yellow-300 font-bold uppercase tracking-widest text-sm underline transition-colors">
              Learn More
            </Link>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">Having trouble with this listing or dealing with a carrier?</p>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-4 py-3 rounded-xl transition-all uppercase tracking-wide text-sm">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
