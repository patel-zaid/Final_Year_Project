import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Tools API
export const getTools = async (params = {}) => {
  const response = await api.get('/tools', { params });
  return response.data;
};

export const getToolById = async (id) => {
  const response = await api.get(`/tools/${id}`);
  return response.data;
};

export const getPopularTools = async (limit = 8) => {
  const response = await api.get('/tools/popular/trending', { params: { limit } });
  return response.data;
};

export const getFreeTools = async (limit = 10) => {
  const response = await api.get('/tools/pricing/free', { params: { limit } });
  return response.data;
};

export const searchTools = async (query, limit = 10) => {
  const response = await api.get(`/tools/search/${encodeURIComponent(query)}`, {
    params: { limit }
  });
  return response.data;
};

export const getToolsByCategory = async (category, limit = 10) => {
  const response = await api.get(`/tools/category/${category}`, {
    params: { limit }
  });
  return response.data;
};

export const updateToolRating = async (id, rating) => {
  const response = await api.patch(`/tools/${id}/rating`, { rating });
  return response.data;
};

// Categories API
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategoryDetails = async (category, limit = 10) => {
  const response = await api.get(`/categories/${category}`, {
    params: { limit }
  });
  return response.data;
};

// AI API
export const getAIRecommendations = async (query, category = null, preferences = {}) => {
  const response = await api.post('/ai/recommend', {
    query,
    category,
    preferences
  });
  return response.data;
};

export const enhanceSearch = async (query) => {
  const response = await api.post('/ai/enhance-search', { query });
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;


