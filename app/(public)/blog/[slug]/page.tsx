'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { cmsService, BlogPost } from '@/services/cms.service';
import { Calendar, User, ArrowLeft, Share2, Link as LinkIcon, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

export default function SingleBlogPostPage() {
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const params = useParams();
    const slug = params.slug as string;

    useEffect(() => {
        if (slug) loadBlog();
    }, [slug]);

    const loadBlog = async () => {
        try {
            setIsLoading(true);
            const data = await cmsService.getBlogBySlug(slug);
            setBlog(data);
        } catch (err: any) {
            setError(err.message || 'Blog post not found');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const estimateReadTime = (content: string) => {
        const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        return Math.max(1, Math.round(words / 200));
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-100 border-t-purple-600"></div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Article...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-[60vh] flex flex-col justify-center items-center gap-6 px-6 text-center">
                <div className="text-7xl">📭</div>
                <h1 className="text-4xl font-black text-gray-900 uppercase italic">Post Not Found</h1>
                <p className="text-gray-500 font-medium max-w-md">The article you're looking for doesn't exist or has been moved.</p>
                <Link href="/blog" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Blog
                </Link>
            </div>
        );
    }

    const readTime = estimateReadTime(blog.content);

    return (
        <div className="bg-white">

            {/* ── HERO ── */}
            <section className="relative bg-gradient-to-br from-[#F8F4FF] via-white to-[#FFF8F0] pt-16 pb-0 overflow-hidden">
                {/* Abstract blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200 rounded-full blur-[160px] opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-200 rounded-full blur-[120px] opacity-20 pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    {/* Back + category */}
                    <div className="flex items-center gap-4 mb-10">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-purple-600 font-black text-[11px] uppercase tracking-[0.2em] hover:gap-3 transition-all group">
                            <ArrowLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
                        </Link>
                        <span className="text-gray-200">|</span>
                        <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-200">
                            <BookOpen size={12} /> Shipping Guides
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-[1000] text-gray-900 tracking-tight leading-[1.05] mb-8">
                        {blog.title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-6 pb-10 border-b border-purple-100">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-200 shrink-0">
                                {blog.author?.firstName?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Written by</p>
                                <p className="text-sm font-black text-gray-900">{blog.author?.firstName || 'Pickitup'} {blog.author?.lastName || 'Team'}</p>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200 hidden sm:block" />

                        <div className="flex items-center gap-1.5 text-gray-400 text-sm font-semibold">
                            <Calendar size={15} className="text-purple-400" />
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-400 text-sm font-semibold">
                            <Clock size={15} className="text-purple-400" />
                            {readTime} min read
                        </div>

                        {/* Share buttons */}
                        <div className="ml-auto flex items-center gap-2">
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-all text-xs font-bold"
                            >
                                <LinkIcon size={14} />
                                {copied ? 'Copied!' : 'Copy link'}
                            </button>
                            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-purple-400 hover:text-purple-600 transition-all">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── COVER IMAGE ── */}
            {blog.coverImage && (
                <div className="max-w-5xl mx-auto px-6 -mt-1 pt-10">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-100 aspect-[16/7] border border-purple-50">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* ── ARTICLE CONTENT ── */}
            <main className="max-w-4xl mx-auto px-6 py-16">
                {/* Excerpt highlight */}
                {blog.excerpt && (
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-2xl p-6 mb-12">
                        <p className="text-gray-700 text-lg font-semibold italic leading-relaxed">{blog.excerpt}</p>
                    </div>
                )}

                {/* Body */}
                <article
                    className="
                        prose prose-lg max-w-none
                        prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                        prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                        prose-p:text-gray-600 prose-p:leading-[1.9] prose-p:font-[450]
                        prose-strong:font-black prose-strong:text-gray-900
                        prose-a:text-purple-600 prose-a:no-underline prose-a:font-bold hover:prose-a:underline
                        prose-ul:space-y-2 prose-ol:space-y-2
                        prose-li:text-gray-600 prose-li:font-[450]
                        prose-blockquote:border-l-4 prose-blockquote:border-purple-400 prose-blockquote:bg-purple-50 prose-blockquote:rounded-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic
                        prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-10
                        prose-hr:border-purple-100
                        prose-code:bg-gray-100 prose-code:text-purple-700 prose-code:rounded prose-code:px-1
                    "
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* ── DIVIDER ── */}
                <div className="flex items-center gap-4 mt-16 mb-12">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-100" />
                    <div className="w-3 h-3 rounded-full bg-purple-300" />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-100" />
                </div>

                {/* ── AUTHOR CARD ── */}
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-2xl shadow-purple-200">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl font-black text-white shrink-0">
                        {blog.author?.firstName?.[0]?.toUpperCase() || 'P'}
                    </div>
                    <div className="flex-1">
                        <p className="text-purple-200 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Article Author</p>
                        <h3 className="text-2xl font-black">{blog.author?.firstName || 'Pickitup'} {blog.author?.lastName || 'Team'}</h3>
                        <p className="text-purple-100 text-sm font-medium mt-1">Expert contributor at Pickitup — bringing you the latest in logistics and shipping insights.</p>
                    </div>
                    <Link href="/blog" className="shrink-0 bg-white text-purple-700 px-6 py-3 rounded-full font-black text-sm hover:bg-purple-50 transition-all shadow-lg">
                        More Articles →
                    </Link>
                </div>

                {/* ── CTA BANNER ── */}
                <div className="mt-12 bg-gray-900 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
                    <div>
                        <h4 className="text-xl font-black uppercase tracking-tight">Ready to ship smarter?</h4>
                        <p className="text-gray-400 text-sm font-medium mt-1">Join thousands using Pickitup to manage shipments effortlessly.</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        <Link href="/ship" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-black text-sm hover:bg-yellow-300 transition-all shadow-lg">
                            Get Started Free
                        </Link>
                        <Link href="/blog" className="border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition-all">
                            Read More
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
