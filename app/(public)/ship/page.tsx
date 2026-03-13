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
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <ShipHero />
            <ShipGallery />
            <TrustSection />
            <Testimonials />
            <FAQSection />
            <Footer />
            <BackToTop />
        </div>
    );
}
