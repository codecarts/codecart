import axios from 'axios';

// Use an environment variable for the API URL in production
// Fallback to the local URL for development
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`, // Ensure the /api path is included
});
// --- GET Requests ---
export const getNotes = () => apiClient.get('/resources?type=note');
export const getPyqs = () => apiClient.get('/resources?type=pyq');
export const getBlogs = () => apiClient.get('/blogs');
export const getProducts = () => apiClient.get('/products');

// --- POST Requests (Admin) ---
// This function now takes a credentials object
const createConfig = (credentials) => ({
  headers: {
    'X-Admin-Email': credentials.email,
    'X-Admin-Password': credentials.password,
    'X-Admin-Secret': credentials.secretKey,
  },
});

// The create functions now pass the credentials object to createConfig
export const createResource = (data, credentials) =>
  apiClient.post('/resources', data, createConfig(credentials));

export const createBlog = (data, credentials) =>
  apiClient.post('/blogs', data, createConfig(credentials));

export const createProduct = (data, credentials) =>
  apiClient.post('/products', data, createConfig(credentials));