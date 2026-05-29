'use client';

import React, { useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { Save, ImageIcon, Send, ArrowLeft, Upload, X, Loader2, Trash2 } from 'lucide-react';
import { BlogPost, CreateBlogDto } from '@/services/cms.service';
import api from '@/lib/api';

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-xl" />
});

import 'react-quill-new/dist/quill.snow.css';

interface BlogFormProps {
    initialData?: BlogPost;
    onSubmit: (data: CreateBlogDto) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    isLoading: boolean;
}

export const BlogForm: React.FC<BlogFormProps> = ({ initialData, onSubmit, onDelete, isLoading }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [published, setPublished] = useState(initialData?.published ?? true);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ title, content, excerpt, coverImage, published });
    };

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm sticky top-4 z-10">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-gray-500 hover:text-gray-900 font-bold flex items-center gap-2"
                >
                    <ArrowLeft size={20} /> Back
                </Button>
                <div className="flex gap-3">
                    {initialData && onDelete && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onDelete(initialData.id)}
                            className="bg-red-50 text-red-600 border border-red-100 px-6 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-red-100 transition-all"
                        >
                            <Trash2 size={18} /> Delete Post
                        </Button>
                    )}
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-purple-200"
                    >
                        <Send size={18} /> {initialData ? 'Update Post' : 'Publish Post'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Post Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter an engaging title..."
                                className="w-full text-4xl font-black text-gray-900 placeholder:text-gray-200 focus:outline-none border-b-2 border-transparent focus:border-purple-100 pb-2 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-4 min-h-[400px]">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Content</label>
                            <div className="prose prose-purple max-w-none">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    placeholder="Start writing your story..."
                                    className="h-[350px] mb-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <ImageIcon size={14} /> Cover Image
                            </label>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    try {
                                        setIsUploading(true);
                                        const formData = new FormData();
                                        formData.append('image', file);
                                        const res = await api.post<{ url: string }>('/uploads/blog-image', formData, {
                                            headers: { 'Content-Type': 'multipart/form-data' }
                                        });
                                        setCoverImage(res.data.url);
                                    } catch (err: any) {
                                        alert('Image upload failed: ' + (err.response?.data?.error || err.message));
                                    } finally {
                                        setIsUploading(false);
                                    }
                                }}
                            />

                            {coverImage ? (
                                <div className="relative rounded-xl overflow-hidden aspect-video border border-gray-100 group">
                                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-black flex items-center gap-2 hover:bg-gray-50">
                                            <Upload size={14} /> Change
                                        </button>
                                        <button type="button" onClick={() => setCoverImage('')} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-black flex items-center gap-2 hover:bg-red-600">
                                            <X size={14} /> Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-full h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-purple-300 hover:bg-purple-50 transition-all group disabled:opacity-60"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 size={28} className="text-purple-400 animate-spin" />
                                            <p className="text-xs font-black text-purple-400 uppercase tracking-widest">Uploading...</p>
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={28} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-purple-500">Click to Upload Image</p>
                                            <p className="text-[10px] text-gray-300">JPG, PNG, WEBP — Max 10MB</p>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Short Excerpt</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="A brief summary for previews..."
                                className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-purple-200 rounded-xl p-4 text-sm font-medium focus:outline-none min-h-[120px] transition-all"
                            />
                        </div>
                    </div>

                    <div className="bg-purple-600 p-8 rounded-3xl shadow-xl shadow-purple-200 text-white space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500 rounded-xl">
                                <Send size={24} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Ready to post?</h3>
                        </div>
                        <p className="text-purple-100 text-sm font-medium">Make sure to add a cover image and an excerpt to make your post more engaging in list views.</p>
                    </div>
                </div>
            </div>
        </form>
    );
};
