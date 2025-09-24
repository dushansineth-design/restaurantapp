import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Adding auth token to request:', config.url);
      console.log('Token preview:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No auth token found for request:', config.url);
    }
    
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.config?.url);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      throw new Error('Network error. Please make sure the server is running.');
    } else if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Authentication failed. Please login again.');
    } else if (error.response.status === 403) {
      throw new Error('You do not have permission to perform this action.');
    } else if (error.response.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    const errorMessage = error.response?.data?.message || error.response?.data || error.message;
    throw new Error(errorMessage);
  }
);

export const api = {
  login: async (username, password) => {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  
  getFoodItems: async () => {
    try {
      const response = await apiClient.get('/food-items');
      return response.data;
    } catch (error) {
      console.error('Error fetching food items:', error);
      throw error;
    }
  },

  getFoodItem: async (id) => {
    try {
      const response = await apiClient.get(`/food-items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching food item:', error);
      throw error;
    }
  },

  createFoodItem: async (foodItem) => {
    try {
      const response = await apiClient.post('/food-items', foodItem);
      return response.data;
    } catch (error) {
      console.error('Error creating food item:', error);
      throw error;
    }
  },

  updateFoodItem: async (id, foodItem) => {
    try {
      const response = await apiClient.put(`/food-items/${id}`, foodItem);
      return response.data;
    } catch (error) {
      console.error('Error updating food item:', error);
      throw error;
    }
  },

  deleteFoodItem: async (id) => {
    try {
      const response = await apiClient.delete(`/food-items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting food item:', error);
      throw error;
    }
  },

  searchFoodItems: async (query) => {
    try {
      const response = await apiClient.get(`/food-items/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching food items:', error);
      throw error;
    }
  },

  getFoodItemsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/food-items/category/${encodeURIComponent(category)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching food items by category:', error);
      throw error;
    }
  },

  getAvailableFoodItems: async () => {
    try {
      const response = await apiClient.get('/food-items/available');
      return response.data;
    } catch (error) {
      console.error('Error fetching available food items:', error);
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getOrder: async (id) => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  createOrder: async (order) => {
    try {
      const response = await apiClient.post('/orders', order);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await apiClient.put(`/orders/${id}/status?status=${status}`);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  deleteOrder: async (id) => {
    try {
      const response = await apiClient.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  getOrderStatuses: async () => {
    try {
      const response = await apiClient.get('/orders/statuses');
      return response.data;
    } catch (error) {
      console.error('Error fetching order statuses:', error);
      throw error;
    }
  },


  updateOrderItems: async (orderId, updatedItems) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/items`, updatedItems);
      return response.data;
    } catch (error) {
      console.error('Error updating order items:', error);
      throw error;
    }
  },
};

export default api;