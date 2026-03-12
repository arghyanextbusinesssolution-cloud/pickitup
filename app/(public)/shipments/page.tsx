import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';

export default function ShipmentsLandingPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Ship Your Items Today</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Whether it's a car, a couch, or a container, our network of verified carriers is ready to haul it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <Card title="1. Create a Listing" className="text-center p-8">
                        <p className="text-gray-600 mt-4">Provide details about what you need to ship and where it's going.</p>
                    </Card>
                    <Card title="2. Get Quotes" className="text-center p-8">
                        <p className="text-gray-600 mt-4">Receive competitive bids from carriers who are already making the trip.</p>
                    </Card>
                    <Card title="3. Book & Relax" className="text-center p-8">
                        <p className="text-gray-600 mt-4">Choose your carrier, book securely, and wait for your delivery.</p>
                    </Card>
                </div>

                <div className="text-center">
                    <Link href="/register" className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-700 transition">
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
