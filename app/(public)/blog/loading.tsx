import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 animate-pulse mb-2">
                Loading the Blog...
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
                Fetching the latest logistics and shipping insights
            </p>
        </div>
    );
}
