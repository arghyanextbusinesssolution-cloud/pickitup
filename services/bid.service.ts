import api from '../lib/api';

export const bidService = {
    create: async (data: { shipmentId: string; amount: number; deliveryDate?: Date }) => {
        const response = await api.post('/bids', data);
        return response.data;
    },

    acceptBid: async (bidId: string) => {
        const response = await api.post(`/bids/${bidId}/accept`);
        return response.data; // returns the created booking
    },

    getShipmentBids: async (shipmentId: string) => {
        const response = await api.get(`/bids/shipment/${shipmentId}`);
        return response.data;
    },

    getMyBids: async () => {
        const response = await api.get('/bids/my');
        return response.data;
    },

    getById: async (bidId: string) => {
        const response = await api.get(`/bids/${bidId}`);
        return response.data;
    }
};
