'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '../ui';
import { authService } from '../../services/auth.service';

export const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER' as 'USER' | 'CARRIER'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        console.log('[RegisterForm] Attempting registration with data:', formData);

        try {
            const response = await authService.register(formData);
            const userRole = response.user?.role;
            console.log(`[RegisterForm] Registration successful. User Role: ${userRole}`);
            
            if (userRole === 'CARRIER') {
                window.location.href = '/carrier/dashboard';
            } else {
                window.location.href = '/shipper/dashboard';
            }
        } catch (err: any) {
            console.error('[RegisterForm] Registration failed:', err);
            if (err.response) {
                console.error('[RegisterForm] Error response from server:', err.response.data);
            }
            setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="Create Account" description="Join the uShip community today">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                    <Input
                        label="Last Name"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                </div>
                <Input
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">I am a...</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="role"
                                value="USER"
                                checked={formData.role === 'USER'}
                                onChange={() => setFormData({ ...formData, role: 'USER' })}
                            />
                            <span>Shipper</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="role"
                                value="CARRIER"
                                checked={formData.role === 'CARRIER'}
                                onChange={() => setFormData({ ...formData, role: 'CARRIER' })}
                            />
                            <span>Carrier</span>
                        </label>
                    </div>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Create Account
                </Button>
            </form>
        </Card>
    );
};
