'use client';

import Link from 'next/link';
import Image from 'next/image';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';

export default function BostonFreightPage() {
    const bostonFaqs = [
        {
            question: "What types of freight do you transport?",
            answer: "We transport palletized goods, commercial freight, industrial equipment, retail products, furniture, construction materials, machinery, and other business shipments."
        },
        {
            question: "Do you provide Freight Service in Boston?",
            answer: "Yes. PickItUp specializes in Freight Service in Boston, offering local, regional, and nationwide transportation solutions for businesses across multiple industries."
        },
        {
            question: "Can I find Freight Service Near Me through PickItUp?",
            answer: "Absolutely. If you're looking for Freight Service Near Me, PickItUp provides reliable freight transportation throughout Boston with flexible scheduling and professional support."
        },
        {
            question: "Can I schedule recurring freight shipments?",
            answer: "Yes. We offer customized transportation schedules for businesses requiring regular freight deliveries and ongoing logistics support."
        },
        {
            question: "Do you transport freight outside Boston?",
            answer: "Yes. Along with our Freight Service in Boston, we provide nationwide freight transportation services across the United States."
        },
        {
            question: "How can I request a freight quote?",
            answer: "Simply contact our team or submit your shipment details online. We'll prepare a customized freight solution based on your transportation requirements."
        }
    ];

    const benefits = [
        "Door-to-door freight transportation",
        "Reliable pickup and delivery",
        "Experienced carrier network",
        "Real-time shipment tracking",
        "Flexible freight scheduling",
        "Competitive pricing",
        "Safe cargo handling",
        "Dedicated customer support"
    ];

    const steps = [
        {
            src: '/find-shipments1.png',
            alt: 'Request Shipment Boston',
            label: 'Step 1 – Request Your Shipment',
            desc: 'Provide your pickup location, destination, freight type, dimensions, and preferred delivery date. Our logistics specialists will review your shipping requirements and recommend the best transportation solution.'
        },
        {
            src: '/find-shipments2.png',
            alt: 'Custom Plan Boston',
            label: 'Step 2 – Receive a Customized Freight Plan',
            desc: 'We create a customized freight solution based on your shipment size, destination, and delivery timeline, ensuring efficient routing and competitive pricing.'
        },
        {
            src: '/find-shipments3.png',
            alt: 'Transit Boston',
            label: 'Step 3 – Pickup and Transportation',
            desc: 'Our professional carrier network collects your freight and transports it safely using optimized routes with real-time shipment updates.'
        },
        {
            src: '/find-shipments4.png',
            alt: 'Delivery Boston',
            label: 'Step 4 – Safe & On-Time Delivery',
            desc: 'Your shipment is delivered securely and on schedule, supported by responsive communication and exceptional customer service throughout the journey.'
        }
    ];

    const industries = [
        "Manufacturing",
        "Retail",
        "E-commerce",
        "Construction",
        "Healthcare",
        "Wholesale Distribution",
        "Automotive",
        "Industrial Equipment",
        "Furniture",
        "Consumer Goods"
    ];

    return (
        <div className="min-h-screen bg-white text-[#1a1b3a]">

            {/* HERO SECTION */}
            <section className="bg-gradient-to-b from-gray-50 to-[#fdfaff] py-16 lg:py-24 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column Content */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                                <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">Reliable Freight Service in Boston</span>
                            </div>

                            <h1 className="text-[42px] lg:text-[58px] font-[900] text-[#1a1b3a] leading-[1.1] mb-6 tracking-tighter uppercase">
                                Dependable Freight Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">For Boston Businesses</span>
                            </h1>

                            <p className="text-[16px] text-gray-500 font-medium mb-6 leading-relaxed max-w-[540px]">
                                PickItUp provides professional Freight Service in Boston for businesses that need reliable, secure, and cost-effective transportation solutions. Whether you&apos;re shipping palletized goods, commercial freight, industrial equipment, or retail inventory, our experienced logistics team ensures every shipment is handled with care and delivered on time.
                            </p>

                            <p className="text-[16px] text-gray-500 font-medium mb-8 leading-relaxed max-w-[540px]">
                                If you&apos;re searching online for Freight Service Near Me, PickItUp offers dependable local pickup, efficient freight transportation, and nationwide shipping solutions. Using advanced logistics technology, experienced carriers, and dedicated customer support, we help businesses improve supply chain efficiency while reducing transportation delays and costs.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link href="/ship" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-[15px] uppercase tracking-wider">
                                    Request a Freight Quote
                                </Link>
                                <Link href="/register?role=carrier" className="bg-white border-2 border-gray-200 hover:border-yellow-300 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[15px] uppercase tracking-wider">
                                    Become a Carrier
                                </Link>
                            </div>
                        </div>

                        {/* Right Column Graphic */}
                        <div className="relative flex items-center justify-center">
                            <div className="w-full relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_45px_90px_-20px_rgba(250,204,21,0.25)] border-4 border-white">
                                <Image
                                    src="/freight.jpg"
                                    alt="Reliable Freight Service in Boston"
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
                        {/* Title and Intro */}
                        <div className="lg:col-span-7">
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">
                                Why Choose Our Freight Service in Boston?
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">
                                At PickItUp, we understand that every shipment is important. Our Freight Service in Boston is designed to provide dependable transportation, flexible scheduling, and complete visibility throughout the shipping process. Whether you need a one-time freight shipment or ongoing logistics support, our experienced team is committed to delivering solutions tailored to your business.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                If you&apos;re looking for Freight Service Near Me, PickItUp combines local expertise with a nationwide transportation network to deliver fast, secure, and reliable freight solutions.
                            </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-purple-50 shadow-xl">
                            <h3 className="text-sm font-black text-purple-600 tracking-widest uppercase mb-6">Key Operations Perks</h3>
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
                            Ship Freight in Four Simple Steps
                        </h2>
                        <p className="text-[17px] text-gray-500 font-medium max-w-[560px] mx-auto leading-relaxed">
                            We streamline regional cargo management with secure scheduling, customized routing plans, and responsive dispatching.
                        </p>
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

            {/* INDUSTRIES WE SERVE */}
            <section className="py-20 lg:py-24 bg-gray-50 bg-gradient-to-tr from-purple-50 via-white to-yellow-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-4 leading-tight">
                            Freight Solutions for Every Industry
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">
                            Our Freight Service in Boston supports businesses across a wide range of industries, including:
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                        {industries.map((ind, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all text-center">
                                <div className="text-2xl mb-2">📦</div>
                                <div className="text-sm font-black uppercase tracking-wider text-[#1a1b3a]">{ind}</div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center max-w-2xl mx-auto mt-8">
                        <p className="text-md text-gray-500 font-bold leading-relaxed">
                            Whether you require occasional shipments or daily freight transportation, PickItUp provides scalable logistics solutions designed to support your business growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* NATIONWIDE NETWORK */}
            <section className="py-20 lg:py-24 bg-white border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-6">
                                <span className="text-yellow-600 text-[11px] font-black tracking-widest uppercase">Local to Nationwide</span>
                            </div>
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">
                                Local Expertise with Nationwide Coverage
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">
                                While we specialize in Freight Service in Boston, our transportation network extends throughout the United States. Whether you&apos;re searching for Freight Service Near Me for local deliveries or need long-distance freight transportation, PickItUp delivers reliable shipping solutions with speed, safety, and efficiency.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Our experienced logistics professionals ensure every shipment reaches its destination on time while maintaining the highest standards of care.
                            </p>
                        </div>
                        <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/img2_truck.avif"
                                alt="PickitUp Nationwide Delivery Truck"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST & CUSTOMER SUCCESS */}
            <section className="py-20 lg:py-24 bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">
                        Trusted by Businesses Across Boston
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
                        Businesses choose PickItUp because we provide dependable Freight Service in Boston backed by experienced logistics professionals, advanced transportation technology, and exceptional customer support. Whether you&apos;re searching for Freight Service Near Me or nationwide freight solutions, we&apos;re committed to helping your business move forward with confidence.
                    </p>
                    <div className="flex justify-center items-center gap-1.5 font-bold text-yellow-500 text-2xl mb-2">
                        ★★★★★
                    </div>
                    <div className="text-xs font-black uppercase text-gray-400 tracking-widest">
                        Over 10,000+ commercial shipments handled safely
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <FAQSection items={bostonFaqs} />

            {/* FINAL CTA SECTION */}
            <section className="py-24 bg-[#1a1b3a] text-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[38px] lg:text-[52px] font-[900] tracking-tighter uppercase mb-6 leading-tight">
                        Ready to Move Your Freight?
                    </h2>
                    <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-12">
                        Choose PickItUp for reliable Freight Service in Boston that keeps your business moving. Whether you&apos;re searching for Freight Service Near Me or require nationwide freight transportation, our experienced logistics team is ready to provide safe, efficient, and cost-effective shipping solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/ship" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-12 py-5 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-sm">
                            Request a Freight Quote
                        </Link>
                    </div>
                </div>
            </section>

            <BackToTop />
        </div>
    );
}
