import Image from 'next/image';

const shipImages = [
    {
        src: '/ship1.png',
        alt: 'Shipping Service 1',
        label: 'Professional Fleet',
        desc: 'Our verified carriers operate a wide rnow ange of professional vehicles to handle any shipment size.',
    },
    {
        src: '/ship2.png',
        alt: 'Shipping Service 2',
        label: 'Safe & Secure',
        desc: 'Every shipment is handled with care, fully insured, and tracked from pickup to delivery.',
    },
    {
        src: '/ship3.png',
        alt: 'Shipping Service 3',
        label: 'Fast Delivery',
        desc: 'We match you with the fastest available carriers so your cargo arrives on time, every time.',
    },
    {
        src: '/ship4.png',
        alt: 'Shipping Service 4',
        label: 'Nationwide Coverage',
        desc: 'From coast to coast — our carrier network covers every major city and route across the country.',
    },
];

export default function ShipGallery() {
    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-[1240px] mx-auto px-6 lg:px-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-1.5 rounded-full mb-5">
                        <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">How We Ship</span>
                    </div>
                    <h2 className="text-[38px] lg:text-[52px] font-[900] text-[#1a1b3a] leading-tight tracking-tighter uppercase mb-4">
                        Shipping Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">Simple</span>
                    </h2>
                    <p className="text-[17px] text-gray-500 font-medium max-w-[560px] mx-auto leading-relaxed">
                        See how Pickitup handles every shipment — from pickup to drop-off — with speed, safety, and total transparency.
                    </p>
                </div>

                {/* Images — One by One */}
                <div className="flex flex-col gap-16 lg:gap-24">
                    {shipImages.map((img, index) => (
                        <div
                            key={img.src}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
                        >
                            {/* Image */}
                            <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(75,20,140,0.2)] border border-gray-100 group">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Step badge */}
                                <div className="absolute top-5 left-5 bg-yellow-400 text-[#1a1b3a] font-black text-sm px-4 py-1.5 rounded-full shadow-lg">
                                    Step {index + 1}
                                </div>
                            </div>

                            {/* Text */}
                            <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
                                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5 shadow-sm">
                                    <span className="text-purple-600 font-black text-2xl">{index + 1}</span>
                                </div>
                                <h3 className="text-[28px] lg:text-[34px] font-[900] text-[#1a1b3a] tracking-tighter uppercase mb-4">
                                    {img.label}
                                </h3>
                                <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-[440px]">
                                    {img.desc}
                                </p>
                                <div className="mt-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-purple-500 to-yellow-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
