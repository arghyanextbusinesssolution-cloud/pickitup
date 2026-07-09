'use client';

import React, { useState } from 'react';
import { BlogPost } from '@/services/cms.service';
import { Calendar, ArrowLeft, Share2, Link as LinkIcon, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface SingleBlogPostClientProps {
    blog: BlogPost;
}

export default function SingleBlogPostClient({ blog }: SingleBlogPostClientProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const estimateReadTime = (content: string) => {
        const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        return Math.max(1, Math.round(words / 200));
    };

    const readTime = estimateReadTime(blog.content);
    const authorName = `${blog.author?.firstName || 'Pickitup'} ${blog.author?.lastName || 'Team'}`.trim();
    const authorInitial = blog.author?.firstName?.[0]?.toUpperCase() || 'P';
    const publishedDate = new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div style={{ overflowX: 'clip', width: '100%' }} className="bg-white min-h-screen">

            {/* ── STICKY TOP BREADCRUMB ── */}
            <div className="border-b border-gray-100 bg-white/90 backdrop-blur-lg sticky top-0 z-40 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
                        <Link href="/" className="text-gray-400 hover:text-gray-700 font-semibold shrink-0">Home</Link>
                        <span className="text-gray-300 shrink-0">/</span>
                        <Link href="/blog" className="text-gray-400 hover:text-gray-700 font-semibold shrink-0">Blog</Link>
                        <span className="text-gray-300 shrink-0 hidden sm:inline">/</span>
                        <span className="text-gray-700 font-bold truncate hidden sm:inline">{blog.title}</span>
                    </div>
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-all text-xs font-bold whitespace-nowrap shrink-0"
                    >
                        <LinkIcon size={12} />
                        {copied ? '✓ Copied' : 'Share'}
                    </button>
                </div>
            </div>

            {/* ── MAIN LAYOUT: full-width wrapper ── */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-14">
                {/* Stack on mobile, side-by-side on lg+ */}
                <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

                    {/* ══════════════════════════════
                        LEFT COLUMN — sticky
                    ══════════════════════════════ */}
                    <div
                        className="w-full lg:w-[360px] xl:w-[400px] shrink-0 lg:sticky lg:top-[72px] lg:self-start"
                    >
                        {/* Cover Image */}
                        {blog.coverImage ? (
                            <div className="rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] shadow-xl shadow-purple-100 border border-purple-50 mb-6">
                                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="rounded-2xl aspect-[4/3] bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-6 border border-purple-100">
                                <BookOpen size={56} className="text-purple-300" />
                            </div>
                        )}

                        {/* Meta card */}
                        <div className="bg-[#FAFAFF] border border-purple-100 rounded-2xl p-5 space-y-4">
                            {/* Category */}
                            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-200">
                                <BookOpen size={11} />
                                Shipping Guides
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 border-t border-purple-100 pt-4">
                                <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-purple-200 shrink-0">
                                    {authorInitial}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Written by</p>
                                    <p className="text-sm font-black text-gray-900 truncate">{authorName}</p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 border-t border-purple-100 pt-4">
                                <div className="bg-white rounded-xl p-3 border border-gray-100">
                                    <div className="flex items-center gap-1 mb-1">
                                        <Calendar size={12} className="text-purple-400 shrink-0" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Published</span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-800 leading-snug">{publishedDate}</p>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-gray-100">
                                    <div className="flex items-center gap-1 mb-1">
                                        <Clock size={12} className="text-purple-400 shrink-0" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Read time</span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-800">{readTime} min read</p>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="border-t border-purple-100 pt-4 space-y-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share this post</p>
                                <button
                                    onClick={handleCopyLink}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-200"
                                >
                                    <LinkIcon size={14} />
                                    {copied ? '✓ Link Copied!' : 'Copy Link'}
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:border-purple-300 hover:text-purple-600 transition-all">
                                    <Share2 size={14} />
                                    Share
                                </button>
                            </div>
                        </div>

                        {/* Back link */}
                        <div className="mt-5">
                            <Link href="/blog" className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors font-bold text-sm group">
                                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform shrink-0" />
                                Back to all articles
                            </Link>
                        </div>
                    </div>

                    {/* ══════════════════════════════
                        RIGHT COLUMN — article body
                        overflow:hidden is CRITICAL
                    ══════════════════════════════ */}
                    <main style={{ minWidth: 0, overflow: 'hidden', maxWidth: '100%', flex: 1 }}>

                        {/* Title */}
                        <header className="mb-8 pb-8 border-b-2 border-purple-50">
                            <h1
                                className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-5"
                                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                            >
                                {blog.title}
                            </h1>

                            {blog.excerpt && (
                                <div className="relative pl-5 border-l-4 border-purple-500">
                                    <p
                                        className="text-base sm:text-lg text-gray-600 leading-relaxed font-semibold italic"
                                        style={{ wordBreak: 'break-word' }}
                                    >
                                        {blog.excerpt}
                                    </p>
                                </div>
                            )}
                        </header>

                        {/* Article body */}
                        <div
                            className="blog-content"
                            style={{ overflow: 'hidden', maxWidth: '100%' }}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Author card */}
                        <div className="mt-14 pt-10 border-t-2 border-purple-50">
                            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-2xl shadow-purple-200">
                                <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-2xl font-black text-white shrink-0">
                                    {authorInitial}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-purple-200 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Article Author</p>
                                    <h3 className="text-lg font-black">{authorName}</h3>
                                    <p className="text-purple-100 text-sm font-medium mt-1">Expert contributor at Pickitup — bringing you the latest in logistics and shipping insights.</p>
                                </div>
                                <Link href="/blog" className="shrink-0 bg-white text-purple-700 px-5 py-2.5 rounded-full font-black text-sm hover:bg-purple-50 transition-all shadow-lg whitespace-nowrap">
                                    More Articles →
                                </Link>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-6 bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-white">
                            <div>
                                <h4 className="text-lg font-black uppercase tracking-tight">Ready to ship smarter?</h4>
                                <p className="text-gray-400 text-sm font-medium mt-1">Join thousands using Pickitup to manage shipments effortlessly.</p>
                            </div>
                            <div className="flex gap-3 shrink-0 flex-wrap">
                                <Link href="/ship" className="bg-yellow-400 text-gray-900 px-5 py-2.5 rounded-full font-black text-sm hover:bg-yellow-300 transition-all shadow-lg whitespace-nowrap">
                                    Get Started Free
                                </Link>
                                <Link href="/blog" className="border border-white/20 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all whitespace-nowrap">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
