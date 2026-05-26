import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarrierHero from '@/components/shared/CarrierHero';
import FindShipmentsGallery from '@/components/shared/FindShipmentsGallery';
import TrustSection from '@/components/shared/TrustSection';
import Testimonials from '@/components/shared/Testimonials';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Find Shipments | PickItUp for Carriers',
    description: 'Find loads, reduce empty miles, and grow your transport business with PickItUp.',
};

export default function FindShipmentsLandingPage() {
    const carrierTestimonials = [
        {
            image: '/img4_car.jpg',
            quote: "I was able to reduce downtime between deliveries and acquire continuous shipment possibilities thanks to Pickitup. The procedure is dependable and easy.",
            stars: 5,
            name: 'James Mitchell',
            location: 'New York, Texas',
            initials: 'JM',
            color: 'bg-purple-600',
        },
        {
            image: '/img2_truck.avif',
            quote: "Bidding is easy, and payment processing is safe. Excellent platform for locating high-quality loads across the country.",
            stars: 5,
            name: 'Sarah Reynolds',
            location: 'Denver, Colorado',
            initials: 'SR',
            color: 'bg-yellow-500',
        },
        {
            image: '/sofa.webp',
            quote: "With Pickitup's nationwide shipment network, I've been able to grow my transportation business and expand my routes.",
            stars: 5,
            name: 'Michael Patterson',
            location: 'Portland, Oregon',
            initials: 'MP',
            color: 'bg-purple-600',
        },
    ];

    const carrierFaqs = [
        {
            question: "In what ways does Pickitup assist carriers?",
            answer: "Pickitup links verified shippers seeking transportation services throughout the United States with carriers."
        },
        {
            question: "How are carriers compensated?",
            answer: "Following shipping completion and delivery confirmation, payments are securely processed."
        },
        {
            question: "Can I locate loads across the country?",
            answer: "Indeed, Pickitup offers local, regional, and long-distance shipping options throughout the United States."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <CarrierHero />
            
            {/* Reasons for Selecting Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[32px] lg:text-[44px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-8">
                        Carriers&apos; Reasons for Selecting Pickitup
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-yellow-500 mb-6 uppercase">
                            Dependable Door to Door Pickup Service in U.S.A
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">
                            Pickitup offers dependable shipping options, clear communication, and simple shipment management to help transportation professionals streamline logistical operations. Our platform facilitates long-term carrier growth, regardless of whether you are an owner-operator, fleet company, or individual driver.
                        </p>
                    </div>
                </div>
            </section>

            <FindShipmentsGallery />
            <TrustSection />
            <Testimonials 
                title="Stories of Customer Success" 
                items={carrierTestimonials}
            />
            <FAQSection items={carrierFaqs} />

            {/* Final CTA Section */}
            <section className="py-24 bg-[#1a1b3a] text-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[38px] lg:text-[52px] font-[900] tracking-tighter uppercase mb-6 leading-tight">
                        Sign Up for Pickitup Now
                    </h2>
                    <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-12">
                        Expand your transportation company with reliable shipping options, validated loads, and expert logistics assistance. Pickitup offers a reliable door to door pickup service in the U.S.A. platform that assists carriers in locating goods, handling deliveries, and effectively boosting profits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/register?role=carrier" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-12 py-5 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-sm">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
            <BackToTop />
        </div>
    );
}
