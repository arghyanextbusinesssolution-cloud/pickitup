'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CarrierHero() {
    return (
        <section className="bg-gradient-to-b from-gray-50 to-[#fdfaff] py-16 lg:py-24">
            <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left Column - Content */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                            <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">Grow Your Business</span>
                        </div>

                        <h1 className="text-[46px] lg:text-[64px] font-[900] text-[#1a1b3a] leading-[1.05] mb-6 tracking-tighter uppercase">
                            DRIVE YOUR
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">BUSINESS FORWARD</span>
                        </h1>

                        <p className="text-[18px] text-[#6B7280] font-medium mb-10 max-w-[540px] leading-relaxed">
                            Join thousands of transport professionals who use PickItUp to fill their trucks, monetize empty miles, and increase their earnings.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/register?role=carrier" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 group text-[15px] uppercase tracking-wider">
                                Become a Carrier
                                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link href="/how-it-works" className="bg-white border-2 border-gray-200 hover:border-yellow-300 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group text-[15px] uppercase tracking-wider">
                                View Load Board
                            </Link>
                        </div>
                        
                         <div className="flex items-center gap-6 mt-12 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-lg">💰</span>
                                <div>Fast Payouts</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg">🚚</span>
                                <div>No Empty Miles</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image Card */}
                    <div className="relative flex items-center justify-center">
                         <div className="w-full relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(250,204,21,0.3)] border-4 border-white">
                            <Image
                                src="https://res.cloudinary.com/dxx54fccl/image/upload/v1773331071/ey-steel-sector-of-india-2048x1365.jpg_alsfra.webp"
                                alt="Carrier Transport"
                                fill
                                className="object-cover"
                                priority
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3a]/90 via-[#1a1b3a]/20 to-transparent" />
                            
                            {/* Floating UI Element */}
                            <div className="absolute bottom-10 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white flex justify-between items-center group cursor-pointer hover:bg-white transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Earnings Update</div>
                                        <div className="text-sm font-bold text-[#1a1b3a]">Payment Released by Shipper</div>
                                    </div>
                                </div>
                                <div className="text-purple-600 font-bold group-hover:translate-x-1 transition-transform">→</div>
                            </div>
                            
                            {/* Top right floating element */}
                            <div className="absolute top-8 right-8 bg-purple-600 rounded-xl p-3 shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                                <div className="text-white font-black text-center leading-tight">
                                    <span className="text-2xl block mb-1">💼</span>
                                    <span className="text-[10px] uppercase tracking-widest">New Load</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
