import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShipHero from '@/components/shared/ShipHero';
import ShipGallery from '@/components/shared/ShipGallery';
import TrustSection from '@/components/shared/TrustSection';
import Testimonials from '@/components/shared/Testimonials';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How to Ship | PickItUp',
    description: 'Learn how to ship your heavy items, vehicles, and freight with confidence on PickItUp.',
};

export default function ShipPage() {
    const shipTestimonials = [
        {
            image: '/img4_car.jpg',
            quote: "I received regular updates and my motorcycle arrived safely across the country.",
            stars: 5,
            name: 'James Wilson',
            location: 'Austin, TX',
            initials: 'JW',
            color: 'bg-purple-600',
        },
        {
            image: '/img2_truck.avif',
            quote: "My trailer was delivered on time, with fair prices and excellent service.",
            stars: 5,
            name: 'Sarah Reynolds',
            location: 'Denver, CO',
            initials: 'SR',
            color: 'bg-yellow-500',
        },
        {
            image: '/sofa.webp',
            quote: "I got excellent handling and saved a lot on shipping.",
            stars: 5,
            name: 'Michael Patterson',
            location: 'Portland, OR',
            initials: 'MP',
            color: 'bg-purple-600',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <ShipHero />
            <ShipGallery />
            <TrustSection />
            <Testimonials 
                title="People Adore Pickitup for Shipping" 
                items={shipTestimonials}
            />
            <FAQSection />
            <Footer />
            <BackToTop />
        </div>
    );
}
