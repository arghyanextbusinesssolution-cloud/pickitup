'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
    question: string;
    answer: string;
}

const defaultFaqs: FAQItem[] = [
    {
        question: "How Does Pickitup Operate?",
        answer: "Pickitup connects you with a reliable network of reputable carriers who have space available on their vehicles. All you have to do is post your cargo details, obtain several quotes from carriers that are currently on your route, and select the option that best fits your schedule and budget."
    },
    {
        question: "How Much Does Shipping Cost?",
        answer: "The size of the goods, the distance it must travel, and the delivery window all affect shipping costs. Compared to traditional shipping choices, you can frequently save up to 60% because carriers are already on their way to you."
    },
    {
        question: "Is Using Pickitup for Shipping Safe?",
        answer: "Of course. Every carrier in our network is subject to consumer reviews and background checks. Additionally, we guarantee safe payment methods and provide protection coverage so you may ship your goods with total confidence."
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
