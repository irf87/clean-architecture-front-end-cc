import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { User } from '@/domains/auth/domain/AuthTypes';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | undefined;
  email: string | undefined;
  dynamicKey: string | undefined;
}

export const useAuth = (): UseAuthReturn => {
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    token: user?.token,
    email: user?.email,
    dynamicKey: user?.dynamicKey,
  };
}; 