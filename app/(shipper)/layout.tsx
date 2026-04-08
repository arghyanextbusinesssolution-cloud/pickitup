'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    Package, 
    ClipboardList, 
    CreditCard, 
    AlertTriangle, 
    Star, 
    User as UserIcon, 
    Settings,
    Plus
} from 'lucide-react';
import { authService } from '../../services/auth.service';
import { User } from '../../types/auth.types';

export default function ShipperDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = authService.getCurrentUser();
            
            if (!currentUser) {
                router.push('/login');
                return;
            }

            if (currentUser.role === 'CARRIER') {
                router.push('/carrier/dashboard');
                return;
            }

            setUser(currentUser);
            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    const getInitials = (firstName: string = '', lastName: string = '') => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '??';
    };

    const navItems = [
        { name: 'Overview', href: '/shipper/dashboard', icon: <LayoutDashboard size={22} /> },
        { name: 'Shipments', href: '/shipper/dashboard/shipments', icon: <Package size={22} /> },
        { name: 'Bookings', href: '/shipper/dashboard/bookings', icon: <ClipboardList size={22} /> },
        { name: 'Payments', href: '/shipper/dashboard/payments', icon: <CreditCard size={22} /> },
        { name: 'Disputes', href: '/shipper/dashboard/disputes', icon: <AlertTriangle size={22} /> },
        { name: 'Reviews', href: '/shipper/dashboard/reviews', icon: <Star size={22} /> },
        { name: 'Profile', href: '/shipper/dashboard/profile', icon: <UserIcon size={22} /> },
        { name: 'Settings', href: '/shipper/dashboard/settings', icon: <Settings size={22} /> },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin shadow-xl"></div>
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="text-xl font-[900] text-gray-900 tracking-tight uppercase">Shipper Portal</h2>
                        <p className="text-sm font-bold text-purple-600 uppercase tracking-widest animate-pulse">Synchronizing Session...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Pure Violet Theme */}
            <aside className={`fixed inset-y-0 left-0 bg-[#2D1B69] w-72 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="pickItUp Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain bg-gradient-to-br from-purple-400 to-[#7C3AED] rounded-xl shadow-lg"
                        />
                        <span className="text-2xl font-[1000] tracking-tight text-white uppercase mt-1">pickItUp</span>
                    </Link>
                </div>

                {/* Create Button - Keeping yellow as action but theme is violet */}
                <div className="p-6">
                    <Link
                        href="/shipper/dashboard/shipments/create"
                        className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-[900] uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                    >
                        <Plus size={20} strokeWidth={3} /> Create Listing
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${isActive
                                    ? 'bg-purple-600/30 text-white border border-purple-400/20 shadow-inner'
                                    : 'text-purple-200 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className={isActive ? 'text-white' : 'text-purple-300'}>{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className="p-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500 border-2 border-white/20 flex items-center justify-center text-white font-bold text-lg">
                            {user ? getInitials(user.firstName, user.lastName) : '...'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-white font-bold truncate">
                                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                            </p>
                            <p className="text-purple-300 text-[10px] font-black uppercase tracking-widest opacity-80">Shipper Portal</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-gray-500 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-[900] text-[#1a1b3a] tracking-tight uppercase hidden sm:block">
                            Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-purple-600 transition-colors border border-gray-100">
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
