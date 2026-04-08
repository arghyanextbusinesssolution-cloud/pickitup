import api from '../lib/api';

export const carrierService = {
  getProfile: async () => {
    const response = await api.get('/carriers/profile');
    return response.data;
  },

  getEarningsStats: async () => {
    const response = await api.get('/carriers/earnings/stats');
    return response.data;
  },

  getMyBids: async () => {
    const response = await api.get('/carriers/bids');
    return response.data;
  },

  getReviews: async () => {
    // Assuming we fetch reviews for the current carrier profile
    const response = await api.get('/reviews/my'); // Need to ensure this endpoint exists or use profile data
    return response.data;
  }
};
