import axios from 'axios';
import { API } from '../const';
import { getAuthToken } from '../services/authService';

const apiClient = axios.create({
  baseURL: API,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
