'use client';

import { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-12 lg:px-20">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="relative w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-300/50">
                            <span className="text-white font-bold text-2xl">📦</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">pickItUp</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        <button className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center gap-1.5">
                            Getting Started
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors">
                            Ship
                        </a>
                        <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors">
                            Find Shipments
                        </a>
                        <button className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center gap-1.5">
                            For Carriers
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <a href="#" className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors">
                            For Business
                        </a>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="w-px h-8 bg-gray-300"></div>
                        <button className="text-[15px] font-medium text-gray-700 hover:text-purple-600 transition-colors">
                            Sign In
                        </button>
                        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-7 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg">
                            Join Free
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col gap-4">
                            <button className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors text-left flex items-center justify-between">
                                Getting Started
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <a href="#" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                                Ship
                            </a>
                            <a href="#" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                                Find Shipments
                            </a>
                            <button className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors text-left flex items-center justify-between">
                                For Carriers
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <a href="#" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                                For Business
                            </a>
                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                                <button className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors px-4 py-2 text-left">
                                    Sign In
                                </button>
                                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-6 py-2.5 rounded-full transition-all shadow-md">
                                    Join Free
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
