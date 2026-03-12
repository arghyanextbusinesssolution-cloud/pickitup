'use client';

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-left mb-8">
                <h1 className="text-4xl font-[900] text-gray-900 tracking-tight uppercase mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-lg font-medium">Enter your credentials to access your account.</p>
            </div>

            {/* Existing Login Form wrapped in the new styling container */}
            <div className="bg-white">
                <LoginForm />
            </div>

            <div className="mt-8 text-center text-sm font-medium text-gray-500">
                Don't have an account?{' '}
                <Link href="/register" className="text-purple-600 hover:text-purple-700 hover:underline font-bold transition-all">
                    Create one for free
                </Link>
            </div>
        </div>
    );
}
