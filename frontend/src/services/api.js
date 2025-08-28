import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("FATAL ERROR: VITE_API_URL is not set.");
}

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

// Admin Auth
export const verifyAdmin = (credentials) =>
  axios.post(`${API_URL}/api/admin/verify`, {
    email: credentials.email,
    password: credentials.password,
  });

const adminHeaders = ({ email, password }) => ({
  'X-Admin-Email': String(email || '').trim(),
  'X-Admin-Password': String(password || ''),
});

// Add the 'export' keyword here
export const withAdmin = (credentials) => ({
  headers: adminHeaders(credentials),
});

// Public GETs
export const getNotes = () => apiClient.get('/notes'); // Updated
export const getPyqs = () => apiClient.get('/pyqs');   // Updated
export const getBlogs = () => apiClient.get('/blogs');
export const getProducts = () => apiClient.get('/products');

// User Contact Form
export const submitContactForm = (data, token) =>
  apiClient.post('/contact', data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

// Admin View Messages
export const getContactMessages = (credentials) =>
  apiClient.get('/contact', withAdmin(credentials));

// Admin mutations
export const createNote = (data, credentials) =>
  apiClient.post('/notes', data, withAdmin(credentials));
  
export const createPyq = (data, credentials) =>
  apiClient.post('/pyqs', data, withAdmin(credentials));
export const createBlog = (data, credentials) =>
  apiClient.post('/blogs', data, withAdmin(credentials));
export const createProduct = (data, credentials) =>
  apiClient.post('/products', data, withAdmin(credentials));