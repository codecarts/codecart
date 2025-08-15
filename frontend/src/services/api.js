import axios from 'axios';

// This directly reads the environment variable provided by Render during the build.
const API_URL = import.meta.env.VITE_API_URL;

// If the variable is missing during the build, this will log an error.
if (!API_URL) {
  console.error("VITE_API_URL is not set! The application will not connect to the backend.");
}

const apiClient = axios.create({
  baseURL: `${API_URL}/api`, // Set the base URL for all requests
});


// --- Public GET Requests ---
export const getNotes = () => apiClient.get('/resources?type=note');
export const getPyqs = () => apiClient.get('/resources?type=pyq');
export const getBlogs = () => apiClient.get('/blogs');
export const getProducts = () => apiClient.get('/products');

// --- Admin POST Requests ---
export const verifyAdmin = (credentials) => 
  axios.post(`${API_URL}/api/admin/verify`, credentials);

const createConfig = (credentials) => ({
  headers: {
    'X-Admin-Email': credentials.email,
    'X-Admin-Password': credentials.password,
    'X-Admin-Secret': credentials.secretKey,
  },
});

export const createResource = (data, credentials) =>
  apiClient.post('/resources', data, createConfig(credentials));

export const createBlog = (data, credentials) =>
  apiClient.post('/blogs', data, createConfig(credentials));

export const createProduct = (data, credentials) =>
  apiClient.post('/products', data, createConfig(credentials));