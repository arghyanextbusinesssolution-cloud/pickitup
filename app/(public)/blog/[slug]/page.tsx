import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cmsService } from '@/services/cms.service';
import SingleBlogPostClient from '@/components/SingleBlogPostClient';

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params;
        const blog = await cmsService.getBlogBySlug(slug);

        if (!blog) {
            return {
                title: 'Article Not Found | Pickitup Blog',
                description: 'The requested blog post could not be found.'
            };
        }

        const cleanText = (html: string) => {
            return html.replace(/<[^>]*>/g, '').trim();
        };

        const teaserDescription = blog.excerpt ||
            (cleanText(blog.content).substring(0, 155) + '...');

        return {
            title: `${blog.title} | Pickitup Blog`,
            description: teaserDescription,
            openGraph: {
                title: blog.title,
                description: teaserDescription,
                type: 'article',
                publishedTime: blog.createdAt,
                modifiedTime: blog.updatedAt,
                images: blog.coverImage ? [
                    {
                        url: blog.coverImage,
                        alt: blog.title,
                    }
                ] : undefined,
            },
        };
    } catch (e) {
        return {
            title: 'Blog Article | Pickitup',
            description: 'Read logistics and shipping insights on Pickitup.'
        };
    }
}

export default async function Page({ params }: Props) {
    try {
        const { slug } = await params;
        const blog = await cmsService.getBlogBySlug(slug);

        if (!blog) {
            notFound();
        }

        return <SingleBlogPostClient blog={blog} />;
    } catch (error) {
        notFound();
    }
}
