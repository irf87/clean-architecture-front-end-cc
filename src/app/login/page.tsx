import { Container, Heading, VStack } from '@chakra-ui/react';
import { LoginForm } from '../../../domains/auth/ui/LoginForm';

export default function LoginPage() {
  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Login</Heading>
        <LoginForm />
      </VStack>
    </Container>
  );
} 