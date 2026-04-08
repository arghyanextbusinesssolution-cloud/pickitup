'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    Package, 
    Tag, 
    ClipboardList, 
    MapPin, 
    User as UserIcon, 
    Truck, 
    Contact, 
    ShieldCheck, 
    FileText, 
    FileCheck, 
    Clock, 
    CreditCard, 
    RotateCcw, 
    Banknote, 
    Lock, 
    Scale, 
    Star, 
    MessageCircle, 
    Bell, 
    TrendingUp, 
    BarChart3, 
    Trophy, 
    Settings, 
    UserCog, 
    Percent, 
    ScrollText, 
    Shield 
} from 'lucide-react';
import { authService } from '../../services/auth.service';
import { User } from '../../types/auth.types';

export default function AdminDashboardLayout({
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

            if (currentUser.role !== 'ADMIN') {
                router.push('/login');
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

    const navGroups = [
        {
            group: 'Dashboard',
            items: [
                { name: 'Overview', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
            ]
        },
        {
            group: 'Operations',
            items: [
                { name: 'Shipments', href: '/admin/shipments', icon: <Package size={20} /> },
                { name: 'Bids', href: '/admin/bids', icon: <Tag size={20} /> },
                { name: 'Bookings', href: '/admin/bookings', icon: <ClipboardList size={20} /> },
                { name: 'Tracking', href: '/admin/tracking', icon: <MapPin size={20} /> },
            ]
        },
        {
            group: 'Users',
            items: [
                { name: 'Customers', href: '/admin/users', icon: <UserIcon size={20} /> },
                { name: 'Carriers', href: '/admin/carriers', icon: <Truck size={20} /> },
                { name: 'Drivers', href: '/admin/users/drivers', icon: <Contact size={20} /> },
                { name: 'Admins', href: '/admin/users/admins', icon: <ShieldCheck size={20} /> },
            ]
        },
        {
            group: 'Fleet',
            items: [
                { name: 'Vehicles', href: '/admin/fleet/vehicles', icon: <Truck size={20} /> },
                { name: 'Documents', href: '/admin/fleet/documents', icon: <FileText size={20} /> },
                { name: 'Insurance', href: '/admin/fleet/insurance', icon: <FileCheck size={20} /> },
                { name: 'Availability', href: '/admin/fleet/availability', icon: <Clock size={20} /> },
            ]
        },
        {
            group: 'Payments',
            items: [
                { name: 'Transactions', href: '/admin/transactions', icon: <CreditCard size={20} /> },
                { name: 'Refunds', href: '/admin/payments/refunds', icon: <RotateCcw size={20} /> },
                { name: 'Payouts', href: '/admin/payments/payouts', icon: <Banknote size={20} /> },
                { name: 'Escrow', href: '/admin/payments/escrow', icon: <Lock size={20} /> },
            ]
        },
        {
            group: 'Disputes',
            items: [
                { name: 'Claims', href: '/admin/disputes', icon: <Scale size={20} /> },
                { name: 'Reviews', href: '/admin/reviews', icon: <Star size={20} /> },
            ]
        },
        {
            group: 'Messaging',
            items: [
                { name: 'Conversations', href: '/admin/messaging/conversations', icon: <MessageCircle size={20} /> },
                { name: 'Notifications', href: '/admin/notifications', icon: <Bell size={20} /> },
            ]
        },
        {
            group: 'Analytics',
            items: [
                { name: 'Revenue', href: '/admin/analytics/revenue', icon: <TrendingUp size={20} /> },
                { name: 'Shipments', href: '/admin/analytics/shipments', icon: <BarChart3 size={20} /> },
                { name: 'Carrier Performance', href: '/admin/analytics/performance', icon: <Trophy size={20} /> },
            ]
        },
        {
            group: 'Platform',
            items: [
                { name: 'System Settings', href: '/admin/settings', icon: <Settings size={20} /> },
                { name: 'Roles & Permissions', href: '/admin/platform/roles', icon: <UserCog size={20} /> },
                { name: 'Commission', href: '/admin/platform/commission', icon: <Percent size={20} /> },
            ]
        },
        {
            group: 'Logs',
            items: [
                { name: 'Activity Logs', href: '/admin/logs/activity', icon: <ScrollText size={20} /> },
                { name: 'Audit Logs', href: '/admin/logs/audit', icon: <Shield size={20} /> },
            ]
        },
        {
            group: 'Profile',
            items: [
                { name: 'My Account', href: '/admin/profile', icon: <UserIcon size={20} /> },
            ]
        }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-gray-800 border-t-red-500 rounded-full animate-spin shadow-[0_0_20px_rgba(239,68,68,0.2)]"></div>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h2 className="text-xl font-black text-white tracking-widest uppercase italic">Command Center</h2>
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] animate-pulse">Initializing Secure Session</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden font-sans">
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Admin Sidebar - Professional Sticky Architecture */}
            <aside className={`fixed inset-y-0 left-0 bg-gray-900 w-72 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} h-full shrink-0 border-r border-gray-800`}>
                {/* Logo Area - Fixed at top of sidebar */}
                <div className="h-24 flex items-center px-8 border-b border-gray-800 shrink-0 bg-gray-900">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative">
                            <Image
                                src="/logo.png"
                                alt="pickItUp Logo"
                                width={45}
                                height={45}
                                className="w-11 h-11 object-contain border-2 border-red-500 rounded-xl shadow-lg"
                            />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-[1000] tracking-tight text-white uppercase mt-1 leading-none italic">COMMAND</span>
                            <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-[0.2em] leading-none mt-1">PRO ADMIN</span>
                        </div>
                    </Link>
                </div>

                {/* Independent Scrollable Navigation Area */}
                <nav className="flex-1 px-4 py-8 space-y-10 overflow-y-auto custom-scrollbar scroll-smooth">
                    {navGroups.map((group) => (
                        <div key={group.group} className="space-y-4">
                            <div className="flex items-center gap-3 px-4">
                                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                                    {group.group}
                                </h3>
                                <div className="h-px bg-gray-800 flex-1"></div>
                            </div>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center gap-3 px-4 py-3 rounded-lg border-l-2 transition-all duration-200 ${isActive
                                                ? 'bg-red-500/10 border-red-500 text-white shadow-sm'
                                                : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'scale-110 text-red-500' : 'text-gray-500 group-hover:text-white'}`}>
                                                {item.icon}
                                            </span>
                                            <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-white' : ''}`}>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>




                {/* User Footer - Fixed at bottom */}
                <div className="p-6 border-t border-gray-800 shrink-0 bg-gray-900/50 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {user ? getInitials(user.firstName, user.lastName) : '...'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-white font-bold underline decoration-red-500/50 truncate">
                                {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                            </p>
                            <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.2em] truncate">Platform Owner</p>
                        </div>
                    </div>
                </div>
            </aside>


            {/* Main Content Area - Scrollable Independently */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <header className="h-24 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-gray-500 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight uppercase hidden sm:block">
                            Command Center <span className="text-red-500 italic ml-2">v5.0</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-red-100">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Live System Status: Optimal
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

