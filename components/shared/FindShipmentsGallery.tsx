import Image from 'next/image';

const findImages = [
    {
        src: '/find-shipments1.png',
        alt: 'Find Shipments 1',
        label: 'Look Through Available Loads',
        desc: 'Get access to thousands of current shipping listings that are published every day throughout the US. To identify the best chances for your company, search loads by location, route, shipment type, and vehicle specifications. Our technology facilitates dependable door to door pickup service in U.S.A, operations for carriers seeking to optimize revenue and delivery efficiency.',
    },
    {
        src: '/find-shipments2.png',
        alt: 'Find Shipments 2',
        label: 'Make Bids That Are Competitive',
        desc: 'In just a few seconds, provide your pricing quote. Before choosing the ideal transportation partner for their shipping requirements, shippers can examine your ratings, carrier profile, and experience.',
    },
    {
        src: '/find-shipments3.png',
        alt: 'Find Shipments 3',
        label: 'Verify and Match Shipments',
        desc: 'You will receive all shipping details, pickup information, route instructions, and a secure payment confirmation in one location after your bid is accepted.',
    },
    {
        src: '/find-shipments4.png',
        alt: 'Find Shipments 4',
        label: 'Deliver and Get Paid Fast',
        desc: 'Finish deliveries, keep up good reviews, and get paid quickly. Develop enduring connections with shippers while steadily expanding your transportation company',
    },
];

export default function FindShipmentsGallery() {
    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-[1240px] mx-auto px-6 lg:px-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1.5 rounded-full mb-5">
                        <span className="text-yellow-600 text-[11px] font-black tracking-widest uppercase">Expand Your Company</span>
                    </div>
                    <h2 className="text-[38px] lg:text-[52px] font-[900] text-[#1a1b3a] leading-tight tracking-tighter uppercase mb-4">
                        How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">Locate Shipments</span>
                    </h2>
                    <p className="text-[17px] text-gray-500 font-medium max-w-[560px] mx-auto leading-relaxed">
                        Through a single, efficient shipping platform, Pickitup makes it simple for carriers to explore loads, submit bids, secure deliveries, and get quick payments.
                    </p>
                </div>

                {/* Images — One by One */}
                <div className="flex flex-col gap-16 lg:gap-24">
                    {findImages.map((img, index) => (
                        <div
                            key={img.src}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
                        >
                            {/* Image */}
                            <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(234,179,8,0.25)] border border-gray-100 group">
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
                                <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center mb-5 shadow-sm">
                                    <span className="text-yellow-600 font-black text-2xl">{index + 1}</span>
                                </div>
                                <h3 className="text-[28px] lg:text-[34px] font-[900] text-[#1a1b3a] tracking-tighter uppercase mb-4">
                                    {img.label}
                                </h3>
                                <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-[440px]">
                                    {img.desc}
                                </p>
                                <div className="mt-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
