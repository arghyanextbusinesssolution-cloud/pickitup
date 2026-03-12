import React from 'react';

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
    const styles: Record<string, string> = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        BOOKED: 'bg-blue-100 text-blue-800',
        IN_TRANSIT: 'bg-purple-100 text-purple-800',
        DELIVERED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
    };

    const currentStyle = styles[status] || 'bg-gray-100 text-gray-800';

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStyle} ${className}`}>
            {status.replace('_', ' ')}
        </span>
    );
};
