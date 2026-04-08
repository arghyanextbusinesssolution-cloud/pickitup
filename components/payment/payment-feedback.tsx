'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const PaymentFeedback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState<'success' | 'cancel' | null>(null);

    useEffect(() => {
        const paymentParam = searchParams.get('payment');
        if (paymentParam === 'success') {
            setStatus('success');
            setShow(true);
        } else if (paymentParam === 'cancel') {
            setStatus('cancel');
            setShow(true);
        }
    }, [searchParams]);

    const handleClose = () => {
        setShow(false);
        // Clean up the URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete('payment');
        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        router.replace(newUrl);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
                <div className="text-center">
                    {status === 'success' ? (
                        <>
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce transition-all duration-1000">
                                <span className="text-5xl">✅</span>
                            </div>
                            <h2 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-4">Payment Successful!</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                Your payment has been received and is now held safely in escrow. Your shipment is confirmed!
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse transition-all duration-1000">
                                <span className="text-5xl">❌</span>
                            </div>
                            <h2 className="text-3xl font-[900] text-gray-900 uppercase tracking-tight mb-4">Payment Cancelled</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                The payment process was cancelled. No charges were made to your account.
                            </p>
                        </>
                    )}

                    <button
                        onClick={handleClose}
                        className={`w-full py-5 rounded-2xl font-[900] uppercase tracking-widest text-sm transition-all active:scale-[0.98] shadow-lg ${
                            status === 'success' 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-gray-200/30'
                        }`}
                    >
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};
