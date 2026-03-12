'use client';

import React from 'react';
import Link from 'next/link';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { useSearchParams } from 'next/navigation';

export default function RegisterPage() {
    // Wrap to prevent hydration error / warning from useSearchParams
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <RegisterContent />
        </React.Suspense>
    );
}

function RegisterContent() {
    const searchParams = useSearchParams();
    const isCarrier = searchParams.get('type') === 'carrier';

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-left mb-8">
                <h1 className="text-4xl font-[900] text-gray-900 tracking-tight uppercase mb-2">
                    {isCarrier ? 'Become a Carrier' : 'Create an Account'}
                </h1>
                <p className="text-gray-500 text-lg font-medium">
                    {isCarrier
                        ? 'Join our network of thousands of professional haulers'
                        : 'Get free instant quotes from thousands of trusted carriers.'}
                </p>
            </div>

            <div className="bg-white">
                <RegisterForm />
            </div>

            <div className="mt-8 text-center text-sm font-medium text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-600 hover:text-purple-700 hover:underline font-bold transition-all">
                    Sign in here
                </Link>
            </div>
        </div>
    );
}
