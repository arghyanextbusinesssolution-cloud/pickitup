'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/services/cms.service';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

interface BlogListingClientProps {
    initialBlogs: BlogPost[];
}

export default function BlogListingClient({ initialBlogs }: BlogListingClientProps) {
    return (
        <div className="min-h-screen bg-[#FAFAFF] py-12 sm:py-20 px-4 sm:px-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">

                {/* Header */}
                <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full border border-purple-200">
                        <BookOpen size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Journal</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-[1000] text-gray-900 tracking-tight uppercase leading-[0.95] break-words">
                        Insights, Stories &{' '}
                        <span className="text-[#7C3AED]">Shipping Tips</span>
                    </h1>
                    <p className="text-gray-500 text-base sm:text-xl font-medium px-2">
                        Discover the latest industry news, shipping guides, and stories from the Pickitup community.
                    </p>
                </div>

                {/* Blog Grid */}
                {initialBlogs.length === 0 ? (
                    <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-gray-400 font-bold text-lg uppercase tracking-widest">More stories coming soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {initialBlogs.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
                                <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:border-purple-100 transition-all duration-500 h-full flex flex-col hover:-translate-y-1 sm:hover:-translate-y-2">

                                    {/* Image Container */}
                                    <div className="h-52 sm:h-64 overflow-hidden relative">
                                        {blog.coverImage ? (
                                            <img
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-purple-50 flex items-center justify-center">
                                                <span className="text-5xl group-hover:scale-125 transition-transform duration-500">📄</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                                            <div className="bg-white/90 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-purple-600 shadow-sm">
                                                Guides
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8 lg:p-10 flex-grow space-y-4">
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-[#7C3AED] shrink-0" />
                                                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <User size={12} className="text-[#7C3AED] shrink-0" />
                                                {blog.author?.firstName || 'Pickitup Team'}
                                            </span>
                                        </div>

                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 leading-tight group-hover:text-[#7C3AED] transition-colors line-clamp-2 uppercase italic tracking-tight break-words">
                                            {blog.title}
                                        </h2>

                                        <p className="text-gray-500 font-medium line-clamp-3 leading-relaxed text-sm sm:text-base break-words">
                                            {blog.excerpt || 'Read the full story to discover more about this topic and stay updated with the latest from Pickitup.'}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
                                        <div className="flex items-center gap-2 text-purple-600 font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all border-t border-gray-50 pt-6 sm:pt-8">
                                            Read More <ArrowRight size={14} strokeWidth={3} />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
