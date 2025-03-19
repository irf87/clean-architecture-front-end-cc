'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../store/authSlice';
import { User } from '@/domains/auth/domain/AuthTypes';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user: User = JSON.parse(userStr);
        dispatch(setUser(user));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}; 