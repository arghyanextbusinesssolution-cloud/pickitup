'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}>
            <button
                onClick={scrollToTop}
                className="w-14 h-14 bg-[#7C3AED] hover:bg-[#FBBF24] text-white hover:text-[#1a1b3a] rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 group hover:-translate-y-2"
                aria-label="Back to top"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:animate-bounce"
                >
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>

            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-[#7C3AED] blur-2xl opacity-20 group-hover:bg-[#FBBF24] transition-colors -z-10" />
        </div>
    );
}
