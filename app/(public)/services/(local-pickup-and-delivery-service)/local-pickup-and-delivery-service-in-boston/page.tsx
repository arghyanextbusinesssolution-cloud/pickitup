import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';

export const metadata: Metadata = {
    title: 'Reliable Local Pickup and Delivery Service in Boston | PickItUp',
    description: 'Looking for a dependable Local Pickup and Delivery Service in Boston? PickItUp provides professional pickup and delivery solutions for businesses and individuals.',
};

export default function BostonLocalPickupPage() {
    const regionalFaqs = [
        { question: "What pickup and delivery services do you offer?", answer: "We provide same-day pickup, scheduled deliveries, business transportation, residential deliveries, retail order fulfillment, document delivery, and last-mile delivery services." },
        { question: "Do you provide Local Pickup and Delivery Service in Boston?", answer: "Yes. PickItUp specializes in Local Pickup and Delivery Service in Boston, helping businesses and individuals with fast, secure, and reliable transportation throughout the area." },
        { question: "Can I schedule recurring pickups?", answer: "Absolutely. We offer daily, weekly, and customized pickup schedules for businesses that require regular transportation services." },
        { question: "I searched for a \"Local Pickup and Delivery Service Near Me.\" Can you help?", answer: "Yes. If you're looking for a Local Pickup and Delivery Service Near Me, PickItUp provides prompt pickup and delivery services throughout Boston with flexible scheduling and dependable customer support." },
        { question: "How do I book a pickup?", answer: "Simply contact our team or request a quote online. We'll arrange a convenient pickup time and provide a transportation solution tailored to your needs." }
    ];
    const benefits = ["Same-day pickup and delivery", "Door-to-door transportation", "Scheduled and recurring pickups", "Real-time shipment tracking", "Professional delivery drivers", "Secure package handling", "Affordable pricing", "Dedicated customer support"];
    const steps = [
        { src: '/find-shipments1.png', alt: 'Schedule Pickup Boston', label: 'Step 1 – Schedule Your Pickup', desc: 'Book your pickup online or contact our team with your pickup location, destination, package details, and preferred delivery time.' },
        { src: '/find-shipments2.png', alt: 'Collect Shipment Boston', label: 'Step 2 – We Collect Your Shipment', desc: 'Our professional driver arrives promptly to collect your package, documents, or freight from your home, office, warehouse, or business location.' },
        { src: '/find-shipments3.png', alt: 'Transportation Boston', label: 'Step 3 – Safe & Efficient Transportation', desc: 'Your shipment is transported using optimized delivery routes with continuous tracking and careful handling to ensure safe arrival.' },
        { src: '/find-shipments4.png', alt: 'Delivered On Time Boston', label: 'Step 4 – Delivered On Time', desc: 'We complete your delivery quickly and efficiently while keeping you updated throughout the entire process.' }
    ];
    const industries = ["E-commerce", "Retail Stores", "Medical & Healthcare", "Legal Offices", "Manufacturing", "Automotive", "Construction", "Restaurants & Food Suppliers", "Corporate Offices", "Small Businesses"];

    return (
        <div className="min-h-screen bg-white text-[#1a1b3a]">
            <section className="bg-gradient-to-b from-gray-50 to-[#fdfaff] py-16 lg:py-24 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                                <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">Local Pickup and Delivery Service in Boston</span>
                            </div>
                            <h1 className="text-[42px] lg:text-[58px] font-[900] text-[#1a1b3a] leading-[1.1] mb-6 tracking-tighter uppercase">
                                Reliable Local Pickup and Delivery Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">in Boston</span>
                            </h1>
                            <div className="text-[22px] lg:text-[28px] font-[800] text-[#1a1b3a] leading-[1.2] mb-6 tracking-tight">Fast, Secure &amp; Hassle-Free Pickup and Delivery Solutions</div>
                            <p className="text-[16px] text-gray-500 font-medium mb-6 leading-relaxed max-w-[540px]">Looking for a dependable Local Pickup and Delivery Service in Boston? PickItUp provides professional pickup and delivery solutions for businesses and individuals who need fast, secure, and on-time transportation. Our experienced team ensures every delivery is handled with care.</p>
                            <p className="text-[16px] text-gray-500 font-medium mb-8 leading-relaxed max-w-[540px]">If you&apos;ve been searching for a Local Pickup and Delivery Service Near Me, PickItUp offers flexible scheduling, same-day service options, real-time tracking, and dependable customer support throughout Boston.</p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link href="/ship" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-[15px] uppercase tracking-wider">Schedule a Pickup</Link>
                                <Link href="/ship" className="bg-white border-2 border-gray-200 hover:border-yellow-300 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[15px] uppercase tracking-wider">Get a Free Quote</Link>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="w-full relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_45px_90px_-20px_rgba(250,204,21,0.25)] border-4 border-white">
                                <Image src="/freight.jpg" alt="Local Pickup and Delivery Service in Boston" fill className="object-cover" priority />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3a]/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white font-bold">
                                    <div className="text-[11px] font-black text-yellow-400 uppercase tracking-widest mb-1">Regional Logistics</div>
                                    <div className="text-xl">PickItUp Boston Hub</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 lg:py-24 bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-7">
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">Why Choose Our Local Pickup and Delivery Service?</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">Our Local Pickup and Delivery Service in Boston is designed to provide dependable transportation with flexible scheduling, professional drivers, and outstanding customer service.</p>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">Whether you need a one-time delivery or recurring pickup services, we offer customized solutions that fit your schedule and budget.</p>
                        </div>
                        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-purple-50 shadow-xl">
                            <h3 className="text-sm font-black text-purple-600 tracking-widest uppercase mb-6">Benefits</h3>
                            <ul className="space-y-4">{benefits.map((b, i) => (<li key={i} className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold font-mono">✓</span><span className="text-[15px] font-bold text-gray-700">{b}</span></li>))}</ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-5"><span className="text-yellow-600 text-[11px] font-black tracking-widest uppercase">Process Flow</span></div>
                        <h2 className="text-[38px] lg:text-[48px] font-[900] text-[#1a1b3a] leading-tight tracking-tighter uppercase mb-4">Pickup and Delivery Made Simple</h2>
                    </div>
                    <div className="flex flex-col gap-16 lg:gap-24">
                        {steps.map((step, index) => (
                            <div key={step.label} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>
                                <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(234,179,8,0.2)] border border-gray-100 group">
                                    <Image src={step.src} alt={step.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute top-5 left-5 bg-yellow-400 text-[#1a1b3a] font-black text-sm px-4 py-1.5 rounded-full shadow-lg">Step {index + 1}</div>
                                </div>
                                <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center mb-5 shadow-sm text-yellow-600 font-black text-2xl">{index + 1}</div>
                                    <h3 className="text-[26px] lg:text-[32px] font-[900] text-[#1a1b3a] tracking-tighter uppercase mb-4">{step.label}</h3>
                                    <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-[460px]">{step.desc}</p>
                                    <div className="mt-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 lg:py-24 bg-gray-50 bg-gradient-to-tr from-purple-50 via-white to-yellow-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-4 leading-tight">Serving Businesses Across Boston</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">Our Local Pickup and Delivery Service in Boston supports businesses across multiple industries:</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">{industries.map((ind, idx) => (<div key={idx} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all text-center"><div className="text-2xl mb-2">📦</div><div className="text-sm font-black uppercase tracking-wider text-[#1a1b3a]">{ind}</div></div>))}</div>
                </div>
            </section>
            <section className="py-20 lg:py-24 bg-white border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-6"><span className="text-yellow-600 text-[11px] font-black tracking-widest uppercase">Your Trusted Delivery Partner</span></div>
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">Local Service with Nationwide Support</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">Searching for a Local Pickup and Delivery Service Near Me? PickItUp proudly serves communities throughout Boston with prompt delivery services, plus nationwide shipping options.</p>
                        </div>
                        <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl"><Image src="/img2_truck.avif" alt="PickitUp Delivery Truck" fill className="object-cover" /></div>
                    </div>
                </div>
            </section>
            <section className="py-20 lg:py-24 bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">Delivering More Than Just Packages</h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto mb-8">Our Local Pickup and Delivery Service in Boston helps businesses improve efficiency while giving individuals peace of mind that their shipments will arrive safely and on time.</p>
                    <div className="flex justify-center items-center gap-1.5 font-bold text-yellow-500 text-2xl mb-2">★★★★★</div>
                    <div className="text-xs font-black uppercase text-gray-400 tracking-widest">Over 10,000+ packages delivered on time</div>
                </div>
            </section>
            <FAQSection items={regionalFaqs} />
            <section className="py-24 bg-[#1a1b3a] text-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[38px] lg:text-[52px] font-[900] tracking-tighter uppercase mb-6 leading-tight">Schedule Your Pickup Today</h2>
                    <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto mb-12">Choose PickItUp for a dependable Local Pickup and Delivery Service in Boston. Whether you&apos;re searching for a Local Pickup and Delivery Service Near Me or need ongoing business delivery solutions, our team is ready to help.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center"><Link href="/ship" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-12 py-5 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-sm">Schedule Your Pickup</Link></div>
                </div>
            </section>
            <BackToTop />
        </div>
    );
}
