'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../store/authSlice';
import { LoginUseCase } from '../application/LoginUseCase';
import { AuthRepositoryImpl } from '@/domains/auth/infrastructure/AuthRepositoryImpl';
import { generateDynamicKey } from '@/utils/keyGenerator';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginUseCase = new LoginUseCase(new AuthRepositoryImpl());
      const user = await loginUseCase.execute({ 
        email, 
        password,
        dynamicKey: generateDynamicKey()
      });
      dispatch(setUser(user));
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%" maxW="400px">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Text fontSize="sm" color="gray.500">
          A dynamic key will be generated when you submit the form
        </Text>
        <Button
          type="submit"
          colorScheme="blue"
          width="100%"
          isLoading={isLoading}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
}; 