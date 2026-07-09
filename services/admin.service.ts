import api from '../lib/api';

export const adminService = {
    getStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },
    getChartData: async () => {
        const response = await api.get('/admin/charts');
        return response.data;
    },
    getClaims: async () => {
        const response = await api.get('/admin/claims');
        return response.data;
    },
    getClaimById: async (id: string) => {
        const response = await api.get(`/claims/${id}`);
        return response.data;
    },
    updateClaimStatus: async (id: string, status: string) => {
        const response = await api.patch(`/admin/claims/${id}/status`, { status });
        return response.data;
    },
    getUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },
    getUserById: async (id: string) => {
        const response = await api.get(`/admin/users/${id}`);
        return response.data;
    },
    getCarriers: async () => {
        const response = await api.get('/admin/carriers');
        return response.data;
    },
    getCarrierById: async (id: string) => {
        const response = await api.get(`/admin/carriers/${id}`);
        return response.data;
    },
    getTransactions: async () => {
        const response = await api.get('/admin/transactions');
        return response.data;
    },
    getShipments: async () => {
        const response = await api.get('/admin/shipments');
        return response.data;
    },
    wipeDatabase: async () => {
        const response = await api.delete('/admin/wipe-database', {
            data: { confirmToken: 'WIPE_ALL_DATA_CONFIRMED' }
        });
        return response.data;
    },

    // Enquiries
    getEnquiries: async () => {
        const response = await api.get('/enquiries');
        return response.data;
    },
    updateEnquiryStatus: async (id: string, status: string) => {
        const response = await api.patch(`/enquiries/${id}/status`, { status });
        return response.data;
    }
};
