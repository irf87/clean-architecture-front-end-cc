'use client';

import { useState, useEffect } from 'react';
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
import { LoginUseCase } from '../application/LoginUseCase';
import { AuthRepositoryImpl } from '@/domains/auth/infrastructure/AuthRepositoryImpl';
import { generateDynamicKey } from '@/utils/keyGenerator';
import { useLogin } from '@/domains/auth/application/LoginHook';

export const LoginForm = () => {
  const { login, isLoading, toastMessage } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);

      const loginUseCase = new LoginUseCase(new AuthRepositoryImpl());
      await loginUseCase.execute({ 
        email, 
        password,
        dynamicKey: generateDynamicKey()
      });
  };

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
  }, [toastMessage, toast]);

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