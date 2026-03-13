'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { authService } from '../../services/auth.service';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
            setUserRole(user.role);
            console.log(`[Navbar] Logged in as: ${user.firstName} ${user.lastName}, Role: ${user.role}`);
        } else {
            setIsLoggedIn(false);
            console.log('[Navbar] User is not logged in');
        }
    }, []);

    const getDashboardPath = () => {
        if (userRole === 'admin') return '/admin/dashboard';
        if (userRole === 'carrier') return '/carrier/dashboard';
        return '/shipper/dashboard';
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-12 lg:px-20">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <Image
                            src="/logo.png"
                            alt="Pickitup Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain"
                            priority
                        />
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-bold text-gray-900">Pickitup</span>
                            <span className="text-[10px] font-semibold text-purple-600 tracking-wide">Big or Small, We Deliver All!</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        <Link href="/about" className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center gap-1.5">
                            Our Company
                        </Link>
                        <Link href="/ship" className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors">
                            Ship
                        </Link>
                        <Link href="/find-shipments" className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors">
                            Find Shipments
                        </Link>
                        <Link href="/contact" className="text-[15px] font-medium text-gray-800 hover:text-purple-600 transition-colors flex items-center gap-1.5">
                            Contact Us
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="w-px h-8 bg-gray-300"></div>
                        {isLoggedIn ? (
                            <Link
                                href={getDashboardPath()}
                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-7 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="text-[15px] font-medium text-gray-700 hover:text-purple-600 transition-colors">
                                    Sign In
                                </Link>
                                <Link href="/register" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-7 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg">
                                    Join Free
                                </Link>
                            </>
                        )}
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
                            {isLoggedIn ? (
                                <Link
                                    href={getDashboardPath()}
                                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-md mx-4 text-center flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors px-4 py-2 text-left">
                                        Sign In
                                    </Link>
                                    <Link href="/register" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold px-6 py-2.5 rounded-full transition-all shadow-md mx-4 text-center">
                                        Join Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
