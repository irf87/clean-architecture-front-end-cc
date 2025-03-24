'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { User } from '@/domains/auth/domain/AuthTypes';
import { setUser } from '@/domains/auth/store/authSlice';
import { decryptData } from '@/utils/encryption';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user: User = JSON.parse(storedUser);
          if ('token' in user && user.token && user.token !== '') {
            user.token = decryptData(user.token);
          }
          dispatch(setUser(user));
        }
      } catch (error) {
        console.error('Failed to decrypt user data:', error);
        localStorage.removeItem('user');
      }
    };

    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
} 