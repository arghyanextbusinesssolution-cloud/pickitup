'use client';

import React, { useState } from 'react';
import { X, Upload, Send, AlertCircle, ImageIcon, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface ClaimFormModalProps {
    bookingId: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function ClaimFormModal({ bookingId, onClose, onSuccess }: ClaimFormModalProps) {
    const [reason, setReason] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setIsUploading(true);
        setError('');

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('photos', file);
        });

        try {
            // Using the existing upload endpoint
            const response = await api.post('/uploads/photos', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setPhotos(prev => [...prev, ...response.data.urls]);
        } catch (err) {
            console.error("Upload failed", err);
            setError('Failed to upload photos. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) {
            setError('Please provide a reason for the claim.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await api.post('/claims', {
                bookingId,
                reason,
                photos
            });
            onSuccess();
        } catch (err: any) {
            console.error("Claim submission failed", err);
            setError(err.response?.data?.error || 'Failed to submit claim.');
            setIsSubmitting(false);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-8 md:p-10 animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
                
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">Insurance Claim</h2>
                        <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-widest">Post-Delivery Dispute Resolution</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold flex items-center gap-2">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                            Reason for Claim / Damage Description
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-medium focus:border-red-500 focus:ring-0 transition-all min-h-[120px]"
                            placeholder="Please describe exactly what happened or list the damages..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                            Photo Evidence (Required for verification)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                            {photos.map((url, idx) => (
                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group">
                                    <img src={url} alt="Evidence" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(idx)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            
                            <label className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-red-50 hover:border-red-200 transition-all">
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={isUploading} />
                                {isUploading ? (
                                    <Loader2 className="animate-spin text-red-500" />
                                ) : (
                                    <>
                                        <Upload className="text-gray-400 mb-2" size={24} />
                                        <span className="text-[10px] font-black text-gray-400 uppercase">Upload</span>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                        <AlertCircle className="text-blue-500 shrink-0" size={20} />
                        <p className="text-xs text-blue-700 font-medium leading-relaxed">
                            By submitting this claim, you authorize pickItUp to hold any pending payouts to the carrier until the investigation is complete.
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-4 rounded-xl transition-all uppercase tracking-wide text-sm"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || isUploading || !reason.trim()}
                            className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-[900] px-6 py-4 rounded-xl transition-all uppercase tracking-wide text-sm shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <><Send size={18} /> Submit Claim</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
