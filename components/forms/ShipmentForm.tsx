'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '../ui';
import { shipmentService } from '../../services/shipment.service';

export const ShipmentForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        origin: '',
        destination: '',
        weight: '',
        dimensions: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await shipmentService.create({
                ...formData,
                weight: formData.weight ? parseFloat(formData.weight) : undefined
            });
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to create shipment', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="Create Shipment" description="Fill in the details to list your shipment">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Origin"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        required
                    />
                    <Input
                        label="Destination"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Weight (kg)"
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                    <Input
                        label="Dimensions"
                        placeholder="e.g. 100x50x50 cm"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    />
                </div>
                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Create Shipment
                </Button>
            </form>
        </Card>
    );
};
