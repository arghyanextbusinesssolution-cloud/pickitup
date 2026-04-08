'use client';

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';
import { Truck } from 'lucide-react';

export default function CarrierLoginPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-left mb-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-yellow-400/10 text-yellow-500 w-fit px-4 py-2 rounded-full border border-yellow-400/20">
                    <Truck size={18} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Carrier Portal</span>
                </div>
                <div>
                    <h1 className="text-4xl font-[1000] text-gray-900 tracking-tight uppercase mb-2">Carrier Partner Login</h1>
                    <p className="text-gray-500 text-lg font-medium">Access your fleet dashboard and manage loads.</p>
                </div>
            </div>

            <div className="bg-white">
                <LoginForm isCarrier={true} />
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
                <p className="text-sm font-medium text-gray-500">
                    Looking for the Shipper Portal?{' '}
                    <Link href="/login" className="text-yellow-600 hover:text-yellow-700 hover:underline font-bold transition-all">
                        Sign in here
                    </Link>
                </p>
                <Link 
                    href="/register?type=carrier" 
                    className="text-white bg-gray-900 px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-xl"
                >
                    Apply to Haul
                </Link>
            </div>
        </div>
    );
}
