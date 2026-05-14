'use client';

import React, { useState } from 'react';
import { adminService } from '../../../../services/admin.service';
import { Trash2, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AdminSettingsPage() {
    const [wiping, setWiping] = useState(false);
    const [wipeStatus, setWipeStatus] = useState<'idle' | 'confirm' | 'success' | 'error'>('idle');
    const [wipeError, setWipeError] = useState('');
    const [typedConfirm, setTypedConfirm] = useState('');

    const CONFIRM_PHRASE = 'DELETE ALL DATA';

    const handleWipe = async () => {
        if (typedConfirm !== CONFIRM_PHRASE) return;
        setWiping(true);
        setWipeError('');
        try {
            await adminService.wipeDatabase();
            setWipeStatus('success');
        } catch (err: any) {
            setWipeError(err?.response?.data?.error || 'Wipe failed. Check server logs.');
            setWipeStatus('error');
        } finally {
            setWiping(false);
            setTypedConfirm('');
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF9F9] p-6 lg:p-10 font-sans text-[#2D2424] max-w-5xl mx-auto">
            <h1 className="text-3xl font-[1000] text-[#2D2424] uppercase tracking-tight italic mb-10">
                System Configuration
            </h1>

            {/* Platform Fees */}
            <div className="bg-white border border-slate-100 shadow-sm mb-8">
                <div className="p-8 border-b border-slate-100">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Platform Fees & Rules</h2>
                    <form className="space-y-6 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Standard Booking Fee (%)</label>
                                <input
                                    type="number"
                                    defaultValue="10.0"
                                    className="block w-full border border-slate-200 px-4 py-3 text-sm font-bold text-[#2D2424] focus:outline-none focus:border-[#8B2C36] transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Escrow Release Delay (Days)</label>
                                <input
                                    type="number"
                                    defaultValue="3"
                                    className="block w-full border border-slate-200 px-4 py-3 text-sm font-bold text-[#2D2424] focus:outline-none focus:border-[#8B2C36] transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="auto_approve" className="w-4 h-4 border border-slate-300" defaultChecked />
                            <label htmlFor="auto_approve" className="text-xs font-bold text-slate-600">Auto-approve Carrier verify applications</label>
                        </div>
                        <button type="button" className="px-8 py-3 bg-[#2D2424] text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                            Apply Core Settings
                        </button>
                    </form>
                </div>

                {/* Emergency Protocols */}
                <div className="p-8 bg-amber-50 border-b border-amber-100">
                    <h2 className="text-xs font-black text-amber-900 uppercase tracking-[0.2em] mb-2">Emergency Protocols</h2>
                    <p className="text-[11px] font-bold text-amber-700 mb-6">These actions affect the entire marketplace immediately.</p>
                    <div className="flex flex-wrap gap-3">
                        <button type="button" className="border border-amber-300 bg-white text-amber-700 font-black px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-amber-100 transition-all">
                            Halt All Withdrawals
                        </button>
                        <button type="button" className="bg-amber-600 hover:bg-amber-700 text-white font-black px-6 py-3 text-[10px] uppercase tracking-widest transition-all">
                            Enable Maintenance Mode
                        </button>
                    </div>
                </div>

                {/* DANGER ZONE — WIPE DATABASE */}
                <div className="p-8 bg-red-950">
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldAlert className="text-red-400" size={20} />
                        <h2 className="text-xs font-black text-red-300 uppercase tracking-[0.2em]">Danger Zone — Irreversible Actions</h2>
                    </div>
                    <p className="text-[11px] font-bold text-red-400/70 mb-8 max-w-2xl">
                        The following actions permanently delete ALL data from the database including users, shipments, bookings, claims, and all associated records. This cannot be undone.
                    </p>

                    {wipeStatus === 'success' ? (
                        <div className="flex items-center gap-3 px-6 py-4 bg-emerald-900/40 border border-emerald-700/40">
                            <CheckCircle size={18} className="text-emerald-400" />
                            <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">Database wiped successfully. All data has been deleted.</p>
                        </div>
                    ) : wipeStatus === 'confirm' ? (
                        <div className="space-y-4 max-w-lg">
                            <div className="flex items-start gap-3 px-4 py-4 bg-red-900/40 border border-red-700/40">
                                <AlertTriangle size={16} className="text-red-400 mt-0.5 shrink-0" />
                                <p className="text-[10px] font-bold text-red-300 leading-relaxed">
                                    You are about to permanently delete <strong className="text-white">ALL data</strong> from the production database.
                                    Type <span className="font-black text-red-200 bg-red-900 px-1">{CONFIRM_PHRASE}</span> below to confirm.
                                </p>
                            </div>
                            <input
                                type="text"
                                value={typedConfirm}
                                onChange={(e) => setTypedConfirm(e.target.value)}
                                placeholder={`Type "${CONFIRM_PHRASE}" to confirm`}
                                className="w-full bg-red-900/30 border border-red-700/50 text-red-200 placeholder:text-red-700 px-4 py-3 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-red-500"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={handleWipe}
                                    disabled={typedConfirm !== CONFIRM_PHRASE || wiping}
                                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    <Trash2 size={14} />
                                    {wiping ? 'Wiping...' : 'Confirm Wipe All Data'}
                                </button>
                                <button
                                    onClick={() => { setWipeStatus('idle'); setTypedConfirm(''); }}
                                    className="px-6 py-3 bg-transparent border border-red-800 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-900/40 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                            {wipeError && (
                                <p className="text-[10px] font-bold text-red-400">{wipeError}</p>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setWipeStatus('confirm')}
                            className="flex items-center gap-2 px-6 py-3 bg-transparent border border-red-700/50 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-900/30 hover:border-red-600 transition-all group"
                        >
                            <Trash2 size={14} className="group-hover:animate-pulse" />
                            Wipe Entire Database
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
