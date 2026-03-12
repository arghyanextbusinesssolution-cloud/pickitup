'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ValueCTA() {
    return (
        <section className="relative bg-[#340c74] py-24 overflow-hidden">
            {/* Background Pattern (Plus symbols) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="text-white flex flex-col items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-8">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                            <span className="text-[11px] font-black uppercase tracking-widest text-white/80">Trusted by 2M+ customers</span>
                        </div>

                        <h2 className="text-5xl lg:text-[72px] font-[950] leading-[1] mb-8 tracking-tighter uppercase max-w-md">
                            WE KNOW WHAT YOU'RE <span className="text-yellow-400">SHIPPING</span> MATTERS.
                        </h2>

                        <p className="text-xl text-white/60 font-medium mb-12 max-w-sm">
                            Experience the pickitup difference today.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-16">
                            <Link href="/register" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-10 py-4 rounded-xl transition-all shadow-xl shadow-yellow-400/20 flex items-center gap-3 group text-sm uppercase tracking-widest">
                                Get Started
                                <span className="group-hover:translate-x-1.5 transition-transform text-lg">→</span>
                            </Link>

                            <Link href="/register" className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest group">
                                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <span className="text-lg">▶</span>
                                </div>
                                Watch How It Works
                            </Link>
                        </div>

                        <div className="h-px bg-white/10 w-full mb-10" />

                        <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                            <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-[10px]">✓</div>
                                <span className="text-xs font-black uppercase tracking-widest text-white/70">No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-[10px]">✓</div>
                                <span className="text-xs font-black uppercase tracking-widest text-white/70">Free to list</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-[10px]">✓</div>
                                <span className="text-xs font-black uppercase tracking-widest text-white/70">24/7 support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image with Gradient Overlay */}
                    <div className="relative group">
                        <div className="relative aspect-[16/14] rounded-[1.5rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/img2_truck.avif"
                                alt="Truck Shipping"
                                fill
                                className="object-cover"
                            />

                            {/* Purple Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#340c74]/80 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-[#340c74]/20 mix-blend-multiply"></div>

                            {/* Glassmorphism Card */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 shadow-2xl">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-2xl">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-white leading-tight">Ship with Confidence</h4>
                                        <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Protection guarantee included</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Glow */}
                        <div className="absolute -inset-4 bg-purple-500/20 blur-[60px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
