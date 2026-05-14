'use client';

import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin shadow-[0_0_15px_rgba(239,68,68,0.1)]"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-red-500/20 rounded-full blur-sm"></div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest italic">Syncing Command Center</h3>
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em] animate-pulse">Establishing Secure Data Uplink...</p>
            </div>
        </div>
    );
}
