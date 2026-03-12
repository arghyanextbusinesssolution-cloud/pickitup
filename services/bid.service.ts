import api from '../lib/api';

export const bidService = {
    create: async (data: { shipmentId: string; amount: number; deliveryDate: Date }) => {
        const response = await api.post('/bids', data);
        return response.data;
    },

    getShipmentBids: async (shipmentId: string) => {
        const response = await api.get(`/bids/shipment/${shipmentId}`);
        return response.data;
    },

    getMyBids: async () => {
        const response = await api.get('/bids/my');
        return response.data;
    }
};
