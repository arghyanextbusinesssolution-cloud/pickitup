import api from '../lib/api';

export const bookingService = {
    getMyBookings: async () => {
        const response = await api.get('/bookings/my');
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(`/bookings/${id}`);
        return response.data;
    },
};
