import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex text-gray-900">
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-[#2D1B69] flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="pickItUp Logo"
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain transform rotate-3"
                        priority
                    />
                    <span className="text-3xl font-[1000] tracking-tight text-white uppercase">pickItUp</span>
                </div>

                <div className="relative z-10 max-w-lg mt-20">
                    <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-4 block">Ship with confidence</span>
                    <h1 className="text-white text-6xl font-[1000] uppercase leading-[1.1] tracking-tighter mb-6">
                        We know what you're shipping matters.
                    </h1>
                    <p className="text-purple-200 text-xl font-medium leading-relaxed">
                        Join the fastest-growing logistics marketplace connecting you with trusted carriers and the best rates.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-8 mt-auto pt-12">
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <img key={i} className="w-12 h-12 rounded-full border-4 border-[#2D1B69] object-cover" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User avatar" />
                        ))}
                    </div>
                    <div className="text-white">
                        <p className="font-bold text-lg">Trusted by 2M+ Users</p>
                        <div className="flex text-yellow-400 text-sm">
                            {'★'.repeat(5)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 bg-white relative">
                {/* Mobile Logo Header */}
                <div className="lg:hidden absolute top-8 left-6 flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="pickItUp Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                    />
                    <span className="text-xl font-[900] tracking-tight text-[#1a1b3a] uppercase">pickItUp</span>
                </div>

                <div className="w-full max-w-md mt-10 lg:mt-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
