'use client';

import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#fafaff] pt-16 pb-8 text-[#1a1b3a]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Top Section: Logo & Newsletter */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-[1000] tracking-tighter">
                            pickit<span className="text-[#7C3AED]">Up</span>
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <span className="text-sm font-bold text-gray-400">Stay updated with shipping tips & news</span>
                        <div className="flex w-full sm:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white border border-gray-200 px-6 py-3 rounded-l-xl text-sm focus:outline-none focus:border-[#7C3AED] min-w-[240px]"
                            />
                            <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-[900] px-8 py-3 rounded-r-xl text-sm uppercase tracking-widest transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-purple-100 w-full mb-8" />

                {/* Middle Section: Links Grid */}
                <div className="space-y-8">
                    {/* Cost to Ship Row */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        <span className="text-sm font-[900] uppercase tracking-widest">Cost to Ship</span>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {['Vehicles', 'Motorcycles', 'Furniture', 'Freight', 'Boats', 'Heavy Equipment'].map((link) => (
                                <a key={link} href="#" className="text-sm font-bold text-purple-400 hover:text-[#7C3AED] transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-purple-50 w-full" />

                    {/* Company Row & Socials */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                            {['Company', 'Careers', 'Press', 'Blog'].map((link) => (
                                <a key={link} href="#" className="text-sm font-[900] uppercase tracking-widest hover:text-[#7C3AED] transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Social Icons */}
                            <div className="flex gap-2">
                                {[
                                    { icon: 'F', label: 'Facebook' },
                                    { icon: 'I', label: 'Instagram' },
                                    { icon: 'X', label: 'Twitter' },
                                    { icon: 'Y', label: 'YouTube' },
                                    { icon: 'L', label: 'LinkedIn' }
                                ].map((social) => (
                                    <button key={social.label} className="w-10 h-10 rounded-full border border-purple-100 bg-white flex items-center justify-center hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all text-sm font-black">
                                        {social.icon}
                                    </button>
                                ))}
                            </div>

                            {/* Region Picker */}
                            <button className="flex items-center gap-3 bg-white border border-purple-100 px-5 py-2.5 rounded-xl hover:border-[#7C3AED] transition-all group">
                                <span className="text-gray-400 group-hover:text-[#7C3AED]">🌐</span>
                                <span className="text-[13px] font-[900] text-gray-500 uppercase tracking-widest group-hover:text-[#1a1b3a]">Choose your region</span>
                                <span className="text-gray-300">▼</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-purple-100 w-full mt-12 mb-8" />

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <p className="text-[13px] font-bold text-gray-400">
                        Copyright © 2026, pickitup Inc. and its licensors. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {[
                            'pickitup User Agreement',
                            'Privacy Policy',
                            'Site Map',
                            'Cookie Policy',
                            'Accessibility',
                            'Help'
                        ].map((link, i, arr) => (
                            <div key={link} className="flex items-center gap-6">
                                <a href="#" className="text-[13px] font-bold text-purple-400 hover:text-[#7C3AED] transition-colors">
                                    {link}
                                </a>
                                {i < arr.length - 1 && <span className="text-gray-200">|</span>}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}
