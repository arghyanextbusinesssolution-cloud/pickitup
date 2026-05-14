'use client';

import React from 'react';
import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300">
                {/* Header/Banner */}
                <div className="h-32 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center relative">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                        <LogOut size={40} className="text-white" />
                    </div>
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/10 text-white hover:bg-black/20 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 text-center">
                    <h3 className="text-2xl font-[900] text-gray-900 uppercase tracking-tight mb-2">
                        End Session?
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Are you sure you want to log out? You'll need to sign back in to access your shipments and dashboard.
                    </p>
                </div>

                {/* Footer/Actions */}
                <div className="p-8 pt-0 grid grid-cols-2 gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-4 rounded-xl border-2 border-gray-100 text-gray-600 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-4 rounded-xl bg-red-500 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-red-200 hover:bg-red-600 hover:-translate-y-0.5 transition-all active:scale-95 active:translate-y-0"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
