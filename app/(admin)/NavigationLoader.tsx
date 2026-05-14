'use client';

import React from 'react';

export default function NavigationLoader() {
    return (
        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-300">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-red-500/20 rounded-full blur-sm"></div>
            </div>
            <div className="mt-4 flex flex-col items-center gap-1">
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Synchronizing...</p>
                <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 animate-[loading_1.5s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </div>
    );
}
