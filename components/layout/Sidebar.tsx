import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface SidebarProps {
    items: NavItem[];
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, className = '' }) => {
    return (
        <aside className={`w-64 bg-gray-50 border-r border-gray-200 min-h-[calc(100vh-64px)] ${className}`}>
            <div className="p-6 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="pickItUp Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                    />
                    <span className="text-xl font-black tracking-tight text-gray-900 uppercase">pickItUp</span>
                </Link>
            </div>
            <nav className="p-4 space-y-1">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                    >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};
