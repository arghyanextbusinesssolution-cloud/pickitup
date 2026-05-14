'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Truck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Image as ImageIcon,
  DollarSign,
  ShieldCheck,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function AdminClaimDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [claim, setClaim] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClaim = async () => {
            try {
                const data = await adminService.getClaimById(id as string);
                setClaim(data);
            } catch (error) {
                console.error("Failed to fetch claim:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClaim();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!claim) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Claim not found</h1>
                <Link href="/admin/claims" className="text-blue-600 hover:underline mt-4 inline-block">Back to claims</Link>
            </div>
        );
    }

    const booking = claim.booking;
    const shipment = booking?.shipment;
    const carrier = booking?.carrier;
    const shipper = shipment?.owner;
    const payment = booking?.payments?.[0]; // Assuming first payment is the main one

    // Pricing calculation
    const totalCharge = parseFloat(payment?.amount || booking?.price || "0");
    const commissionRate = 0.15; // 15% platform fee
    const platformFee = totalCharge * commissionRate;
    const netToCarrier = totalCharge - platformFee;

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            await adminService.updateClaimStatus(id as string, newStatus);
            // Refresh claim data
            const updatedClaim = await adminService.getClaimById(id as string);
            setClaim(updatedClaim);
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update claim status");
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                                Insurance Claim
                            </span>
                            <span className="text-sm font-bold text-gray-400">
                                #{claim.id.substring(0, 8).toUpperCase()}
                            </span>
                        </div>
                        <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">
                            Claim Resolution Center
                        </h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    {claim.status === 'OPEN' && (
                        <button 
                            onClick={() => handleStatusUpdate('UNDER_REVIEW')}
                            className="bg-white border-2 border-yellow-200 hover:border-yellow-500 text-yellow-700 font-bold px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2"
                        >
                            <Clock size={18} /> Mark Under Review
                        </button>
                    )}
                    {claim.status !== 'RESOLVED' && (
                        <button 
                            onClick={() => handleStatusUpdate('RESOLVED')}
                            className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2"
                        >
                            <CheckCircle2 size={18} /> Resolve Case
                        </button>
                    )}
                    {claim.status === 'RESOLVED' && (
                        <div className="bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg">
                            <ShieldCheck size={18} /> Case Resolved
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Claim Details Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Claim Reason</h3>
                                <p className="text-xl font-bold text-gray-900">{claim.reason}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Status</h3>
                                <span className="inline-flex px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-widest border border-red-100">
                                    {claim.status}
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <ImageIcon size={14} /> Evidence Photos ({claim.attachments?.length || 0})
                            </h3>
                            {claim.attachments?.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {claim.attachments.map((att: any, idx: number) => (
                                        <div key={idx} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group relative">
                                            <img 
                                                src={att.fileUrl} 
                                                alt={`Evidence ${idx + 1}`} 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                <button className="bg-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                                                    <ImageIcon size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2rem] p-12 text-center">
                                    <p className="text-gray-400 font-bold">No evidence photos provided.</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <FileText size={14} /> Case Timeline
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                            <AlertCircle size={16} />
                                        </div>
                                        <div className="w-0.5 flex-1 bg-gray-100 my-1"></div>
                                    </div>
                                    <div className="pb-4">
                                        <p className="font-bold text-gray-900">Claim Filed by Shipper</p>
                                        <p className="text-xs text-gray-500">{new Date(claim.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logistics Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Truck size={14} /> Logistics Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-0 text-emerald-500">
                                    <MapPin size={24} />
                                </div>
                                <h4 className="text-xs font-black text-gray-400 uppercase mb-1">Pickup Point</h4>
                                <p className="text-lg font-bold text-gray-900">{shipment?.originCity || "Original Location"}</p>
                                <p className="text-sm text-gray-500 italic mt-1">{shipment?.originAddress || "Address details hidden"}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-0 text-red-500">
                                    <MapPin size={24} />
                                </div>
                                <h4 className="text-xs font-black text-gray-400 uppercase mb-1">Destination Point</h4>
                                <p className="text-lg font-bold text-gray-900">{shipment?.destinationCity || "Delivery Location"}</p>
                                <p className="text-sm text-gray-500 italic mt-1">{shipment?.destinationAddress || "Address details hidden"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Financials Card */}
                    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 opacity-10">
                            <DollarSign size={160} />
                        </div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <ShieldCheck size={14} className="text-blue-400" /> Financial Audit
                        </h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Shipper Charge</span>
                                <span className="text-2xl font-[900]">${totalCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-400 text-sm font-bold">Platform Fee (15%)</span>
                                <span className="font-bold text-red-400">-${platformFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-white/20">
                                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Net to Carrier</span>
                                <span className="text-3xl font-[900] text-emerald-400">${netToCarrier.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Participants Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <User size={14} /> Participants
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-[900] text-gray-400">
                                    {shipper?.firstName?.[0]}{shipper?.lastName?.[0]}
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase mb-0.5">Shipper</h4>
                                    <p className="font-bold text-gray-900">{shipper?.firstName} {shipper?.lastName}</p>
                                    <p className="text-xs text-gray-500">{shipper?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-100 flex items-center justify-center font-[900] text-white">
                                    {carrier?.companyName?.[0]}
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase mb-0.5">Carrier</h4>
                                    <p className="font-bold text-gray-900">{carrier?.companyName}</p>
                                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Driver: {carrier?.user?.firstName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100">
                        <div className="flex gap-4">
                            <div className="bg-blue-500 text-white p-2 rounded-xl">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-900 mb-1 leading-tight">Response Time Target</h4>
                                <p className="text-xs text-blue-700 leading-relaxed font-medium">As part of our premium insurance program, we aim to resolve all claims within 72 hours of evidence submission.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

