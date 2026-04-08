'use client';

import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useLoadScript, Libraries } from '@react-google-maps/api';
import { Button, Input, Card } from '../ui';
import { shipmentService } from '../../services/shipment.service';
import { useRouter } from 'next/navigation';

// --- LOGO / STEP INDICATOR ---
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    return (
        <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
            {[1, 2, 3, 4, 5].map((step) => (
                <div 
                    key={step} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                        currentStep >= step 
                        ? 'bg-red-500 border-red-500 text-white scale-110 shadow-lg' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                >
                    {step}
                </div>
            ))}
        </div>
    );
};

const libraries: Libraries = ["places"];

export const ShipmentForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    // console.log("DEBUG: Maps API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
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
    });

    // --- GOOGLE MAPS LOADER ---
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries,
    });

    // --- GOOGLE AUTOCOMPLETE HOOKS ---
    const originAutocomplete = usePlacesAutocomplete({ 
        debounce: 300,
        initOnMount: isLoaded 
    });
    const destAutocomplete = usePlacesAutocomplete({ 
        debounce: 300,
        initOnMount: isLoaded
    });

    const handleOriginSelect = async (val: string) => {
        originAutocomplete.setValue(val, false);
        originAutocomplete.clearSuggestions();
        try {
            const results = await getGeocode({ address: val });
            const { lat, lng } = await getLatLng(results[0]);
            
            // Extract components
            const city = results[0].address_components.find(c => c.types.includes('locality'))?.long_name;
            const state = results[0].address_components.find(c => c.types.includes('administrative_area_level_1'))?.short_name;
            const country = results[0].address_components.find(c => c.types.includes('country'))?.long_name;
            const postalCode = results[0].address_components.find(c => c.types.includes('postal_code'))?.long_name;

            setFormData((prev: any) => ({
                ...prev,
                originAddress: val,
                originLatitude: lat,
                originLongitude: lng,
                originPlaceId: results[0].place_id,
                originCity: city || '',
                originState: state || '',
                originCountry: country || '',
                originPostalCode: postalCode || ''
            }));
        } catch (err) {
            console.error("Geocode failed", err);
        }
    };

    const handleDestSelect = async (val: string) => {
        destAutocomplete.setValue(val, false);
        destAutocomplete.clearSuggestions();
        try {
            const results = await getGeocode({ address: val });
            const { lat, lng } = await getLatLng(results[0]);
            
            const city = results[0].address_components.find(c => c.types.includes('locality'))?.long_name;
            const state = results[0].address_components.find(c => c.types.includes('administrative_area_level_1'))?.short_name;
            const country = results[0].address_components.find(c => c.types.includes('country'))?.long_name;
            const postalCode = results[0].address_components.find(c => c.types.includes('postal_code'))?.long_name;

            setFormData((prev: any) => ({
                ...prev,
                destinationAddress: val,
                destinationLatitude: lat,
                destinationLongitude: lng,
                destinationPlaceId: results[0].place_id,
                destinationCity: city || '',
                destinationState: state || '',
                destinationCountry: country || '',
                destinationPostalCode: postalCode || ''
            }));
        } catch (err) {
            console.error("Geocode failed", err);
        }
    };

    // --- DISTANCE CALCULATION ---
    useEffect(() => {
        if (formData.originLatitude && formData.destinationLatitude) {
            calculateDistance();
        }
    }, [formData.originLatitude, formData.destinationLatitude]);

    const calculateDistance = () => {
        if (!window.google) return;
        
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [{ lat: formData.originLatitude, lng: formData.originLongitude }],
            destinations: [{ lat: formData.destinationLatitude, lng: formData.destinationLongitude }],
            travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
            if (status === "OK" && response) {
                const element = response.rows[0].elements[0];
                if (element.status === "OK") {
                    setFormData((prev: any) => ({
                        ...prev,
                        distanceKm: (element.distance.value / 1000).toFixed(2),
                        estimatedTimeMin: Math.ceil(element.duration.value / 60)
                    }));
                }
            }
        });
    };

    // --- NAVIGATION ---
    const nextStep = () => {
        if (step === 1) {
            if (!formData.originPlaceId || !formData.destinationPlaceId) {
                setError("Please select both Pickup and Drop-off locations from the list.");
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
            // Business Logic: Final Check
            if (parseFloat(formData.budgetMin) > parseFloat(formData.budgetMax)) {
                throw new Error("Minimum budget cannot exceed maximum budget.");
            }

            const payload = {
                ...formData,
                weight: formData.weight ? parseFloat(formData.weight) : undefined,
                length: formData.length ? parseFloat(formData.length) : undefined,
                width: formData.width ? parseFloat(formData.width) : undefined,
                height: formData.height ? parseFloat(formData.height) : undefined,
                budgetMin: formData.budgetMin ? parseFloat(formData.budgetMin) : undefined,
                budgetMax: formData.budgetMax ? parseFloat(formData.budgetMax) : undefined,
                pickupFloor: parseInt(formData.pickupFloor),
                deliveryFloor: parseInt(formData.deliveryFloor),
                distanceKm: formData.distanceKm ? parseFloat(formData.distanceKm) : undefined,
            };

            await shipmentService.create(payload);
            router.push('/shipper/dashboard/shipments');
            if (onSuccess) onSuccess();
        } catch (err: any) {
            console.error('Failed to create shipment', err);
            setError(err.response?.data?.error || err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="relative">
                            <label className="text-xs font-black uppercase text-gray-500 mb-2 block tracking-widest">🧭 Origin (Pickup)</label>
                            <input
                                value={originAutocomplete.value}
                                onChange={(e) => originAutocomplete.setValue(e.target.value)}
                                disabled={!originAutocomplete.ready}
                                placeholder="Search pickup location..."
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-sm font-medium"
                            />
                            {originAutocomplete.suggestions.status === "OK" && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-2xl overflow-hidden py-2 grayscale-0">
                                    {originAutocomplete.suggestions.data.map(({ place_id, description }) => (
                                        <li 
                                            key={place_id} 
                                            onClick={() => handleOriginSelect(description)}
                                            className="px-4 py-3 hover:bg-red-50 cursor-pointer text-sm font-bold text-gray-700 transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            {description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative">
                            <label className="text-xs font-black uppercase text-gray-500 mb-2 block tracking-widest">🏁 Destination (Drop-off)</label>
                            <input
                                value={destAutocomplete.value}
                                onChange={(e) => destAutocomplete.setValue(e.target.value)}
                                disabled={!destAutocomplete.ready}
                                placeholder="Search drop-off location..."
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-sm font-medium"
                            />
                            {destAutocomplete.suggestions.status === "OK" && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl mt-2 shadow-2xl overflow-hidden py-2 shadow-gray-200/50">
                                    {destAutocomplete.suggestions.data.map(({ place_id, description }) => (
                                        <li 
                                            key={place_id} 
                                            onClick={() => handleDestSelect(description)}
                                            className="px-4 py-3 hover:bg-red-50 cursor-pointer text-sm font-bold text-gray-700 transition-colors border-b border-gray-50 last:border-0"
                                        >
                                            {description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {formData.distanceKm && (
                            <div className="p-4 bg-gray-900 rounded-2xl animate-in zoom-in-95 duration-500 shadow-2xl border border-gray-800">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Route Distance</span>
                                        <span className="text-xl font-black text-white">{formData.distanceKm} <span className="text-red-500 italic">km</span></span>
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
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-gray-500">Category</label>
                            <select 
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 shadow-sm font-bold text-sm"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Home Moving</option>
                                <option>Vehicles</option>
                                <option>Heavy Equipment</option>
                                <option>General Goods</option>
                                <option>Fragile Items</option>
                            </select>
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
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Total Weight"
                                type="number"
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
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="Length" type="number" value={formData.length} onChange={(e) => setFormData({...formData, length: e.target.value})} />
                            <Input label="Width" type="number" value={formData.width} onChange={(e) => setFormData({...formData, width: e.target.value})} />
                            <Input label="Height" type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} />
                        </div>
                    </div>
                );
            case 4:
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
                                <input type="checkbox" checked={formData.hasElevatorPickup} onChange={(e) => setFormData({...formData, hasElevatorPickup: e.target.checked})} className="w-5 h-5 accent-red-500" />
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-tighter">Elevator at Pickup</span>
                             </label>
                             <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={formData.hasElevatorDelivery} onChange={(e) => setFormData({...formData, hasElevatorDelivery: e.target.checked})} className="w-5 h-5 accent-red-500" />
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-tighter">Elevator at Drop</span>
                             </label>
                        </div>
                    </div>
                );
            case 5:
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
                                    onClick={() => setFormData({...formData, isFlexiblePickup: !formData.isFlexiblePickup})}
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

    if (loadError) return (
        <Card className="p-8 text-center bg-red-50 border-red-100">
            <span className="text-4xl mb-4 block">🚫</span>
            <h3 className="text-xl font-black text-red-600 uppercase mb-2">Map Engine Error</h3>
            <p className="text-sm text-gray-600 font-bold">Please check your configuration and API key.</p>
        </Card>
    );

    if (!isLoaded) return (
        <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="p-12 flex flex-col items-center justify-center space-y-6 bg-white">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl animate-pulse">🚚</span>
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-[1000] text-gray-900 uppercase italic tracking-tight mb-2">Initializing Vector Grid</h3>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] animate-pulse">Loading Satellite Logistics...</p>
                </div>
            </div>
        </Card>
    );

    return (
        <Card>
            <div className="p-2">
                <div className="mb-6">
                    <h2 className="text-2xl font-[1000] text-gray-900 tracking-tight leading-none uppercase italic underline decoration-red-500 decoration-4 underline-offset-8 mb-4">
                        Launch Shipment
                    </h2>
                    <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Step {step} of 5 — {step === 1 ? 'Locations' : step === 2 ? 'Details' : step === 3 ? 'Load' : step === 4 ? 'Logistics' : 'Strategy'}</p>
                </div>

                <StepIndicator currentStep={step} />

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase tracking-widest rounded-r-xl pulse-border flex items-center gap-3">
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
                        
                        {step < 5 ? (
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
                                    "Confirm & Notify Carriers ✨"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Card>
    );
};

