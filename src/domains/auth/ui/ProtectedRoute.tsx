'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../../../store/hooks';
import { Box, Spinner } from '@chakra-ui/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}; 