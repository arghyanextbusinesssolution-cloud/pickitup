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
    const response = await api.get('/reviews/my');
    return response.data;
  },

  updateIdentity: async (data: any) => {
    const response = await api.patch('/carriers/onboarding/identity', data);
    return response.data;
  },

  addVehicle: async (data: any) => {
    const response = await api.post('/carriers/onboarding/vehicle', data);
    return response.data;
  },

  uploadDocuments: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('photos', file));
    const response = await api.post('/uploads/photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.urls;
  }
};
