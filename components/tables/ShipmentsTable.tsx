'use client';

import React from 'react';
import { StatusBadge } from '@/components/shared/StatusBadge';

interface Shipment {
    id: string;
    title: string;
    origin: string;
    destination: string;
    status: string;
    weight?: number;
}

interface ShipmentsTableProps {
    shipments: Shipment[];
    onView?: (id: string) => void;
}

export const ShipmentsTable: React.FC<ShipmentsTableProps> = ({ shipments, onView }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {shipments.map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {shipment.origin} → {shipment.destination}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={shipment.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {shipment.weight ? `${shipment.weight} kg` : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onView?.(shipment.id)}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                    {shipments.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                                No shipments found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
