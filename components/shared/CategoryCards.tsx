'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CategoryCards() {
    const categories = [
        {
            image: '/img4_car.jpg',
            icon: '🚗',
            title: 'Automobiles and Boats',
            description: 'Use skilled transportation experts to safely transfer vehicles, motorcycles, boats, RVs, and trailers.',
            iconColor: 'bg-yellow-400',
            badge: 'Most Popular',
        },
        {
            image: '/sofa.webp',
            icon: '🛋️',
            title: 'Items for the Home',
            description: 'With hassle-free nationwide delivery, relocate furniture, appliances, antiques, and household necessities.',
            iconColor: 'bg-purple-100',
        },
        {
            image: '/heavy_eq.jpg',
            icon: '🚜',
            title: 'Heavy Machinery',
            description: 'dependable transportation options for industrial, agricultural, and construction equipment of all sizes.',
            iconColor: 'bg-yellow-100',
        },
        {
            image: '/freight.jpg',
            icon: '📦',
            title: 'Transportation',
            description: 'Palletized freight, FTL, and LTL transportation services are reasonably priced for commercial cargo and businesses.',
            iconColor: 'bg-purple-100',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What Can We Assist You With Shipping?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        For quick, safe, and reasonably priced shipping options across the nation, we link you with reputable carriers for everything from cars to large freight. Local pickup and delivery service in U.S.A is a reliable option for all shipments.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href="/register"
                            className="bg-white border-2 border-transparent rounded-2xl p-4 shadow-sm hover:border-yellow-400 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full ring-1 ring-gray-100 max-w-md mx-auto sm:max-w-none w-full"
                        >
                            {/* Card Image */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {category.badge && (
                                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                                        <span className="text-xs font-bold text-gray-900">{category.badge}</span>
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="flex items-start gap-4 flex-grow">
                                <div className={`${category.iconColor} w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                                    {category.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/register" className="text-purple-600 font-bold hover:text-purple-700 inline-flex items-center gap-2 group">
                        View all categories
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
