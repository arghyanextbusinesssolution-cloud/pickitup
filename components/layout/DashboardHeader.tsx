import React from 'react';
import Link from 'next/link';

interface DashboardHeaderProps {
    title: string;
    userName?: string;
    actions?: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, userName, actions }) => {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {userName && <p className="text-sm text-gray-500">Welcome back, {userName}</p>}
            </div>
            <div className="flex items-center space-x-4">
                {actions}
                <Link
                    href="/login"
                    className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                    Sign Out
                </Link>
            </div>
        </header>
    );
};
