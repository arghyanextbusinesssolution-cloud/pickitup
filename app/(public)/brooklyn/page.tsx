'use client';

import Link from 'next/link';
import Image from 'next/image';
import BackToTop from '@/components/shared/BackToTop';

export default function BrooklynFreightPage() {
    return (
        <div className="min-h-screen bg-white text-[#1a1b3a]">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-b from-gray-50 to-[#fdfaff] py-16 lg:py-24 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                        <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">Reliable Freight Service</span>
                    </div>

                    <h1 className="text-[42px] lg:text-[58px] font-[900] text-[#1a1b3a] leading-[1.1] mb-6 tracking-tighter uppercase max-w-4xl mx-auto">
                        Freight Service in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Brooklyn</span>
                    </h1>

                    <p className="text-lg text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                        PickItUp provides professional and top-tier Freight Services in Brooklyn. If you are looking for local pickup, efficient regional transit, and nationwide logistics matching, we have you covered. Content updates are coming soon.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/ship" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-[15px] uppercase tracking-wider">
                            Request a Freight Quote
                        </Link>
                        <Link href="/register?role=carrier" className="bg-white border-2 border-gray-200 hover:border-yellow-300 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[15px] uppercase tracking-wider">
                            Become a Carrier
                        </Link>
                    </div>
                </div>
            </section>

            {/* PRE-CONTENT PLACEHOLDER */}
            <section className="py-20 lg:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 uppercase">Custom solutions for your logistics</h2>
                    <p className="text-gray-650 font-medium mb-12">
                        We are currently preparing full service details and schedules for businesses operating in Brooklyn.
                    </p>
                    <div className="inline-block p-1 bg-yellow-105 border border-yellow-200 text-yellow-800 text-xs px-4 py-2 rounded-full font-bold uppercase">
                        Coming Soon
                    </div>
                </div>
            </section>

            <BackToTop />
        </div>
    );
}
