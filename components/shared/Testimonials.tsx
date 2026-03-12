'use client';

import Image from 'next/image';
import Link from 'next/link';

const testimonials = [
    {
        image: '/img4_car.jpg', // Motorcycle placeholder if needed, using car for now
        quote: "I was nervous about shipping my vintage motorcycle across the country, but pickitup made it incredibly easy. The carrier was professional, kept me updated throughout the journey, and delivered it in perfect condition. Couldn't be happier!",
        stars: 5,
        name: 'James Mitchell',
        location: 'Austin, TX',
        initials: 'JM',
        color: 'bg-purple-600',
    },
    {
        image: '/img2_truck.avif', // Camper/Truck placeholder
        quote: "We purchased a travel trailer from a seller 1,500 miles away. pickitup connected us with an amazing transporter who treated our new camper like it was their own. Great communication, fair price, and on-time delivery!",
        stars: 5,
        name: 'Sarah Reynolds',
        location: 'Denver, CO',
        initials: 'SR',
        color: 'bg-yellow-500',
    },
    {
        image: '/sofa.webp', // Antique/Furniture placeholder
        quote: "Found the perfect antique chair at an estate sale across the state. Regular shipping was way too expensive, but pickitup helped me find a carrier already heading my way. Saved over 60% and got white-glove treatment!",
        stars: 4,
        name: 'Michael Patterson',
        location: 'Portland, OR',
        initials: 'MP',
        color: 'bg-purple-600',
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <h2 className="text-[32px] md:text-[44px] font-[900] text-[#1a1b3a] tracking-tight uppercase mb-4 leading-tight">
                        PEOPLE LOVE SHIPPING WITH PICKITUP
                    </h2>
                    <div className="w-16 h-1.5 bg-yellow-400 rounded-full mx-auto" />
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-[#FAFAFF] rounded-[2.5rem] p-8 sm:p-10 pt-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col h-full max-w-md mx-auto md:max-w-none w-full"
                        >
                            {/* Floating Avatar Circle */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-[6px] border-[#7C3AED] overflow-hidden shadow-xl bg-white">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Yellow Quote Badge */}
                                    <div className="absolute bottom-0 right-0 bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                        <span className="text-[10px] font-black">❝</span>
                                    </div>
                                </div>
                            </div>

                            {/* Large Opening Quote Icon */}
                            <div className="text-purple-200 text-6xl font-serif leading-none mb-4 h-8 select-none">“</div>

                            {/* Testimonial Text */}
                            <p className="text-[17px] text-gray-500 font-medium leading-[1.6] mb-8 flex-grow">
                                "{item.quote}"
                            </p>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-lg ${i < item.stars ? 'text-yellow-400' : 'text-gray-200'}`}>
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-200/50 w-full mb-6" />

                            {/* User Bio */}
                            <div className="flex items-center gap-4">
                                <div className={`${item.color} w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg`}>
                                    {item.initials}
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-[900] text-[#1a1b3a] leading-none mb-1">
                                        {item.name}
                                    </h4>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                        ({item.location})
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Link */}
                <div className="text-center mt-16">
                    <Link href="/register" className="text-[#7C3AED] font-[900] text-sm uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                        Read more customer stories
                        <span className="text-lg">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
