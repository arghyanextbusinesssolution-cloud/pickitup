'use client';

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';
import { Package } from 'lucide-react';

export default function ShipperLoginPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-left mb-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-purple-100 text-purple-600 w-fit px-4 py-2 rounded-full border border-purple-200">
                    <Package size={18} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Shipper Portal</span>
                </div>
                <div>
                    <h1 className="text-4xl font-[1000] text-gray-900 tracking-tight uppercase mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-lg font-medium">Manage your shipments and track your deliveries.</p>
                </div>
            </div>

            <div className="bg-white">
                <LoginForm />
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
                <p className="text-sm font-medium text-gray-500">
                    Carrier Partner?{' '}
                    <Link href="/carrier/login" className="text-purple-600 hover:text-purple-700 hover:underline font-bold transition-all">
                        Sign in to Carrier Portal
                    </Link>
                </p>
                <div className="text-sm font-medium text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-purple-600 hover:text-purple-700 hover:underline font-bold transition-all">
                        Create one for free
                    </Link>
                </div>
            </div>
        </div>
    );
}
