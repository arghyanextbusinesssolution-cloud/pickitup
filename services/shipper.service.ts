import api from '../lib/api';

export const shipperService = {
  getStats: async () => {
    const response = await api.get('/shippers/stats');
    return response.data;
  },
  getClaims: async () => {
      const response = await api.get('/claims');
      return response.data;
  },
  getEligibleBookings: async () => {
      const response = await api.get('/claims/eligible');
      return response.data;
  },
  createClaim: async (data: { bookingId: string; reason: string; photos: string[] }) => {
      const response = await api.post('/claims', data);
      return response.data;
  }
};
