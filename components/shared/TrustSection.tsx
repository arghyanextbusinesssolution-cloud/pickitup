'use client';

import Image from 'next/image';

export default function TrustSection() {
    return (
        <section className="bg-[#4b148c] py-16 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-black uppercase tracking-[0.3em] opacity-60">Trusted by Millions</span>
                </div>

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-20 px-4 md:px-0">
                    {/* Google Reviews */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
                        <div className="bg-white p-3 rounded-2xl shadow-2xl flex-shrink-0 w-20 h-20 flex items-center justify-center mx-auto sm:mx-0">
                            <div className="relative w-12 h-12">
                                <Image src="/google.png" alt="Google" fill className="object-contain" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-3xl font-[900] tracking-tight">4.9</span>
                                <div className="text-yellow-400 text-sm">★★★★★</div>
                            </div>
                            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest leading-none mb-2">Based on 12,847 reviews</p>
                            <h4 className="text-sm font-black uppercase tracking-widest">Google Reviews</h4>
                        </div>
                    </div>

                    {/* BBB Rating */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:border-x border-white/10 md:px-12">
                        <div className="bg-white p-3 rounded-2xl shadow-2xl flex-shrink-0 w-20 h-20 flex items-center justify-center mx-auto sm:mx-0">
                            <div className="relative w-14 h-14">
                                <Image src="/second_icon.png" alt="BBB" fill className="object-contain" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-3xl font-[900] tracking-tight">4.5</span>
                                <div className="text-yellow-400 text-sm">★★★★☆</div>
                            </div>
                            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest leading-none mb-2">Based on 3,291 reviews</p>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black uppercase tracking-widest">BBB Rating</h4>
                                <span className="bg-yellow-400 text-[#4b148c] text-[10px] font-black px-1.5 py-0.5 rounded leading-none">A+</span>
                            </div>
                        </div>
                    </div>

                    {/* Trustpilot */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
                        <div className="bg-white p-3 rounded-2xl shadow-2xl flex-shrink-0 w-20 h-20 flex items-center justify-center mx-auto sm:mx-0">
                            <div className="relative w-14 h-14">
                                <Image src="/truspilot.jpg" alt="Trustpilot" fill className="object-contain" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-3xl font-[900] tracking-tight">4.4</span>
                                <div className="text-yellow-400 text-sm">★★★★☆</div>
                            </div>
                            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest leading-none mb-2">Based on 8,562 reviews</p>
                            <h4 className="text-sm font-black uppercase tracking-widest">Trustpilot</h4>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-white/10 w-full mb-16" />

                {/* Secondary Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 px-4 md:px-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                        <div className="bg-white/10 p-2.5 rounded-xl text-yellow-400 text-lg flex-shrink-0">🔒</div>
                        <div>
                            <h5 className="text-[13px] font-black uppercase tracking-widest mb-1">Secure Payments</h5>
                            <p className="text-[11px] font-bold opacity-60 leading-relaxed uppercase tracking-widest">256-bit encryption</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                        <div className="bg-white/10 p-2.5 rounded-xl text-yellow-400 text-lg flex-shrink-0">🛡️</div>
                        <div>
                            <h5 className="text-[13px] font-black uppercase tracking-widest mb-1">Ship with Confidence</h5>
                            <p className="text-[11px] font-bold opacity-60 leading-relaxed uppercase tracking-widest">Protection guarantee</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                        <div className="bg-white/10 p-2.5 rounded-xl text-yellow-400 text-lg flex-shrink-0">👤</div>
                        <div>
                            <h5 className="text-[13px] font-black uppercase tracking-widest mb-1">Verified Carriers</h5>
                            <p className="text-[11px] font-bold opacity-60 leading-relaxed uppercase tracking-widest">Background checked</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                        <div className="bg-white/10 p-2.5 rounded-xl text-yellow-400 text-lg flex-shrink-0">🎧</div>
                        <div>
                            <h5 className="text-[13px] font-black uppercase tracking-widest mb-1">24/7 Support</h5>
                            <p className="text-[11px] font-bold opacity-60 leading-relaxed uppercase tracking-widest">Always here to help</p>
                        </div>
                    </div>
                </div>

                {/* Total Shipment Badge */}
                <div className="flex justify-center">
                    <div className="bg-white/5 backdrop-blur-xl px-10 py-6 rounded-[3rem] border border-white/10 text-center shadow-2xl inline-flex items-center gap-6">
                        <div className="text-4xl">🚚</div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-[950] tracking-tighter leading-none mb-1">2,000,000+</h2>
                            <p className="text-xs font-black opacity-60 uppercase tracking-[0.2em] leading-none">Shipments completed successfully</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
