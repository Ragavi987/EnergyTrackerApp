import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const register = (username, email, password, password2) => {
  return api.post('register/', { username, email, password, password2 });
};

export const login = (username, password) => {
  return api.post('login/', { username, password });
};

// Energy data services
export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('upload-csv/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getEnergyData = (period = 'monthly') => {
  return api.get(`energy-data/?period=${period}`);
};

export const getStatistics = () => {
  return api.get('statistics/');
};

export default api;