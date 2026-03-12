'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '../ui';
import { authService } from '../../services/auth.service';

export const LoginForm: React.FC = () => {
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
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="Login" description="Enter your credentials to access your account">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign In
                </Button>
            </form>
        </Card>
    );
};
