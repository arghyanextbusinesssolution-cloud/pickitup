'use client';

import Image from 'next/image';

export default function CarrierCTA() {
    const benefits = [
        {
            icon: '🕒',
            title: 'New shipments every 30 seconds',
            description: 'Access a constant stream of loads matching your routes and equipment',
        },
        {
            icon: '⛽',
            title: 'Reduce empty miles',
            description: 'Fill your backhauls and maximize revenue on every trip',
        },
        {
            icon: '📈',
            title: 'Improve route efficiency',
            description: 'Smart matching technology finds loads that fit your schedule',
        },
        {
            icon: '🚀',
            title: 'Grow your business in one platform',
            description: 'Build your reputation with customer reviews and win more shipments',
        },
    ];

    return (
        <section className="py-16 md:py-20 bg-[#F9FAFE] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column (Image Card) */}
                    <div className="relative">
                        <div className="relative rounded-[22px] overflow-hidden shadow-lg aspect-[4/3] w-full max-w-[540px] mx-auto">
                            <Image
                                src="/truck_back.avif"
                                alt="Truck with load"
                                fill
                                className="object-cover"
                            />
                            {/* Floating Tag Top-Left */}
                            <div className="absolute top-5 left-5 bg-yellow-400 text-[#1a1b3a] px-3.5 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-2 shadow-md z-10 border border-white/30">
                                <span>⚡</span>
                                <span className="uppercase tracking-wide">New loads every 30s</span>
                            </div>
                        </div>

                        {/* Floating Stats Card Bottom-Right */}
                        <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-gray-100 z-20 min-w-[180px]">
                            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-xl shadow-inner">
                                🚚
                            </div>
                            <div>
                                <div className="text-xl font-bold text-[#1a1b3a] leading-tight tracking-tight">50K+</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Active Carriers</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Text Content) */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#FEF9E7] border border-yellow-200/40 px-3.5 py-1.5 rounded-full mb-6">
                            <span className="text-gray-900 text-xs">🤝</span>
                            <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-[0.15em]">Partner With Us</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-[44px] lg:text-[56px] font-[900] leading-[1.05] mb-6 tracking-tight uppercase">
                            <span className="text-[#1a1b3a]">Become a</span><br />
                            <span className="text-yellow-400">Carrier</span>
                        </h2>

                        {/* Description Text */}
                        <p className="text-[16px] lg:text-[18px] text-[#6B7280] font-medium mb-10 max-w-[480px] leading-relaxed">
                            Join the largest shipping marketplace and grow your business with access to thousands of shipments posted every day. Turn empty miles into revenue.
                        </p>

                        {/* Feature List (Bullet Cards) */}
                        <div className="space-y-6 mb-10 w-full">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-4 group items-start">
                                    <div className="bg-[#FEF9E7] w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-yellow-100 transition-colors duration-300 border border-yellow-100/50">
                                        {benefit.icon}
                                    </div>
                                    <div className="pt-0.5">
                                        <h3 className="text-[16px] font-bold text-[#1a1b3a] mb-0.5 tracking-tight uppercase">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-[14px] text-[#6B7280] font-medium leading-[1.4] max-w-sm">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-9 w-full">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-yellow-400/20 flex items-center gap-2 text-[15px]">
                                Get Started
                                <span>→</span>
                            </button>
                            <button className="bg-white border border-gray-200 hover:bg-gray-50 text-[#1a1b3a] font-bold px-7 py-3.5 rounded-xl transition-all shadow-sm flex items-center gap-2 text-[15px]">
                                <span className="text-yellow-400 text-xs">▶</span>
                                Watch Video
                            </button>
                        </div>

                        {/* Small Trust Line Below Buttons */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full">
                            <div className="flex items-center gap-2">
                                <span className="text-green-500 text-sm">✅</span>
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Free to join</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500 text-sm">✅</span>
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">No hidden fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500 text-sm">✅</span>
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Cancel anytime</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
