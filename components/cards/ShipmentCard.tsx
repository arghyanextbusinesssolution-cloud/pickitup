'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Navigation, TrendingUp, ArrowRight } from 'lucide-react';

interface ShipmentCardProps {
  shipment: {
    id?: string;
    _id?: string;
    title?: string;
    commodity?: string;
    status?: string;
    originAddress?: string;
    originCity?: string;
    destinationAddress?: string;
    destinationCity?: string;
    bids?: any[];
  };
}

export const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  const id = shipment._id || shipment.id || '---';
  const displayId = id.substring(0, 8);
  const status = (shipment.status || 'OPEN').toUpperCase();
  const title = shipment.title || shipment.commodity || 'Untitled Shipment';
  const bidCount = shipment.bids?.length || 0;

  // Status-specific color mapping
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'IN_TRANSIT':
      case 'IN TRANSIT':
        return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'BOOKED':
      case 'ASSIGNED':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'OPEN':
      case 'PUBLISHED':
      case 'AWAITING BIDS':
      default:
        return 'bg-purple-50 text-purple-600 border-purple-100';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(111,66,193,0.1)] hover:-translate-y-1 hover:border-purple-100 flex flex-col h-full overflow-hidden">
      {/* Background Glow on Hover */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-3xl -z-10"></div>

      {/* Top Section: Status & ID */}
      <div className="flex justify-between items-center mb-5">
        <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-[0.1em] border uppercase ${getStatusStyles(status)}`}>
          {status}
        </div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
          ID: <span className="text-gray-300 font-mono">{displayId}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-[900] text-gray-900 mb-3 leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-purple-600 transition-colors">
        {title}
      </h3>

      {/* Location Details */}
      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-1.5 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-500 transition-colors">
            <MapPin size={14} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin</span>
            <span className="text-sm font-bold text-gray-600 line-clamp-1">{shipment.originCity || shipment.originAddress || 'Origin'}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-1.5 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-500 transition-colors">
            <Navigation size={14} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination</span>
            <span className="text-sm font-bold text-gray-600 line-clamp-1">{shipment.destinationCity || shipment.destinationAddress || 'Destination'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-purple-50 text-purple-600">
            <TrendingUp size={12} />
          </div>
          <span className="text-xs font-black text-gray-500 uppercase tracking-tighter">
            Bids: <span className="text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded-md ml-1">{bidCount}</span>
          </span>
        </div>

        <Link 
          href={`/shipper/dashboard/shipments/view?id=${id}`}
          className="flex items-center gap-2 group/btn py-1 text-xs font-black text-purple-600 uppercase tracking-[0.1em] hover:text-purple-700 transition-colors"
        >
          Manage
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
