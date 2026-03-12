'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProcessSteps() {
    const steps = [
        {
            number: '01',
            title: 'Create Your Listing',
            description: 'Provide details about what you need to move, including photos, dimensions, and locations. A clearer listing attracts better quotes.',
            features: ['Upload detailed photos', 'Specify pickup/delivery dates', 'Provide accurate dimensions'],
            image: '/1.png', // Reusing compare/list images or cloudinary if preferred
            reverse: false,
            color: 'bg-purple-100',
            textColor: 'text-purple-600'
        },
        {
            number: '02',
            title: 'Compare Quotes',
            description: 'Once listed, verified carriers will compete and send you quotes. Review their profiles, ratings, and past deliveries to make an informed choice.',
            features: ['Review carrier ratings', 'Compare transit times', 'Communicate directly with drivers'],
            image: 'https://res.cloudinary.com/dxx54fccl/image/upload/v1773331071/ey-steel-sector-of-india-2048x1365.jpg_alsfra.webp',
            reverse: true,
            color: 'bg-yellow-100',
            textColor: 'text-yellow-600'
        },
        {
            number: '03',
            title: 'Book & Pay Securely',
            description: 'Accept the best quote and book securely through our platform. Your payment is held safely until the delivery is completed.',
            features: ['Secure escrow payment', 'Ship with Confidence guarantee', '24/7 Support access'],
            image: '/2.png',
            reverse: false,
            color: 'bg-blue-100',
            textColor: 'text-blue-600'
        },
        {
            number: '04',
            title: 'Track & Receive',
            description: 'Stay updated with progress. Once your item arrives safely, release the payment to the carrier and leave a review!',
            features: ['Real-time status updates', 'Coordinate final delivery', 'Release payment on completion'],
            image: 'https://res.cloudinary.com/dxx54fccl/image/upload/v1773330994/20201028151941563.jpg_lie7hh.webp',
            reverse: true,
            color: 'bg-green-100',
            textColor: 'text-green-600'
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#fdfaff] to-white pointer-events-none" />
            
            <div className="max-w-[1240px] mx-auto px-6 lg:px-10 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
                    <span className="text-sm font-black text-purple-600 uppercase tracking-[0.2em] mb-4 block">
                        HOW IT WORKS
                    </span>
                    <h2 className="text-4xl lg:text-[54px] font-[900] text-[#1a1b3a] mb-6 tracking-tighter leading-[1.1]">
                        Four Simple Steps to a Successful Delivery
                    </h2>
                    <p className="text-lg text-gray-500 font-medium">
                        Our streamlined process takes the stress out of shipping heavy freight and specialty items.
                    </p>
                </div>

                <div className="space-y-24 lg:space-y-40">
                    {steps.map((step, index) => (
                        <div key={step.number} className={`flex flex-col ${step.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                            
                            {/* Text Content */}
                            <div className="flex-1 lg:w-1/2">
                                <div className={`w-16 h-16 rounded-2xl ${step.color} ${step.textColor} flex items-center justify-center text-2xl font-black mb-8 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default`}>
                                    {step.number}
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-[900] text-[#1a1b3a] mb-6 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                                    {step.description}
                                </p>
                                
                                <ul className="space-y-4 mb-10">
                                    {step.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[#1a1b3a] font-bold text-sm lg:text-base p-2 rounded-xl hover:bg-gray-50/80 transition-colors group/item">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover/item:scale-110 transition-transform">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {index === steps.length - 1 && (
                                    <Link href="/register" className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-[#1a1b3a] font-black px-8 py-4 rounded-xl shadow-lg transition-all uppercase tracking-wider text-sm mt-4">
                                        Ship Your Item Now
                                        <span className="text-xl">→</span>
                                    </Link>
                                )}
                            </div>

                            {/* Image Container */}
                            <div className="w-full lg:w-1/2 relative group/step-img">
                                <div className="aspect-square lg:aspect-[4/3] relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-50 flex items-center justify-center transition-all duration-700 group-hover/step-img:scale-[1.03] group-hover/step-img:rotate-0">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className={`${step.image.includes('cloudinary') ? 'object-cover' : 'object-contain scale-110'} transition-transform duration-1000 group-hover/step-img:scale-[1.15]`}
                                    />
                                    {/* Decor */}
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
                                </div>
                                {/* Behind Decor */}
                                <div className={`absolute -inset-4 lg:-inset-6 rounded-[3rem] ${step.color} opacity-30 -z-10 transform ${step.reverse ? 'rotate-3' : '-rotate-3'} scale-[1.02] transition-transform duration-700 group-hover/step-img:rotate-0 group-hover/step-img:scale-105`} />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
