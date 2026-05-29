import api from '../lib/api';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    coverImage: string | null;
    published: boolean;
    authorId: string;
    author?: {
        id: string;
        firstName: string | null;
        lastName: string | null;
    };
    createdAt: string;
    updatedAt: string;
}

export interface CreateBlogDto {
    title: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    published?: boolean;
}

export const cmsService = {
    getAllBlogs: async (all = false): Promise<BlogPost[]> => {
        const response = await api.get<BlogPost[]>(`/cms/blogs?all=${all}`);
        return response.data;
    },

    getBlogBySlug: async (slug: string): Promise<BlogPost> => {
        const response = await api.get<BlogPost>(`/cms/blogs/slug/${slug}`);
        return response.data;
    },

    getBlogById: async (id: string): Promise<BlogPost> => {
        const response = await api.get<BlogPost>(`/cms/blogs/${id}`);
        return response.data;
    },

    createBlog: async (data: CreateBlogDto): Promise<BlogPost> => {
        const response = await api.post<BlogPost>('/cms/blogs', data);
        return response.data;
    },

    updateBlog: async (id: string, data: Partial<CreateBlogDto>): Promise<BlogPost> => {
        const response = await api.put<BlogPost>(`/cms/blogs/${id}`, data);
        return response.data;
    },

    deleteBlog: async (id: string): Promise<void> => {
        await api.delete(`/cms/blogs/${id}`);
    }
};
