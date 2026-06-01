'use client';

import React from 'react';
import Link from 'next/link';

export default function InsurancePolicyPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-hanken text-[#13182C] pb-20">
            {/* Decorative Header */}
            <div className="bg-[#13182C] text-white py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E] opacity-10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FBBF24] opacity-5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-block bg-[#22C55E]/20 border border-[#22C55E]/30 text-[#22C55E] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 font-mono">
                        Protection Shield v2.0
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-[900] uppercase tracking-tighter leading-none mb-6">
                        Insurance <span className="text-[#FBBF24]">Protection</span> Policy
                    </h1>
                    <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Securing your logistics journey with 100% coverage confidence. Our premium protection plan is designed for peace of mind.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto -mt-10 relative z-20 px-6">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-10 lg:p-16 border border-gray-100">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="p-8 bg-[#F8FAFC] rounded-[2rem] border border-gray-50 text-center transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-4">🛡️</div>
                            <h3 className="text-xs font-black uppercase tracking-widest mb-2 font-mono">Full Coverage</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Up to $50,000 protection</p>
                        </div>
                        <div className="p-8 bg-[#F8FAFC] rounded-[2rem] border border-gray-100 text-center transform hover:scale-105 transition-all outline outline-2 outline-offset-4 outline-[#FBBF24]">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xs font-black uppercase tracking-widest mb-2 font-mono">Fast Claims</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Resolved within 48 hours</p>
                        </div>
                        <div className="p-8 bg-[#F8FAFC] rounded-[2rem] border border-gray-50 text-center transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xs font-black uppercase tracking-widest mb-2 font-mono">Verified</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Blockchain secured escrow</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-[900] uppercase tracking-tight text-[#13182C] mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-lg bg-[#13182C] text-white flex items-center justify-center text-xs font-mono">01</span>
                                Policy Overview
                            </h2>
                            <div className="pl-12 space-y-4 text-gray-600 leading-relaxed text-lg font-medium">
                                <p>
                                    By selecting the optional Website Insurance during checkout, you agree to an additional fee of <span className="text-[#13182C] font-black underline decoration-[#FBBF24] decoration-4">10% of the total bid amount</span>. This fee guarantees protection against damage, loss, or theft during the entire transit lifecycle.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-[900] uppercase tracking-tight text-[#13182C] mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-lg bg-[#13182C] text-white flex items-center justify-center text-xs font-mono">02</span>
                                What We Cover
                            </h2>
                            <ul className="pl-12 space-y-4 font-bold text-gray-700">
                                <li className="flex items-center gap-3">
                                    <span className="text-[#22C55E]">✓</span> Physical damage during loading/unloading.
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-[#22C55E]">✓</span> Total loss or mysterious disappearance.
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-[#22C55E]">✓</span> Theft while in the carrier's possession.
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-[#22C55E]">✓</span> Documentation errors affecting shipment value.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-[900] uppercase tracking-tight text-[#13182C] mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-lg bg-[#13182C] text-white flex items-center justify-center text-xs font-mono">03</span>
                                Excluded Items
                            </h2>
                            <div className="pl-12 p-8 bg-red-50 rounded-[2rem] border border-red-100 italic text-red-800 font-medium">
                                "We do not provide coverage for hazardous materials, illegal substances, live animals, or currency. Damage resulting from improper packaging by the shipper is also excluded from the claim process."
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-[900] uppercase tracking-tight text-[#13182C] mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-lg bg-[#13182C] text-white flex items-center justify-center text-xs font-mono">04</span>
                                Claim Process
                            </h2>
                            <div className="pl-12 space-y-6">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center font-black text-[#13182C]">1</div>
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1">Evidence Submission</h4>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">Submit photos of damage via the dashboard.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center font-black text-[#13182C]">2</div>
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1">Internal Review</h4>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">Our agents verify the claim with the carrier OTP data.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center font-black text-[#13182C]">3</div>
                                    <div>
                                        <h4 className="font-black uppercase text-sm mb-1">Instant Payout</h4>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">Once approved, funds are released to your wallet.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-20 pt-10 border-t border-gray-100 text-center">
                        <Link href="/shipper/dashboard" className="bg-[#13182C] text-white font-black px-12 py-5 rounded-2xl uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block">
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
