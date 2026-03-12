'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { authService } from '../../services/auth.service';
import { User } from '../../types/auth.types';

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    }, []);

    const getInitials = (firstName: string = '', lastName: string = '') => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '??';
    };

    const navItems = [
        { name: 'Platform Overview', href: '/admin/dashboard', icon: '📊' },
        { name: 'Users', href: '/admin/users', icon: '👥' },
        { name: 'Shipments', href: '/admin/shipments', icon: '📦' },
        { name: 'Transactions', href: '/admin/transactions', icon: '💸' },
        { name: 'Disputes', href: '/admin/disputes', icon: '⚖️' },
        { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
        { name: 'Profile', href: '/admin/profile', icon: '👤' },
        { name: 'System Settings', href: '/admin/settings', icon: '⚡' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Admin Sidebar - Dark Theme distinct from Shipper/Carrier */}
            <aside className={`fixed inset-y-0 left-0 bg-gray-900 w-72 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-gray-800">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="pickItUp Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-contain border-2 border-red-500 rounded-xl shadow-lg"
                        />
                        <div className="flex flex-col">
                            <span className="text-xl font-[1000] tracking-tight text-white uppercase mt-1 leading-none">pickItUp</span>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none mt-1">Admin Portal</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${isActive
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className="p-6 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center text-white font-bold text-lg">
                            {user ? getInitials(user.firstName, user.lastName) : '...'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-white font-bold truncate">
                                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                            </p>
                            <p className="text-red-400 text-xs font-bold uppercase tracking-widest truncate">Platform Owner</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-gray-500 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-[900] text-gray-900 tracking-tight uppercase hidden sm:block">
                            Command Center
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Live System Ops
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-10 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
