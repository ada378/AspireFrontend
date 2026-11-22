// Centralized API Base URL for Aspire MediaTech Solutions
// In production (Vercel), requests connect directly to the live Render backend:
// https://aspirebackend-16hn.onrender.com

export const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  'https://aspirebackend-16hn.onrender.com';

export const getApiUrl = (endpoint = '') => {
  if (!endpoint) return API_BASE_URL;
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL.replace(/\/+$/, '')}${cleanEndpoint}`;
};

export default API_BASE_URL;

