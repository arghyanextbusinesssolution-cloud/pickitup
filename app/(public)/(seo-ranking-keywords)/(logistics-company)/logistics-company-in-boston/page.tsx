import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';

export const metadata: Metadata = {
    title: 'Trusted Logistics Company in Boston | PickItUp',
    description: 'Looking for a trusted logistics company in Boston? PickItUp provides reliable freight opportunities, transparent load information, and a simple booking process.',
};

export default function BostonLogisticsPage() {
    const regionalFaqs = [
        {
            question: "How does PickItUp help carriers find shipments?",
            answer: "PickItUp connects qualified carriers with businesses seeking reliable freight transportation. Carriers can browse available loads, submit bids, manage shipments, and receive payment through one platform."
        },
        {
            question: "Who can join the PickItUp carrier network?",
            answer: "Independent owner-operators, small trucking companies, and large transportation fleets can apply to become part of the PickItUp carrier network."
        },
        {
            question: "Do you offer shipments outside Boston?",
            answer: "Yes. As a leading Logistics Company in Boston, PickItUp supports freight transportation across the United States through an extensive carrier network."
        },
        {
            question: "I\'m searching for a Logistics Company Near Me. Can PickItUp help?",
            answer: "Absolutely. If you\'re looking for a Logistics Company Near Me, PickItUp connects businesses and professional carriers across Boston with reliable freight opportunities, efficient shipment management, and nationwide transportation solutions."
        },
        {
            question: "Is there a cost to create a carrier account?",
            answer: "Registration requirements may vary depending on your carrier profile and transportation services. Contact our team for complete onboarding information."
        },
        {
            question: "What types of freight are available?",
            answer: "Available shipments include commercial freight, retail goods, furniture, industrial equipment, palletized freight, warehouse transfers, and scheduled deliveries across a variety of industries."
        }
    ];

    const benefits = [
        "Consistent freight opportunities",
        "Fast load matching",
        "Nationwide shipping network",
        "Competitive payment process",
        "Real-time shipment updates",
        "Dedicated carrier support",
        "Easy shipment management",
        "Flexible delivery schedules"
    ];

    const steps = [
        {
            src: '/find-shipments1.png',
            alt: 'Browse Freight',
            label: 'Step 1 – Browse Available Freight Opportunities',
            desc: 'Search available shipments based on pickup location, destination, freight type, equipment requirements, and delivery schedule. Our platform makes it easy to find loads that match your business while connecting you with businesses looking for reliable transportation partners.'
        },
        {
            src: '/find-shipments2.png',
            alt: 'Submit Bids',
            label: 'Step 2 – Submit Competitive Bids',
            desc: 'Review shipment details and submit pricing that reflects your transportation capacity and expertise. Transparent load information helps you make informed business decisions and win more freight opportunities.'
        },
        {
            src: '/find-shipments3.png',
            alt: 'Manage Shipments',
            label: 'Step 3 – Confirm and Manage Shipments',
            desc: 'Once selected, verify shipment details, coordinate pickup schedules, and manage deliveries through one convenient platform designed specifically for professional carriers.'
        },
        {
            src: '/find-shipments4.png',
            alt: 'Deliver and Get Paid',
            label: 'Step 4 – Deliver on Time and Get Paid',
            desc: 'Complete deliveries safely and efficiently while receiving timely payments for completed shipments. Our streamlined payment process helps carriers maintain steady cash flow and build long-term business success.'
        }
    ];

    return (
        <div className="min-h-screen bg-white text-[#1a1b3a]">

            {/* HERO SECTION */}
            <section className="bg-gradient-to-b from-gray-50 to-[#fdfaff] py-16 lg:py-24 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                                <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">Logistics Company in Boston</span>
                            </div>

                            <h1 className="text-[42px] lg:text-[58px] font-[900] text-[#1a1b3a] leading-[1.1] mb-6 tracking-tighter uppercase">
                                Trusted Logistics Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">in Boston</span>
                            </h1>
                            <div className="text-[22px] lg:text-[28px] font-[800] text-[#1a1b3a] leading-[1.2] mb-6 tracking-tight">
                                Find More Loads. Deliver with Confidence.
                            </div>

                            <p className="text-[16px] text-gray-500 font-medium mb-6 leading-relaxed max-w-[540px]">
                                Join PickItUp, a trusted Logistics Company in Boston, and gain access to a growing network of available shipments across the United States. Whether you\'re an owner-operator, independent carrier, or fleet manager, our platform helps you locate quality freight, manage deliveries efficiently, and keep your trucks moving.
                            </p>

                            <p className="text-[16px] text-gray-500 font-medium mb-8 leading-relaxed max-w-[540px]">
                                If you\'re searching for a Logistics Company Near Me, PickItUp provides reliable freight opportunities, transparent load information, and a simple booking process that helps carriers grow their transportation business while reducing empty miles. Our nationwide logistics network connects businesses with qualified carriers for efficient and dependable freight movement.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link href="/register?role=carrier" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-[15px] uppercase tracking-wider">
                                    Become a Carrier
                                </Link>
                                <Link href="/shipments" className="bg-white border-2 border-gray-200 hover:border-yellow-300 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[15px] uppercase tracking-wider">
                                    View Load Board
                                </Link>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center">
                            <div className="w-full relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_45px_90px_-20px_rgba(250,204,21,0.25)] border-4 border-white">
                                <Image
                                    src="/freight.jpg"
                                    alt="Logistics Company in Boston"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3a]/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white font-bold">
                                    <div className="text-[11px] font-black text-yellow-400 uppercase tracking-widest mb-1">Statewide Logistics</div>
                                    <div className="text-xl">PickItUp Boston Hub</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE SECTION */}
            <section className="py-20 lg:py-24 bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-7">
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">
                                Why Carriers Choose PickItUp
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">
                                As a leading Logistics Company in Boston, PickItUp helps carriers maximize efficiency with dependable freight opportunities and streamlined logistics management. Our technology-driven platform connects qualified carriers with businesses seeking reliable transportation and freight solutions throughout Boston and across the United States.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Whether you\'re looking for a Logistics Company Near Me to secure consistent loads or expand your transportation network, PickItUp offers the tools, support, and nationwide connections to help your business grow.
                            </p>
                        </div>

                        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-purple-50 shadow-xl">
                            <h3 className="text-sm font-black text-purple-600 tracking-widest uppercase mb-6">Benefits</h3>
                            <ul className="space-y-4">
                                {benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold font-mono">✓</span>
                                        <span className="text-[15px] font-bold text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION (ALTERNATING STEPS) */}
            <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-5">
                            <span className="text-yellow-600 text-[11px] font-black tracking-widest uppercase">Process Flow</span>
                        </div>
                        <h2 className="text-[38px] lg:text-[48px] font-[900] text-[#1a1b3a] leading-tight tracking-tighter uppercase mb-4">
                            How to Find Shipments
                        </h2>
                    </div>

                    <div className="flex flex-col gap-16 lg:gap-24">
                        {steps.map((step, index) => (
                            <div
                                key={step.label}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
                            >
                                <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(234,179,8,0.2)] border border-gray-100 group">
                                    <Image
                                        src={step.src}
                                        alt={step.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-5 left-5 bg-yellow-400 text-[#1a1b3a] font-black text-sm px-4 py-1.5 rounded-full shadow-lg">
                                        Step {index + 1}
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center mb-5 shadow-sm text-yellow-600 font-black text-2xl">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-[26px] lg:text-[32px] font-[900] text-[#1a1b3a] tracking-tighter uppercase mb-4">
                                        {step.label}
                                    </h3>
                                    <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-[460px]">
                                        {step.desc}
                                    </p>
                                    <div className="mt-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST & CUSTOMER SUCCESS */}
            <section className="py-20 lg:py-24 bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">
                        Trusted by Businesses and Professional Carriers
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto mb-6">
                        Thousands of businesses and transportation professionals rely on PickItUp, a trusted Logistics Company in Boston, for dependable logistics solutions, freight matching, and nationwide delivery services. 
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
                        Whether customers are searching for a Logistics Company Near Me or a nationwide logistics partner, our commitment to transparency, technology, and responsive customer support has helped build long-term partnerships across multiple industries.
                    </p>

                    <div className="mt-12 bg-white rounded-3xl p-10 shadow-lg border border-gray-100 max-w-4xl mx-auto">
                        <h3 className="text-2xl lg:text-3xl font-[900] text-[#1a1b3a] tracking-tight mb-6">Success Stories from Our Carrier Network</h3>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium mb-4">
                            Carriers choose PickItUp because we provide reliable freight opportunities, efficient shipment management, and responsive support that helps transportation businesses operate more successfully.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">
                            From local deliveries across Boston to nationwide freight transportation, our platform helps carriers maximize vehicle utilization, reduce empty miles, and increase revenue through a trusted logistics network.
                        </p>
                    </div>

                </div>
            </section>

            {/* FAQ SECTION */}
            <FAQSection items={regionalFaqs} />

            {/* FINAL CTA SECTION */}
            <section className="py-24 bg-[#1a1b3a] text-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[38px] lg:text-[52px] font-[900] tracking-tighter uppercase mb-6 leading-tight">
                        Start Finding More Freight Today
                    </h2>
                    <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto mb-6">
                        Join PickItUp and connect with businesses looking for dependable transportation partners. As a trusted Logistics Company in Boston, we help carriers access available shipments, manage deliveries efficiently, and expand their business through a reliable nationwide freight network.
                    </p>
                    <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto mb-12">
                        Whether you\'re searching for a Logistics Company Near Me or want to partner with an experienced logistics provider, PickItUp is committed to helping your business succeed with reliable freight opportunities and professional support.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/register?role=carrier" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-12 py-5 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-sm">
                            Become a Carrier
                        </Link>
                    </div>
                </div>
            </section>

            <BackToTop />
        </div>
    );
}
