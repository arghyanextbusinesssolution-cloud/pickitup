'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '../../../../services/admin.service';
import { Mail, Clock, CheckCircle, RefreshCw, Inbox } from 'lucide-react';

type EnquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED';

interface Enquiry {
    id: string;
    name: string;
    email: string;
    inquiryType: string;
    message: string;
    status: EnquiryStatus;
    createdAt: string;
}

const statusColors: Record<EnquiryStatus, string> = {
    NEW: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    RESOLVED: 'bg-green-100 text-green-800 border-green-200'
};

const statusIcons: Record<EnquiryStatus, React.ReactNode> = {
    NEW: <Inbox size={13} />,
    IN_PROGRESS: <RefreshCw size={13} />,
    RESOLVED: <CheckCircle size={13} />
};

export default function AdminEnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Enquiry | null>(null);
    const [updating, setUpdating] = useState(false);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const data = await adminService.getEnquiries();
            setEnquiries(data);
        } catch (e) {
            console.error('Failed to fetch enquiries', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEnquiries(); }, []);

    const handleStatusChange = async (id: string, status: EnquiryStatus) => {
        setUpdating(true);
        try {
            await adminService.updateEnquiryStatus(id, status);
            setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
            if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
        } catch (e) {
            console.error('Status update failed', e);
        } finally {
            setUpdating(false);
        }
    };

    const counts = {
        NEW: enquiries.filter(e => e.status === 'NEW').length,
        IN_PROGRESS: enquiries.filter(e => e.status === 'IN_PROGRESS').length,
        RESOLVED: enquiries.filter(e => e.status === 'RESOLVED').length,
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Contact Enquiries</h1>
                    <p className="text-gray-500 font-medium mt-1">All contact form submissions from the website</p>
                </div>
                <button
                    onClick={fetchEnquiries}
                    className="flex items-center gap-2 bg-gray-900 text-white font-bold px-5 py-3 rounded-xl hover:bg-black transition-all text-sm uppercase tracking-wider"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4">
                {([
                    { label: 'New', key: 'NEW', color: 'border-yellow-400 bg-yellow-50', textColor: 'text-yellow-700', icon: <Inbox size={22} /> },
                    { label: 'In Progress', key: 'IN_PROGRESS', color: 'border-blue-400 bg-blue-50', textColor: 'text-blue-700', icon: <RefreshCw size={22} /> },
                    { label: 'Resolved', key: 'RESOLVED', color: 'border-green-400 bg-green-50', textColor: 'text-green-700', icon: <CheckCircle size={22} /> },
                ] as const).map(card => (
                    <div key={card.key} className={`rounded-2xl border-l-4 p-5 ${card.color} flex items-center gap-4`}>
                        <div className={card.textColor}>{card.icon}</div>
                        <div>
                            <p className={`text-3xl font-[900] ${card.textColor}`}>{counts[card.key]}</p>
                            <p className={`text-xs font-black uppercase tracking-widest ${card.textColor} opacity-70`}>{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main content: table + detail panel */}
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Enquiry Table */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
                        </div>
                    ) : enquiries.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Mail size={48} className="mb-4 opacity-30" />
                            <p className="font-black uppercase text-sm">No enquiries yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {enquiries.map(enq => (
                                <button
                                    key={enq.id}
                                    onClick={() => setSelected(enq)}
                                    className={`w-full text-left p-5 hover:bg-gray-50 transition-colors ${selected?.id === enq.id ? 'bg-gray-50 border-l-2 border-red-500' : ''}`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-[900] text-gray-900 text-sm uppercase tracking-wide truncate">{enq.name}</p>
                                            <p className="text-gray-500 text-xs font-medium truncate mt-0.5">{enq.email}</p>
                                            <p className="text-gray-400 text-xs mt-1 line-clamp-1">{enq.message}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${statusColors[enq.status]}`}>
                                                {statusIcons[enq.status]} {enq.status.replace('_', ' ')}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-medium">
                                                {new Date(enq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Detail Panel */}
                <div className="lg:col-span-2">
                    {selected ? (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5 sticky top-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-[900] text-gray-900 uppercase">{selected.name}</h3>
                                    <a href={`mailto:${selected.email}`} className="text-sm text-purple-600 font-bold hover:underline">{selected.email}</a>
                                </div>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${statusColors[selected.status]}`}>
                                    {statusIcons[selected.status]} {selected.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inquiry Type</p>
                                <p className="text-sm font-bold text-gray-700 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">{selected.inquiryType}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Message</p>
                                <p className="text-sm text-gray-700 bg-gray-50 px-4 py-4 rounded-xl border border-gray-100 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Received</p>
                                <p className="text-sm font-bold text-gray-700">
                                    <Clock size={13} className="inline mr-1 text-gray-400" />
                                    {new Date(selected.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Update Status</p>
                                <div className="flex gap-2">
                                    {(['NEW', 'IN_PROGRESS', 'RESOLVED'] as EnquiryStatus[]).map(s => (
                                        <button
                                            key={s}
                                            disabled={updating || selected.status === s}
                                            onClick={() => handleStatusChange(selected.id, s)}
                                            className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all
                                                ${selected.status === s
                                                    ? 'bg-gray-900 text-white border-gray-900'
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900'}
                                                disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {s.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-20 text-gray-300">
                            <Mail size={40} className="mb-3" />
                            <p className="text-sm font-black uppercase tracking-wide">Select an enquiry</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
