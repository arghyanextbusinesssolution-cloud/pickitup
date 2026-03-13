import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarrierHero from '@/components/shared/CarrierHero';
import FindShipmentsGallery from '@/components/shared/FindShipmentsGallery';
import TrustSection from '@/components/shared/TrustSection';
import Testimonials from '@/components/shared/Testimonials';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Find Shipments | PickItUp for Carriers',
    description: 'Find loads, reduce empty miles, and grow your transport business with PickItUp.',
};

export default function FindShipmentsLandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <CarrierHero />
            <FindShipmentsGallery />
            <TrustSection />
            <Testimonials />
            <FAQSection />
            <Footer />
            <BackToTop />
        </div>
    );
}
