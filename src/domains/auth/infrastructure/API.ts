const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS_CLIENT = {
  auth: {
    login: 'api/auth/login',
    logout: 'api/auth/logout',
  },
} as const;

export const API_ENDPOINTS_SERVER = {
  auth: {
    login: `${API_BASE_URL}/login`,
  },
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'reqres-free-v1',
} as const; 