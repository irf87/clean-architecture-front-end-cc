'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import { User } from '../domain/AuthTypes';
import { EncryptionService } from '../../../services/encryption';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const encryptionService = EncryptionService.getInstance();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user: User = JSON.parse(storedUser);
          // Decrypt sensitive data
          if ('token' in user && user.token) {
            user.token = encryptionService.decryptSensitiveData(user.token);
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