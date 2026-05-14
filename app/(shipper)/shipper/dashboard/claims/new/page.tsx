'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { shipperService } from '@/services/shipper.service';
import { shipmentService } from '@/services/shipment.service';
import { 
    ArrowLeft, 
    ShieldCheck, 
    Truck, 
    AlertCircle, 
    Camera, 
    X, 
    CheckCircle2,
    Clock,
    ImageIcon
} from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';

export default function NewClaimPage() {
    const router = useRouter();
    const [eligibleBookings, setEligibleBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [selectedBookingId, setSelectedBookingId] = useState('');
    const [reason, setReason] = useState('');
    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchEligible = async () => {
            try {
                const data = await shipperService.getEligibleBookings();
                setEligibleBookings(data);
            } catch (err) {
                console.error("Failed to fetch eligible bookings:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEligible();
    }, []);

    const handlePhotoFiles = async (files: FileList | File[]) => {
        const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
        if (validFiles.length === 0) return;

        const newFiles = [...photoFiles, ...validFiles].slice(0, 10);
        const previews = newFiles.map(file => URL.createObjectURL(file));
        
        setPhotoPreviews(prev => {
            prev.forEach(url => URL.revokeObjectURL(url));
            return previews;
        });
        setPhotoFiles(newFiles);

        setIsUploading(true);
        setError(null);
        try {
            const urls = await shipmentService.uploadPhotos(newFiles);
            setPhotoUrls(urls);
        } catch (err: any) {
            console.error('Photo upload failed:', err);
            setError('Failed to upload photos. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const removePhoto = (index: number) => {
        const newFiles = photoFiles.filter((_, i) => i !== index);
        setPhotoFiles(newFiles);
        URL.revokeObjectURL(photoPreviews[index]);
        setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
        const newUrls = photoUrls.filter((_, i) => i !== index);
        setPhotoUrls(newUrls);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBookingId || !reason) {
            setError('Please select a shipment and provide a reason.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await shipperService.createClaim({
                bookingId: selectedBookingId,
                reason,
                photos: photoUrls
            });
            router.push('/shipper/dashboard/claims');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to submit claim.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight">File Insurance Claim</h1>
                    <p className="text-gray-500 font-medium">Report damage or issues with your completed shipment.</p>
                </div>
            </div>

            {eligibleBookings.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🛡️</div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase mb-2">No Eligible Shipments</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        Only completed shipments with active insurance coverage are eligible for claims. 
                        If your shipment was recently delivered, it may take a moment to appear here.
                    </p>
                    <Button onClick={() => router.push('/shipper/dashboard/claims')}>
                        Back to Claim Center
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Step 1: Select Shipment */}
                    <Card className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-black text-sm">1</div>
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Select Shipment</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {eligibleBookings.map((booking) => (
                                <label 
                                    key={booking.id}
                                    className={`relative flex items-center p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                                        selectedBookingId === booking.id 
                                        ? 'border-gray-900 bg-gray-50 ring-4 ring-gray-900/5' 
                                        : 'border-gray-100 hover:border-gray-200 bg-white'
                                    }`}
                                >
                                    <input 
                                        type="radio" 
                                        name="bookingId" 
                                        value={booking.id}
                                        checked={selectedBookingId === booking.id}
                                        onChange={() => setSelectedBookingId(booking.id)}
                                        className="hidden"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-black text-gray-900 text-lg uppercase">{booking.shipment.title}</h4>
                                            <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase tracking-widest">
                                                Insured
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1"><Truck size={14} /> {booking.carrier.companyName}</span>
                                            <span>•</span>
                                            <span>Delivered {new Date(booking.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    {selectedBookingId === booking.id && (
                                        <CheckCircle2 className="text-gray-900 ml-4" size={24} />
                                    )}
                                </label>
                            ))}
                        </div>
                    </Card>

                    {/* Step 2: Claim Details */}
                    <Card className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-black text-sm">2</div>
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Claim Details</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-2 block">Reason for Claim</label>
                                <textarea 
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Describe the damage or issue in detail..."
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-900 outline-none transition-all font-medium min-h-[120px]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">Evidence Photos ({photoPreviews.length}/10)</label>
                                
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {photoPreviews.map((url, i) => (
                                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm">
                                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => removePhoto(i)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {photoPreviews.length < 10 && (
                                        <button 
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploading}
                                            className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-gray-900 hover:bg-gray-50 transition-all group disabled:opacity-50"
                                        >
                                            {isUploading ? (
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                                            ) : (
                                                <>
                                                    <Camera className="text-gray-400 group-hover:text-gray-900" size={24} />
                                                    <span className="text-[10px] font-black text-gray-400 uppercase group-hover:text-gray-900 tracking-widest">Add Photo</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => e.target.files && handlePhotoFiles(e.target.files)}
                                />
                            </div>
                        </div>
                    </Card>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold rounded-r-xl flex items-center gap-3 animate-in shake duration-500">
                            <AlertCircle size={20} /> {error}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Button 
                            type="button" 
                            variant="secondary" 
                            onClick={() => router.back()}
                            className="flex-1 py-4"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isSubmitting || isUploading || !selectedBookingId || !reason}
                            className="flex-[2] py-4 shadow-xl"
                        >
                            {isSubmitting ? 'Submitting Claim...' : 'Submit Insurance Claim'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
