'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ConfidenceSection() {
    return (
        <section className="bg-[#fdfaff] pb-24 lg:pb-32">
            {/* Purple Banner */}
            <div className="bg-[#4b148c] text-white py-6 mb-20 px-6 sm:px-0">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-400/20">
                            <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.5-.5-1-1-1H4c-.5 0-1 .5-1 1 0 9.4 7.6 17 17 17 .5 0 1-.5 1-1v-3.5c0-.5-.4-1-1-1zM19 12h2c0-4.8-3.2-8-8-8v2c3.3 0 6 2.7 6 6zm-4 0h2c0-2.2-1.8-4-4-4v2c1.1 0 2 .9 2 2z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-300 tracking-wider uppercase">Need help with your shipment?</span>
                            <span className="text-sm lg:text-base font-extrabold tracking-tight">
                                SHIPPING A CAR? CALL NOW TO SECURE YOUR BEST RATE:
                            </span>
                        </div>
                    </div>

                    <a
                        href="tel:1-800-698-7447"
                        className="bg-[#5e22a8] border border-[#7b31d4] rounded-2xl px-8 py-3 flex items-center gap-3 group hover:bg-[#6c28c2] transition-colors shadow-xl"
                    >
                        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.5-.5-1-1-1H4c-.5 0-1 .5-1 1 0 9.4 7.6 17 17 17 .5 0 1-.5 1-1v-3.5c0-.5-.4-1-1-1z" />
                        </svg>
                        <span className="text-2xl lg:text-3xl font-black text-yellow-400 tracking-tighter">
                            1-800-698-7447
                        </span>
                    </a>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-xs font-black text-yellow-500 uppercase tracking-[0.25em] mb-4 block">
                        THREE STEPS TO SHIP
                    </span>
                    <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tighter">
                        Ship with confidence
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        pickitup makes shipping big items a breeze. Here's how it works:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 relative mb-20">
                    {/* Connection Arrows (Desktop Only) */}
                    <div className="hidden md:flex absolute top-1/2 left-[31%] -translate-y-24 z-10">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                    <div className="hidden md:flex absolute top-1/2 left-[65%] -translate-y-24 z-10">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Card 1: LIST */}
                    <div className="bg-white rounded-[2.5rem] p-8 pb-12 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/50 max-w-md mx-auto md:max-w-none w-full">
                        <div className="relative mb-10 w-full aspect-square max-w-[280px] mx-auto">
                            <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                                <Image
                                    src="https://res.cloudinary.com/dxx54fccl/image/upload/v1773331071/ey-steel-sector-of-india-2048x1365.jpg_alsfra.webp"
                                    alt="Shipment listing"
                                    fill
                                    className="object-cover"
                                />
                                {/* Location Badges */}
                                <div className="absolute top-8 left-[-10px] bg-white rounded-xl px-4 py-2.5 shadow-2xl border border-gray-50 flex flex-col z-20">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">From</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-900">ST LOUIS, MO</span>
                                </div>
                                <div className="absolute bottom-12 right-[-10px] bg-white rounded-xl px-4 py-2.5 shadow-2xl border border-gray-50 flex flex-col z-20">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">To</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-900">MIAMI, FL</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto text-center">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-black text-gray-900 mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">List</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">
                                Provide details about your shipment to start the listing process and get a price in minutes.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: COMPARE */}
                    <div className="bg-white rounded-[2.5rem] p-8 pb-12 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/50 max-w-md mx-auto md:max-w-none w-full">
                        <div className="relative mb-10 w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center">
                            <div className="relative w-full h-[90%] transform scale-110">
                                <Image
                                    src="/1.png"
                                    alt="Carrier Comparison"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="mt-auto text-center">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-black text-gray-900 mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Compare</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">
                                Compare quotes from multiple carriers on one platform to find the one that fits your needs and budget.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: BOOK & SHIP */}
                    <div className="bg-white rounded-[2.5rem] p-8 pb-12 flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/50 max-w-md mx-auto md:max-w-none w-full">
                        <div className="relative mb-10 w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center">
                            <div className="relative w-full h-[90%] transform scale-105">
                                <Image
                                    src="/2.png"
                                    alt="Tracker"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="mt-auto text-center">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-black text-gray-900 mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Book & Ship</h3>
                            <div className="bg-yellow-50 rounded-2xl p-4 mb-4 border border-yellow-100">
                                <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest leading-normal">
                                    Book with added protection and secure payments, backed by <span className="text-yellow-700">24/7 support</span> and our <span className="text-yellow-700 underline decoration-2 underline-offset-4">Ship with Confidence Guarantee.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA Button */}
                <div className="text-center">
                    <Link href="/register" className="bg-[#4b148c] hover:bg-[#3b1070] text-white font-[900] px-12 py-5 rounded-xl transition-all shadow-2xl flex items-center gap-3 group text-sm uppercase tracking-widest mx-auto w-max">
                        Start Shipping Today
                        <span className="group-hover:translate-x-1.5 transition-transform text-lg">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
