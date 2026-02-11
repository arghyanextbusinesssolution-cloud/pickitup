'use client';

import Image from 'next/image';

export default function BusinessDelivery() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content Column */}
                    <div className="order-2 lg:order-1 max-w-xl flex flex-col items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0">
                        <h2 className="text-[44px] lg:text-[56px] font-[900] leading-[1.05] mb-8 tracking-tighter uppercase whitespace-pre-wrap">
                            <span className="text-[#1a1b3a]">YOUR PARTNER IN</span><br />
                            <span className="text-yellow-400">BUSINESS DELIVERY</span>
                        </h2>

                        <p className="text-xl text-gray-500 font-bold mb-6 leading-relaxed">
                            Personalized business delivery solutions designed to scale with your growth and exceed customer expectations.
                        </p>

                        <p className="text-[17px] text-gray-500 font-medium mb-10 leading-relaxed">
                            We understand that every business has unique shipping needs. Our tailored logistics solutions combine cutting-edge technology with reliable carrier networks to streamline your operations, reduce costs, and deliver exceptional experiences to your customers nationwide.
                        </p>

                        {/* Benefits Checklist */}
                        <div className="space-y-4 mb-12">
                            {[
                                'Expand nationwide with reliable coverage',
                                'Diversify your carrier base for flexibility',
                                'Elevate your delivery experience',
                                'Seamless API integration options'
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <span className="text-yellow-600 text-sm font-bold">✓</span>
                                    </div>
                                    <span className="text-[17px] font-bold text-[#1a1b3a]">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center lg:justify-start w-full">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-10 py-5 rounded-xl transition-all shadow-xl shadow-yellow-400/20 flex items-center gap-3 group text-sm uppercase tracking-widest">
                                Find My Shipping Solution
                                <span className="group-hover:translate-x-1.5 transition-transform text-lg">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Image Column */}
                    <div className="order-1 lg:order-2 relative group">
                        {/* Decorative Purple Shape Behind Image */}
                        <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-purple-100 rounded-3xl -z-10 transition-transform group-hover:scale-110 duration-500" />

                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                            <Image
                                src="/freight.jpg"
                                alt="Warehouse Logistics"
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Trusted Partner Badge */}
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-lg border border-white/20 flex items-center gap-2.5">
                                <div className="bg-purple-100 p-1.5 rounded-lg">
                                    <span className="text-purple-600 text-sm">🛡️</span>
                                </div>
                                <span className="text-[11px] font-black text-[#1a1b3a] uppercase tracking-widest">Trusted Partner</span>
                            </div>

                            {/* Stats Card Overlay */}
                            <div className="absolute bottom-[-10px] left-[-20px] bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 flex items-center gap-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-2xl">
                                    <span className="animate-pulse">📈</span>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-[950] text-[#1a1b3a] tracking-tight leading-none mb-1">98.5%</h4>
                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-none">On-time Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
