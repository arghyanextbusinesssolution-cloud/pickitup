'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cmsService, CreateBlogDto } from '@/services/cms.service';
import { BlogForm } from '@/components/admin/BlogForm';

export default function NewBlogPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (data: CreateBlogDto) => {
        try {
            setIsLoading(true);
            await cmsService.createBlog(data);
            router.push('/admin/cms/blog');
        } catch (err: any) {
            alert('Failed to create blog post: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-[1000] text-gray-900 tracking-tight uppercase">New Blog Post</h1>
                <p className="text-gray-500 font-medium">Create a new post for your website's blog.</p>
            </div>

            <BlogForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}
