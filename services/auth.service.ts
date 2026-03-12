import api from '../lib/api';
import { AuthResponse } from '../types/auth.types';

export const authService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log(`[AuthService] Login successful. User: ${response.data.user.firstName} ${response.data.user.lastName}, Role: ${response.data.user.role}`);
        }
        return response.data;
    },

    register: async (data: any): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log(`[AuthService] Registration successful. User: ${response.data.user.firstName} ${response.data.user.lastName}, Role: ${response.data.user.role}`);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        return user ? JSON.parse(user) : null;
    }
};
