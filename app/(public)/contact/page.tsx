'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/shared/BackToTop';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28 overflow-hidden relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-500/5 blur-[120px] rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-yellow-400/5 blur-[100px] rounded-full -ml-10 -mb-10"></div>

                <div className="max-w-[1240px] mx-auto px-6 lg:px-10 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                            <span className="text-purple-600 text-[10px] font-black tracking-widest uppercase">24/7 Global Support</span>
                        </div>
                        <h1 className="text-[42px] lg:text-[64px] font-[900] text-[#1a1b3a] leading-[1] mb-6 tracking-tight uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
                            How Can We <br />
                            <span className="text-yellow-400">Help You Today?</span>
                        </h1>
                        <p className="text-[18px] text-[#6B7280] font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700">
                            Whether you're a shipper with a question or a carrier looking for support, our dedicated team is here to ensure your experience is seamless.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        {/* Contact Form - Premium Style */}
                        <div className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] p-8 sm:p-12 border border-gray-100 animate-in fade-in slide-in-from-left-8 duration-1000">
                            <h3 className="text-2xl font-[900] text-[#1a1b3a] mb-8 tracking-tight uppercase">Send us a Message</h3>
                            
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter your name"
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 bg-gray-50/50 text-[15px] font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            placeholder="name@company.com"
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 bg-gray-50/50 text-[15px] font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Inquiry Type</label>
                                    <div className="relative">
                                        <select className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 appearance-none bg-gray-50/50 text-[15px] font-bold text-gray-900 transition-all cursor-pointer outline-none">
                                            <option>General Support</option>
                                            <option>Account Issues</option>
                                            <option>Billing & Payments</option>
                                            <option>Carrier Verification</option>
                                            <option>Platform feedback</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-900">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Message</label>
                                    <textarea 
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-600 bg-gray-50/50 text-[15px] font-bold text-gray-900 placeholder-gray-400 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                <button type="button" className="w-full bg-[#1a1b3a] hover:bg-black text-white font-[900] px-8 py-5 rounded-2xl transition-all shadow-xl shadow-gray-200/50 flex items-center justify-center gap-3 group text-[16px] uppercase tracking-wider">
                                    Send Inquiry
                                    <span className="group-hover:translate-x-1 transition-transform">➡️</span>
                                </button>
                            </form>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000">
                            {/* Card 1: Phone */}
                            <div className="bg-[#EEF2FF] rounded-[2rem] p-8 border border-white shadow-lg shadow-purple-100/50 relative overflow-hidden group hover:shadow-xl transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-8xl">📞</span>
                                </div>
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm">📱</div>
                                <h4 className="text-xl font-[900] text-[#1a1b3a] uppercase tracking-tight mb-2">Speak with Us</h4>
                                <p className="text-gray-500 font-medium text-sm mb-6 max-w-[200px]">Our agents are available for urgent inquiries 24/7.</p>
                                <a href="tel:1-800-698-7447" className="inline-flex items-center gap-2 text-[#4b148c] font-black text-lg hover:gap-3 transition-all">
                                    1-800-698- pickItUp
                                    <span>➡️</span>
                                </a>
                            </div>

                            {/* Card 2: Email */}
                            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group hover:border-yellow-200 transition-all">
                                <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-yellow-100">✉️</div>
                                <h4 className="text-xl font-[900] text-[#1a1b3a] uppercase tracking-tight mb-2">Email Support</h4>
                                <p className="text-gray-500 font-medium text-sm mb-6 max-w-[200px]">We typically respond within 1-2 business hours.</p>
                                <a href="mailto:support@pickitup.com" className="inline-flex items-center gap-2 text-purple-600 font-black text-lg hover:gap-3 transition-all">
                                    support@pickitup.com
                                    <span>➡️</span>
                                </a>
                            </div>

                            {/* Card 3: Help Center */}
                            <div className="bg-[#1a1b3a] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-xl animate-pulse">⚡</div>
                                </div>
                                <h4 className="text-xl font-[900] text-white uppercase tracking-tight mb-2">Help Center</h4>
                                <p className="text-gray-400 font-medium text-sm mb-6 max-w-[220px]">Browse our detailed guides and FAQ for instant answers.</p>
                                <Link href="/faq" className="bg-white text-[#1a1b3a] font-[900] px-6 py-3 rounded-xl transition-all hover:bg-yellow-400 uppercase tracking-widest text-[11px] inline-block">
                                    Visit Knowledge Base
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Presence Section */}
            <section className="py-24 bg-white">
                <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="bg-purple-100 rounded-[3rem] aspect-square relative overflow-hidden p-12">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent)] z-10"></div>
                                <div className="relative z-20 h-full flex flex-col justify-center">
                                    <div className="mb-8 p-3 bg-white w-fit rounded-2xl shadow-xl flex items-center gap-3 rotate-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">📍</div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">Headquarters</p>
                                            <p className="text-sm font-black text-gray-900 uppercase">Austin, Texas</p>
                                        </div>
                                    </div>
                                    <div className="mb-8 p-3 bg-white w-fit rounded-2xl shadow-xl flex items-center gap-3 -rotate-2 ml-auto">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">🌏</div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">Operational Reach</p>
                                            <p className="text-sm font-black text-gray-900 uppercase">Worldwide</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Map Background (Mock) */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-600 rounded-full animate-ping"></div>
                                    <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-purple-600 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-[32px] lg:text-[42px] font-[900] text-[#1a1b3a] leading-tight mb-6 tracking-tight uppercase">
                                Our Global <br />
                                <span className="text-purple-600 uppercase">Command Hub</span>
                            </h2>
                            <p className="text-[17px] text-[#6B7280] font-medium mb-8 leading-relaxed italic">
                                "Our mission is to bridge the gap between shippers and carriers with unparalleled transparency and elite support."
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="text-2xl mt-1">🏢</div>
                                    <div>
                                        <h4 className="font-black text-gray-900 uppercase text-sm tracking-wide">Main Office</h4>
                                        <p className="text-gray-500 text-[15px]">124 Logistics Blvd, Suite 400<br />Austin, TX 78744</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="text-2xl mt-1">📢</div>
                                    <div>
                                        <h4 className="font-black text-gray-900 uppercase text-sm tracking-wide">Media Inquiries</h4>
                                        <p className="text-gray-500 text-[15px]">press@pickitup.com<br />24-hour response window</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <BackToTop />
        </div>
    );
}
