import Image from 'next/image';

const aboutSteps = [
    {
        src: '/video1.mp4',
        alt: 'Shipment Posting',
        label: 'Shipment Posting',
        desc: 'Provide the pickup location, delivery destination, item size, and requested delivery time when listing your shipment details in minutes. PickitUp makes the process quick and easy, whether you need to ship a car, deliver a package, or transport furniture.',
    },
    {
        src: '/video2.mp4',
        alt: 'Get Competitive Quotes',
        label: 'Get Competitive Quotes',
        desc: 'Verified carriers that are currently on your route can provide competitive shipping quotations once your package has been submitted. This enables consumers to evaluate costs and select reasonably priced transportation options within the United States of America.',
    },
    {
        src: '/video4.mp4',
        alt: 'Increase Shipping Savings',
        label: 'Increase Shipping Savings',
        desc: 'PickitUp helps cut empty miles and shipping expenses by utilizing available truck space from carriers currently on the road. When compared to regular delivery services, customers looking for a trustworthy courier collection near me in U.S.A can frequently save a large amount of money.',
    },
    {
        src: '/video5.mp4',
        alt: 'Simple Delivery & Pickup',
        label: 'Simple Delivery & Pickup',
        desc: 'Our platform offers a trustworthy pickup service in U.S.A to people and companies seeking quick and practical transportation options. PickitUp guarantees a seamless shipping experience from doorstep pickup to final delivery.',
    },
    {
        src: '/video7.mp4',
        alt: 'Easy Shipping Across USA',
        label: 'Easy Shipping Across USA',
        desc: 'PickitUp is dedicated to providing reasonably priced, adaptable, and dependable shipping options across the country, whether you\'re looking for a professional courier collection near me in U.S.A or a reliable pickup service in U.S.A for large things.',
    },
];

export default function AboutGallery() {
    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-[1240px] mx-auto px-6 lg:px-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-4 py-1.5 rounded-full mb-5">
                        <span className="text-purple-600 text-[11px] font-black tracking-widest uppercase">Our Mission</span>
                    </div>
                    <h2 className="text-[38px] lg:text-[52px] font-[900] text-[#1a1b3a] leading-tight tracking-tighter uppercase mb-4">
                        Smart Shipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-600">Solutions</span> Across the U.S.A
                    </h2>
                    <p className="text-[17px] text-gray-500 font-medium max-w-[560px] mx-auto leading-relaxed">
                        Discover how Pickitup is revolutionizing the shipping industry through technology, efficiency, and a commitment to reliability.
                    </p>
                </div>

                {/* Steps — One by One */}
                <div className="flex flex-col gap-16 lg:gap-24">
                    {aboutSteps.map((step, index) => (
                        <div
                            key={step.src}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}
                        >
                            {/* Video */}
                            <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(75,20,140,0.2)] border border-gray-100 group">
                                <video
                                    src={step.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Step badge */}
                                <div className="absolute top-5 left-5 bg-yellow-400 text-[#1a1b3a] font-black text-sm px-4 py-1.5 rounded-full shadow-lg z-10">
                                    Step {index + 1}
                                </div>
                            </div>

                            {/* Text */}
                            <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
                                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5 shadow-sm">
                                    <span className="text-purple-600 font-black text-2xl">{index + 1}</span>
                                </div>
                                <h3 className="text-[28px] lg:text-[34px] font-[900] text-[#1a1b3a] tracking-tighter uppercase mb-4">
                                    {step.label}
                                </h3>
                                <p className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-[440px]">
                                    {step.desc}
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
