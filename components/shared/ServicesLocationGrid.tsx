'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ServicesLocationGrid() {
    const router = useRouter();
    const [selectedService, setSelectedService] = useState<{ title: string, slug: string } | null>(null);

    const services = [
        {
            theme: 'purple',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
            ),
            title: 'Reliable Freight Service',
            slug: 'reliable-freight-service',
            description: "Dependable nationwide freight services ensuring your commercial shipping needs are met on time.",
        },
        {
            theme: 'yellow',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
            ),
            title: 'Logistics Company',
            slug: 'logistics-company',
            description: "Comprehensive logistics solutions tailored for businesses of all sizes to streamline supply chains.",
        },
        {
            theme: 'purple',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.02 0 1.85-.3 2.62-.84 2.19-1.54 5.58-1.54 7.77 0 .76.54 1.6 1.44 2.61 1.44h2v2h-2zM21 3.51L12 1 3 3.51V9c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V3.51zh-2v2h-2zM21 3.51L12 1 3 3.51V9c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V3.51zM12 18.94c-3.75-1.04-6.5-4.96-6.5-9.44V5.13l6.5-1.81 6.5 1.81V9.5c0 4.48-2.75 8.4-6.5 9.44z" />
                </svg>
            ),
            title: 'Pickup and Delivery Services',
            slug: 'pickup-and-delivery-services',
            description: "Quick and professional pickup and delivery services designed to keep your business moving fast.",
        },
        {
            theme: 'yellow',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-9 6H4v3h2.15c.19 1.16 1.21 2 2.45 2 1.24 0 2.26-.84 2.45-2H22v-3h-2.15c-.19-1.16-1.21-2-2.45-2-1.24 0-2.26.84-2.45 2h-4.95v-3.66c.33-.2.62-.46.85-.77l1.01-1.35c.35-.47.31-1.13-.1-1.55l-1.08-1.09c-.19-.19-.44-.29-.7-.29h-2.1c-.26 0-.51.1-.7.29l-1.08 1.09c-.41.42-.45 1.08-.1 1.55l1.01 1.35c.23.31.52.57.85.77V13z" />
                </svg>
            ),
            title: 'Local Pickup and Delivery',
            slug: 'local-pickup-and-delivery-service',
            description: "Dedicated local courier solutions that bridge the last-mile gap securely and affordably.",
        },
        {
            theme: 'purple',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 13h-4v-2h4v2zm0-4h-4V7h4v2zm0 8h-4v2h4v-2zm-6-2.5c0-2.5-2.01-4.5-4.5-4.5h-1V12h3V6.5h-5.5V12h3V6.44C6.34 6.77 5.03 8.2 4.6 10H2v4h2.1c.45 1.8 2.1 3.14 4.05 3.39V21h3v-3.61c1.95-.25 3.6-1.59 4.05-3.39H16v-2.5z" />
                </svg>
            ),
            title: 'Fastest Shipping Company',
            slug: 'fastest-shipping-company',
            description: "Industry-leading shipping speeds guaranteeing minimal downtime and maximum efficiency.",
        },
        {
            theme: 'yellow',
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            ),
            title: 'Courier Company',
            slug: 'courier-company',
            description: "Direct door-to-door courier options perfect for essential, time-sensitive parcel shipping.",
        },
    ];

    const locations = [
        { name: 'Brooklyn', slug: 'brooklyn' },
        { name: 'Delaware', slug: 'delaware' },
        { name: 'Boston', slug: 'boston' },
        { name: 'New Jersey', slug: 'new-jersey' },
        { name: 'New York', slug: 'new-york' },
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
            hoverIconText: 'group-hover:text-[#1a1b3a]',
        }
    };

    const handleLocationSelect = (locationSlug: string) => {
        // Keeping here just in case, but no longer used in render
        if (!selectedService) return;
        const url = selectedService.slug === 'reliable-freight-service'
            ? `/${selectedService.slug}-in-${locationSlug}`
            : `/services/${selectedService.slug}-in-${locationSlug}`;
        document.body.style.overflow = '';
        router.push(url);
    };


    const openModal = (service: typeof services[0]) => {
        setSelectedService({ title: service.title, slug: service.slug });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedService(null);
        document.body.style.overflow = '';
    };

    return (
        <section className="relative py-24 lg:py-32 bg-[#F7F8FC] overflow-hidden min-h-screen">
            {/* Background Radial Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-300/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-300/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 lg:mb-20">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 mb-6">
                        <span className="text-purple-600 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">Our Services</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-[900] text-[#1a1b3a] leading-[1.1] mb-6 tracking-tighter uppercase px-2">
                        SPECIALIZED SHIPPING<br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            SOLUTIONS
                        </span>
                    </h2>

                    <div className="w-12 h-1.5 bg-purple-600 rounded-full mx-auto mb-8 opacity-20" />

                    <p className="text-lg sm:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed px-4">
                        Select a service below to find our localized branch directly servicing your state or city.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const style = themeStyles[service.theme as keyof typeof themeStyles];
                        return (
                            <div
                                key={index}
                                onClick={() => openModal(service)}
                                className={`group relative bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(75,20,140,0.12)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full overflow-hidden max-w-md mx-auto md:max-w-none w-full cursor-pointer ${service.theme === 'purple' ? 'hover:border-purple-200' : 'hover:border-yellow-200'}`}
                            >
                                {/* Hover Bubble Gradient */}
                                <div className={`absolute top-[-60px] right-[-60px] w-56 h-56 transition-all duration-700 pointer-events-none blur-[50px] rounded-full bg-transparent ${style.hoverGlow}`} />

                                {/* Icon Box */}
                                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transition-all duration-500 shadow-sm border bg-gradient-to-br ${style.iconBox} ${style.hoverShadow} ${style.iconGradient} ${style.hoverIconText} group-hover:rotate-3 group-hover:border-transparent`}>
                                    <span className="group-hover:scale-110 transition-transform duration-500">
                                        {service.icon}
                                    </span>
                                </div>

                                {/* Title with Animated Underline */}
                                <div className="relative mb-4">
                                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight uppercase transition-colors pr-4 ${style.lightText}`}>
                                        {service.title}
                                    </h3>
                                    <div className={`h-[2px] w-0 group-hover:w-full transition-all duration-500 mt-2 opacity-50 ${style.underline}`} />
                                    <div className="h-[2px] bg-gray-200 w-full absolute bottom-[-5px] left-0 pointer-events-none opacity-20" />
                                </div>

                                <p className="text-[15px] sm:text-[17px] text-gray-600 font-medium mb-8 sm:mb-10 leading-relaxed flex-grow pr-2">
                                    {service.description}
                                </p>

                                {/* Premium Button */}
                                <div className="mt-auto">
                                    <button className={`${style.btnBg} text-white font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02] text-[12px] sm:text-[14px] uppercase tracking-widest w-full ${style.btnShadow}`}>
                                        Select Service
                                        <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Location Selection Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div
                        className="absolute inset-0"
                        onClick={closeModal}
                    />
                    <div className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-300">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mb-8 pr-12">
                            <span className="text-purple-600 text-xs font-black uppercase tracking-[0.2em] mb-2 block">
                                Choose Location
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-[900] text-[#1a1b3a] leading-tight tracking-tight uppercase">
                                {selectedService.title}
                            </h3>
                            <p className="text-gray-500 mt-2 font-medium">Select a service area nearest to you.</p>
                        </div>

                        <div className="space-y-3">
                            {locations.map((location) => {
                                const url = selectedService.slug === 'reliable-freight-service'
                                    ? `/${selectedService.slug}-in-${location.slug}`
                                    : `/services/${selectedService.slug}-in-${location.slug}`;
                                return (
                                    <Link
                                        key={location.slug}
                                        href={url}
                                        onClick={closeModal}
                                        className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl border-2 border-gray-100 hover:border-purple-600 group transition-all duration-300 hover:bg-purple-50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-lg font-bold text-gray-800 group-hover:text-purple-900 transition-colors">
                                                {location.name}
                                            </span>
                                        </div>
                                        <div className="text-purple-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
