'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '../../services/auth.service';
import { User } from '../../types/auth.types';

export default function CarrierDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }
        if (currentUser.role === 'USER') {
            router.push('/shipper/dashboard');
            return;
        }
        setUser(currentUser);
    }, [router]);

    const getInitials = (firstName: string = '', lastName: string = '') => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '??';
    };

    const navItems = [
        { name: 'Overview', href: '/carrier/dashboard', icon: '📈' },
        { name: 'Find Loads', href: '/carrier/jobs', icon: '🔍' },
        { name: 'Active Bids', href: '/carrier/bids', icon: '💬' },
        { name: 'My Shipments', href: '/carrier/shipments', icon: '🚚' },
        { name: 'Earnings', href: '/carrier/earnings', icon: '💰' },
        { name: 'Payouts', href: '/carrier/payouts', icon: '🏦' },
        { name: 'Reviews', href: '/carrier/reviews', icon: '⭐' },
        { name: 'Profile', href: '/carrier/profile', icon: '👤' },
        { name: 'Settings', href: '/carrier/settings', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Dark theme with Yellow Accents */}
            <aside className={`fixed inset-y-0 left-0 bg-[#0F172A] w-72 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-3 font-black text-white hover:text-yellow-400 transition-colors">
                        <Image
                            src="/logo.png"
                            alt="pickItUp Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain bg-yellow-400 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-transform hover:scale-110"
                        />
                        <span className="text-2xl tracking-tighter uppercase mt-1">pickItUp</span>
                        <span className="text-[10px] font-bold bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-sm uppercase tracking-widest ml-1">Pro</span>
                    </Link>
                </div>

                {/* Primary Action Button */}
                <div className="p-6">
                    <Link
                        href="/carrier/jobs"
                        className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-[900] uppercase tracking-wider py-4 rounded-xl transition-all shadow-[0_10px_20px_-5px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <span>🔍</span> Browse Load Board
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 ${isActive
                                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 shadow-[inset_0_0_10px_rgba(250,204,21,0.05)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className={`text-xl transition-transform ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className="p-6 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-white/10 flex items-center justify-center text-gray-900 font-[900] text-lg shadow-inner">
                            {user ? getInitials(user.firstName, user.lastName) : '...'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-white font-bold truncate">
                                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                            </p>
                            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Carrier Partner</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-[900] text-[#1a1b3a] tracking-tight uppercase hidden sm:block">
                            Carrier Portal
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 transition-all border border-gray-100">
                            <span className="text-2xl">🔔</span>
                            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-4 border-gray-50"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-10 overflow-auto bg-[#F8FAFC]">
                    {children}
                </main>
            </div>
        </div>
    );
}
