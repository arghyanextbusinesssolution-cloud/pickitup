export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: '1' }];
}

import React from 'react';
import Link from 'next/link';

export default async function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-[#7C3AED] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 transform rotate-3">
                        <span className="text-white text-3xl">📦</span>
                    </div>
                    <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-2">Live Tracking</h1>
                    <p className="text-lg text-gray-500 font-bold uppercase tracking-widest">Shipment #{id || 'SHP-1048'}</p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden mb-8">
                    {/* Status Banner */}
                    <div className="bg-green-500 text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                🚚
                            </div>
                            <div>
                                <h2 className="text-xl font-[900] uppercase tracking-wide">In Transit</h2>
                                <p className="text-green-50 font-medium">Estimated Delivery: Tomorrow by 5:00 PM</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold uppercase tracking-widest text-green-200 mb-1">Carrier</div>
                            <div className="font-[900] text-lg">Pro Haulers LLC</div>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12">
                        {/* Timeline */}
                        <div className="relative pl-8 space-y-8">
                            <div className="absolute left-[7px] top-6 bottom-6 w-1 bg-gray-100"></div>

                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-4 border-white bg-green-500 shadow-sm z-10"></div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Oct 12, 10:45 AM</p>
                                <h4 className="font-[900] text-gray-900 text-lg">In Transit - Austin, TX</h4>
                                <p className="text-gray-500">Departed from pickup location. En route to destination.</p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-4 border-white bg-green-500 shadow-sm z-10"></div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Oct 12, 09:30 AM</p>
                                <h4 className="font-[900] text-gray-900 text-lg">Picked Up</h4>
                                <p className="text-gray-500">Item loaded and secured by Pro Haulers LLC.</p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-4 border-white bg-purple-600 shadow-sm z-10"></div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Oct 10, 02:15 PM</p>
                                <h4 className="font-[900] text-gray-900 text-lg">Carrier Assigned</h4>
                                <p className="text-gray-500">Pro Haulers LLC won the bid and confirmed the route.</p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-4 border-white bg-gray-300 shadow-sm z-10"></div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Oct 09, 11:00 AM</p>
                                <h4 className="font-[900] text-gray-900 text-lg">Listing Created</h4>
                                <p className="text-gray-500">Awaiting bids from the marketplace.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/contact" className="text-gray-500 hover:text-purple-600 font-bold uppercase tracking-widest text-sm transition-colors">
                        Need Help with this Shipment? Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
