'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
    question: string;
    answer: string;
}

const defaultFaqs: FAQItem[] = [
    {
        question: "What Is PickitUp's Process?",
        answer: "By putting you in touch with a reliable network of approved carriers who already have truck space available along your route, PickitUp makes shipping easy. Simply publish the specifications of your shipment, evaluate several comparative bids, and select the carrier that best fits your delivery window and budget. Customers may obtain hassle-free, dependable, and reasonably priced transportation options throughout the United States with the use of our clever shipping platform."
    },
    {
        question: "How Much Does Shipping Cost?",
        answer: "The size and weight of your item, the delivery distance, and the necessary delivery window all affect PickitUp's shipping costs. Customers can frequently save up to 60% on shipping costs when compared to traditional freight and courier services because many of our carriers are already heading in your route. Because of this, PickitUp is an affordable choice for large item delivery, car transportation, furniture shipping, and more."
    },
    {
        question: "Is Using PickitUp for Shipping Safe?",
        answer: "Of course. To guarantee a safe and reliable shipping experience, PickitUp collaborates with verified and background-checked carriers. Before making a reservation, customers can examine carrier reviews and ratings, which gives them confidence when selecting reliable transportation companies. PickitUp provides safe and hassle-free shipment for goods of all sizes with dependable delivery assistance and secure payment security."
    }
];

interface FAQSectionProps {
    items?: FAQItem[];
}

export default function FAQSection({ items = defaultFaqs }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-[28px] md:text-[34px] font-[900] text-[#1a1b3a] tracking-tight uppercase leading-tight">
                        FREQUENTLY ASKED QUESTIONS
                    </h2>
                </div>

                {/* FAQ List */}
                <div className="border-t border-purple-100">
                    {items.map((faq, index) => (
                        <div key={index} className="border-b border-purple-100 last:border-b-0">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full py-8 flex items-center justify-between text-left group transition-all"
                            >
                                <span className="text-[15px] md:text-[17px] font-black text-[#1a1b3a] uppercase tracking-wide group-hover:text-[#7C3AED] transition-colors">
                                    {faq.question}
                                </span>
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-[#7C3AED] border-[#7C3AED] text-white rotate-180' : 'border-purple-200 text-[#7C3AED] group-hover:border-[#7C3AED]'
                                    }`}>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </button>

                            {/* Answer with smooth transition */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-56 opacity-100 pb-8' : 'max-h-0 opacity-0'
                                }`}>
                                <p className="text-[15px] text-gray-500 font-medium leading-relaxed pr-12">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link href="/register" className="text-[#a07cf0] font-[900] text-xs uppercase tracking-[0.2em] hover:text-[#7C3AED] transition-all flex items-center gap-2 mx-auto group w-max">
                        VIEW ALL QUESTIONS
                        <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
