import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for JWT
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor for handling authentication/authorization errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;
        
        // Handle 401 (Unauthorized)
        // 403 (Forbidden) is no longer a global logout to prevent accidental redirection 
        // when a user hits a restricted feature within a valid session.
        if (status === 401) {
            if (typeof window !== 'undefined') {
                // Only clear and redirect if we're not already on the login page
                if (window.location.pathname !== '/login' && window.location.pathname !== '/carrier/login') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login?expired=true';
                }
            }
        }
        return Promise.reject(error);
    }
);


export default api;
