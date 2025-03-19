import { Middleware } from '@reduxjs/toolkit';
import { setUser } from '../domains/auth/store/authSlice';

export const authMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (action.type === setUser.type) {
    if (action.payload) {
      localStorage.setItem('user', JSON.stringify(action.payload));
    } else {
      localStorage.removeItem('user');
    }
  }

  return result;
}; 