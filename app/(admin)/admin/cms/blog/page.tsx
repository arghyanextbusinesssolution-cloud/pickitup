'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cmsService, BlogPost } from '@/services/cms.service';
import { Button } from '@/components/ui';
import { Plus, Edit, Trash2, Globe, Lock, Eye, Calendar, User } from 'lucide-react';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const data = await cmsService.getAllBlogs(true);
      setBlogs(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await cmsService.deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err: any) {
      alert('Failed to delete blog: ' + err.message);
    }
  };


  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-[1000] text-gray-900 tracking-tight uppercase">Blog Management</h1>
          <p className="text-gray-500 font-medium">Create and manage content for your website's blog section.</p>
        </div>
        <Link href="/admin/cms/blog/new">
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95">
            <Plus size={20} strokeWidth={3} /> Create New Post
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl font-medium flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C3AED]"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center space-y-4">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <Plus className="text-gray-300" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">No blog posts found</h3>
            <p className="text-gray-500">Get started by creating your first blog post.</p>
          </div>
          <Link href="/admin/cms/blog/new">
            <Button className="bg-white border-2 border-gray-100 text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-xl font-bold">
              Write First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:border-purple-100 transition-all duration-300 flex flex-col">
              {blog.coverImage ? (
                <div className="h-48 overflow-hidden relative">
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ) : (
                <div className="h-48 bg-purple-50 flex items-center justify-center relative">
                  <span className="text-4xl">📝</span>
                </div>
              )}
              <div className="p-6 flex-grow space-y-3">
                <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#7C3AED] transition-colors">{blog.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 font-medium">{blog.excerpt || 'No excerpt provided...'}</p>

                <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest pt-2">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><User size={14} /> {blog.author?.firstName || 'Admin'}</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                <Link href={`/admin/cms/blog/${blog.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all">
                    <Edit size={14} /> Edit
                  </Button>
                </Link>
                <Link href={`/blog/${blog.slug}`} target="_blank" className="flex-1">
                  <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all">
                    <Eye size={14} /> View
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(blog.id)}
                  className="px-3 border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50 py-2 rounded-lg transition-all"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
