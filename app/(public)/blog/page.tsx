'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cmsService, BlogPost } from '@/services/cms.service';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogListingPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            setIsLoading(true);
            const data = await cmsService.getAllBlogs(false); // published only
            setBlogs(data);
        } catch (err: any) {
            console.error('Failed to load blogs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#7C3AED]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFF] py-20 px-6">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full border border-purple-200">
                        <BookOpen size={18} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Our Journal</span>
                    </div>
                    <h1 className="text-6xl font-[1000] text-gray-900 tracking-tight uppercase leading-[0.9]">
                        Insights, Stories & <span className="text-[#7C3AED]">Shipping Tips</span>
                    </h1>
                    <p className="text-gray-500 text-xl font-medium">Discover the latest industry news, shipping guides, and stories from the Pickitup community.</p>
                </div>

                {/* Blog Grid */}
                {blogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                        <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">More stories coming soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
                                <article className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:border-purple-100 transition-all duration-500 h-full flex flex-col hover:-translate-y-2">
                                    {/* Image Container */}
                                    <div className="h-64 overflow-hidden relative">
                                        {blog.coverImage ? (
                                            <img
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-purple-50 flex items-center justify-center">
                                                <span className="text-6xl group-hover:scale-125 transition-transform duration-500">📄</span>
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6">
                                            <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-600 shadow-sm">
                                                Guides
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 flex-grow space-y-5">
                                        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                            <span className="flex items-center gap-2"><Calendar size={14} className="text-[#7C3AED]" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            <span className="flex items-center gap-2"><User size={14} className="text-[#7C3AED]" /> {blog.author?.firstName || 'Pickitup Team'}</span>
                                        </div>

                                        <h2 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-[#7C3AED] transition-colors line-clamp-2 uppercase italic tracking-tight">
                                            {blog.title}
                                        </h2>

                                        <p className="text-gray-500 font-medium line-clamp-3 leading-relaxed">
                                            {blog.excerpt || 'Read the full story to discover more about this topic and stay updated with the latest from Pickitup.'}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="px-10 pb-10">
                                        <div className="flex items-center gap-2 text-purple-600 font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all border-t border-gray-50 pt-8">
                                            Read More <ArrowRight size={16} strokeWidth={3} />
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
