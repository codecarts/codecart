import axios from 'axios';

// This now ONLY reads the environment variable. There is no fallback.
const API_URL = import.meta.env.VITE_API_URL;

// This error will now cause the build to fail on Render if the variable is missing.
if (!API_URL) {
  throw new Error("FATAL ERROR: VITE_API_URL is not set. The application cannot be built.");
}

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

// --- Public GET Requests ---
export const getNotes = () => apiClient.get('/resources', { params: { type: 'note' } });
export const getPyqs = () => apiClient.get('/resources', { params: { type: 'pyq' } });
export const getBlogs = () => apiClient.get('/blogs');
export const getProducts = () => apiClient.get('/products');

// --- Admin Auth ---
// Using a separate axios instance for verifyAdmin to avoid potential conflicts
export const verifyAdmin = (credentials) =>
  axios.post(`${API_URL}/api/admin/verify`, credentials);

const createConfig = (credentials) => ({
  headers: {
    'X-Admin-Email': credentials.email,
    'X-Admin-Password': credentials.password,
    'X-Admin-Secret': credentials.secretKey,
  },
});

// --- Admin POST Requests ---
export const createResource = (data, credentials) =>
  apiClient.post('/resources', data, createConfig(credentials));

export const createBlog = (data, credentials) =>
  apiClient.post('/blogs', data, createConfig(credentials));

export const createProduct = (data, credentials) =>
  apiClient.post('/products', data, createConfig(credentials));