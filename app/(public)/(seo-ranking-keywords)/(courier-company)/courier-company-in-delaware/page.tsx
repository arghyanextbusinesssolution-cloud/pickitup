import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FAQSection from '@/components/shared/FAQSection';
import BackToTop from '@/components/shared/BackToTop';

export const metadata: Metadata = {
    title: 'Trusted Courier Company in Delaware | PickItUp',
    description: 'Looking for a reliable Courier Company in Delaware? PickItUp provides fast, secure, and professional courier and delivery solutions for businesses and individuals.',
};

export default function DelawareCourierPage() {
    const location = 'Delaware';
    const regionalFaqs = [
        { question: "What courier services do you offer?", answer: "We provide same-day delivery, scheduled courier services, document delivery, parcel transportation, business deliveries, and door-to-door shipping solutions." },
        { question: `Do you provide courier services throughout ${location}?`, answer: `Yes. As a leading Courier Company in ${location}, we provide reliable pickup and delivery services across the state and throughout the United States.` },
        { question: "Can businesses schedule recurring deliveries?", answer: "Absolutely. We offer flexible delivery schedules for businesses that require daily, weekly, or recurring courier services." },
        { question: "I searched for a \"Courier Company Near Me.\" Do you provide local delivery?", answer: `Yes. If you're looking for a Courier Company Near Me, PickItUp offers fast local courier services across ${location} with professional pickup and delivery solutions.` },
        { question: "How do I schedule a pickup?", answer: "Simply contact our team or request a quote online. We'll arrange a convenient pickup time and ensure your shipment is delivered safely and on schedule." }
    ];
    const benefits = ["Same-day courier service", "Scheduled pickup and delivery", "Door-to-door transportation", "Real-time shipment tracking", "Experienced delivery professionals", "Business and personal courier solutions", "Competitive pricing", "Dedicated customer support"];
    const steps = [
        { src: '/find-shipments1.png', alt: `Book Courier ${location}`, label: 'Step 1 – Book Your Courier Service', desc: 'Share your pickup and delivery details, including package size, destination, and preferred delivery time. Our team will quickly arrange the best transportation solution.' },
        { src: '/find-shipments2.png', alt: `Pickup Location ${location}`, label: 'Step 2 – Pickup at Your Location', desc: 'Our professional courier arrives at your home, office, or business to collect your shipment safely and on time.' },
        { src: '/find-shipments3.png', alt: `Secure Transport ${location}`, label: 'Step 3 – Fast & Secure Transportation', desc: 'Your package is transported using efficient delivery routes with continuous tracking and careful handling throughout the journey.' },
        { src: '/find-shipments4.png', alt: `On-Time Delivery ${location}`, label: 'Step 4 – On-Time Delivery', desc: 'Your shipment reaches its destination safely and promptly, giving you peace of mind and dependable service every step of the way.' }
    ];
    const industries = ["E-commerce", "Retail", "Healthcare", "Legal Services", "Financial Institutions", "Manufacturing", "Automotive", "Real Estate", "Corporate Offices", "Small Businesses"];

    return (
        <div className="min-h-screen bg-white text-[#1a1b3a]">
            <section className="bg-gradient-to-b from-gray-50 to-[#fdfaff] py-16 lg:py-24 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
                                <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">Courier Company in {location}</span>
                            </div>
                            <h1 className="text-[42px] lg:text-[58px] font-[900] text-[#1a1b3a] leading-[1.1] mb-6 tracking-tighter uppercase">
                                Trusted Courier Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">in {location}</span>
                            </h1>
                            <div className="text-[22px] lg:text-[28px] font-[800] text-[#1a1b3a] leading-[1.2] mb-6 tracking-tight">Fast, Secure &amp; Reliable Courier Services for Every Delivery</div>
                            <p className="text-[16px] text-gray-500 font-medium mb-6 leading-relaxed max-w-[540px]">PickItUp is a leading Courier Company in {location}, providing dependable courier and delivery solutions for businesses and individuals. Whether you need same-day delivery, scheduled pickups, document delivery, or parcel transportation, our experienced team ensures your shipments arrive safely and on time.</p>
                            <p className="text-[16px] text-gray-500 font-medium mb-8 leading-relaxed max-w-[540px]">If you&apos;ve been searching for a Courier Company Near Me, PickItUp offers fast response times, professional drivers, and reliable service throughout {location}.</p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link href="/ship" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-[15px] uppercase tracking-wider">Request a Delivery Quote</Link>
                                <Link href="/ship" className="bg-white border-2 border-gray-200 hover:border-yellow-300 text-[#1a1b3a] font-[900] px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[15px] uppercase tracking-wider">Schedule a Pickup</Link>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="w-full relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_45px_90px_-20px_rgba(250,204,21,0.25)] border-4 border-white">
                                <Image src="/freight.jpg" alt={`Courier Company in ${location}`} fill className="object-cover" priority />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3a]/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white font-bold">
                                    <div className="text-[11px] font-black text-yellow-400 uppercase tracking-widest mb-1">Trusted Courier Network</div>
                                    <div className="text-xl">PickItUp {location} Hub</div>
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
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">Why Choose Our Courier Services?</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">As a trusted Courier Company in {location}, we focus on speed, reliability, and customer satisfaction. Every delivery is managed with care, supported by advanced tracking technology and a professional courier network.</p>
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
                        <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-5"><span className="text-yellow-600 text-[11px] font-black tracking-widest uppercase">How It Works</span></div>
                        <h2 className="text-[38px] lg:text-[48px] font-[900] text-[#1a1b3a] leading-tight tracking-tighter uppercase mb-4">Delivering Your Packages in Four Simple Steps</h2>
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
                        <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-4 leading-tight">Reliable Delivery Services for Businesses</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium">Our Courier Company in {location} supports a wide range of industries:</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">{industries.map((ind, idx) => (<div key={idx} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all text-center"><div className="text-2xl mb-2">🚀</div><div className="text-sm font-black uppercase tracking-wider text-[#1a1b3a]">{ind}</div></div>))}</div>
                </div>
            </section>
            <section className="py-20 lg:py-24 bg-white border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-6"><span className="text-yellow-600 text-[11px] font-black tracking-widest uppercase">Local &amp; Nationwide Delivery</span></div>
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">Your Local Courier Partner with Nationwide Reach</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-6">Searching online for a Courier Company Near Me? PickItUp proudly serves customers throughout {location} while also offering nationwide delivery solutions. Our goal is to make every delivery simple, efficient, and stress-free.</p>
                        </div>
                        <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl"><Image src="/img2_truck.avif" alt="PickitUp Courier Truck" fill className="object-cover" /></div>
                    </div>
                </div>
            </section>
            <section className="py-20 lg:py-24 bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-6 leading-tight">Delivering Reliability with Every Shipment</h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto mb-8">Businesses and individuals trust our Courier Company in {location} for dependable delivery services backed by experienced professionals, modern technology, and exceptional customer support.</p>
                    <div className="flex justify-center items-center gap-1.5 font-bold text-yellow-500 text-2xl mb-2">★★★★★</div>
                    <div className="text-xs font-black uppercase text-gray-400 tracking-widest">Over 10,000+ packages delivered on time</div>
                </div>
            </section>
            <FAQSection items={regionalFaqs} />
            <section className="py-24 bg-[#1a1b3a] text-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-[38px] lg:text-[52px] font-[900] tracking-tighter uppercase mb-6 leading-tight">Ready to Send Your Package?</h2>
                    <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto mb-12">Choose PickItUp, the trusted Courier Company in {location}, for fast, secure, and reliable delivery services. Whether you&apos;re searching for a Courier Company Near Me or need nationwide shipping solutions, our team is here to help.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center"><Link href="/ship" className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-[900] px-12 py-5 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-sm">Get a Free Courier Quote</Link></div>
                </div>
            </section>
            <BackToTop />
        </div>
    );
}
