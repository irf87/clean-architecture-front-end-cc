import { Middleware } from '@reduxjs/toolkit';

import { setUser } from '@/domains/auth/store/authSlice';
import { encryptData } from '@/utils/encryption';

export const authMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (action && typeof action === 'object' && 'type' in action && action.type === setUser.type) {
    const setUserAction = action as ReturnType<typeof setUser>;
    if (setUserAction.payload) {
      localStorage.setItem('user', JSON.stringify({
        ...setUserAction.payload,
        token: encryptData(setUserAction.payload.token || '')
      }));
    } else {
      localStorage.removeItem('user');
    }
  }

  return result;
}; 