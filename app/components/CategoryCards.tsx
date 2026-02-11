'use client';

import Image from 'next/image';

export default function CategoryCards() {
    const categories = [
        {
            image: '/img4_car.jpg',
            icon: '🚗',
            title: 'Vehicles & Boats',
            description: 'Cars, Boats, Motorcycles, RVs & more',
            iconColor: 'bg-yellow-400',
            badge: 'Most Popular',
        },
        {
            image: '/sofa.webp',
            icon: '🛋️',
            title: 'Household Items',
            description: 'Furniture, Appliances & more',
            iconColor: 'bg-purple-100',
        },
        {
            image: '/heavy_eq.jpg',
            icon: '🚜',
            title: 'Heavy Equipment',
            description: 'Farm, Construction & Industrial',
            iconColor: 'bg-yellow-100',
        },
        {
            image: '/freight.jpg',
            icon: '📦',
            title: 'Freight',
            description: 'LTL, FTL & Palletized Cargo',
            iconColor: 'bg-purple-100',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        What can we help you ship?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        From cars to heavy machinery, we connect you with trusted carriers for any shipment
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {categories.map((category, index) => (
                        <div
                            key={index}
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
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="#" className="text-purple-600 font-bold hover:text-purple-700 inline-flex items-center gap-2 group">
                        View all categories
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
