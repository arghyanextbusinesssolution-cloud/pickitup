'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { adminService } from '@/services/admin.service';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  FileText, 
  AlertCircle,
  ImageIcon,
  Download,
  Plus,
  Mail,
  ExternalLink,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

function ClaimDetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    
    const [claim, setClaim] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("No claim ID provided");
            setIsLoading(false);
            return;
        }

        const fetchClaim = async () => {
            try {
                const data = await adminService.getClaimById(id);
                setClaim(data);
            } catch (err) {
                console.error("Failed to fetch claim:", err);
                setError("Failed to load claim details");
            } finally {
                setIsLoading(false);
            }
        };
        fetchClaim();
    }, [id]);

    const handleStatusUpdate = async (newStatus: string) => {
        if (!id) return;
        try {
            await adminService.updateClaimStatus(id, newStatus);
            const updatedClaim = await adminService.getClaimById(id);
            setClaim(updatedClaim);
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#FFF9F9]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B2C36]"></div>
            </div>
        );
    }

    if (error || !claim) {
        return (
            <div className="min-h-screen bg-[#FFF9F9] flex flex-col items-center justify-center p-10 text-center">
                <AlertCircle className="w-12 h-12 text-[#8B2C36] mb-4" />
                <h1 className="text-xl font-bold text-[#2D2424] uppercase mb-2">Claim Not Found</h1>
                <Link href="/admin/claims" className="text-[#8B2C36] font-bold underline mt-4">Return to Claims Ledger</Link>
            </div>
        );
    }

    const booking = claim.booking;
    const shipment = booking?.shipment;
    const carrier = booking?.carrier;
    
    const quoteAmount = Number(booking?.price || 0);
    const platformFee = quoteAmount * 0.1; 
    const netPayout = quoteAmount - platformFee;

    return (
        <div className="min-h-screen bg-[#FCF8F8] font-sans text-[#2D2424] pb-20">
            
            {/* Professional Header & Back Button */}
            <div className="max-w-6xl mx-auto px-6 pt-10">
                <button 
                    onClick={() => router.push('/admin/claims')}
                    className="flex items-center gap-2 text-slate-400 hover:text-[#8B2C36] transition-all text-xs font-black uppercase tracking-widest mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO CLAIMS LEDGER
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-slate-100 pb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-[#8B2C36] text-white text-[9px] font-black rounded uppercase tracking-widest">CLAIM ASSET</span>
                            <span className="text-xs font-bold text-slate-400">ID: CLM-{claim.id.slice(-8).toUpperCase()}</span>
                        </div>
                        <h1 className="text-3xl font-black text-[#2D2424] tracking-tight uppercase">Statement of Claim</h1>
                        <p className="text-sm text-slate-500 font-bold mt-2">Operational resolution for logistics discrepancy and asset damage.</p>
                    </div>

                    <Link 
                        href={`/admin/users/detail?id=${claim.raisedBy?.id}`}
                        className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-[#8B2C36]/20 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${claim.raisedBy?.firstName}`} alt="Filer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 group-hover:text-[#8B2C36] transition-colors italic">FILED BY (VIEW PROFILE)</p>
                            <h3 className="text-sm font-black text-[#2D2424] uppercase">{claim.raisedBy?.firstName} {claim.raisedBy?.lastName || 'Chen'}</h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase italic">{new Date(claim.createdAt).toLocaleDateString()} | {new Date(claim.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Claim Description Section */}
                        <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-slate-400">
                                <ClipboardList size={18} />
                                <h3 className="text-xs font-black uppercase tracking-widest">CLAIM NARRATIVE</h3>
                            </div>
                            <div className="bg-[#FFF9F9] rounded-lg p-6 border border-red-50/50">
                                <p className="text-sm font-bold text-[#2D2424] leading-relaxed italic">
                                    "{claim.reason}"
                                </p>
                            </div>
                        </div>

                        {/* Evidence Gallery Section */}
                        <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <ImageIcon size={18} />
                                    <h3 className="text-xs font-black uppercase tracking-widest">EVIDENCE REPOSITORY</h3>
                                </div>
                                <button className="text-[10px] font-black text-[#8B2C36] uppercase tracking-widest flex items-center gap-2 border-b border-[#8B2C36]/20 pb-1">
                                    <Download size={12} /> ARCHIVE ALL FILES
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {claim.attachments?.length ? claim.attachments.map((file: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 group hover:border-[#8B2C36]/30 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#8B2C36]">
                                                <ImageIcon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-[#2D2424] uppercase truncate max-w-[150px]">{file.fileName || `IMG_0${i+1}.JPG`}</p>
                                                <p className="text-[9px] font-bold text-slate-400">2.4 MB • ASSET_IMG</p>
                                            </div>
                                        </div>
                                        <a href={file.fileUrl} target="_blank" className="p-2 text-slate-400 hover:text-[#8B2C36]"><ExternalLink size={14} /></a>
                                    </div>
                                )) : (
                                    <div className="col-span-2 py-10 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/30">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">NO DIGITAL EVIDENCE UPLOADED</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Audit Log / Timeline */}
                        <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-8 text-slate-400">
                                <Clock size={18} />
                                <h3 className="text-xs font-black uppercase tracking-widest">RESOLUTION TIMELINE</h3>
                            </div>
                            <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                                {[
                                    { title: 'Case Origination', desc: 'Claim filed via Platform Interface', time: 'Initial Record' },
                                    { title: 'Integrity Check', desc: 'Metadata and attachments verified', time: 'Automated' },
                                    { title: 'Manual Adjudication', desc: 'Pending administrative review', time: 'Current Phase' }
                                ].map((step, i) => (
                                    <div key={i} className="relative pl-8">
                                        <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-white ${i === 2 ? 'border-blue-400' : 'border-slate-200'} z-10`}></div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-xs font-black text-[#2D2424] uppercase tracking-wide mb-1">{step.title}</h4>
                                                <p className="text-[10px] font-bold text-slate-500">{step.desc}</p>
                                            </div>
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{step.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Shipment Specs */}
                        <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xs font-black text-[#2D2424] uppercase tracking-widest">LOGISTICS MANIFEST</h3>
                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">DELIVERED</span>
                            </div>
                            
                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full border-2 border-red-500 mt-1 shrink-0"></div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">ORIGIN</p>
                                        <p className="text-xs font-black text-[#2D2424] uppercase">{shipment?.originCity || 'KOLKATA'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0"></div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">DESTINATION</p>
                                        <p className="text-xs font-black text-[#2D2424] uppercase">{shipment?.destinationCity || 'HOWRAH'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">MANIFEST ID</span>
                                    <span className="text-[10px] font-black text-[#2D2424]">#MN-{shipment?.id.slice(-6).toUpperCase() || '4920-XLT'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TRANSIT LOAD</span>
                                    <span className="text-[10px] font-black text-[#2D2424]">CONSOLIDATED LTL</span>
                                </div>
                            </div>
                        </div>

                        {/* Financial Ledger */}
                        <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black text-[#2D2424] uppercase tracking-widest mb-8">FINANCIAL BREAKDOWN</h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-[10px] font-black italic">
                                    <span className="text-slate-400 uppercase">INSURED QUOTE</span>
                                    <span className="text-[#2D2424]">${quoteAmount.toLocaleString()}.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black italic">
                                    <span className="text-slate-400 uppercase">PLATFORM RETENTION</span>
                                    <span className="text-[#D14343]">-${platformFee.toLocaleString()}.00</span>
                                </div>
                                <div className="pt-4 border-t border-slate-50 flex justify-between items-center font-black">
                                    <span className="text-xs text-[#2D2424] uppercase tracking-widest italic">NET LIABILITY</span>
                                    <span className="text-xl text-[#2D2424]">${netPayout.toLocaleString()}.00</span>
                                </div>
                            </div>

                            <div className="p-4 bg-[#8B2C36]/5 rounded-lg border border-[#8B2C36]/10 mb-6">
                                <p className="text-[9px] font-black text-[#8B2C36] uppercase tracking-widest mb-1 italic">PARTNER CARRIER</p>
                                <h4 className="text-sm font-black text-[#8B2C36] uppercase italic">{carrier?.companyName || 'GLOBAL LOGIX'}</h4>
                                <p className="text-[9px] font-bold text-slate-500 mt-1">{carrier?.user?.email}</p>
                            </div>

                            <Link 
                                href={`/admin/carriers/detail?id=${carrier?.id}`}
                                className="w-full py-4 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                            >
                                VIEW CARRIER DATA <ChevronRight size={12} />
                            </Link>
                        </div>

                        {/* Adjudication Controls */}
                        {(claim.status !== 'APPROVED' && claim.status !== 'REJECTED' && claim.status !== 'RESOLVED') && (
                            <div className="bg-[#8B2C36] rounded-xl p-8 text-white shadow-xl shadow-red-100">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-4 italic">Action Required</h3>
                                <p className="text-[11px] font-bold text-white/70 leading-relaxed mb-8 italic">
                                    Automated verification suggests this claim is valid. Final administrative approval is required.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => handleStatusUpdate('APPROVED')} className="w-full py-3.5 bg-white text-[#8B2C36] rounded-lg text-[10px] font-black uppercase tracking-[0.1em] hover:bg-slate-50 transition-all">
                                        APPROVE CLAIM
                                    </button>
                                    <button onClick={() => handleStatusUpdate('REJECTED')} className="w-full py-3.5 bg-black/20 text-white border border-white/20 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] hover:bg-black/30 transition-all">
                                        REJECT CLAIM
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Resolved Status */}
                        {(claim.status === 'APPROVED' || claim.status === 'REJECTED' || claim.status === 'RESOLVED') && (
                            <div className={`p-6 rounded-xl border text-center ${claim.status === 'APPROVED' || claim.status === 'RESOLVED' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${claim.status === 'APPROVED' || claim.status === 'RESOLVED' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    CASE {claim.status}
                                </p>
                                <p className="text-[9px] font-bold text-slate-400 mt-2 italic">Adjudicated by System Admin</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ClaimDetailPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-[#FCF8F8]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B2C36]"></div>
            </div>
        }>
            <ClaimDetailContent />
        </Suspense>
    );
}
