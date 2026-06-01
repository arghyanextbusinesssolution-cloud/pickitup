'use client';

import React from 'react';

export interface FilterState {
    startDate: string;
    minBids: string;
    maxDistance: string;
    minWeight: string;
    maxWeight: string;
    weightUnit: string;
    minBudget: string;
    maxBudget: string;
    category: string;
}

interface ShipmentFilterProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    onApply: () => void;
    onClear: () => void;
}

const categories = [
    'General Goods',
    'Fragile Items',
    'Vehicles',
    'Household Moves',
    'Heavy Equipment',
    'Live Animals',
    'Perishables'
];

export default function ShipmentFilter({ filters, setFilters, onApply, onClear }: ShipmentFilterProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-[2rem] shadow-2xl p-8 w-[400px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 font-hanken">
                <h3 className="font-[900] uppercase text-[#13182C] tracking-widest text-sm">Filter Options</h3>
                <button
                    onClick={onClear}
                    className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors font-mono"
                >
                    Reset All
                </button>
            </div>

            <div className="space-y-6">
                {/* Distance & Date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">After Date</label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-hanken"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">Max Dist (mi)</label>
                        <input
                            type="number"
                            placeholder="e.g. 500"
                            value={filters.maxDistance}
                            onChange={(e) => setFilters({ ...filters, maxDistance: e.target.value })}
                            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-hanken"
                        />
                    </div>
                </div>

                {/* Budget Range */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">Budget Range ($)</label>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minBudget}
                            onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
                            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-hanken"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxBudget}
                            onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
                            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-hanken"
                        />
                    </div>
                </div>

                {/* Weight Range */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Weight Range</label>
                        <select
                            value={filters.weightUnit}
                            onChange={(e) => setFilters({ ...filters, weightUnit: e.target.value })}
                            className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-widest bg-transparent outline-none cursor-pointer font-mono"
                        >
                            <option value="">Any</option>
                            <option value="lbs">Lbs</option>
                            <option value="kg">Kg</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minWeight}
                            onChange={(e) => setFilters({ ...filters, minWeight: e.target.value })}
                            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-hanken"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxWeight}
                            onChange={(e) => setFilters({ ...filters, maxWeight: e.target.value })}
                            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-hanken"
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">Shipment Type</label>
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all appearance-none cursor-pointer font-hanken"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Min Bids */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">Competition (Min Bids)</label>
                    <input
                        type="number"
                        placeholder="e.g. 0"
                        value={filters.minBids}
                        onChange={(e) => setFilters({ ...filters, minBids: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#13182C] focus:border-[#FBBF24] focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-hanken"
                    />
                </div>

                <button
                    onClick={onApply}
                    className="w-full bg-[#13182C] hover:bg-black text-white font-[900] py-4 rounded-2xl uppercase tracking-[0.2em] text-xs transition-all shadow-xl hover:shadow-[#FBBF24]/20 hover:-translate-y-1 active:translate-y-0 active:shadow-lg mt-4 font-hanken"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
