import api from '../lib/api';

export const paymentService = {
    createCheckoutSession: async (bookingId: string, useInsurance?: boolean) => {
        const response = await api.post('/payments/create-checkout-session', { bookingId, useInsurance });
        return response.data;
    },
    confirmPayment: async (bookingId: string) => {
        const response = await api.post('/payments/confirm-payment', { bookingId });
        return response.data;
    },
};
