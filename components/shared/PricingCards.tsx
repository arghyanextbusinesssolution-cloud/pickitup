'use client';

import Link from 'next/link';

export default function PricingCards() {
    const pricingCards = [
        {
            icon: '🚗',
            iconBg: 'bg-yellow-400',
            badge: 'MOST VIEWED',
            badgeColor: 'bg-yellow-400 text-gray-900',
            title: 'Vehicle Shipping Costs',
            tags: [
                { icon: '🚗', text: 'Cars' },
                { icon: '🚙', text: 'Trucks' },
                { icon: '🚐', text: 'SUVs' },
            ],
            description: 'Find out how much automobiles, trucks, SUVs, and vehicle transport services will cost right now.',
            buttonText: 'View Vehicle Costs',
            buttonColor: 'bg-yellow-400 hover:bg-yellow-500',
            link: '/register'
        },
        {
            icon: '🏠',
            iconBg: 'bg-purple-600',
            title: 'The price of shipping goods home',
            tags: [
                { icon: '🪑', text: 'Furniture' },
                { icon: '🔧', text: 'Appliances' },
                { icon: '📦', text: 'Antiques' },
            ],
            description: 'Calculate the cost of transporting household goods, appliances, furniture, and antiques across the country.',
            buttonText: 'View Home Goods Costs',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            link: '/register'
        },
        {
            icon: '🚚',
            iconBg: 'bg-yellow-400',
            title: 'The cost of shipping goods',
            tags: [
                { icon: '✈️', text: 'LTL' },
                { icon: '📦', text: 'FTL' },
                { icon: '📋', text: 'Pallets' },
            ],
            description: 'Examine the costs of LTL and FTL freight shipment for industrial cargo, pallets, and commercial goods.',
            buttonText: 'View Freight Costs',
            buttonColor: 'bg-yellow-400 hover:bg-yellow-500',
            link: '/register'
        },
        {
            icon: '🚤',
            iconBg: 'bg-purple-600',
            title: 'The Price of Shipping a Boat',
            tags: [
                { icon: '⛵', text: 'Sailboats' },
                { icon: '🚤', text: 'Yachts' },
                { icon: '🎣', text: 'Jet Skis' },
            ],
            description: 'For boat, yacht, sailboat, and maritime transportation services, find reasonable prices.',
            buttonText: 'View Boat Costs',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            link: '/register'
        },
        {
            icon: '🏍️',
            iconBg: 'bg-yellow-400',
            title: 'The price of shipping a motorcycle',
            tags: [
                { icon: '🏍️', text: 'Street' },
                { icon: '🏁', text: 'Cruisers' },
                { icon: '✈️', text: 'ATVs' },
            ],
            description: 'Examine the expenses of secure shipping for motorcycles, cruisers, and ATVs.',
            buttonText: 'View Motorcycle Costs',
            buttonColor: 'bg-yellow-400 hover:bg-yellow-500',
            link: '/register'
        },
        {
            icon: '⚙️',
            iconBg: 'bg-purple-600',
            title: 'Heavy Equipment Shipping Costs',
            tags: [
                { icon: '🚜', text: 'Excavators' },
                { icon: '🏗️', text: 'Tractors' },
                { icon: '⚙️', text: 'Loaders' },
            ],
            description: 'Get precise rates for the transportation of industrial machinery, tractors, loaders, and excavators.',
            buttonText: 'View Equipment Costs',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
            link: '/register'
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-4">
                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">PRICING GUIDE</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4">
                    EXAMINE THE <span className="text-yellow-400">COST OF SHIPPING</span>
                </h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    Use our reliable Local pickup and delivery service in U.S.A. to compare current shipping prices and estimate transportation expenses for your unique shipping needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {pricingCards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-300 transition-all hover:-translate-y-1 cursor-pointer max-w-md mx-auto md:max-w-none w-full"
                        >
                            {/* Icon and Badge */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}>
                                    {card.icon}
                                </div>
                                {card.badge && (
                                    <span className={`${card.badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
                                        {card.badge}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {card.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                        <span>{tag.icon}</span>
                                        {tag.text}
                                    </span>
                                ))}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-6">{card.description}</p>

                            {/* Button */}
                            <Link href={card.link} className={`w-full ${card.buttonColor} text-white font-semibold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2`}>
                                {card.buttonText}
                                <span>→</span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="bg-gradient-to-r from-purple-700 to-purple-600 rounded-3xl p-8 lg:p-12 text-center text-white">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-3xl">
                            📋
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Get an Instant Quote</h3>
                    <p className="text-purple-100 mb-6 max-w-xl mx-auto">
                        Enter your shipment details and receive competitive quotes from verified carriers. Fast service, no hidden fees.
                    </p>
                    <Link href="/register" className="bg-white hover:bg-gray-100 text-purple-700 font-bold px-8 py-4 rounded-full transition-colors inline-flex items-center gap-2">
                        Get Quote
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
