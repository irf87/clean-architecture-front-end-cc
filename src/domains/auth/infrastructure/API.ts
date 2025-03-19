const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/login`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const; 