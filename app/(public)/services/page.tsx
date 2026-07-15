import { Metadata } from 'next';
import ServicesLocationGrid from '@/components/shared/ServicesLocationGrid';

export const metadata: Metadata = {
    title: 'Specialized Shipping & Freight Services | UShip',
    description: 'Explore our specialized shipping and local delivery services. Find reliable freight, logistics, and courier companies near you.',
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white">
            <ServicesLocationGrid />
        </div>
    );
}
