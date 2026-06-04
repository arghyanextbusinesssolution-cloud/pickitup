import { Metadata } from 'next';
import HeroSection from '@/components/shared/HeroSection';

import TrustSection from '@/components/shared/TrustSection';
import CategoryCards from '@/components/shared/CategoryCards';
import ConfidenceSection from '@/components/shared/ConfidenceSection';
import CarrierCTA from '@/components/shared/CarrierCTA';
import ServicesGrid from '@/components/shared/ServicesGrid';
import PricingCards from '@/components/shared/PricingCards';
import Testimonials from '@/components/shared/Testimonials';
import BusinessDelivery from '@/components/shared/BusinessDelivery';
import ValueCTA from '@/components/shared/ValueCTA';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';

export const metadata: Metadata = {
    title: 'Local pickup and delivery service in the USA',
    description: 'Trusted local pickup and delivery service in the USA offering fast, secure, and same-day courier solutions for businesses and individuals.',
};

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            <CategoryCards />
            <ConfidenceSection />
            <CarrierCTA />
            <ServicesGrid />
            <PricingCards />
            <Testimonials />
            <TrustSection />
            <BusinessDelivery />
            <ValueCTA />
            <FAQSection />
            <BackToTop />
        </div>
    );
}
