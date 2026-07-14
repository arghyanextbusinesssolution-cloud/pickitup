import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 animate-pulse">
                    Loading article...
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Preparing the content for you
                </p>
            </div>
        </div>
    );
}
