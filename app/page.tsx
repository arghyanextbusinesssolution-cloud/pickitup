import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import CategoryCards from './components/CategoryCards';
import ConfidenceSection from './components/ConfidenceSection';
import CarrierCTA from './components/CarrierCTA';
import ServicesGrid from './components/ServicesGrid';
import PricingCards from './components/PricingCards';
import Testimonials from './components/Testimonials';
import BusinessDelivery from './components/BusinessDelivery';
import ValueCTA from './components/ValueCTA';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
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
            <Footer />
            <BackToTop />
        </div>
    );
}
