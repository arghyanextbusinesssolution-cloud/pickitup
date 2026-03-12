'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-12 lg:py-20">
            <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Column - Content */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left px-2">
                        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full mb-6">
                            <span className="text-purple-600 text-[10px] font-black tracking-widest uppercase">Trusted by 2M+ Users</span>
                        </div>

                        <h1 className="text-[42px] lg:text-[54px] font-[900] text-[#1a1b3a] leading-[1.05] mb-6 tracking-tight uppercase">
                            SHIPPING SERVICES
                            <br />
                            <span className="text-yellow-400">FOR THE BIG STUFF</span>
                        </h1>

                        <p className="text-[17px] text-[#6B7280] font-medium mb-10 max-w-[520px] leading-relaxed mx-auto lg:mx-0">
                            Whether you're shipping a car, moving furniture, or transport heavy freight — get instant quotes from verified carriers on the largest marketplace.
                        </p>

                        {/* Quote Form - Compact & Premium */}
                        <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-6 sm:p-8 mb-8 border border-gray-100 w-full max-w-[580px] mx-auto lg:mx-0">
                            <h3 className="text-lg font-black text-[#1a1b3a] mb-5 tracking-tight uppercase">Get your shipping quote</h3>

                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">What are you shipping?</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 appearance-none bg-gray-50/50 text-[15px] font-bold text-gray-900 transition-all cursor-pointer">
                                            <option>Select a Category</option>
                                            <option>Cars & Vehicles</option>
                                            <option>Household Items</option>
                                            <option>Heavy Equipment</option>
                                            <option>Freight</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-900">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Item type</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 appearance-none bg-gray-50/50 text-[15px] font-bold text-gray-900 transition-all cursor-pointer">
                                            <option>Select a Subcategory</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-900">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Pickup location</label>
                                    <input
                                        type="text"
                                        placeholder="City or ZIP code"
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 bg-gray-50/50 text-[15px] font-bold text-gray-900 placeholder-gray-400 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Delivery location</label>
                                    <input
                                        type="text"
                                        placeholder="City or ZIP code"
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 bg-gray-50/50 text-[15px] font-bold text-gray-900 placeholder-gray-400 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/login" className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-6 py-4 rounded-xl transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 group text-[15px]">
                                    Get Shipping Quotes
                                </Link>
                                <Link href="/register?role=carrier" className="flex-1 border border-[#4b148c] text-[#4b148c] hover:bg-purple-50 font-[900] px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-[15px]">
                                    Become a Carrier
                                </Link>
                            </div>
                        </div>

                        {/* Trust Badges - Compact */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-[900] text-gray-400 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5 text-center">
                                <span className="text-green-500 text-sm">✅</span>
                                <span>Secure Payments</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-center">
                                <span className="text-green-500 text-sm">✅</span>
                                <span>Verified Carriers</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-center">
                                <span className="text-green-500 text-sm">✅</span>
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image Card */}
                    <div className="relative flex items-center justify-center">
                        <div className="bg-[#EEF2FF] rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden w-full max-w-[560px]">
                            {/* Decorative Floating Dots */}
                            <div className="absolute top-8 right-8 bg-[#4b148c] text-white rounded-full w-16 h-16 flex items-center justify-center font-black text-xl z-20 shadow-xl shadow-purple-200/50">
                                2M+
                            </div>

                            {/* Location Tags */}
                            <div className="absolute top-20 left-6 bg-white rounded-xl px-4 py-2 shadow-xl border border-gray-50 text-[11px] font-black flex items-center gap-2 z-20">
                                <span className="text-yellow-400">📍</span>
                                <span>AUSTIN, TX</span>
                            </div>
                            <div className="absolute top-36 right-10 bg-white rounded-xl px-4 py-2 shadow-xl border border-gray-50 text-[11px] font-black flex items-center gap-2 z-20">
                                <span className="text-purple-600">📍</span>
                                <span>BOSTON, MA</span>
                            </div>

                            {/* Main Card */}
                            <div className="bg-white rounded-[1.5rem] p-3.5 shadow-xl mb-6 mt-12 relative z-10 mx-auto max-w-[420px]">
                                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-inner">
                                    <Image
                                        src="https://res.cloudinary.com/dxx54fccl/image/upload/v1773330994/20201028151941563.jpg_lie7hh.webp"
                                        alt="Shipping service"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                {/* Small Truck Inset */}
                                <div className="absolute top-10 left-8 bg-white rounded-2xl p-2.5 shadow-2xl border-2 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="relative w-16 h-12">
                                        <Image
                                            src="/img2_truck.avif"
                                            alt="Truck"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-[#1a1b3a] font-black text-[9px] px-2 py-1 rounded-full shadow-lg border border-white">
                                        $850.00
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Bar - Compact */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 relative z-10 max-w-[400px] mx-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 relative border-2 border-yellow-400 shadow-md">
                                        <Image
                                            src="/img3_review.jpg"
                                            alt="James"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-[#1a1b3a] text-sm tracking-tight">James Wilson</span>
                                            <div className="flex text-yellow-400 gap-0.5 text-[9px]">
                                                ⭐⭐⭐⭐⭐
                                            </div>
                                        </div>
                                        <p className="text-[11px] font-medium text-gray-500 italic leading-snug">
                                            "Excellent service! Shipped my car safely and exactly on time."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
