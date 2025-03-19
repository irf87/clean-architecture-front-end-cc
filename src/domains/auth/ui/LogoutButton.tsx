'use client';

import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../../store/hooks';
import { logout } from '../store/authSlice';
import { LogoutUseCase } from '../application/LogoutUseCase';
import { AuthRepositoryImpl } from '../infrastructure/AuthRepositoryImpl';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const logoutUseCase = new LogoutUseCase(new AuthRepositoryImpl());
      await logoutUseCase.execute();
      dispatch(logout());
      toast({
        title: 'Logged out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/login');
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Logout
    </Button>
  );
}; 