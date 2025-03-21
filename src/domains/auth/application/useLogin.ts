import { useState } from 'react';

import { LoginUseCase } from '@/domains/auth/application/LoginUseCase';
import { AuthRepositoryImpl } from '@/domains/auth/infrastructure/client/AuthRepositoryImpl';
import { setUser } from '@/domains/auth/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { generateDynamicKey } from '@/utils/keyGenerator';

const loginUseCase = new LoginUseCase(new AuthRepositoryImpl());

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const dynamicKey = generateDynamicKey();
    const userResponse = await loginUseCase.execute(
      email,
      password,
      dynamicKey,
    );
    if(userResponse.error || !userResponse.data) {
      setError(userResponse.error || 'Login failed');
      setIsLoading(false);
      return; 
    }

    dispatch(setUser({
      ...userResponse.data,
      email,
      dynamicKey,
    }));

    setIsLoading(false);
    return userResponse.data;
  };

  return {
    login,
    error,
    isLoading,
  };
};
