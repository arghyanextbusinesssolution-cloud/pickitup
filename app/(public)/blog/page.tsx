import React from 'react';
import { Metadata } from 'next';
import { cmsService, BlogPost } from '@/services/cms.service';
import BlogListingClient from '@/components/BlogListingClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Pickitup Blog | Shipping Tips, Guides & Industry Insights',
    description: 'Read the latest articles, guides, and shipping tips from the Pickitup team. Learn about logistics, same-day delivery, and package transport inside the USA.',
};

export default async function BlogListingPage() {
    let blogs: BlogPost[] = [];
    try {
        blogs = await cmsService.getAllBlogs(false); // Published only
    } catch (err: any) {
        console.error('Failed to load blogs server-side:', err);
    }

    return <BlogListingClient initialBlogs={blogs} />;
}
