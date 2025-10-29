import axios, { type InternalAxiosRequestConfig, type AxiosError } from 'axios';
import { navigateTo } from '@/utils/history';
import { getToken, clearToken } from '../utils/auth';

const api = axios.create({
  // baseURL: 'http://localhost:4000/api',
  baseURL: 'https://suntek-backend.onrender.com/api'
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn('Token expired or invalid, clearing session...');

      clearToken(); 
      navigateTo('/login')
    }

    return Promise.reject(error);
  }
);

export default api;
