'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { authService } from '@/services/auth.service';
import { carrierService as frontendCarrierService } from '@/services/carrier.service';
import {
    Package, Truck, ChevronRight, Eye, EyeOff,
    Mail, ShieldCheck, Phone, MapPin, CheckCircle
} from 'lucide-react';

// ─────────────────────────────────────────────
// Shared
// ─────────────────────────────────────────────
const SHIPPER_COLOR = {
    pill: 'bg-purple-600',
    btn: 'bg-purple-600 hover:bg-purple-700 shadow-purple-200',
    btnFinal: 'bg-purple-700 hover:bg-purple-800',
    badge: 'bg-purple-50 text-purple-600',
    dot: 'bg-purple-500',
    step: 'bg-purple-600',
    focus: 'focus:border-purple-500',
    link: 'text-purple-600',
    check: 'bg-emerald-500',
    line: 'bg-purple-400',
};

const CARRIER_COLOR = {
    btn: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-yellow-200',
    badge: 'bg-yellow-50 text-yellow-700',
    dot: 'bg-yellow-500',
    focus: 'focus:border-yellow-400',
    border: 'border-yellow-300',
};

// ─────────────────────────────────────────────
// Step Bar (Shipper only)
// ─────────────────────────────────────────────
const STEPS = ['Identity', 'Verify Email', 'Phone', 'Location'];

function StepBar({ current }: { current: number }) {
    return (
        <div className="flex items-center gap-0 mb-10">
            {STEPS.map((label, i) => (
                <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                            i < current ? 'bg-emerald-500 text-white' :
                            i === current ? 'bg-purple-600 text-white' :
                            'bg-gray-100 text-gray-400'
                        }`}>
                            {i < current ? <CheckCircle size={14} /> : i + 1}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest mt-1.5 ${
                            i === current ? 'text-purple-600' : 'text-gray-300'
                        }`}>{label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-2 mb-5 transition-all duration-500 ${i < current ? 'bg-purple-400' : 'bg-gray-200'}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────
// OTP Input (Shipper only)
// ─────────────────────────────────────────────
function OtpInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const digits = value.split('').concat(Array(6).fill('')).slice(0, 6);
    const refs = Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>());

    const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !digits[i] && i > 0) refs[i - 1].current?.focus();
    };

    const handleChange = (i: number, v: string) => {
        const clean = v.replace(/\D/g, '').slice(-1);
        const next = digits.map((d, idx) => (idx === i ? clean : d)).join('');
        onChange(next);
        if (clean && i < 5) refs[i + 1].current?.focus();
    };

    return (
        <div className="flex gap-3 justify-center">
            {digits.map((d, i) => (
                <input
                    key={i}
                    ref={refs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKey(i, e)}
                    className={`w-12 h-14 text-center text-xl font-black border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                        d ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-200 text-gray-900 focus:border-purple-500'
                    }`}
                />
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function RegisterPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <RegisterContent />
        </React.Suspense>
    );
}

function RegisterContent() {
    const [role, setRole] = useState<'SHIPPER' | 'CARRIER'>('SHIPPER');
    const isCarrier = role === 'CARRIER';

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Role Slider — always visible at top */}
            <div className="mb-8">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">I am registering as a</p>
                <div className="relative flex bg-gray-100 p-1 rounded-2xl w-full">
                    <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isCarrier ? 'translate-x-[calc(100%+8px)] bg-yellow-400' : 'translate-x-0 bg-purple-600'
                    }`} />
                    <button type="button" onClick={() => setRole('SHIPPER')}
                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black uppercase tracking-widest transition-colors duration-200 ${
                            !isCarrier ? 'text-white' : 'text-gray-400 hover:text-gray-600'
                        }`}>
                        <Package size={15} /> Shipper
                    </button>
                    <button type="button" onClick={() => setRole('CARRIER')}
                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black uppercase tracking-widest transition-colors duration-200 ${
                            isCarrier ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                        }`}>
                        <Truck size={15} /> Carrier
                    </button>
                </div>
                <p className={`mt-3 text-[10px] font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 ${
                    isCarrier ? 'bg-yellow-50 text-yellow-700' : 'bg-purple-50 text-purple-600'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isCarrier ? 'bg-yellow-500' : 'bg-purple-500'}`} />
                    {isCarrier ? 'Manage shipments, dispatch drivers, grow revenue' : 'Send packages, track shipments, compare quotes'}
                </p>
            </div>

            {/* Conditional form rendering */}
            {isCarrier ? <CarrierWizard /> : <ShipperWizard />}

            <div className="mt-6 text-center text-sm font-medium text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-gray-900 font-bold hover:underline transition-all">
                    Sign in here
                </Link>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════
// CARRIER — 4-step wizard (Yellow)
// ══════════════════════════════════════════════
function CarrierWizard() {
    const [step, setStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState('');
    
    // Step 0: Identity
    const [identity, setIdentity] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        phone: '', 
        companyName: '' 
    });

    // Step 1: Verification
    const [verification, setVerification] = useState({
        idType: 'DRIVING_LICENSE',
        idFrontUrl: '',
        idBackUrl: '',
        selfieUrl: ''
    });

    // Step 2: Vehicle
    const [vehicle, setVehicle] = useState({
        vehicleType: 'Truck',
        vehicleBrand: '',
        vehicleModel: '',
        plateNumber: '',
        loadCapacity: '',
        registrationDocUrl: '',
        insuranceDocUrl: ''
    });

    const fieldClass = 'w-full border-2 border-gray-100 focus:border-yellow-400 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none transition-colors rounded-xl';
    const labelClass = 'block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2';

    const setErr = (msg: string) => setError(msg);
    const clearErr = () => setError(null);

    // Step 0 → Register User & Carrier Profile
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErr();
        setIsLoading(true);
        try {
            const res = await authService.register({ ...identity, role: 'CARRIER' });
            setAuthToken(res.token);
            localStorage.setItem('token', res.token);
            setStep(1);
        } catch (err: any) {
            setErr(err.response?.data?.error || err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 1 → Submit Identity Verification
    const handleVerifyIdentity = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!verification.idFrontUrl) { setErr('Please upload ID Front'); return; }
        clearErr();
        setIsLoading(true);
        try {
            await frontendCarrierService.updateIdentity(verification);
            setStep(2);
        } catch (err: any) {
            setErr(err.response?.data?.error || 'Verification submission failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2 → Add Vehicle → Finish
    const handleAddVehicle = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErr();
        setIsLoading(true);
        try {
            await frontendCarrierService.addVehicle(vehicle);
            setStep(3);
        } catch (err: any) {
            setErr(err.response?.data?.error || 'Vehicle submission failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Automatic redirect to dashboard after success
    useEffect(() => {
        if (step === 3) {
            const timer = setTimeout(() => {
                window.location.href = '/carrier/dashboard';
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleFileUpload = async (files: FileList | null, field: string, type: 'verification' | 'vehicle') => {
        if (!files || files.length === 0) return;
        setIsLoading(true);
        clearErr();
        try {
            const urls = await frontendCarrierService.uploadDocuments([files[0]]);
            if (type === 'verification') {
                setVerification(prev => ({ ...prev, [field]: urls[0] }));
            } else {
                setVehicle(prev => ({ ...prev, [field]: urls[0] }));
            }
        } catch (err: any) {
            setErr('File upload failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const headings = [
        { title: 'Create Account', sub: 'Start your journey as a professional carrier.' },
        { title: 'Verify Identity', sub: 'Secure your account with government identification.' },
        { title: 'Add Your Vehicle', sub: 'List your fleet and upload documents.' },
        { title: 'Setup Complete!', sub: 'Your application is under review.' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-6">
                <h2 className="text-2xl font-[900] text-gray-900 uppercase tracking-tight">{headings[step].title}</h2>
                <p className="text-sm text-gray-400 font-medium mt-1">{headings[step].sub}</p>
            </div>

            {/* Custom Step Indicator for Carrier */}
            <div className="flex items-center gap-0 mb-10">
                {[0, 1, 2].map((i) => (
                    <React.Fragment key={i}>
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                                step > i ? 'bg-emerald-500 text-white' :
                                step === i ? 'bg-yellow-400 text-gray-900' :
                                'bg-gray-100 text-gray-400'
                            }`}>
                                {step > i ? <CheckCircle size={14} /> : i + 1}
                            </div>
                        </div>
                        {i < 2 && (
                            <div className={`flex-1 h-px mx-2 transition-all duration-500 ${step > i ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {error && (
                <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs font-bold text-red-600">{error}</p>
                </div>
            )}

            {/* Step 0: Create Account */}
            {step === 0 && (
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>First Name</label>
                            <input className={fieldClass} placeholder="John" required value={identity.firstName}
                                onChange={e => setIdentity({ ...identity, firstName: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Last Name</label>
                            <input className={fieldClass} placeholder="Doe" required value={identity.lastName}
                                onChange={e => setIdentity({ ...identity, lastName: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Email Address</label>
                        <input className={fieldClass} type="email" placeholder="name@company.com" required value={identity.email}
                            onChange={e => setIdentity({ ...identity, email: e.target.value })} />
                    </div>

                    <div>
                        <label className={labelClass}>Phone Number</label>
                        <input className={fieldClass} type="tel" placeholder="+1 555 000 0000" required value={identity.phone}
                            onChange={e => setIdentity({ ...identity, phone: e.target.value })} />
                    </div>

                    <div>
                        <label className={labelClass}>Password</label>
                        <div className="relative">
                            <input className={`${fieldClass} pr-12`} type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password" required value={identity.password}
                                onChange={e => setIdentity({ ...identity, password: e.target.value })} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Company / Fleet Name (Optional)</label>
                        <input className={fieldClass} placeholder="Ace Transport LLC" value={identity.companyName}
                            onChange={e => setIdentity({ ...identity, companyName: e.target.value })} />
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-yellow-100 disabled:opacity-50 mt-2">
                        {isLoading ? 'Creating Account...' : (
                            <><Truck size={15} /> Continue to Verification <ChevronRight size={15} /></>
                        )}
                    </button>
                </form>
            )}

            {/* Step 1: Verify Identity */}
            {step === 1 && (
                <form onSubmit={handleVerifyIdentity} className="space-y-6">
                    <div>
                        <label className={labelClass}>Government ID Type</label>
                        <select className={fieldClass} value={verification.idType}
                            onChange={e => setVerification({ ...verification, idType: e.target.value })}>
                            <option value="DRIVING_LICENSE">Driving License</option>
                            <option value="PASSPORT">Passport</option>
                            <option value="NATIONAL_ID">National ID</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 border-2 border-dashed rounded-2xl text-center transition-colors ${verification.idFrontUrl ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}>
                            <label className="cursor-pointer block">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ID Front</p>
                                <div className={`${verification.idFrontUrl ? 'text-emerald-600' : 'text-yellow-500'} font-bold text-xs`}>
                                    {verification.idFrontUrl ? '✓ Uploaded' : 'Upload File'}
                                </div>
                                <input type="file" className="hidden" accept="image/*" 
                                    onChange={e => handleFileUpload(e.target.files, 'idFrontUrl', 'verification')} />
                            </label>
                        </div>
                        <div className={`p-4 border-2 border-dashed rounded-2xl text-center transition-colors ${verification.idBackUrl ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}>
                            <label className="cursor-pointer block">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ID Back</p>
                                <div className={`${verification.idBackUrl ? 'text-emerald-600' : 'text-yellow-500'} font-bold text-xs`}>
                                    {verification.idBackUrl ? '✓ Uploaded' : 'Upload File'}
                                </div>
                                <input type="file" className="hidden" accept="image/*"
                                    onChange={e => handleFileUpload(e.target.files, 'idBackUrl', 'verification')} />
                            </label>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-yellow-100 disabled:opacity-50">
                        {isLoading ? 'Submitting...' : (
                            <><ShieldCheck size={15} /> Verify Identity <ChevronRight size={15} /></>
                        )}
                    </button>
                </form>
            )}

            {/* Step 2: Add Vehicle */}
            {step === 2 && (
                <form onSubmit={handleAddVehicle} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Vehicle Type</label>
                            <select className={fieldClass} value={vehicle.vehicleType}
                                onChange={e => setVehicle({ ...vehicle, vehicleType: e.target.value })}>
                                <option value="Truck">Truck</option>
                                <option value="Van">Van</option>
                                <option value="Pickup">Pickup</option>
                                <option value="Bike">Bike</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Vehicle Brand</label>
                            <input className={fieldClass} placeholder="Toyota / Ford" required value={vehicle.vehicleBrand}
                                onChange={e => setVehicle({ ...vehicle, vehicleBrand: e.target.value })} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Vehicle Model</label>
                            <input className={fieldClass} placeholder="Hiace / F-150" required value={vehicle.vehicleModel}
                                onChange={e => setVehicle({ ...vehicle, vehicleModel: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Plate Number</label>
                            <input className={fieldClass} placeholder="ABC-1234" required value={vehicle.plateNumber}
                                onChange={e => setVehicle({ ...vehicle, plateNumber: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Load Capacity (kg)</label>
                        <input className={fieldClass} type="number" placeholder="2000" required value={vehicle.loadCapacity}
                            onChange={e => setVehicle({ ...vehicle, loadCapacity: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 border-2 border-dashed rounded-2xl text-center transition-colors ${vehicle.registrationDocUrl ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}>
                            <label className="cursor-pointer block">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Registration</p>
                                <div className={`${vehicle.registrationDocUrl ? 'text-emerald-600' : 'text-yellow-500'} font-bold text-xs`}>
                                    {vehicle.registrationDocUrl ? '✓ Uploaded' : 'Upload Doc'}
                                </div>
                                <input type="file" className="hidden" accept="image/*,application/pdf"
                                    onChange={e => handleFileUpload(e.target.files, 'registrationDocUrl', 'vehicle')} />
                            </label>
                        </div>
                        <div className={`p-4 border-2 border-dashed rounded-2xl text-center transition-colors ${vehicle.insuranceDocUrl ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'}`}>
                            <label className="cursor-pointer block">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Insurance</p>
                                <div className={`${vehicle.insuranceDocUrl ? 'text-emerald-600' : 'text-yellow-500'} font-bold text-xs`}>
                                    {vehicle.insuranceDocUrl ? '✓ Uploaded' : 'Upload Doc'}
                                </div>
                                <input type="file" className="hidden" accept="image/*,application/pdf"
                                    onChange={e => handleFileUpload(e.target.files, 'insuranceDocUrl', 'vehicle')} />
                            </label>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-yellow-100 disabled:opacity-50 mt-2">
                        {isLoading ? 'Saving...' : (
                            <><CheckCircle size={15} /> Save Vehicle & Complete <ChevronRight size={15} /></>
                        )}
                    </button>
                </form>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
                <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-100/50">
                            <CheckCircle size={48} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Application Submitted</h3>
                        <p className="text-sm text-gray-400 font-medium mt-2 max-w-xs mx-auto">
                            We've received your carrier details. You can now explore the dashboard while we review your documents.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Link href="/carrier" 
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-gray-200 w-full">
                            Go to Dashboard <ChevronRight size={15} />
                        </Link>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            Redirecting to dashboard in 3 seconds...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ══════════════════════════════════════════════
// SHIPPER — 4-step wizard (Purple)
// ══════════════════════════════════════════════
function ShipperWizard() {
    const [step, setStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [otp, setOtp] = useState('');
    const [authToken, setAuthToken] = useState('');

    const [identity, setIdentity] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({ addressLine1: '', city: '', state: '', country: '', postalCode: '' });
    const [isLocating, setIsLocating] = useState(false);
    const [mapCoords, setMapCoords] = useState<{lat: number, lon: number} | null>(null);
    const [addressQuery, setAddressQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const fieldClass = 'w-full border-2 border-gray-100 focus:border-purple-500 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none transition-colors rounded-xl';
    const labelClass = 'block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2';

    const setErr = (msg: string) => setError(msg);
    const clearErr = () => setError(null);

    // Step 1 → Send OTP
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErr();
        setIsLoading(true);
        try {
            await api.post('/auth/otp/send', { email: identity.email, name: identity.firstName });
            setStep(1);
        } catch (err: any) {
            setErr(err.response?.data?.error || 'Failed to send OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2 → Verify OTP + Create account
    const handleVerifyOtp = async () => {
        if (otp.length !== 6) { setErr('Enter the full 6-digit code'); return; }
        clearErr();
        setIsLoading(true);
        try {
            await api.post('/auth/otp/verify', { email: identity.email, code: otp });
            const res = await authService.register({ ...identity, role: 'SHIPPER' });
            setAuthToken(res.token);
            localStorage.setItem('token', res.token);
            setStep(2);
        } catch (err: any) {
            setErr(err.response?.data?.error || err.response?.data?.message || 'Verification failed.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3 → Save phone
    const handleSavePhone = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErr();
        setIsLoading(true);
        try {
            await api.patch('/shippers/me/phone', { phone }, { headers: { Authorization: `Bearer ${authToken}` } });
            setStep(3);
        } catch (err: any) {
            setErr(err.response?.data?.error || 'Failed to save phone.');
        } finally {
            setIsLoading(false);
        }
    };

    // Step 4 → Save address → Dashboard
    const handleSaveLocation = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErr();
        setIsLoading(true);
        try {
            await api.post('/shippers/me/address', address, { headers: { Authorization: `Bearer ${authToken}` } });
            window.location.href = '/shipper/dashboard';
        } catch (err: any) {
            setErr(err.response?.data?.error || 'Failed to save location.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setErr("Geolocation is not supported by your browser");
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setMapCoords({ lat: latitude, lon: longitude });
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await res.json();
                    if (data && data.address) {
                        const addr = data.address;
                        setAddress({
                            addressLine1: addr.road || addr.suburb || addr.neighbourhood || data.display_name.split(',')[0] || 'Unknown Street',
                            city: addr.city || addr.town || addr.village || addr.county || addr.state_district || 'Unknown City',
                            state: addr.state || '',
                            country: addr.country || 'US',
                            postalCode: addr.postcode || ''
                        });
                        setAddressQuery(data.display_name || '');
                    }
                } catch (e) {
                    setErr("Failed to fetch address details");
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                setErr("Unable to retrieve your location");
                setIsLocating(false);
            }
        );
    };

    const searchAddress = async (val: string) => {
        setAddressQuery(val);
        if (val.length < 3) {
            setSuggestions([]);
            return;
        }
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&addressdetails=1&limit=5`);
            const data = await res.json();
            setSuggestions(data);
        } catch (e) {
            console.error("Autocomplete error:", e);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectSuggestion = (place: any) => {
        setAddressQuery(place.display_name);
        setMapCoords({ lat: parseFloat(place.lat), lon: parseFloat(place.lon) });
        setSuggestions([]);
        
        const addr = place.address;
        setAddress({
            addressLine1: addr.road || addr.suburb || addr.neighbourhood || place.display_name.split(',')[0] || 'Unknown Street',
            city: addr.city || addr.town || addr.village || addr.county || addr.state_district || 'Unknown City',
            state: addr.state || '',
            country: addr.country || 'US',
            postalCode: addr.postcode || ''
        });
    };

    const headings = [
        { title: 'Create Account', sub: 'Enter your details to get started.' },
        { title: 'Verify Your Email', sub: `We sent a 6-digit code to ${identity.email}` },
        { title: 'Add Phone Number', sub: 'Your account is created. Add a contact number.' },
        { title: 'Set Your Location', sub: 'Last step — where are you based?' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="mb-6">
                <h2 className="text-2xl font-[900] text-gray-900 uppercase tracking-tight">{headings[step].title}</h2>
                <p className="text-sm text-gray-400 font-medium mt-1">{headings[step].sub}</p>
            </div>

            <StepBar current={step} />

            {error && (
                <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs font-bold text-red-600">{error}</p>
                </div>
            )}

            {/* ── Step 0: Identity ── */}
            {step === 0 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>First Name</label>
                            <input className={fieldClass} placeholder="John" required value={identity.firstName}
                                onChange={e => setIdentity({ ...identity, firstName: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Last Name</label>
                            <input className={fieldClass} placeholder="Doe" required value={identity.lastName}
                                onChange={e => setIdentity({ ...identity, lastName: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Email Address</label>
                        <input className={fieldClass} type="email" placeholder="name@example.com" required value={identity.email}
                            onChange={e => setIdentity({ ...identity, email: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Password</label>
                        <div className="relative">
                            <input className={`${fieldClass} pr-12`} type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password" required value={identity.password}
                                onChange={e => setIdentity({ ...identity, password: e.target.value })} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-purple-400 transition-colors">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-100 disabled:opacity-50">
                        <Mail size={15} />
                        {isLoading ? 'Sending OTP...' : 'Continue — Send Email OTP'}
                    </button>
                </form>
            )}

            {/* ── Step 1: OTP ── */}
            {step === 1 && (
                <div className="space-y-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center">
                            <ShieldCheck size={28} className="text-purple-600" />
                        </div>
                    </div>
                    <OtpInput value={otp} onChange={setOtp} />
                    <button onClick={handleVerifyOtp} disabled={isLoading || otp.length !== 6}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-100 disabled:opacity-50">
                        {isLoading ? 'Verifying...' : 'Verify & Create Account'} <ChevronRight size={15} />
                    </button>
                    <button type="button" onClick={() => setStep(0)}
                        className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
                        ← Change email
                    </button>
                </div>
            )}

            {/* ── Step 2: Phone ── */}
            {step === 2 && (
                <form onSubmit={handleSavePhone} className="space-y-6">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center">
                            <Phone size={28} className="text-purple-600" />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Mobile Number</label>
                        <input className={fieldClass} type="tel" placeholder="+1 555 000 0000" required value={phone}
                            onChange={e => setPhone(e.target.value)} />
                        <p className="text-[10px] text-gray-400 mt-2">SMS verification coming soon.</p>
                    </div>
                    <button type="submit" disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-100 disabled:opacity-50">
                        {isLoading ? 'Saving...' : 'Continue'} <ChevronRight size={15} />
                    </button>
                </form>
            )}

            {/* ── Step 3: Location ── */}
            {step === 3 && (
                <form onSubmit={handleSaveLocation} className="space-y-4">
                    <div className="flex justify-center mb-2">
                        <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center">
                            <MapPin size={28} className="text-purple-600" />
                        </div>
                    </div>

                    <button 
                        type="button" 
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs uppercase tracking-widest rounded-xl transition-all border border-purple-200 disabled:opacity-50"
                    >
                        <MapPin size={16} />
                        {isLocating ? 'Locating...' : 'Use My Current Location'}
                    </button>

                    <div>
                        <label className={labelClass}>Search Location</label>
                        <div className="relative">
                            <input 
                                className={fieldClass} 
                                placeholder="Start typing your address..." 
                                required 
                                value={addressQuery}
                                onChange={e => searchAddress(e.target.value)} 
                            />
                            {isSearching && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            {suggestions.length > 0 && (
                                <div className="absolute z-20 left-0 right-0 mt-2 bg-white border-2 border-purple-100 rounded-xl shadow-lg overflow-hidden">
                                    {suggestions.map((place, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleSelectSuggestion(place)}
                                            className="w-full text-left px-4 py-3 hover:bg-purple-50 border-b border-gray-50 last:border-0 transition-colors"
                                        >
                                            <p className="text-sm font-bold text-gray-900 truncate">{place.display_name.split(',')[0]}</p>
                                            <p className="text-[10px] font-medium text-gray-400 truncate">{place.display_name}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>



                    {mapCoords && (
                        <div className="mt-4 rounded-xl overflow-hidden border-2 border-purple-100 shadow-sm relative h-48 bg-gray-50">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight={0} 
                                marginWidth={0} 
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCoords.lon-0.005}%2C${mapCoords.lat-0.005}%2C${mapCoords.lon+0.005}%2C${mapCoords.lat+0.005}&layer=mapnik&marker=${mapCoords.lat}%2C${mapCoords.lon}`}
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    )}

                    <button type="submit" disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-purple-700 hover:bg-purple-800 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-100 disabled:opacity-50 mt-2">
                        {isLoading ? 'Setting up...' : 'Complete & Go to Dashboard'} <ChevronRight size={15} />
                    </button>
                </form>
            )}
        </div>
    );
}
