'use client';

import React from 'react';
import { Sidebar, DashboardHeader } from '@/components/layout';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
    navItems: { label: string; href: string; icon?: React.ReactNode }[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, navItems }) => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar items={navItems} />
            <div className="flex-1">
                <DashboardHeader title={title} />
                <main>{children}</main>
            </div>
        </div>
    );
};
