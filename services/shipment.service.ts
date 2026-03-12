import api from '../lib/api';

export const shipmentService = {
    create: async (data: any) => {
        const response = await api.post('/shipments', data);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/shipments');
        return response.data;
    },

    getMyShipments: async () => {
        const response = await api.get('/shipments/my');
        return response.data;
    },

    getAvailable: async () => {
        const response = await api.get('/shipments/available');
        return response.data;
    },

    getCarrierJobs: async () => {
        const response = await api.get('/shipments/carrier');
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(`/shipments/${id}`);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await api.patch(`/shipments/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(`/shipments/${id}`);
        return response.data;
    }
};
