'use client';

export default function ServicesGrid() {
    const services = [
        {
            theme: 'purple',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
            ),
            title: 'Car Shipping Services',
            badge: 'Most Popular',
            tags: [
                { icon: '🚗', text: 'Cars' },
                { icon: '🚐', text: 'RVs' },
                { icon: '🚛', text: 'Trailers' },
                { icon: '⚙️', text: 'Parts' }
            ],
            description: "Whether you're relocating, buying a car online, or heading to a show, find trusted auto transport carriers to ship your vehicle safely across the country.",
            link: '#',
        },
        {
            theme: 'yellow',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            ),
            title: 'Home & Furniture Shipping',
            tags: [
                { icon: '🛋️', text: 'Furniture' },
                { icon: '📦', text: 'Boxes' },
                { icon: '🔨', text: 'Antiques' }
            ],
            description: "Ship furniture, appliances, and household items with professional carriers who specialize in delicate handling and white-glove service.",
            link: '#',
        },
        {
            theme: 'purple',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
            ),
            title: 'LTL Freight Services',
            tags: [
                { icon: '📦', text: 'Pallets' },
                { icon: '🏢', text: 'Commercial' },
                { icon: '📑', text: 'LTL/FTL' }
            ],
            description: "Competitive rates on less-than-truckload and full-truckload shipments. Reliable logistics for your business shipments.",
            link: '#',
        },
        {
            theme: 'yellow',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.02 0 1.85-.3 2.62-.84 2.19-1.54 5.58-1.54 7.77 0 .76.54 1.6 1.44 2.61 1.44h2v2h-2zM21 3.51L12 1 3 3.51V9c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V3.51zM12 18.94c-3.75-1.04-6.5-4.96-6.5-9.44V5.13l6.5-1.81 6.5 1.81V9.5c0 4.48-2.75 8.4-6.5 9.44z" />
                </svg>
            ),
            title: 'Boat Shipping Services',
            tags: [
                { icon: '⛵', text: 'Sailboats' },
                { icon: '🚤', text: 'Yachts' },
                { icon: '⚓', text: 'Trailers' }
            ],
            description: "Professional boat transport services for vessels of all sizes. Safe delivery to any coast or inland lake destination.",
            link: '#',
        },
        {
            theme: 'purple',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-9 6H4v3h2.15c.19 1.16 1.21 2 2.45 2 1.24 0 2.26-.84 2.45-2H22v-3h-2.15c-.19-1.16-1.21-2-2.45-2-1.24 0-2.26.84-2.45 2h-4.95v-3.66c.33-.2.62-.46.85-.77l1.01-1.35c.35-.47.31-1.13-.1-1.55l-1.08-1.09c-.19-.19-.44-.29-.7-.29h-2.1c-.26 0-.51.1-.7.29l-1.08 1.09c-.41.42-.45 1.08-.1 1.55l1.01 1.35c.23.31.52.57.85.77V13z" />
                </svg>
            ),
            title: 'Motorcycle Shipping Services',
            tags: [
                { icon: '🏍️', text: 'Bikes' },
                { icon: '🏁', text: 'ATVs' },
                { icon: '📦', text: 'Crated' }
            ],
            description: "Specialized motorcycle transport with secure tie-downs and enclosed options for maximum protection during transit.",
            link: '#',
        },
        {
            theme: 'yellow',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 13h-4v-2h4v2zm0-4h-4V7h4v2zm0 8h-4v2h4v-2zm-6-2.5c0-2.5-2.01-4.5-4.5-4.5h-1V12h3V6.5h-5.5V12h3V6.44C6.34 6.77 5.03 8.2 4.6 10H2v4h2.1c.45 1.8 2.1 3.14 4.05 3.39V21h3v-3.61c1.95-.25 3.6-1.59 4.05-3.39H16v-2.5z" />
                </svg>
            ),
            title: 'Heavy Equipment Shipping',
            tags: [
                { icon: '🚜', text: 'Construction' },
                { icon: '🏗️', text: 'Industrial' },
                { icon: '⚙️', text: 'Oversized' }
            ],
            description: "Transport construction equipment and heavy machinery with specialized carriers equipped for oversized and overweight loads.",
            link: '#',
        },
    ];

    const themeStyles = {
        purple: {
            lightBg: 'bg-[#F0EDFF]',
            lightText: 'text-[#7C3AED]',
            hoverBg: 'group-hover:bg-[#7C3AED]',
            hoverShadow: 'group-hover:shadow-[0_10px_20px_rgba(124,58,237,0.3)]',
            hoverGlow: 'group-hover:bg-purple-500/10',
            underline: 'bg-[#7C3AED]',
            iconGradient: 'group-hover:from-[#7C3AED] group-hover:to-[#6D28D9]',
            btnBg: 'bg-[#7C3AED] hover:bg-[#6D28D9]',
            btnShadow: 'shadow-purple-600/10 hover:shadow-purple-600/25',
            badge: 'bg-[#7C3AED]',
            iconBox: 'bg-purple-100/50 border-purple-100/50 text-[#7C3AED]',
            hoverIconText: 'group-hover:text-white',
        },
        yellow: {
            lightBg: 'bg-[#FFF9E6]',
            lightText: 'text-[#D97706]',
            hoverBg: 'group-hover:bg-[#D97706]',
            hoverShadow: 'group-hover:shadow-[0_10px_20px_rgba(217,119,6,0.2)]',
            hoverGlow: 'group-hover:bg-yellow-500/10',
            underline: 'bg-[#D97706]',
            iconGradient: 'group-hover:from-[#FBBF24] group-hover:to-[#D97706]',
            btnBg: 'bg-[#FBBF24] hover:bg-[#D97706]',
            btnShadow: 'shadow-yellow-600/10 hover:shadow-yellow-600/25',
            badge: 'bg-[#D97706]',
            iconBox: 'bg-yellow-100/50 border-yellow-100/50 text-[#D97706]',
            hoverIconText: 'group-hover:text-[#1a1b3a]', // Darker for yellow background contrast
        }
    };

    return (
        <section className="relative py-24 lg:py-32 bg-[#F7F8FC] overflow-hidden">
            {/* Background Radial Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-300/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-300/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 mb-6">
                        <span className="text-purple-600 text-[11px] font-black uppercase tracking-[0.2em]">Resources & Guides</span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-[900] text-[#1a1b3a] leading-[1.1] mb-6 tracking-tighter uppercase">
                        DIVE DEEPER INTO<br />
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            BIG SHIPPING
                        </span>
                    </h2>

                    <div className="w-12 h-1.5 bg-purple-600 rounded-full mx-auto mb-8 opacity-20" />

                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Find detailed guides and see recent shipping costs for furniture, cars, and more
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const style = themeStyles[service.theme as keyof typeof themeStyles];
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(75,20,140,0.12)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full overflow-hidden max-w-md mx-auto md:max-w-none w-full ${service.theme === 'purple' ? 'hover:border-purple-200' : 'hover:border-yellow-200'}`}
                            >
                                {/* Hover Bubble Gradient */}
                                <div className={`absolute top-[-60px] right-[-60px] w-56 h-56 transition-all duration-700 pointer-events-none blur-[50px] rounded-full bg-transparent ${style.hoverGlow}`} />

                                {service.badge && (
                                    <div className="absolute top-6 right-6 z-10">
                                        <span className={`${style.badge} text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest border-2 border-white/20`}>
                                            {service.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Icon Box with Gradient - FIXED: Added bg-gradient-to-br */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 shadow-sm border bg-gradient-to-br ${style.iconBox} ${style.hoverShadow} ${style.iconGradient} ${style.hoverIconText} group-hover:rotate-3 group-hover:border-transparent`}>
                                    <span className="group-hover:scale-110 transition-transform duration-500">
                                        {service.icon}
                                    </span>
                                </div>

                                {/* Title with Animated Underline */}
                                <div className="relative inline-block mb-4">
                                    <h3 className={`text-2xl font-black tracking-tight uppercase transition-colors inline-block ${style.lightText}`}>
                                        {service.title}
                                    </h3>
                                    <div className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 mt-1 opacity-50 ${style.underline}`} />
                                    <div className="h-[2px] bg-gray-200 w-full absolute bottom-[-5px] left-0 pointer-events-none opacity-20" />
                                </div>

                                {/* Tags with Hover Colors */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {service.tags.map((tag, tIndex) => (
                                        <span
                                            key={tIndex}
                                            className={`text-[11px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-tight flex items-center gap-1.5 transition-all duration-300 ${style.lightBg} ${style.lightText} border-transparent group-hover:text-white ${style.hoverBg}`}
                                        >
                                            <span className="text-sm scale-110 group-hover:brightness-0 group-hover:invert">{tag.icon}</span>
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-[17px] text-gray-600 font-medium mb-10 leading-relaxed flex-grow">
                                    {service.description}
                                </p>

                                {/* Premium Button */}
                                <div className="mt-auto">
                                    <button className={`${style.btnBg} text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group/btn text-sm uppercase tracking-widest w-full ${style.btnShadow}`}>
                                        Learn more
                                        <span className="group-hover/btn:translate-x-1.5 transition-transform">→</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
