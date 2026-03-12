import api from '../lib/api';

export const adminService = {
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    }
};
