'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Input, Card } from '../ui';
import { shipmentService } from '../../services/shipment.service';
import { useRouter } from 'next/navigation';

// --- CATEGORY → SUBCATEGORY MAP ---
const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {
    'Home Moving': ['Studio Apartment', 'Living Room', 'Bedroom Set', 'Kitchen Items', 'Full House', 'Office Furniture'],
    'Vehicles': ['Car', 'Motorcycle', 'Boat', 'ATV/Quad', 'Bicycle', 'Parts & Accessories'],
    'Heavy Equipment': ['Construction', 'Agricultural', 'Industrial', 'Generators', 'Machinery'],
    'General Goods': ['Clothing', 'Electronics', 'Appliances', 'Sporting Goods', 'Tools', 'Other'],
    'Fragile Items': ['Glassware', 'Artwork', 'Antiques', 'Musical Instruments', 'Electronics'],
    'Parcel': ['Documents', 'Small Package', 'Medium Package', 'Large Package', 'Envelope', 'Pallet'],
};

const TOTAL_STEPS = 6;
const STEP_LABELS = ['Locations', 'Details', 'Photos', 'Load', 'Logistics', 'Strategy'];

// --- STEP INDICATOR ---
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    return (
        <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
                <div
                    key={step}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${currentStep >= step
                            ? 'bg-red-500 border-red-500 text-white scale-110 shadow-lg'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}
                    title={STEP_LABELS[step - 1]}
                >
                    {step}
                </div>
            ))}
        </div>
    );
};

// --- NOMINATIM SUGGESTION TYPE ---
interface NominatimResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    address: {
        city?: string;
        town?: string;
        village?: string;
        county?: string;
        state?: string;
        country?: string;
        postcode?: string;
    };
}

// --- NOMINATIM AUTOCOMPLETE HOOK ---
function useNominatimAutocomplete() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const search = useCallback((value: string) => {
        setQuery(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!value || value.length < 3) {
            setSuggestions([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setIsLoading(true);
            try {
                const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1&limit=6`;
                const res = await fetch(url, {
                    headers: { 'Accept-Language': 'en' }
                });
                const data: NominatimResult[] = await res.json();
                setSuggestions(data);
            } catch {
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 350);
    }, []);

    const clear = useCallback(() => {
        setSuggestions([]);
        if (debounceRef.current) clearTimeout(debounceRef.current);
    }, []);

    return { query, setQuery, suggestions, isLoading, search, clear };
}

// --- HAVERSINE DISTANCE ---
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3958.8; // miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// --- ADDRESS AUTOCOMPLETE INPUT ---
interface AddressInputProps {
    label: string;
    placeholder: string;
    value: string;
    onSelect: (result: NominatimResult) => void;
    onChange: (val: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ label, placeholder, value, onSelect, onChange }) => {
    const { query, setQuery, suggestions, isLoading, search, clear } = useNominatimAutocomplete();
    const [focused, setFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync external value changes (e.g. on clear)
    useEffect(() => {
        if (!value) setQuery('');
    }, [value]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                clear();
                setFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [clear]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        onChange(val);
        search(val);
    };

    const handleSelect = (result: NominatimResult) => {
        setQuery(result.display_name);
        clear();
        setFocused(false);
        onSelect(result);
    };

    const showDropdown = focused && (suggestions.length > 0 || isLoading) && query.length >= 3;

    return (
        <div ref={containerRef} className="relative">
            <label className="text-xs font-black uppercase text-gray-500 mb-2 block tracking-widest">{label}</label>
            <div className="relative">
                <input
                    value={query || value}
                    onChange={handleChange}
                    onFocus={() => setFocused(true)}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-sm font-medium"
                />
                {isLoading && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="animate-spin h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    </span>
                )}
                {!isLoading && query && (
                    <button
                        type="button"
                        onClick={() => { setQuery(''); onChange(''); clear(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
                        aria-label="Clear"
                    >×</button>
                )}
            </div>

            {showDropdown && (
                <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                    {isLoading && suggestions.length === 0 && (
                        <li className="px-4 py-3 text-sm text-gray-400 font-medium">Searching...</li>
                    )}
                    {suggestions.map((s) => (
                        <li
                            key={s.place_id}
                            onMouseDown={() => handleSelect(s)}
                            className="px-4 py-3 cursor-pointer hover:bg-red-50 transition-colors border-b border-gray-50 last:border-0"
                        >
                            <div className="text-sm font-semibold text-gray-800 truncate">
                                📍 {s.display_name.split(',')[0]}
                            </div>
                            <div className="text-xs text-gray-400 truncate mt-0.5">
                                {s.display_name.split(',').slice(1).join(',').trim()}
                            </div>
                        </li>
                    ))}
                    <li className="px-4 py-2 text-[10px] text-gray-400 font-medium text-right bg-gray-50">
                        © OpenStreetMap contributors
                    </li>
                </ul>
            )}
        </div>
    );
};

// ===================== MAIN FORM =====================

export const ShipmentForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<any>({
        // Locations
        originAddress: '',
        originLatitude: 0,
        originLongitude: 0,
        originPlaceId: '',
        originCity: '',
        originState: '',
        originCountry: '',
        originPostalCode: '',

        destinationAddress: '',
        destinationLatitude: 0,
        destinationLongitude: 0,
        destinationPlaceId: '',
        destinationCity: '',
        destinationState: '',
        destinationCountry: '',
        destinationPostalCode: '',

        // Details
        title: '',
        description: '',
        category: 'General Goods',
        subcategory: '',

        // Photos
        photoUrls: [] as string[],

        // Size & Weight
        weight: '',
        weightUnit: 'kg',
        length: '',
        width: '',
        height: '',
        dimensionUnit: 'cm',

        // Logistics
        pickupType: 'RESIDENTIAL',
        deliveryType: 'RESIDENTIAL',
        hasElevatorPickup: false,
        hasElevatorDelivery: false,
        pickupFloor: '0',
        deliveryFloor: '0',
        pickupNotes: '',
        deliveryNotes: '',

        // Strategy
        budgetMin: '',
        budgetMax: '',
        isFlexiblePickup: false,
        isFlexibleDelivery: false,

        distanceMiles: '',
        estimatedTimeMin: '',
    });

    // --- PHOTO UPLOAD STATE ---
    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoFiles = async (files: FileList | File[]) => {
        const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
        if (validFiles.length === 0) return;

        const newFiles = [...photoFiles, ...validFiles].slice(0, 10); // max 10 photos

        // Generate local previews immediately
        const previews = newFiles.map(file => URL.createObjectURL(file));
        setPhotoPreviews(prev => {
            prev.forEach(url => URL.revokeObjectURL(url));
            return previews;
        });
        setPhotoFiles(newFiles);

        // Upload to Cloudinary via backend API
        setIsUploading(true);
        setError(null);
        try {
            const urls = await shipmentService.uploadPhotos(newFiles);
            setFormData((prev: any) => ({ ...prev, photoUrls: urls }));
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
        setFormData((prev: any) => ({
            ...prev,
            photoUrls: prev.photoUrls.filter((_: string, i: number) => i !== index)
        }));

        // Re-upload remaining files to keep URLs in sync
        if (newFiles.length > 0) {
            setIsUploading(true);
            shipmentService.uploadPhotos(newFiles)
                .then(urls => setFormData((prev: any) => ({ ...prev, photoUrls: urls })))
                .catch(() => { })
                .finally(() => setIsUploading(false));
        } else {
            setFormData((prev: any) => ({ ...prev, photoUrls: [] }));
        }
    };

    // --- AUTO-CALCULATE DISTANCE via Haversine when both coords are set ---
    useEffect(() => {
        if (
            formData.originLatitude &&
            formData.originLongitude &&
            formData.destinationLatitude &&
            formData.destinationLongitude
        ) {
            const dist = haversineDistance(
                formData.originLatitude,
                formData.originLongitude,
                formData.destinationLatitude,
                formData.destinationLongitude
            );
            // Rough estimate: avg speed 40 mph on road with 1.3x factor
            const estimatedMin = Math.ceil((dist * 1.3) / 40 * 60);
            setFormData((prev: any) => ({
                ...prev,
                distanceMiles: dist.toFixed(2),
                estimatedTimeMin: estimatedMin,
            }));
        }
    }, [formData.originLatitude, formData.originLongitude, formData.destinationLatitude, formData.destinationLongitude]);

    // --- HANDLERS ---
    const handleOriginSelect = (result: NominatimResult) => {
        const addr = result.address;
        setFormData((prev: any) => ({
            ...prev,
            originAddress: result.display_name,
            originLatitude: parseFloat(result.lat),
            originLongitude: parseFloat(result.lon),
            originPlaceId: String(result.place_id),
            originCity: addr.city || addr.town || addr.village || addr.county || '',
            originState: addr.state || '',
            originCountry: addr.country || '',
            originPostalCode: addr.postcode || '',
        }));
    };

    const handleDestSelect = (result: NominatimResult) => {
        const addr = result.address;
        setFormData((prev: any) => ({
            ...prev,
            destinationAddress: result.display_name,
            destinationLatitude: parseFloat(result.lat),
            destinationLongitude: parseFloat(result.lon),
            destinationPlaceId: String(result.place_id),
            destinationCity: addr.city || addr.town || addr.village || addr.county || '',
            destinationState: addr.state || '',
            destinationCountry: addr.country || '',
            destinationPostalCode: addr.postcode || '',
        }));
    };

    // --- NAVIGATION ---
    const nextStep = () => {
        if (step === 1) {
            if (!formData.originAddress || !formData.destinationAddress) {
                setError('Please select both Pickup and Drop-off locations from the suggestions.');
                return;
            }
            if (!formData.originLatitude || !formData.destinationLatitude) {
                setError('Please choose a location from the dropdown to continue.');
                return;
            }
        }
        if (step === 2) {
            if (!formData.title || formData.title.length < 3) {
                setError('Please enter a shipment title (at least 3 characters).');
                return;
            }
        }
        setError(null);
        setStep(step + 1);
    };
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isUploading) {
                throw new Error('Please wait for photos to finish uploading.');
            }

            if (parseFloat(formData.budgetMin) > parseFloat(formData.budgetMax)) {
                throw new Error('Minimum budget cannot exceed maximum budget.');
            }

            const payload = {
                ...formData,
                // photoUrls already contains Cloudinary URLs from upload step
                weight: formData.weight ? parseFloat(formData.weight) : undefined,
                length: formData.length ? parseFloat(formData.length) : undefined,
                width: formData.width ? parseFloat(formData.width) : undefined,
                height: formData.height ? parseFloat(formData.height) : undefined,
                budgetMin: formData.budgetMin ? parseFloat(formData.budgetMin) : undefined,
                budgetMax: formData.budgetMax ? parseFloat(formData.budgetMax) : undefined,
                pickupFloor: parseInt(formData.pickupFloor),
                deliveryFloor: parseInt(formData.deliveryFloor),
                distanceMiles: formData.distanceMiles ? parseFloat(formData.distanceMiles) : undefined,
            };

            await shipmentService.create(payload);
            router.push('/shipper/dashboard/shipments');
            if (onSuccess) onSuccess();
        } catch (err: any) {
            console.error('Failed to create shipment', err);
            setError(err.response?.data?.error || err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <AddressInput
                            label="🧭 Origin (Pickup)"
                            placeholder="Start typing your pickup address..."
                            value={formData.originAddress}
                            onChange={(val) => setFormData((p: any) => ({ ...p, originAddress: val, originLatitude: 0, originLongitude: 0 }))}
                            onSelect={handleOriginSelect}
                        />

                        <AddressInput
                            label="🏁 Destination (Drop-off)"
                            placeholder="Start typing your drop-off address..."
                            value={formData.destinationAddress}
                            onChange={(val) => setFormData((p: any) => ({ ...p, destinationAddress: val, destinationLatitude: 0, destinationLongitude: 0 }))}
                            onSelect={handleDestSelect}
                        />

                        {formData.distanceMiles && (
                            <div className="p-4 bg-gray-900 rounded-2xl animate-in zoom-in-95 duration-500 shadow-2xl border border-gray-800">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Route Distance</span>
                                        <span className="text-xl font-black text-white">{formData.distanceMiles} <span className="text-red-500 italic">miles</span></span>
                                    </div>
                                    <div className="h-10 w-px bg-gray-800"></div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Est. Travel Time</span>
                                        <span className="text-xl font-black text-white">~{formData.estimatedTimeMin} <span className="text-red-500 italic">min</span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <Input
                            label="Shipment Title"
                            placeholder="e.g. 2 Bedroom Apartment Move"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Category</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 shadow-sm font-bold text-sm"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                                >
                                    {Object.keys(CATEGORY_SUBCATEGORIES).map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Subcategory</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 shadow-sm font-bold text-sm"
                                    value={formData.subcategory}
                                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                >
                                    <option value="">Select subcategory...</option>
                                    {(CATEGORY_SUBCATEGORIES[formData.category] || []).map((sub: string) => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Input
                            label="Description"
                            placeholder="Provide details about your items..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Drag & Drop Zone */}
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isUploading
                                    ? 'border-amber-400 bg-amber-50 cursor-wait'
                                    : isDragging
                                        ? 'border-red-500 bg-red-50 scale-[1.02] cursor-pointer'
                                        : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50/50 cursor-pointer'
                                }`}
                            onDragOver={(e) => { e.preventDefault(); if (!isUploading) setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                if (!isUploading && e.dataTransfer.files) handlePhotoFiles(e.dataTransfer.files);
                            }}
                            onClick={() => !isUploading && fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => e.target.files && handlePhotoFiles(e.target.files)}
                                disabled={isUploading}
                            />
                            <div className="flex flex-col items-center gap-3">
                                {isUploading ? (
                                    <>
                                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                                            <svg className="animate-spin h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-amber-700 uppercase tracking-wider">
                                                Uploading to cloud...
                                            </p>
                                            <p className="text-xs text-amber-500 mt-1">Please wait while your photos are being uploaded</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                            <span className="text-3xl">📸</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-700 uppercase tracking-wider">
                                                {isDragging ? 'Drop photos here!' : 'Drag & drop photos or click to browse'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Up to 10 images • JPG, PNG, WebP</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Photo Preview Grid */}
                        {photoPreviews.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {photoPreviews.map((url, i) => (
                                    <div key={i} className={`relative group aspect-square rounded-xl overflow-hidden border-2 shadow-sm ${isUploading ? 'border-amber-300 opacity-70' : 'border-gray-200'}`}>
                                        <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                                        {!isUploading && (
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full text-xs font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                                            <span className="text-[10px] text-white font-bold">{i + 1}/{photoPreviews.length}</span>
                                        </div>
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {photoPreviews.length > 0 && (
                            <div className="flex items-center justify-center gap-2">
                                {isUploading ? (
                                    <p className="text-xs text-amber-500 font-bold">⏳ Uploading {photoPreviews.length} photo{photoPreviews.length !== 1 ? 's' : ''}...</p>
                                ) : (
                                    <p className="text-xs text-green-600 font-bold">✅ {photoPreviews.length}/10 photo{photoPreviews.length !== 1 ? 's' : ''} uploaded</p>
                                )}
                            </div>
                        )}
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Total Weight"
                                type="number"
                                step="0.01"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            />
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Unit</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm"
                                    value={formData.weightUnit}
                                    onChange={(e) => setFormData({ ...formData, weightUnit: e.target.value })}
                                >
                                    <option>kg</option>
                                    <option>lbs</option>
                                    <option>tons</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Dimensions</label>
                                <select
                                    className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg font-bold text-xs"
                                    value={formData.dimensionUnit}
                                    onChange={(e) => setFormData({ ...formData, dimensionUnit: e.target.value })}
                                >
                                    <option value="cm">cm</option>
                                    <option value="in">in</option>
                                    <option value="m">m</option>
                                    <option value="ft">ft</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Length ({formData.dimensionUnit})</label>
                                    <input type="number" step="0.01" placeholder="0.00" value={formData.length} onChange={(e) => setFormData({ ...formData, length: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none shadow-sm font-bold text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Width ({formData.dimensionUnit})</label>
                                    <input type="number" step="0.01" placeholder="0.00" value={formData.width} onChange={(e) => setFormData({ ...formData, width: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none shadow-sm font-bold text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Height ({formData.dimensionUnit})</label>
                                    <input type="number" step="0.01" placeholder="0.00" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none shadow-sm font-bold text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Pickup Type</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm"
                                    value={formData.pickupType}
                                    onChange={(e) => setFormData({ ...formData, pickupType: e.target.value })}
                                >
                                    <option value="RESIDENTIAL">Residential</option>
                                    <option value="BUSINESS">Business</option>
                                    <option value="WAREHOUSE">Warehouse</option>
                                    <option value="PORT">Port</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-gray-500">Delivery Type</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm"
                                    value={formData.deliveryType}
                                    onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
                                >
                                    <option value="RESIDENTIAL">Residential</option>
                                    <option value="BUSINESS">Business</option>
                                    <option value="WAREHOUSE">Warehouse</option>
                                    <option value="PORT">Port</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <label className="flex items-center gap-3 cursor-pointer">
                                {/* <input type="checkbox" checked={formData.hasElevatorPickup} onChange={(e) => setFormData({ ...formData, hasElevatorPickup: e.target.checked })} className="w-5 h-5 accent-red-500" /> */}
                                {/* <span className="text-sm font-bold text-gray-700 uppercase tracking-tighter">Elevator at Pickup</span> */}
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                {/* <input type="checkbox" checked={formData.hasElevatorDelivery} onChange={(e) => setFormData({ ...formData, hasElevatorDelivery: e.target.checked })} className="w-5 h-5 accent-red-500" /> */}
                                {/* <span className="text-sm font-bold text-gray-700 uppercase tracking-tighter">Elevator at Drop</span> */}
                            </label>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Min Budget ($)"
                                type="number"
                                placeholder="0.00"
                                value={formData.budgetMin}
                                onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                            />
                            <Input
                                label="Max Budget ($)"
                                type="number"
                                placeholder="0.00"
                                value={formData.budgetMax}
                                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                            />
                        </div>
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-black text-red-600 uppercase tracking-widest">Flexible on Dates?</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isFlexiblePickup: !formData.isFlexiblePickup })}
                                    className={`w-14 h-8 rounded-full transition-colors relative ${formData.isFlexiblePickup ? 'bg-red-500' : 'bg-gray-300'}`}
                                >
                                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${formData.isFlexiblePickup ? 'translate-x-7' : 'translate-x-1'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <div className="p-2">
                <div className="mb-6">
                    <h2 className="text-2xl font-[1000] text-gray-900 tracking-tight leading-none uppercase italic underline decoration-red-500 decoration-4 underline-offset-8 mb-4">
                        Launch Shipment
                    </h2>
                    <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Step {step} of {TOTAL_STEPS} — {STEP_LABELS[step - 1]}</p>
                </div>

                <StepIndicator currentStep={step} />

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase tracking-widest rounded-r-xl flex items-center gap-3">
                        <span className="text-xl">⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                    {renderStep()}

                    <div className="flex gap-4 pt-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-8 py-4 border-2 border-gray-200 text-gray-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                            >
                                Back
                            </button>
                        )}

                        {step < TOTAL_STEPS ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Continue Path
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-[1000] uppercase text-sm tracking-[0.2em] shadow-2xl shadow-red-500/40 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    'Confirm & Notify Carriers ✨'
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Card>
    );
};
