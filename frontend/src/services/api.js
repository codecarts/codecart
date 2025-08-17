import axios from 'axios';

// --- THIS IS THE CHANGE ---
// Replace the line below with your actual backend URL
const API_URL = "https://codecart-backend.onrender.com"; 

// We are no longer reading from import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

// --- Public GET Requests ---
export const getNotes = () => apiClient.get('/resources', { params: { type: 'note' } });
export const getPyqs = () => apiClient.get('/resources', { params: { type: 'pyq' } });
export const getBlogs = () => apiClient.get('/blogs');
export const getProducts = () => apiClient.get('/products');

// --- Admin Auth ---
export const verifyAdmin = (credentials) =>
  axios.post(`${API_URL}/api/admin/verify`, credentials);

const createConfig = (credentials) => ({
  headers: {
    'X-Admin-Email': credentials.email,
    'X-Admin-Password': credentials.password,
  },
});

// --- Admin POST Requests ---
export const createResource = (data, credentials) =>
  apiClient.post('/resources', data, createConfig(credentials));

export const createBlog = (data, credentials) =>
  apiClient.post('/blogs', data, createConfig(credentials));

export const createProduct = (data, credentials) =>
  apiClient.post('/products', data, createConfig(credentials));