'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function AdminPlaceholderPage() {
    const pathname = usePathname();
    const moduleName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'Module';

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-sm animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 border-4 border-red-100 italic font-black text-2xl text-red-500">
                {moduleName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-[1000] text-gray-900 uppercase tracking-tighter mb-4">
                {moduleName} <span className="text-red-500 italic">Under Construction</span>
            </h1>
            <p className="text-gray-500 max-w-md font-bold text-lg mb-8">
                This module is currently being optimized for production scale. New features and real-time data integration will be live soon.
            </p>
            <div className="flex gap-4">
                <div className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-gray-900/20">
                    Live Status: Monitoring
                </div>
            </div>
        </div>
    );
}
