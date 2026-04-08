'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '../ui';
import { authService } from '../../services/auth.service';
import { Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginFormProps {
    isCarrier?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isCarrier = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login(email, password);
            const userRole = response.user?.role;
            console.log(`[LoginForm] User logged in with role: ${userRole}`);

            // Redirect based on role
            if (userRole === 'ADMIN') {
                router.push('/admin/dashboard');
            } else if (userRole === 'CARRIER') {
                router.push('/carrier/dashboard');
            } else {
                router.push('/shipper/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card 
            title={isCarrier ? "Carrier Login" : "Login"} 
            description={isCarrier ? "Access the carrier portal and find loads" : "Enter your credentials to access your account"}
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail size={18} />
                    </div>
                    <Input
                        label={isCarrier ? "Work Email" : "Email"}
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                    />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                    </div>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                    />
                </div>
                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium animate-in fade-in zoom-in duration-200">
                        {error}
                    </div>
                )}
                <Button 
                    type="submit" 
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-sm shadow-lg transition-all active:scale-95 ${
                        isCarrier 
                        ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-yellow-400/20" 
                        : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20"
                    }`} 
                    isLoading={isLoading}
                >
                    Sign In <ArrowRight size={18} strokeWidth={3} />
                </Button>
            </form>
        </Card>
    );
};
