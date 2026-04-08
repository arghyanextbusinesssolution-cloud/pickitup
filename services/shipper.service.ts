import api from '../lib/api';

export const shipperService = {
  getStats: async () => {
    const response = await api.get('/shippers/stats');
    return response.data;
  }
};
