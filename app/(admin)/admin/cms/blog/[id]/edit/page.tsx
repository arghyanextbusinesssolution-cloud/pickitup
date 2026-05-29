'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { cmsService, BlogPost, CreateBlogDto } from '@/services/cms.service';
import { BlogForm } from '@/components/admin/BlogForm';

export default function EditBlogPage() {
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        if (id) loadBlog();
    }, [id]);

    const loadBlog = async () => {
        try {
            setIsLoading(true);
            const data = await cmsService.getBlogById(id);
            setBlog(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load blog post');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data: CreateBlogDto) => {
        try {
            setIsSaving(true);
            await cmsService.updateBlog(id, data);
            router.push('/admin/cms/blog');
        } catch (err: any) {
            alert('Failed to update blog post: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED]"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="p-8 text-center space-y-4">
                <div className="text-red-500 font-bold">Error: {error || 'Blog not found'}</div>
                <button onClick={() => router.back()} className="text-purple-600 font-bold hover:underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-[1000] text-gray-900 tracking-tight uppercase">Edit Blog Post</h1>
                <p className="text-gray-500 font-medium">Modify your existing blog post.</p>
            </div>

            <BlogForm initialData={blog} onSubmit={handleSubmit} isLoading={isSaving} />
        </div>
    );
}
