export default function PricingCards() {
    const pricingCards = [
        {
            icon: '🚗',
            iconBg: 'bg-yellow-400',
            badge: 'MOST VIEWED',
            badgeColor: 'bg-yellow-400 text-gray-900',
            title: 'COST TO SHIP VEHICLES',
            tags: [
                { icon: '🚗', text: 'Cars' },
                { icon: '🚙', text: 'Trucks' },
                { icon: '🚐', text: 'SUVs' },
            ],
            description: 'Discover average shipping costs for cars, trucks, and SUVs. Compare prices from trusted auto transport carriers and find the best rate for your vehicle shipment.',
            buttonText: 'View Vehicle Costs',
            buttonColor: 'bg-yellow-400 hover:bg-yellow-500',
        },
        {
            icon: '🏠',
            iconBg: 'bg-purple-600',
            title: 'COST TO SHIP HOME GOODS',
            tags: [
                { icon: '🪑', text: 'Furniture' },
                { icon: '🔧', text: 'Appliances' },
                { icon: '📦', text: 'Antiques' },
            ],
            description: 'Explore typical costs for shipping furniture, appliances, and household items. Get estimates for moving your belongings across town or across the country.',
            buttonText: 'View Home Goods Costs',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
        },
        {
            icon: '🚚',
            iconBg: 'bg-yellow-400',
            title: 'COST TO SHIP FREIGHT',
            tags: [
                { icon: '✈️', text: 'LTL' },
                { icon: '📦', text: 'FTL' },
                { icon: '📋', text: 'Pallets' },
            ],
            description: 'Compare LTL and FTL freight rates from carriers. Find competitive pricing for commercial shipments including construction materials, pallets, and industrial cargo.',
            buttonText: 'View Freight Costs',
            buttonColor: 'bg-yellow-400 hover:bg-yellow-500',
        },
        {
            icon: '🚤',
            iconBg: 'bg-purple-600',
            title: 'COST TO SHIP A BOAT',
            tags: [
                { icon: '⛵', text: 'Sailboats' },
                { icon: '🚤', text: 'Yachts' },
                { icon: '🎣', text: 'Jet Skis' },
            ],
            description: 'Find out what it costs to transport boats of all sizes, from jet skis to yachts. Get accurate pricing estimates for marine transport services.',
            buttonText: 'View Boat Costs',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
        },
        {
            icon: '🏍️',
            iconBg: 'bg-yellow-400',
            title: 'COST TO SHIP A MOTORCYCLE',
            tags: [
                { icon: '🏍️', text: 'Street' },
                { icon: '🏁', text: 'Cruisers' },
                { icon: '✈️', text: 'ATVs' },
            ],
            description: 'Learn about motorcycle shipping costs for both open and enclosed transport. Compare estimates for shipping your bike to any destination.',
            buttonText: 'View Motorcycle Costs',
            buttonColor: 'bg-yellow-400 hover:bg-yellow-500',
        },
        {
            icon: '⚙️',
            iconBg: 'bg-purple-600',
            title: 'COST TO SHIP HEAVY EQUIPMENT',
            tags: [
                { icon: '🚜', text: 'Excavators' },
                { icon: '🏗️', text: 'Tractors' },
                { icon: '⚙️', text: 'Loaders' },
            ],
            description: 'Get pricing information for transporting heavy equipment including construction machinery, farm equipment, and industrial vehicles to any location.',
            buttonText: 'View Equipment Costs',
            buttonColor: 'bg-purple-600 hover:bg-purple-700',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-4">
                    <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">PRICING GUIDE</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4">
                    EXPLORE <span className="text-yellow-400">SHIPPING COSTS</span>
                </h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    View recent shipments and learn about shipping prices for your transportation needs
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
                            <button className={`w-full ${card.buttonColor} text-white font-semibold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2`}>
                                {card.buttonText}
                                <span>→</span>
                            </button>
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
                    <button className="bg-white hover:bg-gray-100 text-purple-700 font-bold px-8 py-4 rounded-full transition-colors inline-flex items-center gap-2">
                        Get Quote
                        <span>→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
