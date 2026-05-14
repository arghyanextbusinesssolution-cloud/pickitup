'use client';

import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-yellow-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-yellow-400/20 rounded-full blur-sm"></div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Loading Content</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Fetching latest logistics data...</p>
            </div>
        </div>
    );
}
