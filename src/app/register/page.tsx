'use client';

import { Container, Heading, VStack } from '@chakra-ui/react';
import { RegisterForm } from '@/domains/auth/ui/RegisterForm';

export default function RegisterPage() {
  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Register</Heading>
        <RegisterForm />
      </VStack>
    </Container>
  );
} 